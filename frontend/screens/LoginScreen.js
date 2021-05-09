import React from 'react';
import { View, Text, Button, StyleSheet, Image} from 'react-native';


const LoginScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Image
          source={require('./../assets/logo.jpg')}
        />
      </View>
    );
  };

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    titleText: {
        fontSize: 30,
        fontWeight:'bold',
        textAlign:'center'
    },
    image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'contain'
    }
  });