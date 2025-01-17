import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import LottieView from 'lottie-react-native';
const Sing = (props) => {
  console.log(props)
      const [email, setEmail] = useState('');
        const [isValidEmail, setIsValidEmail] = useState(true); // État pour la validité de l'email
        const [password, setPassword] = useState('');
        const validateEmail = (text) => {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'email
            setEmail(text);
            setIsValidEmail(emailRegex.test(text)); // Met à jour l'état de validité
          };
  return (
   <View>
     <LottieView
          style ={styles.animations}
          source={require('../animation/anim2.json')} autoPlay loop
        />
   <TextInput
           style={[styles.input, !isValidEmail && styles.invalidInput]} // Applique le style rouge si l'email est invalide
           placeholder="Email"
           value={email}
           placeholderTextColor={'#39d5ff'}
           onChangeText={validateEmail} // Valide l'email à chaque changement de texte
           keyboardType="email-address" // Affiche le clavier adapté pour les emails
           autoCapitalize="none" // Ne pas capitaliser les lettres
          
         />
              <TextInput
                 style={styles.input}
                 placeholder="Mot de passe"
                 value={password}

                 placeholderTextColor={'#39d5ff'}
                 onChangeText={text => setPassword(text)} // Met à jour l'état avec le texte saisi
                 secureTextEntry={true} // Masque le texte saisi
               />
                  <TouchableOpacity  style={styles.boutton}  onPress={() =>props.navigation.navigate('Acceuils')}>
                               <Text style = {styles.textbutton}>Se connecter</Text>
                             </TouchableOpacity>

                     <TouchableOpacity  style={styles.boutton}  onPress={() =>props.navigation.navigate('Logins')}>
                                  <Text style = {styles.textbutton}>create compte</Text>
                                </TouchableOpacity>           
   </View>
  )
}

const styles = StyleSheet.create(

    {
      input: {
       
        width: 300,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: -6,
        paddingHorizontal: 10,
        borderRadius:10,
        margin:40,
        marginLeft:65,
        color:"black",
        padding:20,
        shadowColor:"gray",
        shadowOffset:{
          width: 300,
        } ,
        shadowOpacity:0.6,
        shadowRadius:4,
        elevation:33
        
  
      },
      boutton : {
        width: 300,
            borderColor: '#39d5ff',
            borderWidth: 1,
            paddingHorizontal: 70,
            borderRadius:10,
            margin:40,
            marginLeft:65,
            color:"white",
            backgroundColor:"#39d5ff",
            height:60,
            justifyContent:"center",
            textAlign:'center',  
            marginBottom:-5   ,
            shadowColor:"gray",
            shadowOffset:{
              width: 300,
            } ,
            shadowOpacity:0.6,
            shadowRadius:4,
            elevation:10
      
      },
      animations : {
        width:"100%",
        height:300,
    },
    
    },
)
export default Sing
