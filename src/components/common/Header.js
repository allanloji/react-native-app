import React from 'react';
import {Dimensions, Text, View} from "react-native";

// The screen's width
const {width} = Dimensions.get('window');

const Header = ({color}) => {
    const {textStyle, imageStyle } = styles;
    let {containerStyle} = styles;
    let newContainerStyle = {...containerStyle};
    newContainerStyle.backgroundColor = color;

    return(
        <View style={newContainerStyle}>
            <Text style={textStyle}>language cast</Text>
            {/*<Image style={imageStyle} source={require()} />*/}
        </View>
    );
};

const styles = {
    containerStyle: {
        backgroundColor: '#fff',
        height: 100,
        width
    },
    textStyle:{
        alignSelf: 'flex-start',
        color: '#fff',
        fontFamily: 'montserrat-alternates-bold',
        fontSize: 30,
        marginTop: 35,
        marginLeft: 30,


    },
    imageStyle: {
        alignSelf: 'flex-end',
        height: 30,
        marginRight: 30,
        width: 30,
    }
};

export {Header};