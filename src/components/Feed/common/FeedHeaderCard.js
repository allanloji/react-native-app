import React from 'react';
import {Dimensions,Image, Text, View} from "react-native";
import Moment from 'moment';

// The screen's width
const {width, height} = Dimensions.get('window');

const FeedHeaderCard = ({headerInfo}) => {
    const {viewStyle, profileImageStyle, textContainerStyle, nameStyle, dateStyle} = styles;
    return(
        <View style={viewStyle}>
            <Image style={profileImageStyle} source={{uri: 'https://pbs.twimg.com/profile_images/628990433515798528/95IRyaj3_400x400.jpg'}}/>
            <View style={textContainerStyle}>
                <Text style={nameStyle}>LanguageCast Mexico</Text>
                <Text style={dateStyle}>{Moment(headerInfo.date).format('MMMM Do YYYY, h:mm:ss a')}</Text>
            </View>
        </View>
    );
};

const styles = {
    viewStyle: {
        flex: 1,
        flexDirection: 'row'
    },
    profileImageStyle:{
        borderRadius: 25,
        height: 50,
        width:50,
    },
    textContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        marginLeft: 20
    },
    nameStyle:{
        fontFamily: 'montserrat-alternates-bold',
    },
    dateStyle:{
        fontFamily: 'montserrat-alternates-light',
        color: '#717171',
        fontSize: 12,
    }
};

export {FeedHeaderCard};