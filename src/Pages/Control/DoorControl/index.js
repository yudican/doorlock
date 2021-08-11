import React, {useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {heightPercentageToDP as hp} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {useDispatch, useSelector} from 'react-redux';
import allActions from '../../../Config/Redux/Actions';

const DoorControl = ({navigation}) => {
  const dispatch = useDispatch();
  const {setDoorLocked, getDoorControl} = allActions.controlAction;
  const {addHistory} = allActions.historyAction;
  const {control, auth} = useSelector(state => state);
  const {isLocked} = control;
  const {_uid} = auth.user;

  useEffect(() => {
    dispatch(getDoorControl());
  }, []);

  const handlePress = () => {
    dispatch(setDoorLocked(!isLocked));
    if (!isLocked) {
      dispatch(
        addHistory({
          _uid,
          title: 'Mengakses Pintu',
          device: 'Aplikasi',
          time: `${new Date().getTime()}`,
        }),
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection} />
      {/* <Snackbar visible={visible}>{message}</Snackbar> */}
      <View style={styles.content}>
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{paddingBottom: hp(3), alignItems: 'center'}}>
            <Text style={styles.textTitle}>
              PINTU {isLocked ? 'TERBUKA' : 'TERKUNCI'}
            </Text>
            <Text>Klik Untuk Membuka kunci</Text>
          </View>
          <FontAwesome5
            name={isLocked ? 'door-open' : 'door-closed'}
            size={hp(30)}
            onPress={handlePress}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    backgroundColor: '#130f40',
    height: hp(5),
  },
  content: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    borderTopEndRadius: hp(3),
    borderTopStartRadius: hp(3),
    marginTop: -hp(3),
  },
  contentBody: {
    marginHorizontal: hp(3),
    marginTop: hp(3),
  },
  textTitle: {
    fontSize: hp(3),
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: hp(3),
  },
});

export default DoorControl;
