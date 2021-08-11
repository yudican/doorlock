import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CardItemBox = ({
  name,
  Icon = MaterialCommunityIcons,
  label,
  onPress,
  iconColor = '#000',
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <Icon name={name} size={hp(8)} color={iconColor} />
        <Text style={{fontSize: hp(2.2), marginTop: hp(1)}}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    width: wp(35),
    height: wp(35),
    borderRadius: hp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: hp(3),
  },
});

export default CardItemBox;
