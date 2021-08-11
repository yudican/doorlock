import React, {useEffect, useState} from 'react';
import {ScrollView, StatusBar, StyleSheet, Text, View} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {useDispatch, useSelector} from 'react-redux';
import CardItemBox from '../../Components/Atoms/CardItemBox';
import ProfileImage from '../../Components/Atoms/ProfileImage';
import allActions from '../../Config/Redux/Actions';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {setIsRegistration} = allActions.cardManagementAction;
  const {getLightControl, getDoorControl} = allActions.controlAction;
  const {auth, control} = useSelector(state => state);
  const {fullname, role, profile_photo} = auth.user || {};

  const {isLocked, isLightOn} = control;

  useEffect(() => {
    dispatch(setIsRegistration(false));
    dispatch(getLightControl());
    dispatch(getDoorControl());
  }, []);

  console.log(auth.user);

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <StatusBar backgroundColor={'#130f40'} />
        <View style={styles.headerContainer}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.headerContentTitle}>Selamat Datang</Text>
              <Text style={styles.headerContentSubTitle}>{fullname}</Text>
            </View>
            <ProfileImage source={{uri: profile_photo}} />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.cardContent}>
            <CardItemBox
              name={isLocked ? 'door-open' : 'door-closed'}
              label="Kontrol Pintu"
              Icon={FontAwesome5}
              iconColor={'#2c3e50'}
              onPress={() => navigation.navigate('DoorControl')}
            />
            <CardItemBox
              name="lightbulb"
              label="Kontrol Lampu"
              iconColor={isLightOn ? '#fdcb6e' : '#000'}
              Icon={FontAwesome5}
              onPress={() => navigation.navigate('LampControl')}
            />

            {role === 'admin' && (
              <CardItemBox
                name="addusergroup"
                label="Data Pengguna"
                Icon={AntDesign}
                onPress={() => navigation.navigate('UserManagementShow')}
              />
            )}
            {role === 'admin' && (
              <CardItemBox
                name="id-card"
                label="Data Kartu"
                iconColor={'#e67e22'}
                onPress={() => navigation.navigate('CardManagementShow')}
              />
            )}

            <CardItemBox
              name="back-in-time"
              label="Riwayat"
              Icon={Entypo}
              iconColor={'#4834d4'}
              onPress={() => navigation.navigate('History')}
            />
            <CardItemBox
              name="user-cog"
              onPress={() => navigation.navigate('AccountScreen')}
              label="Pengaturan"
              Icon={FontAwesome5}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    backgroundColor: '#130f40',
    height: hp(25),
  },
  headerContent: {
    marginTop: hp(5),
    paddingHorizontal: wp(3),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerContentTitle: {fontSize: hp(2.2), color: '#fff'},
  headerContentSubTitle: {fontSize: hp(3.5), fontWeight: 'bold', color: '#fff'},
  contentContainer: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    borderTopLeftRadius: hp(2),
    borderTopRightRadius: hp(2),
    marginTop: -hp(4),
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: wp(3),
    paddingTop: hp(2),
    flexWrap: 'wrap',
    marginBottom: hp(2),
  },
});

export default Home;
