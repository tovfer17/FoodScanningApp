import React, {  useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import DetailsScreen from './DetailsScreen'
import Constants from 'expo-constants'
import { AppContext } from '../provider/ContextProvider';
const { manifest } = Constants;

export default function ScanScreen() {
  const context = useContext(AppContext)
  console.log(context)
  const [hasPermission, setHasPermission] = React.useState(null); 
  const [scanned, setScanned] = useState(false);

  const[foods,setFoods]=  useState(null);

   const api = (typeof manifest.packagerOpts === `object`) && manifest.packagerOpts.dev
   ? manifest.debuggerHost.split(`:`).shift().concat(`:3000`)
   : `api.example.com`;

  useEffect(() => {
    // handleBarCodeScanned();
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
      
    })();
    
  }, []);


  const handleBarCodeScanned = (barcode) => {
    setScanned(true);
    console.log(barcode.data)
    axios.get(`http://${api}/food/${barcode.data}`)
      .then(response =>{
        const allFoods= response.data;
        console.log(allFoods)
        setFoods(allFoods);
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