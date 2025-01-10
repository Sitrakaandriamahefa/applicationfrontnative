import React from 'react'
import { View , Text, Image, StyleSheet, Button , TouchableOpacity} from 'react-native'
import LottieView from 'lottie-react-native';


const Dasboard = (props) => {
   console.log(props)
  return (
    <View style= {styles.container}>
 <Image
        style={styles.logo}
        source={require('../asset/image/logo.png')}
        
      />
      <Text style = {styles.texte}>BIENVENUE </Text>
      <LottieView
      style ={styles.animations}
      source={require('../animation/Animation - 1735191121981.json')} autoPlay loop
    />
   <TouchableOpacity style={styles.button} onPress={() =>props.navigation.navigate('Sings')}>
          <Text style = {styles.textbutton}>Continuer</Text>
        </TouchableOpacity>
    </View>
  );
}


const styles = StyleSheet.create({
    texte: {
      fontSize:30,
      justifyContent:'center',
      marginLeft: 130,
      color:'#39d5ff',
      marginTop: -50,
      marginBottom: 40,
      fontWeight: 'bold',
      fontFamily:'arial'
    },
    logo: {
      width: "100%",
      height: 400,
      resizeMode: 'container',
      marginTop:-80

    },
    container:{
        backgroundColor: "#131c37",
        justifyContent:'center,'
    },
    animations : {
        width:"100%",
        height:300,
    },
    button:{
      alignItems: 'center',
      backgroundColor: '#39d5ff',
      padding: 20,
      width: 355,
      marginLeft:28,
      marginTop:40,
      marginBottom:60,
      borderRadius:15,
    },
    textbutton:{
      color:"#131c37",
      fontSize:23,
    }
   
  });
export default Dasboard
