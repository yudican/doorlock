import React from 'react';
import {ActivityIndicator, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Loader = ({loading = false}) => {
  if (loading) {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          left: 0,
          bottom: 0,
          zIndex: 999,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
          }}>
          <ActivityIndicator size={hp(3)} color="red" />
        </View>
      </View>
    );
  }
  return null;
};

export default Loader;
