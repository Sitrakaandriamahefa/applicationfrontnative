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
        const response = await axios.get('https://my.microsoftpersonalcontent.com/personal/8e8f8a773ad6f5ce/_layouts/15/download.aspx?UniqueId=ffa335ed-da8a-4e0a-8313-a2f2de4e8dd2&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiJhMTk4MDY0ZS1jZmI3LTRmODYtYmJlYy0wZWQ2YzBkMjM4MmQiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MzY5MjkwNTAifQ.qpZb0HXlQQEOi1KH1eIywONVaLYbmBe-K0BcfqNKSGijorSgOEHYg2GB8JECO4Ib8Ymt7mWTna8fiBJjhsbAN1aL4ApnT7bHGrr_ZyrUaQD5-EZ-dmVVtJzVlqMbKQ7298H8VDgld9A_ifS3ku-JyP4StC3ilqhSQz0voyqnn_0iUOjw2aVp8wTSx94Ct3AdmaeUDs6JNMWnIXM9FqNvCn6aMTAamFGlO_e7ivD95yMqk6vmbY-pkevnFQuTuJMvls7AF1aa5Ec9cU9tgmBGcCC63W_byGeLPEoVh4rRKyuvDv-xs_l2k8BjeQ9yowga8jsC9VjoHpNs8Y9FEodhUytiijFQRVZ_hGNfRyldA-QF-ksdrXByW7Q_kglK5SiIOHJnMOGjIqPqwHUKx7oj3sCeag8ujlHjUr8rhdqLBBM.7uoOHiP-cEsdiNEHZ1wsIwHKE3FUraLOcQZaTVN7Ykk&ApiVersion=2.0&AVOverride=1');
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