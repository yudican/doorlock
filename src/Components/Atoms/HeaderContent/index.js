import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome5';
const HeaderContent = ({title, onPress}) => {
  return (
    <View style={styles.container}>
      <Icon
        name="chevron-left"
        size={hp(3)}
        style={styles.icon}
        onPress={onPress}
      />
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(2),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {position: 'absolute', top: hp(0.5), left: 0, bottom: 0},
  headerTitle: {fontSize: hp(3), fontWeight: 'bold'},
});

export default HeaderContent;
