import * as types from '../constants/actionTypes';
import initialState from '../constants/initialState';

export default function reducer(state = initialState, action) {
  switch (action.type) {

  case types.RECEIVE_IMAGES:
    return Object.assign({}, state, {
      isFileReading: false,
      didInvalidate: false,
      hasImage: true,
      images: action.images
    });

  case types.VALIDATE_IMAGES:
    return Object.assign({}, state, {
      isFileReading: false,
      didInvalidate: false,
      images: action.images
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

  default:
    return state;

  }
}
