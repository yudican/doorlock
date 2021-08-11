import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {getDate} from '../../../Utils/helper';

const HistoryItem = ({fullname, title, time, device}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={{fontSize: hp(2.2), fontWeight: 'bold'}}>{fullname}</Text>
        <Text style={{}}>{title}</Text>
      </View>
      <View>
        <Text style={{fontSize: hp(2)}}>{getDate(parseInt(time))}</Text>
        <Text style={{textAlign: 'right'}}>{device}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginHorizontal: wp(3),
    marginTop: hp(2),
    borderRadius: hp(1),
    paddingHorizontal: wp(3),
    paddingVertical: wp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default HistoryItem;
