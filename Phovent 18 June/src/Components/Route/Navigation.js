import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import LoadingScreen from "../Loading/LoadingScreen";
import Login from '../Login/Login';
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

const AuthScreens = {
    
    Phovent: {
        screen: Login
    },

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

    Profile: {
        screen: Profile
    },

    EditProfile: {
        screen: EditProfile
    },

    ViewProfile: {
        screen: ViewProfile
    },

    FriendList: {
        screen: FriendListContainer
    },
    
    SearchFriend: {
        screen: SearchFilterContainer
    },

    EventCreate: {
        screen: CreateEventContainer
    },

    Feeds: {
        screen: NewsFeedContainer
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

const AuthStackNavigator = createStackNavigator(AuthScreens)
const AppStackNavigator = createStackNavigator(AppScreens)

export default createAppContainer(
    createSwitchNavigator({
            Loading: LoadingScreen,
            App: AppStackNavigator,
            Auth: AuthStackNavigator
        }, {
            initialRouteName: "Loading"
        }
    )
);