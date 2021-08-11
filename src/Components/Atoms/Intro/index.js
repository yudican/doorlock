import React from 'react';
import {StyleSheet, Text, Image, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Intro = ({description, source}) => {
  return (
    <View style={styles.introContainer}>
      <Image source={source} style={styles.introImage} />

      <Text style={styles.introText}>{description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  introContainer: {
    flex: 1,
    alignItems: 'center',
  },
  introImage: {
    height: hp(5.2) * 3,
    width: wp(11) * 3,
  },
  introText: {
    paddingHorizontal: wp(5),
    textAlign: 'center',
    paddingTop: hp(3),
    fontSize: hp(2),
  },
});

export default Intro;
