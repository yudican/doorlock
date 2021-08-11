import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../Components/Atoms/Button';
import ProfileImage from '../../Components/Atoms/ProfileImage';
import ProfileItem from '../../Components/Atoms/ProfileItem';
import {launchImageLibrary} from 'react-native-image-picker';
import allActions from '../../Config/Redux/Actions';

const libraryOptions = {
  mediaType: 'photo',
  quality: 1,
};

const AccountScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  const {uploadImage, updateUser} = allActions.profileAction;
  const {logout} = allActions.authAction;
  const {loading, visible, message} = auth;
  const {fullname, email, _uid, profile_photo} = auth.user || {};
  const [profilePhoto, setProfilePhoto] = useState(profile_photo);

  const handleSelectProfile = data => {
    if (data.assets.length > 0) {
      const file = data.assets[0].uri;
      dispatch(uploadImage(file, `${_uid}.jpg`, _uid));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerSection} />
      <Snackbar visible={visible}>{message}</Snackbar>
      <View style={styles.content}>
        <View style={styles.contentBody}>
          <View style={styles.contentProfile}>
            <ProfileImage
              size={30}
              source={{uri: profile_photo}}
              onPress={() =>
                launchImageLibrary(libraryOptions, handleSelectProfile)
              }
            />
            <Text style={styles.contentProfileName}>{fullname}</Text>
            <Text style={styles.contentProfileEmail}>{email}</Text>
          </View>
        </View>

        <View style={{flex: 1, marginTop: hp(3), marginHorizontal: wp(3)}}>
          {/* <ProfileItem label="Edit Profil" iconName="user-edit" /> */}
          <ProfileItem
            label="Edit Kata Sandi"
            iconName="key"
            onPress={() => navigation.navigate('UpdatePassword')}
          />
        </View>

        <View style={{paddingHorizontal: wp(3)}}>
          <Button label={'KELUAR'} onPress={() => dispatch(logout())} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerSection: {
    backgroundColor: '#130f40',
    height: hp(15),
  },
  content: {
    flex: 1,
    backgroundColor: '#f1f2f6',
    borderTopEndRadius: hp(3),
    borderTopStartRadius: hp(3),
    marginTop: -hp(3),
  },
  contentBody: {
    backgroundColor: '#fff',
    borderTopEndRadius: hp(3),
    borderTopStartRadius: hp(3),
    borderBottomColor: '#f1f2f6',
    borderBottomWidth: 1,
  },
  contentProfile: {
    alignItems: 'center',
    marginTop: -hp(6),
    paddingBottom: hp(3),
  },
  contentProfileName: {fontSize: hp(3)},
  contentProfileEmail: {fontSize: hp(2), color: '#636e72'},
  contentActivityInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: hp(2),
  },
  contentStatus: {
    backgroundColor: '#fff',
    paddingTop: hp(1),
    paddingBottom: hp(0.5),
    paddingHorizontal: hp(3),
    marginBottom: hp(2),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contentAccount: {
    backgroundColor: '#fff',
    paddingVertical: hp(1),
    paddingHorizontal: hp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(2),
    borderBottomColor: '#f1f2f6',
    borderBottomWidth: 1,
  },
});

export default AccountScreen;
