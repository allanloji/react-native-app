import React, { Component } from 'react';
import {AsyncStorage, Dimensions, Image, View} from 'react-native';
import TimerMixin from 'react-timer-mixin';



// The screen's width
const {width, height} = Dimensions.get('window');


class Splash extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.timeoutHandle = setTimeout(()=>{

            this.retrieveProfile();
        }, 5000);
    }

    componentWillUnmount(){
        clearTimeout(this.timeoutHandle);
    }

    retrieveProfile = async () => {
        try {
            const value = await AsyncStorage.getItem('profile');
            if (value !== null) {
                // We have data!!
                this.props.onLogged();
            }else {
                this.props.onNotLogged();
            }
        } catch (error) {
        }
    };



    render(){
        const {viewStyle, partnerStyle, logoStyle} = styles;
        return(
            <View style={viewStyle}>
                <Image style={partnerStyle} source={{uri: 'https://illut.io/languagecast/splash.png'}} />
                <Image style={logoStyle} source={require('../../../assets/splashIcon.png')} />
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
        flex: 1,
        flexDirection: 'column',
        height,
        width,
    },
    partnerStyle: {
        resizeMode: 'stretch',
        width,
        height: height * 0.70
    },
    logoStyle: {
        alignSelf:'center',
        resizeMode: 'center',
        width: width * 0.70,
        height: height * 0.30,
        marginTop: 10

    }
};

export default Splash;
