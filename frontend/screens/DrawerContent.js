import React from 'react';
import {View, StyleSheet} from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Text,
    Drawer,
    TouchableRipple,
    Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons'

export function DrawerContent(props){

    const [isDarkTheme, setIsDarkTheme] = React.useState(false);

    const toggleTheme = () => {
        setIsDarkTheme(!isDarkTheme);
    }

    return(
        <View style={{flex:1}}>
            <DrawerContentScrollView {...props}>
                <View style = {styles.drawerContent}>
                    <View style = {styles.userInfoSection}>
                        <View style = {{flexDirection:'row', marginTop: 15}}>
                            <Avatar.Image
                                source={{
                                    uri: 'https://img-17.ccm2.net/D6U8BTHt725j955FrEJc2ELUq9o=/2048x/317e4774e98c48e8a7c26cbcd5651a26/ccm-faq/Incognito_Chrome_0.jpg'
                                }}
                                size={50}
                            />
                            <View style = {{marginLeft: 15, flexDirection: 'column'}}>
                                <Title style = {styles.title}>John Doe</Title>
                                <Caption style = {styles.caption}>@who-dis</Caption>
                            </View>
                        </View>

                        <View style = {styles.row}>
                            <View style = {styles.section}>
                                <Paragraph style = {styles.paragraph, styles.caption}>80</Paragraph>
                                <Caption style = {styles.caption}>Following</Caption>
                            </View>
                            <View style = {styles.section}>
                                <Paragraph style = {styles.paragraph, styles.caption}>120</Paragraph>
                                <Caption style = {styles.caption}>Followers</Caption>
                            </View>
                        </View>
                    </View>

                    <Drawer.Section style={styles.drawerSection}>
                        <DrawerItem
                        icon = {({color, size}) => (
                            <Icon
                            name="home-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Home"
                        onPress={() => {props.navigation.navigate('Home')}}
                    />
                    <DrawerItem
                        icon = {({color, size}) => (
                            <Icon
                            name="body-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Profile"
                        onPress={() => {props.navigation.navigate('Profile')}}
                    />
                    <DrawerItem
                        icon = {({color, size}) => (
                            <Icon
                            name="bookmark-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Bookmarks"
                        onPress={() => {props.navigation.navigate('BookmarkScreen')}}
                    />
                    <DrawerItem
                        icon = {({color, size}) => (
                            <Icon
                            name="settings-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Settings"
                        onPress={() => {props.navigation.navigate('SettingsScreen')}}
                    />
                    <DrawerItem
                        icon = {({color, size}) => (
                            <Icon
                            name="call-outline"
                            color={color}
                            size={size}
                            />
                        )}
                        label="Support"
                        onPress={() => {props.navigation.navigate('SupportScreen')}}
                    />
                    </Drawer.Section>
                    <Drawer.Section title="Presferences">
                        <TouchableRipple onPress = {() => {toggleTheme()}}>
                            <View style={styles.preference}>
                                <Text>Dark Theme</Text>
                                <View pointerEvents = "none">
                                    <Switch value = {isDarkTheme}/>
                                </View>
                            </View>
                        </TouchableRipple>
                    </Drawer.Section>
                </View>
            </DrawerContentScrollView>
            <Drawer.Section style = {styles.bottomDrawerSection}>
                <DrawerItem
                    icon = {({color, size}) => (
                        <Icon
                        name="exit-outline"
                        color={color}
                        size={size}
                        />
                    )}
                    label="Sign Out"
                    onPress={() => {}}
                />
            </Drawer.Section>
        </View>
    )
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });