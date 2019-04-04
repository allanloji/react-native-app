import React from 'react';
import {Dimensions,Image, Linking, Text,TouchableOpacity , View} from "react-native";

// The screen's width
const {width, height} = Dimensions.get('window');

const LoginButton = ({text,onPress,color, fontColor}) => {
    const {containerStyle, textStyle} = styles;
    let buttonStyle = {...containerStyle};
    let fontStyle = {...textStyle};
    buttonStyle.backgroundColor = color;
    fontStyle.color = fontColor;


    return(
        <TouchableOpacity onPress={() => {onPress()}} style={buttonStyle}>
            <Text style={fontStyle}>{text}</Text>
        </TouchableOpacity>
    );
};

const styles = {
    containerStyle: {
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 10,
        height: 50,

        marginBottom: 20,
        width: width * 0.70,
        //fontFamily: 'montserrat-alternates-bold',
    },
    textStyle:{
        color: '#000',
        fontFamily: 'montserrat-alternates-bold',
        fontSize: 13,
    }

};

export {LoginButton};