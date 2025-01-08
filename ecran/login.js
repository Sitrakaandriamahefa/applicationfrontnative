// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, } from 'react-native';
// import CheckBox from '@react-native-community/checkbox';


// const Login = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [termsAccepted, setTermsAccepted] = useState(false);
//   const [passwordStrength, setPasswordStrength] = useState('');

//   const validateEmail = (email) => {
//     const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return re.test(String(email).toLowerCase());
//   };

//   const checkPasswordStrength = (password) => {
//     if (password.length < 6) {
//       setPasswordStrength('Faible');
//     } else if (password.length < 10) {
//       setPasswordStrength('Moyen');
//     } else {
//       setPasswordStrength('Fort');
//     }
//   };

  
//   const handleSubmit = () => {
//     if (!name || !email || !password || !confirmPassword) {
//       Alert.alert('Erreur', 'Tous les champs doivent être remplis.');
//       return;
//     }
  
//       if (!validateEmail(email)) {
//         Alert.alert('Erreur', 'Veuillez entrer un email valide.');
//         return;
//       }
  
//       if (password !== confirmPassword) {
//         Alert.alert('Erreur', 'Les mots de passe ne correspondent pas.');
//         return;
//       }
//       if (!termsAccepted) {
//         Alert.alert('Erreur', 'Vous devez accepter les conditions d\'utilisation.');
//         return;
//       }
  
//       Alert.alert('Succès', 'Inscription réussie !');
//     };  

  
//   return (
//     <View >
//     <Text >Nom :</Text>
//     <TextInput
      
//       value={name}
//       onChangeText={setName}
//     />

//     <Text >Email :</Text>
//     <TextInput
     
//       value={email}
//       onChangeText={setEmail}
//       keyboardType="email-address"
//     />

//     <Text >Mot de passe :</Text>
//     <TextInput
   
//       value={password}
//       onChangeText={(text) => {
//         setPassword(text);
//         checkPasswordStrength(text);
//       }}
//       secureTextEntry
//     />
//     <Text >{passwordStrength}</Text>

//     <Text >Confirmer le mot de passe :</Text>
//     <TextInput
     
//       value={confirmPassword}
//       onChangeText={setConfirmPassword}
//       secureTextEntry
//     />

//     <View >
//       <CheckBox
//         value={termsAccepted}
//         onValueChange={setTermsAccepted}
//       />
//       <Text >Accepter les conditions d'utilisation</Text>
//     </View>

//     <TouchableOpacity  onPress={handleSubmit}>
//       <Text >Envoyer</Text>
//     </TouchableOpacity>
//   </View>
  
// )
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#fff',
//   },
//   label: {
//     marginBottom: 5,
//     fontSize: 16,
//   },
//   input: {
//     height: 40,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     marginBottom: 20,
//     paddingHorizontal: 10,
//   },
//   strength: {
//     marginBottom: 10,
//     color: 'red',
//   },
//   checkboxContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   button: {
//     backgroundColor: '#39d5ff',
//     padding: 15,
//   }
// }
// )
// }



// export default Login
import React from 'react'
import { View, Text } from 'react-native'

const login = () => {
  return (
    <View>
      <Text>salama lesy</Text>
    </View>
  )
}

export default login
