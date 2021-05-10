import axios from 'axios';
import { View, Text, Button, StyleSheet} from 'react-native';
import React, {  useState, useEffect , useCallback} from 'react';

const HomeScreen = ({navigation},props) => {

  const displaynutrition =useCallback((props)=>{
    const {foods}=props;
    let [locations, setResponseData] = useState('');
    
      axios.get(`http://${api}/store/${props.name}`)
      .then(response =>{
        const alllocation= location;
        console.log(alllocation)
        setResponseData(alllocation);
      })
      .catch((error) => {
        console.log(error)
    })
        .then((response) => {
          setResponseData(location)
        })
        .catch((error) => {
          console.log(error)
        })
  }, [])
      useEffect(() => {
        displaynutrition()
      }, [displaynutrition])


           return(
                                       
    <View style={styles.container}>
            <Text style={styles.titleText}>Welcome to the Food Scanning App. Press the Scan
            button below to scan whatever food item you'd like to know more about.</Text>
            <Text>
              {foods}
            </Text>

           <button type='button' onClick={fetchData}>Click for Data</button>
            
          </View>
        )
          return(
            <>
              {displaynutrition(props)}
            </>

          )
              
        
    /*return (
      <View style={styles.container}>
        <Text style={styles.titleText}>Welcome to the Food Scanning App. Press the Scan
         button below to scan whatever food item you'd like to know more about.</Text>
      </View>
      
    );*/
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