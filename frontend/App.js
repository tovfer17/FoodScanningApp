import React, {useState, useEffect} from 'react';
import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
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

const App = () => {
  
  const Drawer = createDrawerNavigator();
  
  const authorizationEndpoint = 'https://foodscanningapp.us.auth0.com/authorize'; 
  const auth0ClientId = 'h1tCVe2rPsTtOfnZgVVhp6j8f5ZrIZme'
  
  WebBrowser.maybeCompleteAuthSession();
  const useProxy = Platform.select({ web: false, default: true });
  const redirectUri = AuthSession.makeRedirectUri({ useProxy });
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

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
    console.log('sign in info - ', result);
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
        setToken(jwtToken)
        setUser(decoded)
      }
    }
  }, [result]);

  return (
    <>
    <View>
      {user ? (
        <>
          <Text>You are logged in, {user.name}!</Text>
          <Button title="Log out" onPress={() => setUser(null)} />
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
        <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
          <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
          <Drawer.Screen name="SupportScreen" component={SupportScreen} />
          <Drawer.Screen name="SettingsScreen" component={SettingScreen} />
          <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
        </Drawer.Navigator>
    </NavigationContainer>
    </>
  )
}

export default App;