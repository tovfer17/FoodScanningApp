import React, {useState, useEffect} from 'react';
import * as AuthSession from 'expo-auth-session';
import jwtDecode from 'jwt-decode';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Button, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {DrawerContent} from './screens/DrawerContent'

import MainTabScreen from './screens/MainTabScreen';
import SupportScreen from './screens/SupportScreen';
import SettingScreen from './screens/SettingsScreen';
import BookmarkScreen from './screens/BookmarkScreen';
import { proc } from 'react-native-reanimated';
import Auth0 from 'react-native-auth0';

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const Drawer = createDrawerNavigator();

const authorizationEndpoint = 'https://foodscanningapp.us.auth0.com/authorize'
const auth0ClientId = 'h1tCVe2rPsTtOfnZgVVhp6j8f5ZrIZme'//process.env.AUTH0_CLIENT_ID

const useProxy = Platform.select({ web: false, default: true });
const redirectUri = AuthSession.makeRedirectUri({ useProxy });

//const auth0 = new Auth0({ domain: 'foodscanningapp.us.auth0.com', clientId: 'h1tCVe2rPsTtOfnZgVVhp6j8f5ZrIZme' });

// auth0
//     .webAuth
//     .authorize({scope: 'openid profile email'})
//     .then(credentials =>
//       // Successfully authenticated
//       // Store the accessToken
//       this.setState({ accessToken: credentials.accessToken })
//     )
//     .catch(error => console.log(error));

// auth0
//     .webAuth
//     .clearSession({})
//     .then(success => {
//         Alert.alert(
//             'Logged out!'
//         );
//         this.setState({ accessToken: null });
//     })
//     .catch(error => {
//         console.log('Log out cancelled');
//     });

// class Auth0LoginContainer extends React.Component {
// _loginWithAuth0 = async () => {
//   const redirectUrl = AuthSession.getRedirectUrl();
//   let authUrl = `${auth0Domain}/authorize` + toQueryString({
//       client_id: auth0ClientId,
//       response_type: 'token',
//       scope: 'openid profile email',
//       redirect_uri: redirectUrl,
//   });
//   console.log(`Redirect URL (add this to Auth0): ${redirectUrl}`);
//   console.log(`AuthURL is:  ${authUrl}`);
//   const result = await AuthSession.startAsync({
//       authUrl: authUrl
//   });

//   if (result.type === 'success') {
//       console.log(result);
//       // let token = result.params.access_token;
//       // this.props.setToken(token);
//       // this.props.navigation.navigate("Next Screen");
//       this.handleResponse(response.params);
//   }
// };

// handleResponse = (response) => {
//   if (response.error) {
//     Alert('Authentication error', response.error_description || 'something went wrong');
//     return;
//   }

//   // Retrieve the JWT token and decode it
//   const jwtToken = response.id_token;
//   const decoded = jwtDecode(jwtToken);

//   const { name } = decoded;
//   this.setState({ name });
// };

// render() {
//   const { name } = this.state;

//   return (
//     <View style={styles.container}>
//       {
//         name ?
//         <Text style={styles.title}>You are logged in, {name}!</Text> :
//         <Button title="Log in with Auth0" onPress={this.login} />
//       }
//     </View>
//   );
// }

// }

const App = () => {
  const [name, setName] = useState(null);

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

  console.log(`Redirect URL: ${redirectUri}`);

  useEffect(() => {
    if (result) {
      if (result.error) {
        Alert.alert(
          'Authentication error',
          result.params.error_description || 'something went wrong'
        );
        return;
      }
      if (result.type === 'success') {
        // Retrieve the JWT token and decode it
        const jwtToken = result.params.id_token;
        const decoded = jwtDecode(jwtToken);

        const { name } = decoded;
        setName(name);
      }
    }
  }, [result]);

  return (
    <>
    <View>
      {name ? (
        <>
          <Text>You are logged in, {name}!</Text>
          <Button title="Log out" onPress={() => setName(null)} />
        </>
      ) : (
        <Button
          disabled={!request}
          title="Log in with Auth0"
          onPress={() => promptAsync({ useProxy })}
        />
      )}
    </View>
    <NavigationContainer>
      {/* <Auth0LoginContainer> */}
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        </Drawer.Navigator>
      {/* </Auth0LoginContainer> */}
    </NavigationContainer>
    </>
  )
}

export default App;