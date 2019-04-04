import React from 'react';
import {Dimensions, Image, Linking, Text, TouchableOpacity, View} from "react-native";

// The screen's width
const {width} = Dimensions.get('window');

const EventCard = ({event}) => {
    const {viewStyle, titleStyle, dateStyle, addressStyle, assistBttnStyle, imageStyle, textContainerStyle} = styles;
    return(
        <TouchableOpacity onPress={() => {Linking.openURL(event.link)}}>
            <View style={viewStyle}>
                <Image style={imageStyle} source={{uri: event.image}}/>
                <View style={textContainerStyle}>
                    <Text style={titleStyle}>{event.title}</Text>
                    <Text style={dateStyle}>{event.date}</Text>
                    <Text style={addressStyle}>{event.location}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    viewStyle: {
        alignItems: 'center',
        backgroundColor: '#fff',
        flexDirection: 'row',
        marginBottom: 10,
    },
    textContainerStyle:{
        width: 0,
        flexGrow: 1,
        paddingLeft: 10,
    },
    titleStyle: {
        fontFamily: 'montserrat-alternates-bold',
        fontSize: 14,
        marginVertical: 5
    },
    dateStyle: {
        fontFamily: 'montserrat-alternates-bold',
        fontSize: 12,
        marginBottom: 5
    },
    addressStyle: {
        color: '#717171',
        fontFamily: 'montserrat-alternates-light',
        fontSize: 12,
        marginBottom: 5
    },
    assistBttnStyle: {
        textAlign: 'right'
    },
    imageStyle: {
        width: (width - 20) / 2,
        height: 120,
    }
};

export {EventCard};