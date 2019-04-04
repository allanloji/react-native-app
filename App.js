import React from 'react';
import { View, Image } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from "react-navigation";
import { Font } from  'expo';
import Feed from "./src/components/Feed/Feed";
import Events from "./src/components/Events/Events";
import Chatbot from "./src/components/Chatbot/Chatbot";
import Store from "./src/components/Store/Store";
import Login from "./src/components/Login/Login";
import Profile from "./src/components/Profile/Profile";
import Splash from "./src/components/Splash/Splash";

class FeedScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
               <Feed onPress={() => this.props.navigation.navigate("Login")}/>
            </View>
        );
    }
}

class EventsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Events/>
            </View>
        );
    }
}

class ChatBotScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
               <Chatbot/>
            </View>
        );
    }
}

class StoreScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Store/>
            </View>
        );
    }
}

class ProfileScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Profile onPress={() => this.props.navigation.navigate("Login")}/>
            </View>
        );
    }
}

class LoginScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
                <Login onPress={() => this.props.navigation.navigate("Main")}/>
            </View>
        );
    }
}

class SplashScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center' }}>
               <Splash  onNotLogged={() => this.props.navigation.navigate("Login")} onLogged={()=> this.props.navigation.navigate("Main")}/>
            </View>
        );
    }
}



const AppNavigator = createStackNavigator({
    Splash: {
            screen: SplashScreen,
        },
    Login: {
      screen: LoginScreen,
    },
    Main: {
        screen: createBottomTabNavigator(
            {
                Home: FeedScreen,
                Eventos: EventsScreen,
                ChatBot: ChatBotScreen,
                Tienda: StoreScreen,
                Perfil: ProfileScreen,

            },
            {
                defaultNavigationOptions: ({ navigation }) => ({
                    tabBarIcon: ({ focused, horizontal }) => {
                        const iconStyle= {
                            width: 40,
                            height: 40,
                            resizeMode: 'contain'
                        };
                        const { routeName } = navigation.state;
                        let icon = <Image style={iconStyle} source={require('./assets/barIcons/chatbot1.png')} />;
                        if (routeName === 'Home') {
                            if(focused){
                                icon = <Image style={iconStyle} source={require('./assets/barIcons/home2.png')} />;
                            }else{
                                icon = <Image style={iconStyle} source={require('./assets/barIcons/home1.png')} />;
                            }
                        } else if (routeName === 'Eventos') {
                            if(focused){
                                icon = <Image style={iconStyle} source={require('./assets/barIcons/events2.png')} />;
                            }else{
                                icon = <Image style={iconStyle} source={require('./assets/barIcons/events1.png')} />;
                            }
                        }else if (routeName === 'ChatBot') {
                            if(focused){
                                icon = <Image style={iconStyle} source={require('./assets/barIcons/chatbot2.png')} />;
                            }else{
                                icon = <Image style={iconStyle} source={require('./assets/barIcons/chatbot1.png')} />;
                            }
                        }else if (routeName === 'Tienda') {
                            if(focused){
                                icon = <Image style={iconStyle} source={require('./assets/barIcons/store2.png')} />;
                            }else{
                                icon = <Image style={iconStyle} source={require('./assets/barIcons/store1.png')} />;
                            }
                        }
                        else if (routeName === 'Perfil') {
                            if(focused){
                                icon = <Image style={iconStyle} source={require('./assets/barIcons/profile2.png')} />;
                            }else{
                                icon = <Image style={iconStyle} source={require('./assets/barIcons/profile1.png')} />;
                            }
                        }
                        // You can return any component that you like here! We usually use an
                        // icon component from react-native-vector-icons
                        return icon;
                    },
                }),
                tabBarOptions: {
                    activeTintColor: '#636363',
                    inactiveTintColor: '#636363',
                    style:{
                        backgroundColor: '#d1d1d1',
                        height: 80,
                        fontFamily: 'montserrat-alternates-bold',
                    }
                },
            }
        )
    }
},
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false,
        }
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    componentWillMount() {
        Font.loadAsync({
            'montserrat-alternates-bold': require('./assets/fonts/MontserratAlternates-Bold.ttf'),
            'montserrat-alternates-light': require('./assets/fonts/MontserratAlternates-Light.ttf'),
        });
    }

    render(): React.ReactNode {
        return <AppContainer/>;
    }
};