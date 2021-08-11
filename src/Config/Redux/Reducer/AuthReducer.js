import {
  LOGOUT,
  SET_ERROR_MESSAGES,
  SET_LOADING,
  SET_MESSAGE,
  SET_TOKEN,
  SET_USER,
  SET_VISIBLE,
} from '../../constant';

const initialState = {
  user: null,
  token: null,
  loading: false,
  messages: [],
  message: null,
  visible: false,
};

const AuthReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SET_TOKEN:
      return {
        ...state,
        token: payload,
      };
    case SET_USER:
      return {
        ...state,
        user: {...state.user, ...payload},
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        token: null,
        messages: [],
        message: null,
        visible: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: !state.loading,
      };
    case SET_MESSAGE:
      return {
        ...state,
        message: payload,
      };
    case SET_ERROR_MESSAGES:
      return {
        ...state,
        messages: payload,
      };
    case SET_VISIBLE:
      return {
        ...state,
        visible: !state.visible,
      };
    // case TOGGLE_RECEPIENT_STATUS:
    //   return {
    //     ...state,
    //     visible: !state.visible,
    //   };

    default:
      return {...state};
  }
};
export default AuthReducer;
