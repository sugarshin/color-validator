import chunk from 'lodash/array/chunk';
import getPixels from 'get-pixels';
import rgbHex from 'rgb-hex';

import * as types from '../constants/actionTypes';
import { MIME_TYPE_IMAGE } from '../constants';

export function receiveImages(images) {
  return dispatch => {
    if (validateImageMIMETYPE(images)) {
      dispatch(addImage(images));
    } else {
      dispatch(invalidImages());
    }
  };
}

export function validateImageColor() {
  return (dispatch, getState) => {
    const { images, validateColors } = getState();
    images.forEach(image => {
      getPixels(image.preview, (err, pixels) => {
        const arrayColors = chunk(pixels.data, 4);
        const colors = arrayColors.map(arrayColor => toHexAndAlpha(
          [arrayColor[0], arrayColor[1], arrayColor[2]], arrayColor[3]
        ));
        dispatch({
          type: types.UPDATE_VALIDATITON,
          isInvalid: colors.some(color => validateColors.includes(color[0]))
        });
      });
    });
  };
}

export function addValidateColors(color) {
  return { type: types.ADD_VALIDATE_COLORS, color };
}

export function deleteValidateColors(index) {
  return { type: types.DELETE_VALIDATE_COLORS, index };
}

export function addImage(images) {
  return { type: types.ADD_IMAGE, images };
}

export function deleteImage(index) {
  return { type: types.DELETE_IMAGE, index };
}

function invalidImages() {
  return { type: types.INVALID_IMAGES };
}

/**
 * @param {[Number, Number, Number]} rgb
 * @param {Number} alpha
 * @returns {[String, Number]}
 */
function toHexAndAlpha(rgb, alpha) {
  return [`#${rgbHex(...rgb)}`, alpha / 255];
}

/**
 * @param {Array} images
 * @returns {Boolean}
 */
function validateImageMIMETYPE(images) {
  return images.every(image => MIME_TYPE_IMAGE.includes(image.type));
}
