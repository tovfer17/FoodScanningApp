import React from 'react';
import { View, Text, Button, Stylesheet } from 'react-native';

const DetailsScreen = ({navigation},props) => {

  const displaynutrition =(props)=>{
      const {foods}=props;
         
             
                  return(
                    <Text>
                    {foods &&
                      <blockquote>
                        "{foods && foods.name}"
                        <small>{foods && foods.ingredients }</small>
                      </blockquote>
                    }
                    </Text>
                  )
                
              
            }
          

          
          return(
            <>
              {displaynutrition(props)}
            </>

          )
};

                
          
       

  export default DetailsScreen;

  /*{foods &&
                      <blockquote>
                        "{foods && foods.name}"
                        <small>{foods && foods.ingredients }</small>
                      </blockquote>
                    }*/