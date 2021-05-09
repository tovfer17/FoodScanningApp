import React, {useState, useEffect, useContext} from 'react'

import * as AuthSession from 'expo-auth-session';
import * as WebBrowser from 'expo-web-browser';
import jwtDecode from 'jwt-decode';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, StatusBar, Button, Platform } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import {DrawerContent} from './DrawerContent'

import MainTabScreen from './MainTabScreen';
import SupportScreen from './SupportScreen';
import SettingScreen from './SettingsScreen';
import BookmarkScreen from './BookmarkScreen';
import LoginScreen from "./LoginScreen";
import { proc } from 'react-native-reanimated';
import { AppContext } from '../provider/ContextProvider';

export default function AppContainer() {
  const context = useContext(AppContext)

  const Drawer = createDrawerNavigator();

  const authorizationEndpoint = 'https://foodscanningapp.us.auth0.com/authorize'; 
  const auth0ClientId = 'h1tCVe2rPsTtOfnZgVVhp6j8f5ZrIZme'
  
  WebBrowser.maybeCompleteAuthSession();
  const useProxy = Platform.select({ web: false, default: true });
  const redirectUri = AuthSession.makeRedirectUri({ useProxy });

  const {token, setToken, user, setUser} = context

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
      <NavigationContainer>
        { !!token ?
          <Drawer.Navigator drawerContent={props => <DrawerContent {...props}/>}>
            <Drawer.Screen name="HomeDrawer" component={MainTabScreen} />
            <Drawer.Screen name="SupportScreen" component={SupportScreen} />
            <Drawer.Screen name="SettingsScreen" component={SettingScreen} />
            <Drawer.Screen name="BookmarkScreen" component={BookmarkScreen} />
          </Drawer.Navigator>
          :<LoginScreen/>    
      }
      </NavigationContainer>
      {/* <View style={!token ? {flex: 1, justifyContent: 'center'} : null}>
        {!user && 
          <Button
            disabled={!request}
            title="Log in with Auth0"
            onPress={() => promptAsync({ useProxy })}
          />
        }
      </View> */}
    </>
  )
}