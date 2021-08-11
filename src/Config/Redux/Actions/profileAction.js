import allActions from '.';
import {fAuth, fDatabse} from '../../Firebase';
import storage from '@react-native-firebase/storage';

const updateUserPassword = (data, navigation) => async dispatch => {
  const {setLoading, setVisible, setMessage} = allActions.authAction;
  dispatch(setLoading());
  await fAuth
    .signInWithEmailAndPassword(data.email, data.password)
    .then(async () => {
      await fAuth.currentUser
        .updatePassword(data.newPassword)
        .then(async () => {
          dispatch(setLoading());
          dispatch(setVisible());
          dispatch(setMessage('Kata Sandi Berhasil Diupdate'));
          setTimeout(() => {
            dispatch(setVisible());
            dispatch(setMessage(null));
          }, 3000);

          return navigation.goBack();
        })
        .catch(() => {
          dispatch(setLoading());
          dispatch(setMessage('Kata Sandi Gagal Diupdate'));
          dispatch(setVisible());
          setTimeout(() => {
            dispatch(setVisible());
            dispatch(setMessage(null));
          }, 2000);
        });
    })
    .catch(() => {
      dispatch(setLoading());
      dispatch(setMessage('Kata Sandi Sebelumnya Tidak Sesuai'));
      dispatch(setVisible());
      setTimeout(() => {
        dispatch(setVisible());
        dispatch(setMessage(null));
      }, 2000);
    });
};

const uploadImage = (uri, fileName, _uid) => async dispatch => {
  const {setLoading, setVisible, setMessage} = allActions.authAction;
  const imageRef = storage().ref(`profile/${fileName}`);
  await imageRef
    .putFile(uri.replace('file:///', 'file:/'), {
      contentType: 'image/jpg',
    })
    .then(res => {
      dispatch(setLoading());
      dispatch(setVisible());
      dispatch(setMessage('Profile Berhasil Diupdate'));
      setTimeout(() => {
        dispatch(setVisible());
        dispatch(setMessage(null));
      }, 3000);
    })
    .catch(error => {
      dispatch(setLoading());
      dispatch(setMessage('Profile gagal diupdate'));
      dispatch(setVisible());
      setTimeout(() => {
        dispatch(setVisible());
        dispatch(setMessage(null));
      }, 2000);
    });

  const url = await imageRef.getDownloadURL();
  dispatch(updateUser(url, _uid));
};

const updateUser = (profile, _uid) => async dispatch => {
  const {setUser} = allActions.authAction;
  await fDatabse
    .ref('Users')
    .child(`${_uid}`)
    .update({profile_photo: profile})
    .then(() => {
      dispatch(setUser({profile_photo: profile}));
    });
};

export default {
  updateUserPassword,
  uploadImage,
  updateUser,
};
