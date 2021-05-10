import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { RefreshControl, ScrollView, View, Text, Button, StyleSheet, FlatList, Image} from 'react-native';
import { AppContext } from '../provider/ContextProvider';

const HomeScreen = ({navigation}) => {
  const [history, setHistory] = useState()
  const { api, user, token } = useContext(AppContext)
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    axios.get(`http://${api}/user/${user.username}/history`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => {
      setHistory(res.data)
    })
    .catch(error => {
      console.log(error)
    })
    .finally(() => {
      setTimeout(() => setRefreshing(false), 500)
    })
  }
  const listItem = (item) => {
    const food = item['item']
    const index = item['index']
    if (!!food) {
      return (
        <View style={{borderColor: '#80808026', borderBottomWidth: 2, paddingBottom: 20, paddingTop: index > 0 ? 20 : 0}}>
          <Text style={{fontSize: 28, fontWeight: 'bold'}}>{food.name}</Text>
          <View style={{display: 'flex', flexDirection: 'row'}}>
            <View style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
              {Object.keys(food.labelNutrients).map(nutrient => {
                return (
                  <Text key={nutrient} style={{fontSize: 16}}>
                    <Text style={{fontWeight: 'bold'}}>{nutrient.substr(0, 1).toUpperCase() + nutrient.substr(1)}:</Text> {food.labelNutrients[nutrient] ?? 0}
                  </Text>
                )
              })}
            </View>
            <Image style={{width: 200, height: 200}} source={{uri: food.photo}}/>
          </View>
          <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 5, marginTop: 10}}>Ingredients:</Text>
          <Text>{JSON.stringify(food.ingredients) }</Text>
        </View>
      )
    }
    return
  }
  useEffect(() => {
    if (!history) onRefresh()
    
    const focusListener = navigation.addListener('focus', () => {
      onRefresh()
    });

    return focusListener
  }, [navigation])

    return (
      <View style={styles.container}>
        {!history || history.length < 1 ?
          <Text style={styles.titleText}>Nom nom nom... start scanning your food to keep track of what you eat!</Text>
          :
          <FlatList
            data={history}
            renderItem={(item, index) => listItem(item)}
            keyExtractor={(item, index) => item.name + index}
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      </View>
    );
  };

export default HomeScreen;

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
    }
  });