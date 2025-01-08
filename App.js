import React from 'react'
import { View ,StyleSheet } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dasboard from './ecran/Dasboard';
import Login from './ecran/login';
import Index from './route';
import Myboutton from './boutton/myboutton';


const Stack = createNativeStackNavigator();
const App = () => {
  return (
  
    
      <NavigationContainer>
      
      <Stack.Navigator  screenOptions={{
    headerShown: false
  }} initialRouteName="dasboard">
    
        <Stack.Screen name="dasboard" component={Dasboard} />
        <Stack.Screen name="Logins" component={Login} /> 
       
       
      </Stack.Navigator>
    </NavigationContainer>
  
  )
}

const styles = StyleSheet.create({
 

 
    container:{
        backgroundColor: "#131c37",
        justifyContent:'center,'
    }
  });
export default App