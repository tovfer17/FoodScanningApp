import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, FlatList, Image, Modal, TouchableOpacity, Platform, Linking, Pressable, Clipboard} from 'react-native';
import axios from 'axios';
import * as Location from 'expo-location'
import Icon from 'react-native-vector-icons/Ionicons'
import { ActivityIndicator } from 'react-native';
import { AppContext } from '../provider/ContextProvider';

const DetailsScreen = (props) => {
  const {foods}=props;
  const { api, token } = useContext(AppContext)
  const [locations, setLocations] = useState(null)
  const [locationsVisible, setLocationsVisible] = useState(false)

  const findLocations = async (foodId) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission to access location was denied');
      return;
    }
    setLocations(null)
    setLocationsVisible(true)
    let geo = await Location.getCurrentPositionAsync({});
    const {longitude, latitude} = geo.coords
    console.log(geo)
    axios.get(`http://${api}/store/items/${foodId}?lat=${latitude}&long=${longitude}&radius=5`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setLocations(res.data)
    })
    .catch(error => {
      console.log(error)
      setLocations(null)
    })
  }

  const copyToClipboard = (address) => {
    Clipboard.setString(address)
  }

  const getDirections = (geo, label) => {
    const lat = !!geo && !!geo.location ? geo.location.lat : null
    const lng = !!geo && !!geo.location ? geo.location.lng : null
    if (!lat || !lng) {
      alert('Invalid Location')
      return
    }
    const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=', web: 'https://www.google.com/maps/search/40.7804835,+-73.5336054/@40.7804875,-73.5357941,17z' });
    const latLng = `${lat},${lng}`;
    // const label = 'Directions To Food';
    const url = Platform.select({
      ios: `${scheme}${label}@${latLng}`,
      android: `${scheme}${latLng}(${label})`,
      web: scheme
    });

    Linking.openURL(url); 
  }

  const listLocation = (item) => {
    const location = item['item']
    const index = item['index']
    console.log(location)
    if (!!location) {
      return (
        <View style={{display: 'flex', paddingBottom: 30, paddingTop: index > 0 ? 30 : 0, borderColor: '#80808026', borderBottomWidth: 3}}>
          <Text style={{fontSize: 22, fontWeight: 'bold', marginBottom: 3}}>{location.name}</Text>
          <TouchableOpacity style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} onPress={() => copyToClipboard(location.formatted_address)}>
            <Text style={{fontSize: 16, marginBottom: 3, flex: 1, paddingRight: 3}}>{location.formatted_address}</Text>
            <Icon name="copy-outline" color="#333333" size={24}/>
          </TouchableOpacity>
          <Text style={{fontSize: 16, fontWeight: 'bold', marginBottom: 3}}>{location.opening_hours && location.opening_hours.open_now ? 'Open' : 'Closed'}</Text>
          <Pressable style={[styles.button, styles.buttonLocation]} onPress={() => getDirections(location.geometry, location.name)}><Text style={styles.textStyle}>Get Directions</Text></Pressable>
        </View>
      )
    }
    return

  }

  if (!!foods) {
    return (
      <View style={{padding: 15}}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>{foods.name} <Button title="Find Locations" color="#007eff" onPress={() => findLocations(foods.foodId)}/></Text>
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <View style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            {Object.keys(foods.labelNutrients).map(nutrient => {
              return (
                <Text key={nutrient} style={{fontSize: 16}}>
                  <Text style={{fontWeight: 'bold'}}>{nutrient.substr(0, 1).toUpperCase() + nutrient.substr(1)}:</Text> {foods.labelNutrients[nutrient] ?? 0}
                </Text>
              )
            })}
          </View>
          <Image style={{width: 200, height: 200}} source={{uri: foods.photo}}/>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 5, marginTop: 10}}>Ingredients:</Text>
        <Text>{JSON.stringify(foods.ingredients) }</Text>
        <Modal
          animationType="slide"
          transparent={true}
          visible={locationsVisible}
          onRequestClose={() => {
            setLocationsVisible(false)
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {!locations ? 
                <ActivityIndicator size="large" />
                :
                <FlatList style={{padding: 10, marginBottom: 40}} data={locations} renderItem={(item) => listLocation(item)} keyExtractor={(item, index) => item.name + index} />
              }
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setLocationsVisible(false)}
              >
                <Text style={styles.textStyle}>Hide Locations</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    )
  } else {
    return (
      <View>
        <Text>No food scanned.</Text>
      </View>
    )
  }
};

export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center',
    padding: 15
  },
  titleText: {
      fontSize: 20,
      fontWeight:'bold',
      textAlign:'center'
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    marginBottom: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    paddingTop: 20,
    paddingBottom: 20,
    alignItems: "center",
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    height: "90%"
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    marginTop: 40,
    backgroundColor: "#2196F3",
    position: 'absolute',
    bottom: 10
  },
  buttonLocation: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});