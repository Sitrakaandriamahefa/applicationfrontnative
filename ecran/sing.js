import React from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { useState } from 'react';
import LottieView from 'lottie-react-native';

import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const BoutonCollab = () => {
  const [output, setOutput] = useState(null); // Pour stocker la réponse de l'API
  const [loading, setLoading] = useState(false); // Pour gérer l'état de chargement

  const handleButtonPress = async () => {
    setLoading(true); // Active l'indicateur de chargement
    try {
      // Envoie une requête POST à l'API Flask
      const response = await axios.post('https://http://127.0.0.1:5000/run-colab');//ajouter ici le lien de l'api flask utiliser
      setOutput(response.data.output); // Stocke la sortie de l'API
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setLoading(false); // Désactive l'indicateur de chargement
    }
  
  };
};

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
                  <TouchableOpacity  style={styles.boutton}  onPress={handleButtonPress}>
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
