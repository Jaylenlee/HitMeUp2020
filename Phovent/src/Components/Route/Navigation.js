import {createStackNavigator} from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation';
import EditProfile from '../ProfilePage/EditProfile';
import Profile from '../ProfilePage/Profile';
import Login from '../Login/Login';


const screens = {
    Home: {
        screen: Login
    },
    
    Profile: {
        screen: Profile
    },
    
    /*Home: {
        screen: Login
    },*/

    EditProfile: {
        screen: EditProfile
    }
   
}

const AppStackNavigator = createStackNavigator(screens)

export default createAppContainer(AppStackNavigator);