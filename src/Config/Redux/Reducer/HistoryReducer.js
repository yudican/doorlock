import {IS_LIGHT_ON, IS_LOCKED, SET_HISTORY} from '../../constant';

const initialState = {
  histories: [],
};

const HistoryReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_HISTORY:
      return {
        ...state,
        histories: payload,
      };

    default:
      return {...state};
  }
};
export default HistoryReducer;
