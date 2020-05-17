import React from 'react';
import { Platform, Dimensions, Text } from 'react-native';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createAppContainer } from "react-navigation";
import { createStackNavigator, HeaderBackButton } from "react-navigation-stack";
import { Feather, AntDesign } from '@expo/vector-icons';
import Header from '../pages/shared/HeaderDashboard';
import HeaderPage from '../pages/shared/HeaderPage';

import DashboardScreen from '../pages/Dashboard';
import SideBar from '../components/SideBar';
import MyProfileScreen from '../pages/MyProfile';
import ChangePasswordScreen from '../pages/ChangePassword';
import EditProfileScreen from '../pages/EditProfile';
import ConfigurationFormScreen from '../pages/Form';
import Logout from '../pages/Logout';
import AddConfigFormScreen from '../pages/components/configForm/AddConfigForm';
import EditConfigFormScreen from '../pages/components/configForm/editConfigForm';

import {
    Dashboard,
    MyProfile
} from "../pages/screens";



//const WIDTH = Dimensions.get('window').width;

const DashboardNavigator = createStackNavigator({
    Dashboard: { 
        screen: DashboardScreen,
        navigationOptions: ({ navigation }) => { // di panggil ulang
            return{
            headerTitle:() => <Header navigation = {navigation} headtitle = 'Dashboard OSS'/>, //untuk manggil header navigation header.js tapi masih gagal
            }
        }
    },
});



const MyProfileNavigator = createStackNavigator({
    MyProfile: { 
        screen: MyProfileScreen,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle:() => <HeaderPage navigation = {navigation} title = "My Profile"/>,
            }
        }
    },
}, {
    navigationOptions: {
        headerStyle : {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const ChangePasswordNavigator = createStackNavigator({
    ChangePassword: { 
        screen: ChangePasswordScreen,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle:() => <HeaderPage navigation = {navigation} title = "Change Password"/>,
            }
        }
    },
}, {
    navigationOptions: {
        headerStyle : {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
});

const ConfigurationFormNavigator = createStackNavigator({
    ConfigurationForm: { 
        screen: ConfigurationFormScreen,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle:() => <HeaderPage navigation = {navigation} title = "Configuration Form"/>,
           }
        }
    },
    AddConfigForm:{
        screen : AddConfigFormScreen,
    },
    EditConfigForm:{
        screen : EditConfigFormScreen,
    },
}, {
    navigationOptions: {
        headerStyle : {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
}, 
);
const LogoutNavigator = createStackNavigator({
    Logout: { 
        screen: Logout,
        navigationOptions: ({ navigation }) => {
            return{
                headerTitle:() => null,
           }
        }
    },
}, {
    navigationOptions: {
        headerStyle : {
            backgroundColor: '#512DA8'
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            color: '#fff'
        }
    }
}, 
);

const DrawerNavigator = createDrawerNavigator(
    {
        Dashboard: {
            screen: DashboardNavigator,
            navigationOptions: {
                title: "Dashboard",
                drawerIcon: ({tintColor}) => <Feather name="home" size={16} color={tintColor} />
            }
        },

        MyProfile: {
            screen: MyProfileNavigator,
            navigationOptions: {
                title: "My Profile",
                drawerIcon: ({tintColor}) => <Feather name="user" size={16} color={tintColor} />
            }
        },

        ChangePassword: {
            screen: ChangePasswordNavigator,
            navigationOptions: {
                title: "Change Password",
                drawerIcon: ({tintColor}) => <Feather name="lock" size={16} color={tintColor} />
            }
        },

        Form: {
            screen: ConfigurationFormNavigator,
            navigationOptions: {
                title: "Configuration Form",
                drawerIcon: ({tintColor}) => <Feather name="edit" size={16} color={tintColor} />
            }
        },
        Logout: {
            screen: LogoutNavigator,
            navigationOptions: {
                title: "Logout",
                drawerIcon: ({tintColor}) => <AntDesign name="logout" size={16} color={tintColor} />
            }
        }
    },
    {
        contentComponent: props => <SideBar {...props}/>
    }
);

export default createAppContainer (DrawerNavigator);