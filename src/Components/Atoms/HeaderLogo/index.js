import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const HeaderLogo = ({source}) => {
  return (
    <View style={styles.container}>
      <Image source={source} style={styles.imageLogo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '30%',
    paddingHorizontal: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -hp(4),
  },
  imageLogo: {
    height: hp(9),
    width: wp(43),
  },
});

export default HeaderLogo;
