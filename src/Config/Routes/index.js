import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Splash from '../../Pages/Splash';
import {fAuth, fDatabse} from '../Firebase';
import allActions from '../Redux/Actions';
import AppStack from './AppStack/AppStack';
import AuthStack from './AuthStack/AuthStack';

const Routes = () => {
  const dispatch = useDispatch();
  const {setUser} = allActions.authAction;
  const [initializing, setInitializing] = useState(true);
  const [userData, setUserData] = useState(null);
  const state = useSelector(state => state);
  const {profile, auth} = state;

  const onAuthStateChanged = user => {
    setUserData(user);
    user && getUser(user.uid);
    if (initializing) {
      setInitializing(false);
    }
  };

  const getUser = async uid => {
    await fDatabse
      .ref('Users')
      .child(`${uid}`)
      .on('value', snapShot => {
        const user = snapShot.val();
        if (user) {
          dispatch(setUser(user));
        }
      });
  };

  useEffect(() => {
    const subscriber = fAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return <Splash />;
  }
  if (userData) {
    return <AppStack />;
  }

  return <AuthStack />;
};

export default Routes;
