import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import Auth from '../../../Pages/Auth';
import Login from '../../../Pages/Auth/Login';
import Register from '../../../Pages/Auth/Register/Register';

const Stack = createStackNavigator();
const AuthStack = ({initialRouteName = 'Login'}) => {
  return (
    <Stack.Navigator initialRouteName={initialRouteName}>
      <Stack.Screen
        name="Auth"
        component={Auth}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Register"
        component={Register}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
