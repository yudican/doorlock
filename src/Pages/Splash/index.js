import React from 'react';
import {StyleSheet, View, StatusBar, Text, Image} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Splash = () => {
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor={'#fff'} />
      <Image
        source={require('../../Assets/Loader/loader.gif')}
        style={{width: wp(50), height: wp(50)}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default Splash;
