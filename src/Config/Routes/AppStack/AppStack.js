import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Account from '../../../Pages/Account';
import History from '../../../Pages/History';
import Home from '../../../Pages/Home';
import UserManagementShow from '../../../Pages/UserManagement';
import UserManagementCreate from '../../../Pages/UserManagement/UserManagementCreate';
import CardManagementShow from '../../../Pages/CardManagement';
import CardManagementCreate from '../../../Pages/CardManagement/CardManagementCreate';
import DoorControl from '../../../Pages/Control/DoorControl';
import LampControl from '../../../Pages/Control/LampControl';
import AccountScreen from '../../../Pages/Account';
import UpdatePassword from '../../../Pages/Account/UpdatePassword';

const Stack = createStackNavigator();
const AppStack = ({initialRouteName = 'Home'}) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="UserManagementShow"
        component={UserManagementShow}
        options={({navigation}) => ({
          title: 'Kelola Pengguna',
          headerTitleStyle: {fontWeight: 'bold', color: '#fff'},
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: '#130f40',
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: hp(2),
          },
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={hp(3.5)}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CardManagementShow"
        component={CardManagementShow}
        options={({navigation}) => ({
          title: 'Kelola Kartu',
          headerTitleStyle: {fontWeight: 'bold', color: '#fff'},
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: '#130f40',
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: hp(2),
          },
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={hp(3.5)}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="UserManagementCreate"
        component={UserManagementCreate}
        options={({navigation, route}) => ({
          title: route.params.update ? 'Update Pengguna' : 'Tambah Pengguna',
          headerTitleStyle: {fontWeight: 'bold', color: '#fff'},
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: '#130f40',
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: hp(2),
          },
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={hp(3.5)}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="CardManagementCreate"
        component={CardManagementCreate}
        options={({navigation, route}) => ({
          title: route.params.update ? 'Update Kartu' : 'Tambah Kartu',
          headerTitleStyle: {fontWeight: 'bold', color: '#fff'},
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: '#130f40',
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: hp(2),
          },
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={hp(3.5)}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="DoorControl"
        component={DoorControl}
        options={({navigation, route}) => ({
          title: 'Kontrol Pintu',
          headerTitleStyle: {fontWeight: 'bold', color: '#fff'},
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: '#130f40',
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: hp(2),
          },
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={hp(3.5)}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="LampControl"
        component={LampControl}
        options={({navigation, route}) => ({
          title: 'Kontrol Lampu',
          headerTitleStyle: {fontWeight: 'bold', color: '#fff'},
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: '#130f40',
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: hp(2),
          },
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={hp(3.5)}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="History"
        component={History}
        options={({navigation, route}) => ({
          title: 'Riwayat',
          headerTitleStyle: {fontWeight: 'bold', color: '#fff'},
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: '#130f40',
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: hp(2),
          },
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={hp(3.5)}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="AccountScreen"
        component={AccountScreen}
        options={({navigation, route}) => ({
          title: 'Profile',
          headerTitleStyle: {fontWeight: 'bold', color: '#fff'},
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: '#130f40',
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: hp(2),
          },
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={hp(3.5)}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="UpdatePassword"
        component={UpdatePassword}
        options={({navigation, route}) => ({
          title: 'Update Kata Sandi',
          headerTitleStyle: {fontWeight: 'bold', color: '#fff'},
          headerTitleAlign: 'center',

          headerStyle: {
            backgroundColor: '#130f40',
            borderBottomWidth: 0,
            elevation: 0,
          },
          headerLeftContainerStyle: {
            paddingLeft: hp(2),
          },
          headerLeft: () => (
            <Icon
              name="chevron-left"
              size={hp(3.5)}
              color="#fff"
              onPress={() => {
                navigation.goBack();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default AppStack;
