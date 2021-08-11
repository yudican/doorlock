import axios from 'axios';
import {getDistance} from 'geolib';
import {MAPS_API} from '../Config/constant';

export const getErrorMessage = code => {
  switch (code) {
    case 'auth/user-not-found':
      return 'Pengguna tidak ditemukan!';
    case 'auth/wrong-password':
      return 'Kata sandi tidak sesuai!';
    case 'auth/operation-not-allowed':
      return 'Anda tidak memiliki akses!';
    case 'auth/email-already-in-use':
      return 'Email ini sudah terdaftar!';
    case 'auth/invalid-email':
      return 'Email tidak valid!';
    default:
      return 'Trejadi kesalahan!';
  }
};

export const filterUserByDistance = (
  myCoordinate,
  dataCoordinate,
  radius = 6,
) => {
  const newCorrdinate = [];

  dataCoordinate &&
    dataCoordinate.map(item => {
      const distance = calculateDistance(myCoordinate, item.coordinate);
      if (!isNaN(distance)) {
        if (distance < radius) {
          newCorrdinate.push({...item, distance});
        }
      }
    });
  return newCorrdinate;
};

export const calculateDistance = (myCoordinate, userCorrdinate) => {
  let distance = getDistance(myCoordinate, userCorrdinate);
  return distance / 1000;
};

export const getDate = dateTime => {
  var options = {
    // weekday: 'long',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    minute: '2-digit',
    second: '2-digit',
  };
  let date = new Date(dateTime);
  return date.toLocaleDateString('id-ID', options).replace('.', ':');
};

export const getUserName = (users, _uid) => {
  const user = users.filter(item => item._uid === _uid);
  if (user && user.length > 0) {
    return user[0].fullname;
  }
  return null;
};

export const setDataToSelect = users => {
  const data = [];

  users &&
    users.map(item => {
      data.push({_id: item._uid, name: item.fullname});
    });

  return data;
};
