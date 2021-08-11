import {getErrorMessage} from '../../../Utils/helper';
import {
  SET_ERROR_MESSAGES,
  SET_LOADING,
  SET_MESSAGE,
  SET_TOKEN,
  SET_USER,
  SET_VISIBLE,
} from '../../constant';
import {fAuth, fDatabse} from '../../Firebase';

const login = data => async dispatch => {
  dispatch(setLoading());
  await fAuth
    .signInWithEmailAndPassword(data.email, data.password)
    .then(async res => {
      await fDatabse
        .ref('Users')
        .child(`${res.uid}`)
        .on('value', snapShot => {
          const user = snapShot.val();
          if (user) {
            dispatch(setUser(user));
          }
        });
    })
    .catch(err => {
      console.log(err);
      dispatch(setLoading());
      dispatch(setVisible());
      dispatch(setMessage(getErrorMessage(err.code)));

      setTimeout(() => {
        dispatch(setVisible());
        dispatch(setMessage(null));
      }, 2000);
    });
};

const register = (data, password) => async dispatch => {
  dispatch(setLoading());
  await fAuth
    .createUserWithEmailAndPassword(data.email, password)
    .then(async res => {
      const user = {...data, _uid: res.user.uid};
      await fDatabse.ref('Users').child(res.user.uid).set(user);

      dispatch(setLoading());
      dispatch(setVisible());
      dispatch(setMessage('Register berhasil'));
      dispatch(setUser(user));
      setTimeout(() => {
        dispatch(setVisible());
        dispatch(setMessage(null));
      }, 2000);
    })
    .catch(err => {
      console.log(err);

      dispatch(setLoading());
      dispatch(setVisible());
      dispatch(setMessage(getErrorMessage(err.code)));

      setTimeout(() => {
        dispatch(setVisible());
        dispatch(setMessage(null));
      }, 2000);
    });
};
const setToken = token => {
  return {
    type: SET_TOKEN,
    payload: token,
  };
};

const setUser = user => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const logout = () => async dispatch => {
  await fAuth.signOut().then(() => {
    dispatch(setUser(null));
  });
};

const setLoading = () => {
  return {
    type: SET_LOADING,
  };
};

const setVisible = () => {
  return {
    type: SET_VISIBLE,
  };
};

const setMessage = message => {
  return {
    type: SET_MESSAGE,
    payload: message,
  };
};

const setMessages = messages => {
  return {
    type: SET_ERROR_MESSAGES,
    payload: messages,
  };
};

export default {
  login,
  register,
  setToken,
  setUser,
  logout,
  setLoading,
  setVisible,
  setMessage,
  setMessages,
};
