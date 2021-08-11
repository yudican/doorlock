import axios from 'axios';
import allActions from '.';
import {
  DIALOG_VISIBLE,
  REGISTER_NEW_CARD,
  SHOW_CARD,
  SHOW_CARD_BY_ID,
  SHOW_USER,
  SHOW_USER_BY_ID,
} from '../../constant';
import {fDatabse} from '../../Firebase';

const showCard = () => async dispatch => {
  await fDatabse.ref('cards').on('value', snapshot => {
    const cards = snapshot.val();
    if (cards) {
      const newCard = Object.values(cards);
      return dispatch(setShowCard(newCard));
    }
    return dispatch(setShowCard([]));
  });
};

const showCardById = (cardId, navigation) => async dispatch => {
  await fDatabse
    .ref('cards')
    .child(cardId)
    .on('value', snapshot => {
      const card = snapshot.val();
      if (card) {
        dispatch(setShowCardById(card));
        return navigation.navigate('CardManagementCreate', {
          update: true,
          cardId,
        });
      }
    });
};

const getTempCard = _uid => async dispatch => {
  await fDatabse.ref('TemporaryCard').on('value', snapshot => {
    const card = snapshot.val();
    if (card) {
      dispatch(setShowCardTemp(card));
    }
  });
};

const setTempCard =
  (data = '') =>
  async dispatch => {
    await fDatabse.ref('TemporaryCard').set(data);
  };

const setIsRegistration =
  (data = true) =>
  async dispatch => {
    await fDatabse.ref('settings').child('isRegister').set(data);
  };

const addNewCard = (data, navigation) => async dispatch => {
  const {setLoading, setVisible, setMessage} = allActions.authAction;
  dispatch(setLoading());
  await fDatabse
    .ref('cards')
    .child(data.cardId)
    .set(data)
    .then(() => {
      dispatch(setLoading());
      dispatch(setVisible());
      dispatch(setMessage('Kartu Berhasil Disimpan'));
      setTimeout(() => {
        dispatch(setVisible());
        dispatch(setMessage(null));
      }, 3000);
      dispatch(setTempCard(''));
      dispatch(setShowCardById({}));
      dispatch(setShowCardTemp(null));
      dispatch(setIsRegistration(false));
      return navigation.pop();
    })
    .catch(err => {
      dispatch(setLoading());
      dispatch(setMessage('Kartu Gagal Disimpan'));
      dispatch(setVisible());
      dispatch(setTempCard(''));
      dispatch(setShowCardById({}));
      dispatch(setShowCardTemp(null));
      dispatch(setIsRegistration(false));
      setTimeout(() => {
        dispatch(setVisible());
        dispatch(setMessage(null));
      }, 2000);
    });
};

const updateCard = (data, cardId, navigation) => async dispatch => {
  const {setLoading, setVisible, setMessage} = allActions.authAction;
  dispatch(setLoading());
  await fDatabse
    .ref('cards')
    .child(cardId)
    .update(data)
    .then(() => {
      dispatch(setLoading());
      dispatch(setVisible());
      dispatch(setMessage('Kartu Berhasil Diupdate'));
      dispatch(setTempCard(''));
      dispatch(setShowCardById({}));
      dispatch(setShowCardTemp(null));
      setTimeout(() => {
        dispatch(setVisible());
        dispatch(setMessage(null));
      }, 3000);
      dispatch(setTempCard(''));
      dispatch(setIsRegistration(false));
      return navigation.pop();
    })
    .catch(err => {
      dispatch(setLoading());
      dispatch(setMessage('Kartu Gagal Diupdate'));
      dispatch(setVisible());
      dispatch(setTempCard(''));
      dispatch(setShowCardById({}));
      dispatch(setShowCardTemp(null));
      dispatch(setIsRegistration(false));
      setTimeout(() => {
        dispatch(setVisible());
        dispatch(setMessage(null));
      }, 2000);
    });
};

const deleteCard = cardId => async dispatch => {
  const {setLoading, setVisible, setMessage} = allActions.authAction;
  const {toggleDialog} = allActions.userManagementAction;
  dispatch(setLoading());
  dispatch(toggleDialog());
  await fDatabse.ref('cards').child(cardId).remove();

  dispatch(setLoading());
  dispatch(setVisible());
  dispatch(setMessage('Kartu Berhasil Dihapus'));
  dispatch(setTempCard(''));
  dispatch(setShowCardById({}));
  dispatch(setShowCardTemp(null));
  setTimeout(() => {
    dispatch(setVisible());
    dispatch(setMessage(null));
  }, 3000);
  dispatch(showCard());
};

const setShowCard = cards => {
  return {
    type: SHOW_CARD,
    payload: cards,
  };
};

const setShowCardById = card => {
  return {
    type: SHOW_CARD_BY_ID,
    payload: card,
  };
};

const setShowCardTemp = card => {
  return {
    type: REGISTER_NEW_CARD,
    payload: card,
  };
};

export default {
  showCard,
  showCardById,
  addNewCard,
  updateCard,
  deleteCard,
  setShowCard,
  setShowCardById,
  setShowCardTemp,
  getTempCard,
  setTempCard,
  setIsRegistration,
};
