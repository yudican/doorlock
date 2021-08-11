import {IS_LIGHT_ON, IS_LOCKED, SET_HISTORY} from '../../constant';
import {fDatabse} from '../../Firebase';
import uuid from 'react-native-uuid';

const getHistory = () => async dispatch => {
  const dataHistory = [];
  await fDatabse.ref('histories').on('value', async snapshot => {
    const histories = snapshot.val();
    if (histories) {
      await Object.values(histories).map(async item => {
        await fDatabse
          .ref('Users')
          .child(item._uid)
          .once('value', snapshotUser => {
            const user = snapshotUser.val();
            if (user) {
              setTimeout(() => {
                //data loaded after 1000 ms
                dataHistory.push({...item, fullname: user.fullname});
              }, 1000);
            }
          });
      });
      setTimeout(() => {
        //data loaded after 1000 ms
        dispatch(setHistories(dataHistory));
      }, 2000);
    }
  });
};

const addHistory = data => async dispatch => {
  await fDatabse
    .ref('histories')
    .child(uuid.v4())
    .set(data)
    .then(() => dispatch(getDoorControl()));
};

const setHistories = histories => {
  return {
    type: SET_HISTORY,
    payload: histories,
  };
};

export default {
  getHistory,
  addHistory,
  setHistories,
};
