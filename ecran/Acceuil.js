import React from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useEffect, useState } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import axios from 'axios';
import { GestureHandlerRootView } from 'react-native-gesture-handler'; // Import ajouté

const Acceuil = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          'https://my.microsoftpersonalcontent.com/personal/8e8f8a773ad6f5ce/_layouts/15/download.aspx?UniqueId=ffa335ed-da8a-4e0a-8313-a2f2de4e8dd2&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiJhMTk4MDY0ZS1jZmI3LTRmODYtYmJlYy0wZWQ2YzBkMjM4MmQiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MzY0OTc1ODkifQ.NM4N9-OhcZ3GPrUWlNKEV3Htj1-TLRexyOffXVDQIKWNnQCbPeQEBJSR20djL42s3cfYNM98TFuCry-0x4X_Zo5P26HbICkhCpNtGVlIZmA3lmqvDVUCWQj-R0b0o6HjNmUO8GtF0uF4e70IsrOmNMqbDQtMKMbMgZ9QmJAlci17xZqlhk_c0El8ZBopzhcQpk-XEguyFcpMu2J_nzn2FeELKLCMi6BiYDLhGdkMAOy02M8NEkt7rf4ds7E5bp52sudx2Gf_Y2jEXEeObAtQxohlLyjLDa_1Doue-tET5DyqXItsvmPBrMCtv675pxcvkCOpUbv1L9apLJ89l02APbcqwWOs2rmnOG3_Okb-UHGC18UHk2wy1MxA_NzxbM62wxou6W5GvFTf1SD79Fpdpf1P27QgRf_jJ31F9aJzVRI.DGZTHPHAzuCqAbAXW6Gq3G3g7Cv3aT83lFumH0opN58&ApiVersion=2.0&AVOverride=1';
        const response = await axios.get(url);

        // Les données sont disponibles dans response.data
        setData(response.data);
      } catch (err) {
        if (err.response) {
          // Erreur HTTP (4xx, 5xx)
          console.error('Erreur HTTP:', err.response.status, err.response.data);
          setError(`Erreur HTTP: ${err.response.status} - ${JSON.stringify(err.response.data)}`);
        } else if (err.request) {
          // Erreur réseau (pas de réponse du serveur)
          console.error('Erreur réseau:', err.request);
          setError('Erreur réseau : Impossible de se connecter au serveur.');
        } else {
          // Autres erreurs
          console.error('Erreur:', err.message);
          setError(`Erreur : ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'red' }}>{error}</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}> {/* Encapsulation ajoutée */}
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ScrollView>
          <Text>{JSON.stringify(data, null, 2)}</Text>
        </ScrollView>
      </View>
    </GestureHandlerRootView>
  );
};

export default Acceuil;