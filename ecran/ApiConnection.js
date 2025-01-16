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
        const response = await axios.get('https://my.microsoftpersonalcontent.com/personal/8e8f8a773ad6f5ce/_layouts/15/download.aspx?UniqueId=206d448a-edcc-4218-9832-3743ee56b3d5&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiJhMTk4MDY0ZS1jZmI3LTRmODYtYmJlYy0wZWQ2YzBkMjM4MmQiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MzcwMTU5NzAifQ.JWPG6hTWZ_QJPhE1YO2ltocQU4oBrePkDfQCKpeO4BcQXuC6NeE8Zm1Llc-CgTCOSLoKf6DeYfX2Z1eRiX-elCRVqcLNdm4rhh1QEuQrAhhEd7u_oJTQTnlFgYbAca_5haTKd5fx54wpPeU15AZ8SFIiYM2KpNzVPLshBndc8_Pqz1bxIW16eX08z-7VJ_adZZb7BnHP-2FcZq_Smt_MviZl8Fezp6uXj_zgA3dl78pQgCrLZ6G_HN7YrgceSZUhNkoYcDYmJUUGUiro7j3gjFvJZ6TLDchMTqDSQboSV2sFjAq8GFwGdO4FSGojvvvwccGQBlHDVoNxoNlVTGkzA7isIx6HcZj6vgC5jv8ZywFvK_Q61Jpk39nhaYpYI8gGttncOvCsbiXVdV5heROpbNIU4KGQqSnVzwifnMbjr7w.v11KxoXr7UttIm58jcUmkSLxf05vtZUtfaFYP-ppMbc&ApiVersion=2.0&AVOverride=1');
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