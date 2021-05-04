import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailsScreen';
import ScanScreen from './ScanScreen';
import ProfileScreen from './ProfileScreen';


const HomeStack = createStackNavigator();
const DetailsStack = createStackNavigator();
const ProfileStack = createStackNavigator();
const SettingsStack = createStackNavigator();

const Tab = createMaterialBottomTabNavigator();

const MainTabScreen = () => (
    <Tab.Navigator
      initialRouteName="Home"
      activeColor="#fff"
      barStyle={{ backgroundColor: 'tomato' }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarColor: '#009387',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Scan"
        component={DetailsStackScreen}
        options={{
          tabBarLabel: 'Scan',
          tabBarColor: '#1f65ff',
          tabBarIcon: ({ color }) => (
            <Icon name="scan-circle-outline" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStackScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarColor: '#694fad',
          tabBarIcon: ({ color }) => (
            <Icon name="ios-person" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsStackScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarColor: '#d02860',
          tabBarIcon: ({ color }) => (
            <Icon name="settings-outline" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => (
    <HomeStack.Navigator screenOptions = {{
      headerStyle: {
        backgroundColor: '#009387'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight:'bold',
      }
    }}>
      <HomeStack.Screen name="Home" component={HomeScreen} options = {{
        title: 'Home', 
        headerLeft: () => (
          <Icon.Button name= "ios-menu" size={25}
          backgroundColor= '#009387' onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }} />
    </HomeStack.Navigator>
  );
  
  const DetailsStackScreen = ({navigation}) => (
    <DetailsStack.Navigator screenOptions = {{
      headerStyle: {
        backgroundColor: '#1f65ff'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight:'bold'
      }
    }}>
      <DetailsStack.Screen name="Scan" component={ScanScreen} options = {{
         headerLeft: () => (
          <Icon.Button name= "ios-menu" size={25}
          backgroundColor= '#1f65ff' onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }} />
    </DetailsStack.Navigator>
  );
  
  const ProfileStackScreen = ({navigation}) => (
    <ProfileStack.Navigator screenOptions = {{
      headerStyle: {
        backgroundColor: '#694fad'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight:'bold'
      }
    }}>
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options = {{
         headerLeft: () => (
          <Icon.Button name= "ios-menu" size={25}
          backgroundColor= '#694fad' onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }} />
    </ProfileStack.Navigator>
  );

  const SettingsStackScreen = ({navigation}) => (
    <SettingsStack.Navigator screenOptions = {{
      headerStyle: {
        backgroundColor: '#d02860'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight:'bold'
      }
    }}>
      <SettingsStack.Screen name="Settings" component={DetailsScreen} options = {{
         headerLeft: () => (
          <Icon.Button name= "ios-menu" size={25}
          backgroundColor= '#d02860' onPress={() => navigation.openDrawer()}></Icon.Button>
        )
      }} />
    </SettingsStack.Navigator>
  );