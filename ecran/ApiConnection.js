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
        const response = await axios.get('https://my.microsoftpersonalcontent.com/personal/8e8f8a773ad6f5ce/_layouts/15/download.aspx?UniqueId=1d23e8db-043c-47de-8002-223a11630da1&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiJhMTk4MDY0ZS1jZmI3LTRmODYtYmJlYy0wZWQ2YzBkMjM4MmQiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MzcxMDc1NTIifQ.1i80dmUqNtmuJSzJPvAAJvfyaJnHQ2cYJY9dlqRPXdjt8e__LvW02xX4EG-w9Wn6Tog3MEk431_tGGL9bd7JCHr8lkTQgtSvYwW_zosXnYZNmHZLLsXpJJ7ni0aRfUVPvk_eCRHTi-Gr69wQCjMfTmoC5WKVOyo0pEaItylaxuaC00-T3fUMJCaxi6wMvbOSPpcYtTC2Lf3OxYmtICSZtAxhRqIxz0h4SkRzm_Wd9zEoXzPEvOIzWamJurmM4OkSCyucz9i2dVOcUsxOMt0uBWVVKyIJTVZ9WD0eezT7PkepZ-lajSmhdgBwR7Ot62Lb2mv5V3bwrTdHGy9yLBfT0lzmJ-GGpwEWUVieNIIwxtI_oSB7gf8F4i9wFGvcn7uVxU_poJQU3rbcFLuNtSapf6E-Wr1fBIFOk4c913qE5lU.3OHwxu6K8lfRT-yg_Va4TzXMJGV47h7Rtv3dPu6UXKM&ApiVersion=2.0&AVOverride=1');
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