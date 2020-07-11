import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from "react-navigation-tabs";
import {Ionicons} from "@expo/vector-icons";
/*Screens*/
import LoadingScreen from "../Loading/LoadingScreen";
import LoginForm from '../Login/LoginForm';
import RegisterForm from '../Login/RegisterForm';
import EditProfile from '../ProfilePage/EditProfile';
import Profile from '../ProfilePage/Profile';
import FriendListContainer from '../Friend/FriendListContainer';
import SearchFilterContainer from '../Friend/SearchFilterContainer';
import CreateEventContainer from '../Event/CreateEventContainer';
import NewsFeedContainer from '../Feeds/NewsFeedContainer' ;
import PrivateInviteContainer from '../Event/PrivateInviteContainer';
import PublicInviteContainer from '../Event/PublicInviteContainer';
import FriendRequest from '../Notification/FriendRequest';
import EventInvite from '../Notification/EventInvite';
import SplashContainer from '../Loading/SplashContainer';
import ViewEvent from '../Feeds/ViewEvent';
import ViewProfileRequest from '../Notification/ViewProfileRequest';
import ViewProfileDelete from '../Friend/ViewProfileDelete';
import ViewProfileAdd from '../Friend/ViewProfileAdd';
import ViewEventInvite from '../Notification/ViewEventInvite';
import EditEvent from '../Feeds/EditEvent';
import ViewAttendance from '../Feeds/ViewAttendance';
import ViewInviteAttendance from '../Notification/ViewInviteAttendance';

const AuthScreens = {

    Login: {
        screen: LoginForm,
        navigationOptions: {
            header: null,
        }
    },

    Register: {
        screen: RegisterForm,
        navigationOptions: {
            header: null,
        }
    },
}

const ProfileScreens = {
    Profile: {
        screen: Profile,
        navigationOptions: {
            header: null,
        }
    },

    EditProfile: {
        screen: EditProfile,
        navigationOptions: {
            header: null,
        }
    },
}

const FriendScreens = {
    FriendList: {
        screen: FriendListContainer,
        navigationOptions: {
            header: null,
        }
    },
    
    ViewProfileDelete: {
        screen: ViewProfileDelete,
        navigationOptions: {
            header: null,
        }
    },
    
    SearchFriend: {
        screen: SearchFilterContainer,
        navigationOptions: {
            header: null,
        }
    },

    ViewProfileAdd: {
        screen: ViewProfileAdd,
        navigationOptions: {
            header: null,
        }
    },
}

const EventScreens = {
    EventCreate: {
        screen: CreateEventContainer,
        navigationOptions: {
            header: null,
        }
    },

    Private: {
        screen: PrivateInviteContainer,
        navigationOptions: {
            header: null,
        }
    },

    Public: {
        screen: PublicInviteContainer,
        navigationOptions: {
            header: null,
        }
    },
}

const FeedScreens = {
    Feeds: {
        screen: NewsFeedContainer,
        navigationOptions: {
            header: null,
        }
    },

    View: {
        screen: ViewEvent,
        navigationOptions: {
            header: null,
        }
    },

    Edit: {
        screen: EditEvent,
        navigationOptions: {
            header: null,
        }
    },

    Attendance: {
        screen: ViewAttendance,
        navigationOptions: {
            header: null,
        }
    }
}

const NotificationScreens = {
    EventInvite: {
        screen: EventInvite,
        navigationOptions: {
            header: null,
        }
    },

    ViewEventInvite: {
        screen: ViewEventInvite,
        navigationOptions: {
            header: null,
        }
    },
    
    FriendRequest: {
        screen: FriendRequest,
        navigationOptions: {
            header: null,
        }
    },

    ViewProfileRequest: {
        screen: ViewProfileRequest,
        navigationOptions: {
            header: null,
        }
    },

    ViewInviteAttendance : {
        screen: ViewInviteAttendance,
        navigationOptions: {
            header: null,
        }
    },
}

const AuthStackNavigator = createStackNavigator(AuthScreens)
const ProfileStackNavigator = createStackNavigator(ProfileScreens)
const FriendStackNavigator = createStackNavigator(FriendScreens)
const EventStackNavigator = createStackNavigator(EventScreens)
const FeedStackNavigator = createStackNavigator(FeedScreens)
const NotificationStackNavigator = createStackNavigator(NotificationScreens)

const AppTabNavigator = createBottomTabNavigator({
    Feed: {
        screen: FeedStackNavigator,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-home" size={24} color={tintColor}></Ionicons>,
        }
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

    Notification: {
        screen: NotificationStackNavigator,
        navigationOptions: {
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-notifications" size={24} color={tintColor}></Ionicons>
        }
    },
})

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