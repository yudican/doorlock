import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View, StatusBar, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Button from '../../Components/Atoms/Button';
import HeaderLogo from '../../Components/Atoms/HeaderLogo';
import IntroSlider from '../../Components/Molecules/IntroSlider';

const Auth = () => {
  const navigation = useNavigation();
  const data = [
    {
      source: require('../../Assets/Img/gift-one.png'),
      description:
        'lorem upsum dolor sit upmnet lorem upsum dolor sit upmnet lorem upsum dolor sit upmnet lorem upsum dolor sit upmnet',
    },
    {
      source: require('../../Assets/Img/gift-two.png'),
      description:
        'lorem upsum dolor sit upmnet lorem upsum dolor sit upmnet lorem upsum dolor sit upmnet lorem upsum dolor sit upmnet',
    },
  ];
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={'#fff'} />
      <HeaderLogo source={require('../../Assets/Logo/logo.jpeg')} />
      <View style={styles.contentContainer}>
        <View style={styles.introContainer}>
          <IntroSlider data={data} />
        </View>
        <Button label="MASUK" onPress={() => navigation.navigate('Login')} />
        <Button
          label="DAFTAR"
          buttonColor="#fff"
          labelcolor="#43AE1A"
          onPress={() => navigation.navigate('Register')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#fff',
    height: '30%',
    paddingHorizontal: wp(3),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -hp(4),
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    borderTopStartRadius: hp(4),
    borderTopEndRadius: hp(4),
    marginTop: -hp(4),
    paddingHorizontal: wp(3),
    paddingVertical: hp(3),
  },
  imageLogo: {
    height: hp(8),
    width: wp(43),
  },
  introContainer: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp(4),
  },
  authButton: {
    flex: 1,
    alignItems: 'center',
    paddingTop: hp(4),
    justifyContent: 'flex-end',
  },
});

export default Auth;
