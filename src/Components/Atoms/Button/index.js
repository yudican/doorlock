import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const Button = ({
  loading,
  label,
  onPress,
  disabled,
  buttonColor = '#43AE1A',
  labelcolor = '#fff',
  borderColor = '#43AE1A',
}) => {
  if (loading) {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            backgroundColor: buttonColor,
            borderWidth: 2.5,
            borderColor,
            opacity: 0.6,
          },
        ]}>
        <ActivityIndicator color={labelcolor} />
      </View>
    );
  }
  if (disabled) {
    return (
      <View
        style={[
          styles.buttonContainer,
          {
            backgroundColor: buttonColor,
            borderWidth: 2.5,
            borderColor,
            opacity: 0.6,
          },
        ]}>
        <Text style={[styles.buttonText, {color: labelcolor}]}>{label}</Text>
      </View>
    );
  }
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.buttonContainer,
          {backgroundColor: buttonColor, borderWidth: 2.5, borderColor},
        ]}>
        <Text style={[styles.buttonText, {color: labelcolor}]}>{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#43AE1A',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: hp(1.5),
    borderRadius: hp(1.5),
    width: '100%',
    marginBottom: hp(1),
    marginTop: hp(1),
  },
  buttonText: {fontSize: hp(2.2), color: '#fff'},
});

export default Button;
