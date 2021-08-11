import {DIALOG_VISIBLE, SHOW_USER, SHOW_USER_BY_ID} from '../../constant';

const initialState = {
  users: [],
  user: null,
  dialogVisible: false,
};

const UserManagementReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SHOW_USER:
      return {
        ...state,
        users: payload,
      };
    case SHOW_USER_BY_ID:
      return {
        ...state,
        user: payload,
      };
    case DIALOG_VISIBLE:
      return {
        ...state,
        dialogVisible: !state.dialogVisible,
      };

    default:
      return {...state};
  }
};
export default UserManagementReducer;
