import React from 'react';
import {Dimensions,Image, Linking, Text,TouchableOpacity , View} from "react-native";

// The screen's width
const {width, height} = Dimensions.get('window');

const LogoutButton = ({onPress}) => {
    const {containerStyle, textStyle} = styles;


    return(
        <TouchableOpacity onPress={() => {onPress()}} style={containerStyle}>
            <Text style={textStyle}>Logout</Text>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#cf3e30',
        borderRadius: 10,
        height: 50,

        marginBottom: 20,
        width: width * 0.70,
    },
    textStyle:{
        color: '#fff',
        fontFamily: 'montserrat-alternates-bold',
        fontSize: 13,
    }

};

export {LogoutButton};