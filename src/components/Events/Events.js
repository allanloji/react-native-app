import React, { Component } from 'react';
import {AsyncStorage, Dimensions, FlatList, Text, View} from 'react-native';
import {EventCard} from "./common/EventCard";
import {Header} from "../common/Header";
import moment from 'moment';
import 'moment/locale/es';
import _ from 'lodash';


// The screen's width
const {width, height} = Dimensions.get('window');

moment.locale('es');

class Events extends Component {
    constructor(props){
        super(props);
        this.state = { events: [],token: ""}
    }

    componentWillMount() {
        this.retrieveToken().then((value) => {
            this.setState({token: value});
            this.getFBEvents(value);
        });
    }

    retrieveToken = async () => {
        try {
            const value = await AsyncStorage.getItem('token');
            if (value !== null) {
                const tokenObj = JSON.parse(value);
                return tokenObj;
            }else {
                console.log("no");
            }
        } catch (error) {
            console.log(error);
        }
    };

    getFBEvents(token){
        return fetch('https://graph.facebook.com/v3.2/LanguageCastMexico/events?fields=cover,id,end_time,' +
            'name,place&time_filter=upcoming' +
            '&access_token=' + token)
            .then((response) => response.json())
            .then((responseJson) => {
                this.mapFBEvents(responseJson.data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    mapFBEvents(data) {
        let fbEvents = [];
        data.forEach(function (element) {
            let imageUrl = "";
            let placeName = "";
            let date = moment(element.end_time).format('MMMM Do YYYY, h:mm:ss a');

            if(element.place !==  undefined){
               placeName = element.place.name;
               if(element.place.location !== undefined){
                   placeName +=  ", " + element.place.location.street + ", " + element.place.location.zip;
               }

            }

            if(element.cover !== undefined){
                imageUrl = element.cover.source;
            }


            let post = {
                id: element.id,
                date: _.capitalize(date),
                title: element.name,
                image: imageUrl,
                link: "https://www.facebook.com/" + element.id ,
                location: placeName,
            };
            fbEvents.push(post);
        });
        this.setState({events:  fbEvents});

    }


     renderEvents(){
        const {containerStyle, titleStyle} = styles;
        return(
            <View style={containerStyle}>
                <FlatList
                    data = {this.state.events}
                    renderItem={({item}) => (
                        <EventCard event={item}/>
                    )}
                    keyExtractor={event => event.id}
                    ListHeaderComponent={ <Text style={titleStyle}>Eventos</Text>}
                    ListFooterComponent={<View style={{ height: 0, marginBottom: 250 }}></View>}

                />

            </View>
        );
    }

    render(){
        const {viewStyle, titleStyle} = styles;
        if(this.state.events.length === 0){
            return(
                <View style={viewStyle}>
                    <Header color={'#00a61e'}/>
                    <Text style={titleStyle}>Eventos</Text>
                    <Text>Por el momentos no hay eventos proximos</Text>
                </View>
            ); //return false or a <Loader/> when you don't have anything in your message[]
        }
        return(
            <View style={viewStyle}>
                <Header color={'#00a61e'}/>
                {this.renderEvents()}
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        backgroundColor: '#ededed',
        height,
        width,
        alignItems: 'center'
    },
    containerStyle: {
        backgroundColor: '#ededed',
        width: width - 50,

    },
    titleStyle: {
        fontFamily: 'montserrat-alternates-bold',
        fontSize: 30,
        marginBottom: 10,
        marginTop: 20,
    },
};
export default Events;