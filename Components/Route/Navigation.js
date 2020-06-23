import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoadingScreen from "../Loading/LoadingScreen";
import LoginForm from '../Login/LoginForm';
import RegisterForm from '../Login/RegisterForm';
import EditProfile from '../ProfilePage/EditProfile';
import Profile from '../ProfilePage/Profile';
import ViewProfile from '../ProfilePage/ViewProfile';
import HomeScreen from '../Home/HomeScreen';
import FriendListContainer from '../Friend/FriendListContainer';
import SearchFilterContainer from '../Friend/SearchFilterContainer';
import CreateEventContainer from '../Event/CreateEventContainer';
import NewsFeedContainer from '../Feeds/NewsFeedContainer' ;
import PPSelectionContainer from '../Event/PPSelectionContainer';
import PrivateInviteContainer from '../Event/PrivateInviteContainer';
import PublicInviteContainer from '../Event/PublicInviteContainer';
import SplashContainer from '../Loading/SplashContainer';
import {createBottomTabNavigator} from "react-navigation-tabs";
import {Ionicons} from "@expo/vector-icons";

const AuthScreens = {

    Login: {
        screen: LoginForm
    },

    Register: {
        screen: RegisterForm
    },
}

const AppScreens = {

    HomeScreen: {
        screen: HomeScreen
    },
}

const ProfileScreens = {
    Profile: {
        screen: Profile
    },

    EditProfile: {
        screen: EditProfile
    },
}

const FriendScreens = {
    FriendList: {
        screen: FriendListContainer
    },
    
    ViewProfile: {
        screen: ViewProfile
    },
    
    SearchFriend: {
        screen: SearchFilterContainer
    },
}

const EventScreens = {
    EventCreate: {
        screen: CreateEventContainer
    },

    PP: {
        screen: PPSelectionContainer
    },

    Private: {
        screen: PrivateInviteContainer
    },

    Public: {
        screen: PublicInviteContainer
    }
}

const FeedScreens = {
    Feeds: {
        screen: NewsFeedContainer
    },
}

const AuthStackNavigator = createStackNavigator(AuthScreens)
const ProfileStackNavigator = createStackNavigator(ProfileScreens)
const FriendStackNavigator = createStackNavigator(FriendScreens)
const EventStackNavigator = createStackNavigator(EventScreens)
const FeedStackNavigator = createStackNavigator(FeedScreens)

const AppTabNavigator = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
    },
    
    Profile: {
        screen: ProfileStackNavigator,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="md-contact" size={24} color={tintColor}></Ionicons>
        }
    },

    Friend: {
        screen: FriendStackNavigator,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="md-people" size={24} color={tintColor}></Ionicons>
        }
    },

    Event: {
        screen: EventStackNavigator,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-bookmarks" size={24} color={tintColor}></Ionicons>
        }
    },

    Feed: {
        screen: FeedStackNavigator,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor}></Ionicons>
        }
    },
})

//export default AppTabNavigator;
export default createAppContainer(
    createSwitchNavigator({
            Loading: LoadingScreen,
            Splash: SplashContainer,
            Auth: AuthStackNavigator,
            App: AppTabNavigator,
        }, {
            initialRouteName: "Splash"
        }
    )
);