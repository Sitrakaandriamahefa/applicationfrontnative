// firebaseInit.js
import firebase from '@react-native-firebase/app';
import firebaseConfig from './FirebaseConfig';

// Initialisez Firebase uniquement s'il n'est pas déjà initialisé
if (!firebase.apps.length) {
  console.log('Initialisation de Firebase...');
  firebase.initializeApp(firebaseConfig);
} else {
  console.log('Firebase est déjà initialisé.');
}

export default firebase;