import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const CommentForm = ({ onSubmit }) => {
  const [author, setAuthor] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = () => {
    if (!author || !body) {
      alert('Veuillez remplir tous les champs.');
      return;
    }
    const newComment = {
      id: Date.now().toString(), // Génère un ID unique
      author,
      body,
      created: new Date().toISOString(), // Date actuelle
      replies: [],
      replies_count: 0,
      score: 0,
    };
    onSubmit(newComment);
    setAuthor('');
    setBody('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Votre nom"
        value={author}
        onChangeText={setAuthor}
      />
      <TextInput
        style={styles.input}
        placeholder="Votre commentaire"
        value={body}
        onChangeText={setBody}
        multiline
      />
      <Button title="Ajouter un commentaire" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
});

export default CommentForm;