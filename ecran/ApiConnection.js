import React, { useEffect } from 'react';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';

const ApiConnection = ({ onSuccess, onError }) => {
  useEffect(() => {
    const fetchData = async () => {
      // Vérifie la connectivité réseau
      const networkState = await NetInfo.fetch();
      if (!networkState.isConnected) {
        console.warn('Erreur réseau : Pas de connexion Internet');
        onError('Pas de connexion Internet');
        return;
      }

      try {
        // Remplace cette URL par le lien direct vers ton fichier JSON sur OneDrive
        const response = await axios.get('https://my.microsoftpersonalcontent.com/personal/8e8f8a773ad6f5ce/_layouts/15/download.aspx?UniqueId=ffa335ed-da8a-4e0a-8313-a2f2de4e8dd2&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiJhMTk4MDY0ZS1jZmI3LTRmODYtYmJlYy0wZWQ2YzBkMjM4MmQiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MzY5MzU5NDYifQ.dbStnugtTTSAlE-wCXStrrxXh17IsFOVxYdyh-kC8QwK1aamfqpiP5CMnA_qhFqUBovkXKxmZXx5T_ncRq8X1fmhAVR-ubV08pJEcfxxzm36bpjvoHuV4snadzFq2b0S6LZivWUYB9kqi57cDsypK1J1cAohzb-MZ42Z8SL0K5e2tFwjbH0b_xmifdoftmmi-7S1nIN13vOJ51l8-LyU7r-r__2flHIT9QScoRbg9p8FEiZgN-Se3hOEHFxI2PxOFTJ-tNGJEMDwfULT7CwC5GVwPYGbzTknZZMnJG-qx58i9h2gC9qu56NtEesuxGryyaySyZhxzCzXcuXcdg_2Dd52urB9SoXb6KcoGrFWH9yoSn2P0JWu2qTdCgQRGGakYA7yfXTPUlEkuwrZYeQ2dS2t2R5HjPTuLQCY-gTdqt4.2Mmsui1cZrhOniRKtdSsNrvcK-k0KWYVWepJglpH-S0&ApiVersion=2.0&AVOverride=1');
        console.warn('API connectée avec succès !');
        onSuccess(response.data); // Transmet les données récupérées
      } catch (error) {
        console.warn('Erreur lors de la connexion à l\'API :', error.message);
        onError(error.message);
      }
    };

    fetchData();
  }, [onSuccess, onError]);

  return null; // Ce composant ne rend rien à l'écran
};

export default ApiConnection;