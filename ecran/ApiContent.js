import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import CommentForm from './CommentForm';
import { useState } from 'react';

const ApiContent = ({ data }) => {
  // Vérifie si les données sont disponibles
  if (!data) {
    return <Text style={styles.error}>Aucune donnée disponible</Text>;
  }

  // Extraire les commentaires
  const [comments, setComments] = useState(data["1dejndh"].comments);

  const handleAddComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  // Afficher un commentaire
  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentAuthor}>{item.author || "Anonyme"}</Text>
      <Text style={styles.commentBody}>{item.body}</Text>
      <Text style={styles.commentDate}>Date : {item.created}</Text>
      {item.replies && item.replies.length > 0 && (
        <View style={styles.repliesContainer}>
          <Text style={styles.repliesHeader}>Réponses :</Text>
          {item.replies.map((reply) => (
            <View key={reply.id} style={styles.replyContainer}>
              <Text style={styles.replyAuthor}>{reply.author || "Anonyme"}</Text>
              <Text style={styles.replyBody}>{reply.body}</Text>
              <Text style={styles.replyDate}>Date : {reply.created}</Text>
            </View>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Commentaires</Text>
      <CommentForm onSubmit={handleAddComment} />
      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  commentContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  commentAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  commentBody: {
    fontSize: 14,
    marginBottom: 10,
  },
  commentDate: {
    fontSize: 12,
    color: '#666',
  },
  repliesContainer: {
    marginTop: 10,
    paddingLeft: 10,
    borderLeftWidth: 2,
    borderLeftColor: '#ccc',
  },
  repliesHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  replyContainer: {
    marginBottom: 10,
  },
  replyAuthor: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  replyBody: {
    fontSize: 12,
    marginBottom: 5,
  },
  replyDate: {
    fontSize: 10,
    color: '#666',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ApiContent;