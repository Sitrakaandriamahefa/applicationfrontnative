import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

const Discover = () => {
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const jsonUrl = "https://my.microsoftpersonalcontent.com/personal/8e8f8a773ad6f5ce/_layouts/15/download.aspx?UniqueId=206d448a-edcc-4218-9832-3743ee56b3d5&Translate=false&tempauth=v1e.eyJzaXRlaWQiOiJhMTk4MDY0ZS1jZmI3LTRmODYtYmJlYy0wZWQ2YzBkMjM4MmQiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3MzY1MTY0MDQifQ.11JipvR1LvnAoZSvAZbV7OzJmPRjr4tibrEu8CGRswSVjf2dtJYoFCzIxezQnqw-8D2Zj5SJS_gI_KlBZ5MvlZmLDH8t0VGSooH3YX4G0r4S3o35wxQb3VKNIxSu99iAPFp4Tx9Lcx2ufEB8h5mlTosy0GiWe9QdiNEAxOHwBcFHJbkzdoTwT2si0lkuuXMxUTtLIFsLCVHt5_AFR19rMOfC7fIyj-hBWnvDdEbnkTdgfGAjXbB6T452AzVcpiMRL1u3HHbGfABMVRd1Rmz3r_Qcicbuk2LLvBmvQuxm9V7LzG38QijcIKvAza6Hekrj6KpEWfzrZgzygbWlxr5gh5hWC9PG7gqyDq4-iir5nepI_uAHSTHsOWhxA1eRH6piJVh0lqCCXI_1LTrt3uvLPpWVk0J05oJjS0NIkfOqrhc.x_OuNd6yBCJyr6AEYOsRdTCr6yZaSNS2GAFQhTmX4Tk&ApiVersion=2.0&AVOverride=1";

    axios.get(jsonUrl)
      .then(response => {
        const postData = response.data["1dqqeoo"]; // Accédez au post principal
        const commentsData = postData.comments;  // Accédez aux commentaires
        setPost(postData);       // Stockez les données du post
        setComments(commentsData);  // Stockez les commentaires
      })
      .catch(error => {
        console.error("Error fetching the JSON data", error);
      });
  }, []);

  const handleOpenURL = (url) => {
    if (url) {
      Linking.canOpenURL(url).then(supported => {
        if (supported) {
          Linking.openURL(url); // Ouvre l'URL dans le navigateur ou l'application appropriée
        } else {
          console.error("Don't know how to open URI: " + url);
        }
      });
    } else {
      console.error("URL is undefined or null");
    }
  };

  const renderComment = ({ item }) => (
    <View style={styles.commentItem}>
      <Text style={styles.commentAuthor}>{item.author}</Text>
      <Text style={styles.commentBody}>{item.body}</Text>
      <Text style={styles.commentCreated}>{item.created}</Text>
      <Text style={styles.commentScore}>Score: {item.score}</Text>
    </View>
  );

  if (!post || comments.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Chargement en cours...</Text>
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={styles.postContainer}>
        <Text style={styles.postTitle}>{post.title}</Text>
        <Text style={styles.postContent}>{post.content}</Text>
        <Text style={styles.postCreated}>Posted on: {post.created}</Text>
        <Text style={styles.postScore}>Score: {post.score}</Text>
        {post.url && (
          <TouchableOpacity onPress={() => handleOpenURL(post.url)}>
            <Text style={styles.link}>Ouvrir le post Reddit</Text>
          </TouchableOpacity>
        )}
      </View>

      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item, index) => index.toString()}
        style={styles.commentsList}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  postContainer: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  postTitle: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  postContent: {
    fontSize: 16,
    color: 'black',
    marginTop: 5,
  },
  postCreated: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  postScore: {
    fontSize: 14,
    color: 'gray',
    marginTop: 5,
  },
  link: {
    fontSize: 14,
    color: 'blue',
    marginTop: 5,
    textDecorationLine: 'underline',
  },
  commentItem: {
    backgroundColor: "#e0e0e0",
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  commentAuthor: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
  },
  commentBody: {
    fontSize: 14,
    color: 'black',
    marginTop: 5,
  },
  commentCreated: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  commentScore: {
    fontSize: 12,
    color: 'gray',
    marginTop: 5,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  commentsList: {
    marginTop: 10,
  },
});

export default Discover;