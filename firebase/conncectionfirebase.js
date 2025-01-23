// FirebaseConnection.js
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import database from '@react-native-firebase/database';
import firebase from './Firebaseinit';
import FrequencySortComponent from '../triagefonctionnalite/FrequencySortComponent';

const FirebaseConnection = () => {
  const [data, setData] = useState([]); // Données récupérées depuis Firebase
  const [loading, setLoading] = useState(true); // État de chargement

  useEffect(() => {
    // Référence à la racine de la base de données
    const ref = database().ref('/'); // Pointe vers la racine

    // Écouter les données une fois
    ref.once('value')
      .then(snapshot => {
        const allData = snapshot.val();
        if (allData) {
          const formattedData = [];
          // Parcourir toutes les dates
          for (const date in allData) {
            // Parcourir tous les threads pour chaque date
            for (const thread in allData[date]) {
              // Parcourir toutes les entrées dans chaque thread
              for (const entry in allData[date][thread]) {
                formattedData.push({
                  date: date,
                  thread: thread,
                  ...allData[date][thread][entry] // Ajoute frequency et word
                });
              }
            }
          }
          setData(formattedData); // Mettre à jour les données
        } else {
          console.warn('Aucune donnée trouvée dans la base de données.');
        }
        setLoading(false); // Fin du chargement
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
        setLoading(false); // Fin du chargement (même en cas d'erreur)
      });
  }, []);

  // Afficher un indicateur de chargement pendant la récupération des données
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // Passer les données au composant de tri
  return <FrequencySortComponent data={data} />;
};

export default FirebaseConnection;