
import React from 'react'
import { View, Text ,TextInput, StyleSheet, Button,TouchableOpacity, Alert , Image} from 'react-native'
import { useState } from 'react';

const Login = (props) => {
  console.log(props)
  const [nom, setNom] = useState('');
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true); // État pour la validité de l'email
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const validateEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Expression régulière pour valider l'email
    setEmail(text);
    setIsValidEmail(emailRegex.test(text)); // Met à jour l'état de validité
  };
  const handleSubmit = () => {
    // Vérifie si les mots de passe correspondent
    if (password === confirmPassword) {
      console.warn('Succès', 'Les mots de passe correspondent !');
      console.warn('Mot de passe soumis :', password);
    } else {
      console.warn('Erreur', 'Les mots de passe ne correspondent pas.');
    }
  };
  return (
    <View style = {styles.container}>
      <Image
              style={styles.logo}
              source={require('../asset/image/logo.png')}
              
            />
            <Text style = {styles.texte}>Create a compte if you don't have</Text>
     <TextInput
       style = {styles.input}
        placeholder="Username "
        value={nom}
        placeholderTextColor={'#39d5ff'}
        onChangeText={text => setNom(text)} // Met à jour l'état avec le texte saisi
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
       <TextInput
        style={styles.input}
        placeholder="Confirmer le mot de passe"
        placeholderTextColor={'#39d5ff'}
        value={confirmPassword}
        onChangeText={text => setConfirmPassword(text)} // Met à jour l'état avec le texte saisi
        secureTextEntry={true} // Masque le texte saisi
        
        
      />
       <TouchableOpacity  style={styles.boutton}  onPress={() =>props.navigation.navigate('Discovers')}>
                <Text style = {styles.textbutton}>Ajouter</Text>
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
      color:"white",
      padding:20
      

    },
    logo: {
      width: "70%",
      height: 250,
      resizeMode: 'container',
      marginLeft: 90,
      marginTop:-20

    },
    invalidInput: {
      borderColor: 'red', // Couleur rouge pour l'input invalide
    },
    errorText: {
      color: 'red',
      marginTop: 4,
    },
    textbutton:{
      color:"131c37",
      fontSize:23,
  },
  container:{
    backgroundColor: "#131c37",
    justifyContent:'center,',
    with:"100%",
    height:"100%"
},
texte: {
  fontSize:25,
  justifyContent:'center',
  marginLeft: 50,
  color:'#39d5ff',
  marginTop: -10,
  marginBottom: 10,
  textAlign:"center"
},
boutton : {
  width: 300,
      borderColor: 'gray',
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

}

}
 
)

export default Login
