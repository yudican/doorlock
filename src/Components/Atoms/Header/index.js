import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const Header = ({title}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    height: hp(7),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#f5f6fa',
    borderBottomWidth: 2,
  },
  headerTitle: {fontSize: hp(2.2), fontWeight: 'bold'},
});

export default Header;
