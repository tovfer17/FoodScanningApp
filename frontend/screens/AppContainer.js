import React, { useContext, useEffect } from 'react'

import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import axios from 'axios'

import {DrawerContent} from './DrawerContent'
import MainTabScreen from './MainTabScreen';
import SupportScreen from './SupportScreen';
import SettingScreen from './SettingsScreen';
import BookmarkScreen from './BookmarkScreen';
import LoginScreen from "./LoginScreen";
import { AppContext } from '../provider/ContextProvider';

export default function AppContainer() {
  const Drawer = createDrawerNavigator();

  const context = useContext(AppContext)
  const { token, user, setUser, api } = context

  useEffect(() => {
    if (!!user && user.state !== 'active') {
      axios.get(`http://${api}/user/${user.nickname}/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(res => {
          setUser(res.data)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }, [user])

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
          :
          <LoginScreen/>    
        }
      </NavigationContainer>
    </>
  )
}