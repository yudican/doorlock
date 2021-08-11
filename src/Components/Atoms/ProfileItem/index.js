import React from 'react';
import {StyleSheet, Text, TouchableHighlight, View} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
const ProfileItem = ({Icon = FontAwesome5, iconName, label, onPress}) => {
  return (
    <TouchableHighlight underlayColor="transparent" onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.containerBody}>
          <Icon name={iconName} size={hp(2)} />
          <Text style={{fontSize: hp(2), paddingLeft: wp(2)}}>{label}</Text>
        </View>
        <FontAwesome5 name="chevron-right" size={hp(2)} />
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingVertical: hp(2),
    paddingHorizontal: hp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomColor: '#f1f2f6',
    borderBottomWidth: 1,
    marginBottom: hp(1),
    borderRadius: hp(2),
  },
  containerBody: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});

export default ProfileItem;
