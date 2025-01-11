import React from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useEffect, useState } from 'react';
import { View , ActivityIndicator,Text} from 'react-native';
import axios from 'axios';
const Acceuil = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = "https://my.microsoftpersonalcontent.com/personal/8e8f8a773ad6f5ce/_layouts/15/download.aspx?UniqueId=206d448a-edcc-4218-9832-3743ee56b3d5&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiJhMTk4MDY0ZS1jZmI3LTRmODYtYmJlYy0wZWQ2YzBkMjM4MmQiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MzY1MTY0MDQifQ.11JipvR1LvnAoZSvAZbV7OzJmPRjr4tibrEu8CGRswSVjf2dtJYoFCzIxezQnqw-8D2Zj5SJS_gI_KlBZ5MvlZmLDH8t0VGSooH3YX4G0r4S3o35wxQb3VKNIxSu99iAPFp4Tx9Lcx2ufEB8h5mlTosy0GiWe9QdiNEAxOHwBcFHJbkzdoTwT2si0lkuuXMxUTtLIFsLCVHt5_AFR19rMOfC7fIyj-hBWnvDdEbnkTdgfGAjXbB6T452AzVcpiMRL1u3HHbGfABMVRd1Rmz3r_Qcicbuk2LLvBmvQuxm9V7LzG38QijcIKvAza6Hekrj6KpEWfzrZgzygbWlxr5gh5hWC9PG7gqyDq4-iir5nepI_uAHSTHsOWhxA1eRH6piJVh0lqCCXI_1LTrt3uvLPpWVk0J05oJjS0NIkfOqrhc.x_OuNd6yBCJyr6AEYOsRdTCr6yZaSNS2GAFQhTmX4Tk&ApiVersion=2.0&AVOverride=1";
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
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
          <Text>{JSON.stringify(data, null, 2)}</Text>
          
          
        </View>
      );
}

export default Acceuil
