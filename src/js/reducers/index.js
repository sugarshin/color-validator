import * as types from '../constants/actionTypes';
import initialState from '../constants/initialState';

export default function reducer(state = initialState, action) {
  switch (action.type) {

  case types.ADD_IMAGE:
    return Object.assign({}, state, {
      didInvalidate: false,
      images: [...state.images, ...action.images]
    });

  case types.UPDATE_VALIDATITON:
    return Object.assign({}, state, {
      isInvalid: action.isInvalid
    });

  case types.ADD_VALIDATE_COLORS:
    return Object.assign({}, state, {
      validateColors: [...state.validateColors, action.color]
    });

  case types.DELETE_VALIDATE_COLORS:
    return Object.assign({}, state, {
      validateColors: state.validateColors.filter((c, i) => i !== action.index)
    });

  case types.DELETE_IMAGE:
    return Object.assign({}, state, {
      images: state.images.filter((c, i) => i !== action.index)
    });

  case types.INVALID_IMAGES:
    return Object.assign({}, state, {
      didInvalidate: true
    });

  default:
    return state;

  }
}
