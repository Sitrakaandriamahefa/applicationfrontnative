import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import ApiConnection from './ApiConnection';
import ApiContent from './ApiContent';

const AffichageConnection = () => {
  const [apiData, setApiData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSuccess = (data) => {
    setApiData(data);
    setError(null);
    setLoading(false);
  };

  const handleError = (errorMessage) => {
    setError(errorMessage);
    setApiData(null);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion à l'API YouTube</Text>
      <ApiConnection onSuccess={handleSuccess} onError={handleError}  setLoading={setLoading}/>
      {loading && <ActivityIndicator size="large" color="#0000ff" />}
      {error && <Text style={styles.error}>Erreur : {error}</Text>}
      {apiData && <Text style={styles.success}>Données récupérées avec succès !</Text>}
      {apiData && <ApiContent data={apiData} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  success: {
    color: 'green',
    marginTop: 10,
  },
});

export default AffichageConnection;