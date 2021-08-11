import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {View} from 'react-native';
import {Provider} from 'react-redux';
import {Provider as PaperProvider} from 'react-native-paper';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from './src/Config/Redux/store';
import Routes from './src/Config/Routes/index';

const App = () => {
  return (
    <PaperProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <View style={{flex: 1}}>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </View>
        </PersistGate>
      </Provider>
    </PaperProvider>
  );
};

export default App;
