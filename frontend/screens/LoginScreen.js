import React, {useEffect, useContext} from 'react'
import { View,  Button, StyleSheet, Image, Platform} from 'react-native';
import { AppContext } from '../provider/ContextProvider';

import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import jwtDecode from 'jwt-decode';


const LoginScreen = ({navigation}) => {
  const context = useContext(AppContext)

  const authorizationEndpoint = 'https://foodscanningapp.us.auth0.com/authorize'; 
  const auth0ClientId = 'h1tCVe2rPsTtOfnZgVVhp6j8f5ZrIZme'
  
  WebBrowser.maybeCompleteAuthSession();
  const useProxy = Platform.select({ web: false, default: true });
  const redirectUri = AuthSession.makeRedirectUri({ useProxy });
  const {setUser, setToken} = context

  const [request, result, promptAsync] = AuthSession.useAuthRequest(
    {
      redirectUri,
      clientId: auth0ClientId,
      // id_token will return a JWT token
      responseType: 'id_token',
      // retrieve the user's profile
      scopes: ['openid', 'profile'],
      extraParams: {
        // ideally, this will be a random value
        nonce: 'nonce',
      },
    },
    { authorizationEndpoint }
  );

  // console.log(`Redirect URL: ${redirectUri}`);

  useEffect(() => {
    // console.log('sign in info - ', result);
    if (result) {
      if (result.error) {
        alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        );
        return;
      }
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded = jwtDecode(jwtToken);
        setToken(jwtToken)
        setUser(decoded)
      }
    }
  }, [result]);

    return (
      <View style={styles.container}>
        <Image style ={styles.image}
          source={require('./../assets/logo.jpg')}
        />
        <Button
            disabled={!request}
            title="Click here to sign in"
            onPress={() => promptAsync({ useProxy })}
            color="#007eff"
          />
      </View>
    );
  };

export default LoginScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'center',
      backgroundColor: 'black',
      padding: 15,
      paddingBottom: 100
    },
    titleText: {
        fontSize: 30,
        fontWeight:'bold',
        textAlign:'center'
    },
    image: {
    flex: 1,
    width: '50%',
    // height: null,
    resizeMode: 'contain'
    }
  });