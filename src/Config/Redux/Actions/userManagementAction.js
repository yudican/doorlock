import axios from 'axios';
import allActions from '.';
import {DIALOG_VISIBLE, SHOW_USER, SHOW_USER_BY_ID} from '../../constant';
import {fDatabse} from '../../Firebase';

const showUser = () => async dispatch => {
  await fDatabse.ref('Users').on('value', snapshot => {
    const users = snapshot.val();
    if (users) {
      const newUser = Object.values(users).filter(val => val.role !== 'admin');
      dispatch(setShowUser(newUser));
    }
  });
};

const showUserById = (_uid, navigation) => async dispatch => {
  await fDatabse
    .ref('Users')
    .child(_uid)
    .on('value', snapshot => {
      const user = snapshot.val();
      if (user) {
        dispatch(setShowUserById(user));
        return navigation.navigate('UserManagementCreate', {
          update: true,
          _uid,
        });
      }
    });
};

const addNewUser = (data, navigation) => async dispatch => {
  const {setLoading, setVisible, setMessage} = allActions.authAction;
  dispatch(setLoading());
  await axios
    .post('https://smartdoor-lock.herokuapp.com/api/v1/user/create', data)
    .then(res => {
      const {message} = res.data;
      dispatch(setLoading());
      dispatch(setVisible());
      dispatch(setMessage(message));
      setTimeout(() => {
        dispatch(setVisible());
        dispatch(setMessage(null));
      }, 3000);

      navigation.pop();
    })
    .catch(err => {
      console.log(err.response);
      dispatch(setLoading());
      if (err.response) {
        const {message} = err.response.data;
        dispatch(setVisible());
        dispatch(setMessage(message));
        setTimeout(() => {
          dispatch(setVisible());
          dispatch(setMessage(null));
        }, 2000);
      }
    });
};

const updateUser = (data, _uid, navigation) => async dispatch => {
  const {setLoading, setVisible, setMessage} = allActions.authAction;
  dispatch(setLoading());
  await axios
    .post('https://smartdoor-lock.herokuapp.com/api/v1/user/update', {
      ...data,
      _uid,
    })
    .then(res => {
      const {message} = res.data;
      dispatch(setLoading());
      dispatch(setVisible());
      dispatch(setMessage(message));
      setTimeout(() => {
        dispatch(setVisible());
        dispatch(setMessage(null));
      }, 3000);

      return navigation.replace('UserManagementShow');
    })
    .catch(err => {
      console.log(err);
      dispatch(setLoading());
      if (err.response) {
        const {message} = err.response.data;
        dispatch(setVisible());
        dispatch(setMessage(message));
        setTimeout(() => {
          dispatch(setVisible());
          dispatch(setMessage(null));
        }, 2000);
      }
    });
};

const deleteUser = _uid => async dispatch => {
  const {setLoading, setVisible, setMessage} = allActions.authAction;
  dispatch(setLoading());
  dispatch(toggleDialog());
  await axios
    .post('https://smartdoor-lock.herokuapp.com/api/v1/user/delete', {_uid})
    .then(res => {
      const {message} = res.data;

      dispatch(setLoading());
      dispatch(setVisible());
      dispatch(setMessage(message));
      setTimeout(() => {
        dispatch(setVisible());
        dispatch(setMessage(null));
      }, 3000);
    })
    .catch(err => {
      dispatch(toggleDialog());
      dispatch(setLoading());
      if (err.response) {
        const {message} = err.response.data;
        dispatch(setVisible());
        dispatch(setMessage(message));
        setTimeout(() => {
          dispatch(setVisible());
          dispatch(setMessage(null));
        }, 2000);
      }
    });
};

const setShowUser = users => {
  return {
    type: SHOW_USER,
    payload: users,
  };
};

const setShowUserById = user => {
  return {
    type: SHOW_USER_BY_ID,
    payload: user,
  };
};

const toggleDialog = () => {
  return {
    type: DIALOG_VISIBLE,
  };
};

export default {
  showUser,
  showUserById,
  addNewUser,
  updateUser,
  deleteUser,
  setShowUser,
  setShowUserById,
  toggleDialog,
};
