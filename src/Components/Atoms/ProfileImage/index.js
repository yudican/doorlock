import React from 'react';
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

const ProfileImage = ({
  source = {
    uri: 'https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png',
  },
  style = {},
  size = 15,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[
          styles.container,
          style,
          {width: wp(size), height: wp(size), borderRadius: wp(size / 2)},
        ]}>
        <View
          style={[
            styles.profileCard,
            {
              width: wp(size - 2),
              height: wp(size - 2),
              maxWidth: wp(size - 2),
              maxHeight: wp(size - 2),
              borderRadius: wp((size - 2) / 2),
            },
          ]}>
          <Image source={source} style={styles.profileImage} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

ProfileImage.defaultProps = {
  source: {
    uri: 'https://cdn2.iconfinder.com/data/icons/avatars-99/62/avatar-370-456322-512.png',
  },
};

const styles = StyleSheet.create({
  container: {
    width: wp(15),
    height: wp(15),
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(7.5),
  },
  profileCard: {
    width: wp(13),
    height: wp(13),
    maxWidth: wp(13),
    maxHeight: wp(13),
    backgroundColor: '#fff',
    borderRadius: wp(6.5),
    borderColor: '#3742fa',
    borderWidth: 0.5,
  },
  profileImage: {
    width: '100%',
    height: '100%',
    borderRadius: wp(15),
  },
});

export default ProfileImage;
