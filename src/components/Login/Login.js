import React, { Component } from 'react';
import { Button, Dimensions , Image, View} from 'react-native';
import { AsyncStorage } from "react-native"
import {LoginButton} from "./common/LoginButton";



// The screen's width
const {width, height} = Dimensions.get('window');


class Login extends Component {
    constructor(props){
        super(props);
    }

    componentWillMount() {
        this.retrieveProfile();
    }

    async logIn() {
        try {
            const {
                type,
                token,
                expires,
                permissions,
                declinedPermissions,
            } = await Expo.Facebook.logInWithReadPermissionsAsync('2268745020060406', {
                permissions: ['public_profile'],
            });
            if (type === 'success') {
                // Get the user's name using Facebook's Graph API
                this.saveToken(JSON.stringify(token));
                const response = await fetch(`https://graph.facebook.com/me?access_token=${token}&fields=id,name,birthday,
                email,location, gender,hometown, picture.type(large)`);
                const profile = await response.json();
                this.saveProfile(JSON.stringify(profile));

            }
        } catch ({ message }) {
            alert(`Facebook Login Error: ${message}`);
        }
    }


    saveProfile(profile){
        AsyncStorage.setItem('profile', profile);
        console.log("saves");
        this.props.onPress();
    }

    saveToken(token){
        AsyncStorage.setItem('token', token);
        console.log("saves token");
    }

     retrieveProfile = async () => {
        try {
            const value = await AsyncStorage.getItem('profile');
            if (value !== null) {
                this.props.onPress();
            }else {
                console.log("no");
            }
        } catch (error) {
        }
    };




    render(){
        const {viewStyle, logoStyle, buttonContainerStyle} = styles;
        return(
            <View style={viewStyle}>
                <Image style={logoStyle} source={require('../../../assets/splashIcon.png')} />
                    <LoginButton text={'Continuar con Facebook'} color={'#4267B2'} fontColor={'#fff'} onPress={this.logIn.bind(this)}/>
                {/*<LoginButton text={'Continuar usando Google'} color={'#cf3e30'} fontColor={'#fff'}/>
                <LoginButton text={'Continuar con tu correo electronico'} color={'#fff'} fontColor={'#000'}/>*/}

            </View>
        );
    }
}

const styles = {
  viewStyle: {
      backgroundColor: '#f1f1f1',
      flex: 1,
      flexDirection:'column',
      alignItems: 'center',
      justifyContent:'center',
      height,
      width,
  },
    logoStyle: {
        alignSelf: 'center',
        resizeMode: 'center',
        width: width * 0.70,
        height: 300,
    },
    buttonContainerStyle:{
        height: height-300,
        alignItems: 'center',
    }
};

export default Login;
