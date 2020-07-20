/*
import * as React from 'react';
import { Button, View, useWindowDimensions } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { ProfileScreen, NewsFeedScreen, CreateEventScreen, FriendListScreen, SearchUserScreen,
         SignOutScreen } from '../Screens';
import SideBar from '../GlobalStyles/SideBar';

const DrawerNavigator = createDrawerNavigator();

export default class HomeScreenDrawer extends React.Component {
    render() {
      return (
        <NavigationContainer>
          <DrawerNavigator.Navigator
            drawerContent={props => <SideBar {...props} />}
            hideStatusBar
            drawerContentOptions={{
                activeBackgroundColor: 'rgba(212, 118, 207, 0.2)',
                activeTintColor: '#53115B',
                contentContainerStyle: {
                    marginTop: 16,
                    marginHorizontal: 8
                },
                itemStyle: {
                    borderRadius: 4
                }
            }}
          >
            <DrawerNavigator.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    drawerIcon: ({ tintColor }) => <Feather name="user" size={16} color={tintColor} />
                }}
            />
            <DrawerNavigator.Screen
                name="NewsFeed"
                component={NewsFeedScreen}
                options={{
                    drawerIcon: ({ tintColor }) => <Feather name="book-open" size={16} color={tintColor} />
                }}
            />
            <DrawerNavigator.Screen
                name="Event"
                component={CreateEventScreen}
                options={{
                    drawerIcon: ({ tintColor }) => <Feather name="globe" size={16} color={tintColor} />
                }}
            />
            <DrawerNavigator.Screen
                name="Friends"
                component={FriendListScreen}
                options={{
                    drawerIcon: ({ tintColor }) => <Feather name="users" size={16} color={tintColor} />
                }}
            />
            <DrawerNavigator.Screen
                name="Search User"
                component={SearchUserScreen}
                options={{
                    drawerIcon: ({ tintColor }) => <Feather name="search" size={16} color={tintColor} />
                }}
            />
            <DrawerNavigator.Screen
                name="Sign-Out"
                component={SignOutScreen}
                options={{
                    drawerIcon: ({ tintColor }) => <Feather name="log-out" size={16} color={tintColor} />
                }}
            />
          </DrawerNavigator.Navigator>
        </NavigationContainer>
      );
    }
}
*/