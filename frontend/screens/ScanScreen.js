import React, {  useState, useEffect } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import DetailsScreen from './DetailsScreen'

export default function ScanScreen() {
  const [hasPermission, setHasPermission] = React.useState(null); 
  const [scanned, setScanned] = useState(false);

   const[foods,getFoods]=  useState(null);



  useEffect(() => {
    handleBarCodeScanned();
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      
    })();
    
  }, []);


  const handleBarCodeScanned = (dataa) => {
    setScanned(true);
      axios
        .get('https://localhost:3000/food/',{
          params: {
            ID: dataa
          }
        })
        .then(response =>{
          const allFoods= setResponseData(response.data);
          getFoods(allFoods);
        })
        .catch((error) => {
          console.log(error)
      })
      }


  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "flex-end"
      }}
    >
       <DetailsScreen foods={foods}/>
      {scanned ? (
   
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "gray"
          }}
        >
          
          <Button
            title={"Tap to Scan Again"}
            onPress={() => setScanned(false)}
          />
         
        </View>
      ) : (
        <BarCodeScanner
          onBarCodeScanned={handleBarCodeScanned}
          style={StyleSheet.absoluteFillObject}
        />
      
      )}
      
      
    </View>

  );
}

 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});