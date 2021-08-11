import React from 'react';
import {StyleSheet, Text, View, StatusBar, TextInput} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const InputText = ({
  placeholder,
  onChangeText,
  value,
  name,
  keyboardType,
  secureTextEntry,
  multiline = false,
  maxFontSizeMultiplier = 3,
  numberOfLines = 2,
  error,
  onBlur,
  isError,
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        onChangeText={e => onChangeText({name, val: e})}
        value={value}
        keyboardType={keyboardType}
        placeholderTextColor={'#000'}
        onBlur={() => onBlur(name)}
        style={[
          styles.textInput,
          {textAlignVertical: multiline ? 'top' : 'center'},
        ]}
        multiline={multiline}
        maxFontSizeMultiplier={maxFontSizeMultiplier}
        numberOfLines={numberOfLines}
        underlineColorAndroid="transparent"
      />
      {isError && error && <Text style={styles.textMessage}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    marginBottom: hp(2),
  },
  textInput: {
    backgroundColor: '#ecf0f1',
    paddingVertical: hp(1),
    borderRadius: hp(1),
    paddingHorizontal: wp(3),
    color: '#000',
  },
  textMessage: {fontSize: hp(1.4), color: '#43AE1A', paddingLeft: wp(2)},
});

export default InputText;
