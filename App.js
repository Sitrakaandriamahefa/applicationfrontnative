// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dasboard from './ecran/Dasboard';
import Login from './ecran/login';
import Sing from './ecran/sing';
import AffichageConnection from './ecran/AffichageConnection';
import Conncectionfirebase from './firebase/conncectionfirebase';
import { ActivityIndicator, View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="dasboard"
      >
        <Stack.Screen name="dasboard" component={Dasboard} />
        <Stack.Screen
          name="Logins"
          component={Login}
          options={{
            headerShown: true,
            title: 'create compte',
            headerStyle: {
              backgroundColor: '#39d5ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="Sings"
          component={Sing}
          options={{
            headerShown: true,
            title: 'connecter',
            headerStyle: {
              backgroundColor: '#39d5ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="DataView"
          component={AffichageConnection}
          options={{
            headerShown: true,
            title: 'DataView',
            headerStyle: {
              backgroundColor: '#39d5ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Stack.Screen
          name="firebase"
          component={Conncectionfirebase}
          options={{
            headerShown: true,
            title: 'firebase',
            headerStyle: {
              backgroundColor: '#39d5ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default App;