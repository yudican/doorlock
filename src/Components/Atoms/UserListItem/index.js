import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const UserListItem = ({name, onPressEdit, onPressDelete}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.userName}>{name}</Text>
      <View style={styles.userAction}>
        <FontAwesome5
          name="user-edit"
          style={{marginRight: wp(3)}}
          size={hp(2)}
          onPress={onPressEdit}
        />
        <FontAwesome5
          name="trash-alt"
          color="red"
          size={hp(2)}
          onPress={onPressDelete}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(2),
    paddingHorizontal: wp(3),
    backgroundColor: '#fff',
    borderRadius: hp(1),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  userName: {fontSize: hp(2), fontWeight: 'bold'},
  userAction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export default UserListItem;
