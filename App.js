// App.js
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { initializeApp } from '@react-native-firebase/app';
import firebaseConfig from './firebase/FirebaseConfig'; // Importe la configuration Firebase
import Dasboard from './ecran/Dasboard';
import Login from './ecran/login';
import Sing from './ecran/sing';
import AffichageConnection from './ecran/AffichageConnection';
import Conncectionfirebase from './firebase/conncectionfirebase';
import { ActivityIndicator, View, Text } from 'react-native';

const Stack = createNativeStackNavigator();

const App = () => {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    // Initialiser Firebase
    initializeApp(firebaseConfig)
      .then(() => {
        console.log('Firebase initialisé avec succès !');
        setFirebaseInitialized(true);
      })
      .catch(error => {
        console.error('Erreur lors de l\'initialisation de Firebase :', error);
      });
  }, []);

  if (!firebaseInitialized) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text>Initialisation de Firebase...</Text>
      </View>
    );
  }

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