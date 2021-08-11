import {IS_LIGHT_ON, IS_LOCKED} from '../../constant';
import {fDatabse} from '../../Firebase';

const getDoorControl = () => async dispatch => {
  await fDatabse
    .ref('home')
    .child('isLocked')
    .on('value', snapshot => {
      const door = snapshot.val();
      dispatch(doorControl(door));
    });
};

const getLightControl = () => async dispatch => {
  await fDatabse
    .ref('home')
    .child('isLightOn')
    .on('value', snapshot => {
      const light = snapshot.val();
      dispatch(lampControl(light));
    });
};

const setDoorLocked = value => async dispatch => {
  await fDatabse
    .ref('home')
    .child('isLocked')
    .set(value)
    .then(() => dispatch(getDoorControl()));
};

const setLightOn = value => async dispatch => {
  await fDatabse
    .ref('home')
    .child('isLightOn')
    .set(value)
    .then(() => dispatch(getLightControl()));
};

const doorControl = value => {
  return {
    type: IS_LOCKED,
    payload: value,
  };
};

const lampControl = value => {
  return {
    type: IS_LIGHT_ON,
    payload: value,
  };
};

export default {
  doorControl,
  lampControl,
  getDoorControl,
  getLightControl,
  setDoorLocked,
  setLightOn,
};
