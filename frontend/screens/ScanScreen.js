import React, {  useState, useEffect, useContext } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import axios from 'axios';
import DetailsScreen from './DetailsScreen'
import { AppContext } from '../provider/ContextProvider';

export default function ScanScreen() {
  const context = useContext(AppContext)
  const [hasPermission, setHasPermission] = React.useState(null); 
  const [scanned, setScanned] = useState(false);

  const[foods, setFoods] = useState(null);

  const { token, api, user } = context

  useEffect(() => {
    // handleBarCodeScanned();
    (async () => {
      try {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === 'granted');
      } catch (error) {
        alert('Cannot access camera.')
        setHasPermission(false)
      }
      
    })();
    
  }, []);

  useEffect(() => {
    if (!!foods) {
      axios.post(`http://${api}/user/${user.username}/history/add`, { foodId: foods.foodId }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          console.log(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [foods])


  const handleBarCodeScanned = (barcode) => {
    setScanned(true);
    // console.log(barcode.data)
    axios.get(`http://${api}/food/${barcode.data}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response =>{
        const allFoods= response.data;
        // console.log(allFoods)
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
      {scanned ? (
        <View
          style={{
            flex: 1,
            marginTop: 15
          }}
        > 
          <DetailsScreen foods={foods}/>
          <Button title="Tap to Scan Again" onPress={() => setScanned(false)}/>
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