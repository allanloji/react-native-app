import React, { Component } from 'react';
import {AsyncStorage, Dimensions , Image, FlatList, Text, View} from 'react-native';
import Feed from "../Feed/Feed";
import {Header} from "../common/Header";
import {LogoutButton} from "./common/LogoutButton";

// The screen's width
const {width, height} = Dimensions.get('window');

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {profile: {}, token: ""}
    }
    componentWillMount(){
        this.retrieveProfile().then((profile) => {
            this.setState({profile: profile});
        });



    }

    retrieveProfile = async () => {
        try {
            const value = await AsyncStorage.getItem('profile');
            if (value !== null) {
                // We have data!!
                const profileObj = JSON.parse(value);
                //this.getInfo(profileObj.id);
                return profileObj;
            }else {
                console.log("no");
            }
        } catch (error) {
            console.log(error);
        }
    };

    logout(){
        AsyncStorage.removeItem('profile');
        this.props.onPress();
    }



    render() {
        const {viewStyle, imageStyle, textStyle,sectionTitleStyle, lcIconStyle} = styles;
        let profileIMG;
        if (this.state.profile.picture === undefined){
            profileIMG = <Text>Cargado</Text>
        }else {
            profileIMG = <Image style={imageStyle} source={{uri: this.state.profile.picture.data.url}}/>;
            console.log(this.state.profile);
        }

        return (
            <View style={viewStyle}>
                <Header color={'#cf3e30'}/>
                {profileIMG}
                <Text style={sectionTitleStyle}>Nombre</Text>
                <Text style={textStyle}>{this.state.profile.name}</Text>
                <LogoutButton onPress={this.logout.bind(this)}/>

            </View>
        );
    }
}

const styles = {
    viewStyle: {
        backgroundColor: '#f1f1f1',
        height,
        width
    },
    imageStyle: {
        alignSelf: "center",
        borderRadius: 60,
        marginTop: 10,
        width: 120,
        height: 120,
    },
    textStyle: {
        fontFamily: 'montserrat-alternates-light',
        fontSize: 15,
        marginLeft: 10,
        marginBottom: 100,

    },
    sectionTitleStyle: {
        color: '#8e8e8e',
        fontFamily: 'montserrat-alternates-light',
        fontSize: 15,
        marginVertical: 20,
        marginLeft: 10
    },
    lcIconStyle: {
        alignSelf:'center',
        resizeMode: 'center',
        width: width * 0.70,
        height: height * 0.30,
    }

};

export default Profile;