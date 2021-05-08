import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

const LoginScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
          <Button 
          title="Click Here"
          onPress={() => navigation.navigate("HomeScreen")}
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
    }
  });