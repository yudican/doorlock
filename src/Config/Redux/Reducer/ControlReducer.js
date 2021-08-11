import {IS_LIGHT_ON, IS_LOCKED} from '../../constant';

const initialState = {
  isLocked: false,
  isLightOn: false,
};

const ControlReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case IS_LIGHT_ON:
      return {
        ...state,
        isLightOn: payload,
      };
    case IS_LOCKED:
      return {
        ...state,
        isLocked: payload,
      };

    default:
      return {...state};
  }
};
export default ControlReducer;
