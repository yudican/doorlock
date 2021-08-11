import React, {useEffect, useRef, useState} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
import allActions from '../../../Config/Redux/Actions';
const CardRfid = ({placeholder, value}) => {
  const dispatch = useDispatch();
  const {setIsRegistration} = allActions.cardManagementAction;
  const refRBSheet = useRef();
  const [cardId, setCardId] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (value) {
      setLoading(true);
      setTimeout(() => {
        refRBSheet.current.close();
        setCardId(value);
      }, 2000);
    }
  }, [value]);

  const showCard = () => {
    setLoading(false);
    dispatch(setIsRegistration(true));
    refRBSheet.current.open();
  };
  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity activeOpacity={1} onPress={showCard}>
        <View style={styles.fieldContent}>
          <Text style={{color: value ? '#000' : '#000'}}>
            {cardId || placeholder}
          </Text>
        </View>
      </TouchableOpacity>
      <RBSheet ref={refRBSheet} height={hp(50)} openDuration={10} style={style}>
        {loading ? <CardSuccess /> : <CardWaiting />}
      </RBSheet>
    </View>
  );
};

const CardSuccess = () => {
  return (
    <View style={styles.cardSensor}>
      <Text style={styles.sensorLable}>Yeay, Berhasilll</Text>
      <Text style={styles.sensorSublable}>Selamat Kartu Telah Terdeteksi</Text>
      <Image
        source={require('../../../Assets/Loader/success.gif')}
        style={{width: wp(70), height: wp(70)}}
      />
    </View>
  );
};

const CardWaiting = () => {
  return (
    <View style={styles.cardSensor}>
      <Text style={styles.sensorLable}>Tempelkan Kartu</Text>
      <Text style={styles.sensorSublable}>
        Silahkan tempelkan kartu pada sensor RFID atau pada sensor NFC dihp anda
      </Text>
      <Image
        source={require('../../../Assets/Loader/scanner.gif')}
        style={{width: wp(60), height: wp(60)}}
      />
    </View>
  );
};

const style = {
  container: {
    paddingHorizontal: wp(3),
    paddingTop: hp(2),
    borderTopEndRadius: hp(5),
  },
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: hp(2),
  },
  fieldContent: {
    backgroundColor: '#fff',
    paddingVertical: hp(1.6),
    borderRadius: hp(1),
    paddingHorizontal: wp(3),
  },
  cardSensor: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: wp(3),
  },
  sensorLable: {fontSize: hp(2.6), fontWeight: 'bold'},
  sensorSublable: {
    textAlign: 'center',
    fontSize: hp(2),
    paddingHorizontal: wp(5),
  },
});

export default CardRfid;
