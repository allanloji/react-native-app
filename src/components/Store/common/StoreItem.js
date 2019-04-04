import React from 'react';
import {Dimensions, Image, Linking, Text, TouchableOpacity, View} from "react-native";

// The screen's width
const {width, height} = Dimensions.get('window');

const StoreItem = ({item}) => {
    const {viewStyle, footerStyle, textStyle, imageStyle, priceStyle} = styles;
    let itemImage = <Image style={imageStyle} source={{uri: item.photo}}/>;
    //Disable for preview test
    /*if(item.images.length === 0)
    {
        itemImage = <Image style={imageStyle} source={{uri: 'https://languagecast.org/wp-content/uploads/2018/08/playera-language-cast.jpg'}}/>
    }else {
        itemImage = <Image style={imageStyle} source={{uri: item.images[0].src}}/>
    }*/
    return(
        <TouchableOpacity style={viewStyle} onPress={() => {Linking.openURL(item.permalink)}}>
            {itemImage}
            <View style={footerStyle}>
                <Text style={textStyle}>{item.name}</Text>
                <Text style={priceStyle}>$ {item.price}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = {
    viewStyle: {
        backgroundColor: '#fff',
        width: (width-70)/2,
        margin: 10
    },
    footerStyle:{
      marginLeft: 10
    },
    textStyle: {
        position: 'relative',
        fontSize: 15,
        fontFamily: 'montserrat-alternates-bold',
        marginVertical: 10,
    },
    priceStyle:{
        color: '#c01c5c',
        fontSize: 20,
        fontFamily: 'montserrat-alternates-bold',
        marginBottom: 10,
    },
    imageStyle: {
        width: (width-70)/2,
        height:  (width-15)/2

    }
};

export {StoreItem};