import {
  DIALOG_VISIBLE,
  REGISTER_NEW_CARD,
  SHOW_CARD,
  SHOW_CARD_BY_ID,
} from '../../constant';

const initialState = {
  cards: [],
  card: null,
  dialogVisible: false,
  cardTemp: null,
};

const CardManagementReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case SHOW_CARD:
      return {
        ...state,
        cards: payload,
      };
    case REGISTER_NEW_CARD:
      return {
        ...state,
        cardTemp: payload,
      };
    case SHOW_CARD_BY_ID:
      return {
        ...state,
        card: payload,
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
export default CardManagementReducer;
