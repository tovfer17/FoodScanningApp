import React from 'react';
import {Image, Text, View} from 'react-native';

const DetailsScreen = (props) => {
  const {foods}=props;

  if (!!foods) {
    return (
      <View style={{padding: 15}}>
        <Text style={{fontSize: 28, fontWeight: 'bold'}}>{foods.name}</Text>
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