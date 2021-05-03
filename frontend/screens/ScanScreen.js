import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ScanScreen = () => {
    return (
      <View style={styles.container}>
        <Text>Scan Screen</Text>
      </View>
    );
};

export default ScanScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center'
    },
  });