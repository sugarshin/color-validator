import chunk from 'lodash/array/chunk';
import getPixels from 'get-pixels';
import rgbHex from 'rgb-hex';

import * as types from '../constants/actionTypes';

export function receiveImages(images) {
  return { type: types.RECEIVE_IMAGES, images };
}

export function validateImages() {
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
  console.log(color);
  return { type: types.ADD_VALIDATE_COLORS, color };
}

export function deleteValidateColors(index) {
  return { type: types.DELETE_VALIDATE_COLORS, index };
}

export function deleteImage(index) {
  return { type: types.DELETE_IMAGE, index };
}

/**
 * @param {[Number, Number, Number]} rgb
 * @param {Number} alpha
 * @returns {[String, Number]}
 */
function toHexAndAlpha(rgb, alpha) {
  return [`#${rgbHex(...rgb)}`, alpha / 255];
}
