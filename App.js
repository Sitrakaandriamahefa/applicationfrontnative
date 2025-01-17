import React from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dasboard from './ecran/Dasboard';
import Login from './ecran/login';
import Index from './route';
import Sing from './ecran/sing';
import Acceuil from './ecran/Acceuil';
import Discvover from './ecran/Discvover';
import Tableau from './ecran/Tableau'; // Importez Tableau.js

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
          name="Acceuils"
          component={Acceuil}
          options={{
            headerShown: true,
            title: 'Acceuils',
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
          name="Discovers"
          component={Discvover}
          options={{
            headerShown: true,
            title: 'discovers',
            headerStyle: {
              backgroundColor: '#39d5ff',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        {/* Ajoutez Tableau.js à la navigation */}
        <Stack.Screen
          name="Tableau"
          component={Tableau}
          options={{
            headerShown: true,
            title: 'Tableau',
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#131c37',
    justifyContent: 'center', // Correction : virgule enlevée
  },
});

export default App;