import React from 'react';
import { View, Text, Button, StyleSheet} from 'react-native';

const HomeScreen = ({navigation}) => {
    return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Welcome to the Food Scanning App. Press the Scan
         button below to scan whatever food item you'd like to know more about.</Text>
      </View>
    );
  };

export default HomeScreen;

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