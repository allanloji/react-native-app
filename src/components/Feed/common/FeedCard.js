import React from 'react';
import {Dimensions,Image, Linking, Text,TouchableOpacity , View} from "react-native";
import {FeedHeaderCard} from "./FeedHeaderCard";

// The screen's width
const {width, height} = Dimensions.get('window');

jetpack_featured_media_url = undefined;
const FeedCard = ({feed}) => {
    const {viewStyle, textStyle, imageStyle, textContainerStyle, contentStyle} = styles;

  return(
      <TouchableOpacity onPress={() => {Linking.openURL(feed.link)}}>
          <View style={viewStyle}>
              <Image style={imageStyle} source={{uri: feed.image}}/>
              <View style={textContainerStyle}>
                <Text allowFontScaling={false} style={textStyle}>{feed.title}</Text>
                <Text numberOfLines={3} style={contentStyle}>{feed.text}</Text>
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
    textStyle: {
        fontFamily: 'montserrat-alternates-bold',

    },
    contentStyle:{
        fontSize: 12,
        fontFamily: 'montserrat-alternates-light',
    },
    imageStyle: {
        width: (width - 20) / 2,
        height: 120,
    }
};

export {FeedCard};