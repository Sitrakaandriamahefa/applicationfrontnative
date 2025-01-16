import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Button, TextInput } from 'react-native';
import CommentForm from './CommentForm';

const ApiContent = ({ data }) => {
  // Vérifie si les données sont disponibles
  if (!data) {
    return <Text style={styles.error}>Aucune donnée disponible</Text>;
  }

  // Extraire les commentaires
  const [comments, setComments] = useState(data["1dejndh"].comments);
  const [editingComment, setEditingComment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Page actuelle
  const [searchTerm, setSearchTerm] = useState(''); // Terme de recherche
  const [filterAuthor, setFilterAuthor] = useState(''); // Filtre par auteur
  const commentsPerPage = 10; // Nombre de commentaires par page

  // Fonction pour ajouter un nouveau commentaire
  const handleAddComment = (newComment) => {
    setComments((prevComments) => [newComment, ...prevComments]);
  };

  // Fonction pour éditer un commentaire
  const handleEditComment = (comment) => {
    setEditingComment(comment);
  };

  // Fonction pour supprimer un commentaire
  const handleDeleteComment = (commentId) => {
    const updatedComments = comments.filter((comment) => comment.id !== commentId);
    setComments(updatedComments);
    console.warn('Commentaire supprimé :', commentId);
  };

  // Fonction pour enregistrer les modifications d'un commentaire
  const handleSaveEdit = (updatedComment) => {
    const updatedComments = comments.map((comment) =>
      comment.id === updatedComment.id ? updatedComment : comment
    );
    setComments(updatedComments);
    setEditingComment(null); // Fermer le formulaire de modification
    console.warn('Commentaire modifié :', updatedComment);
  };

  // Filtrer les commentaires en fonction du terme de recherche et du filtre par auteur
  const filteredComments = comments.filter((comment) => {
    const matchesSearchTerm = comment.body.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAuthor = filterAuthor ? comment.author === filterAuthor : true;
    return matchesSearchTerm && matchesAuthor;
  });

  // Calculer les commentaires à afficher pour la page actuelle
  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = filteredComments.slice(indexOfFirstComment, indexOfLastComment);

  // Fonction pour changer de page
  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredComments.length / commentsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Fonction pour afficher un commentaire
  const renderComment = ({ item }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentAuthor}>{item.author || "Anonyme"}</Text>
      <Text style={styles.commentBody}>{item.body}</Text>
      <Text style={styles.commentDate}>Date : {item.created}</Text>
      <View style={styles.actionsContainer}>
        <Button title="Modifier" onPress={() => handleEditComment(item)} />
        <Button title="Supprimer" onPress={() => handleDeleteComment(item.id)} />
      </View>
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

      {/* Barre de recherche */}
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un commentaire..."
        value={searchTerm}
        onChangeText={setSearchTerm}
      />

      {/* Filtre par auteur */}
      <TextInput
        style={styles.filterInput}
        placeholder="Filtrer par auteur..."
        value={filterAuthor}
        onChangeText={setFilterAuthor}
      />

      <CommentForm onSubmit={handleAddComment} />

      {/* Afficher le formulaire de modification si editingComment n'est pas null */}
      {editingComment && (
        <View style={styles.editFormContainer}>
          <TextInput
            style={styles.input}
            placeholder="Auteur"
            value={editingComment.author}
            onChangeText={(text) =>
              setEditingComment({ ...editingComment, author: text })
            }
          />
          <TextInput
            style={styles.input}
            placeholder="Commentaire"
            value={editingComment.body}
            onChangeText={(text) =>
              setEditingComment({ ...editingComment, body: text })
            }
            multiline
          />
          <Button title="Enregistrer" onPress={() => handleSaveEdit(editingComment)} />
          <Button title="Annuler" onPress={() => setEditingComment(null)} />
        </View>
      )}

      {/* Afficher la liste des commentaires de la page actuelle */}
      <FlatList
        data={currentComments}
        renderItem={renderComment}
        keyExtractor={(item) => item.id}
      />

      {/* Pagination */}
      <View style={styles.paginationContainer}>
        <Button title="Page précédente" onPress={handlePrevPage} disabled={currentPage === 1} />
        <Text style={styles.pageNumber}>Page {currentPage}</Text>
        <Button
          title="Page suivante"
          onPress={handleNextPage}
          disabled={currentPage === Math.ceil(filteredComments.length / commentsPerPage)}
        />
      </View>
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
  searchInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  filterInput: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
  },
  commentContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
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
  editFormContainer: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
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
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  pageNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default ApiContent;