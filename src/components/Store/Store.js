import React, { Component } from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import {StoreItem} from "./common/StoreItem";
import Constants from "../../constants/Constants";
import {Header} from "../common/Header";


// The screen's width
const {width, height} = Dimensions.get('window');

const demoStore = [
    {
        id:'1',
        photo: 'https://pbs.twimg.com/profile_images/628990433515798528/95IRyaj3_400x400.jpg',
        name: 'LanguageCast Mexico',
        price: "100",
        permalink: "https://languagecast.org/tienda/",
    },
    {
        id:'2',
        photo: 'https://languagecast.org/wp-content/uploads/2018/08/playera-language-cast.jpg',
        name: 'Trajinera',
        price: "100",
        permalink: "https://languagecast.org/tienda/",
    }
];

class Store extends Component {
    constructor(props){
        super(props);
        this.state = {storeItems:[]};
    }

    componentWillMount() {
        //Disable cause url of store no longer valid
        //this.getProducts();
    }

    getProducts(){
        const url = `${Constants.URL.wc}products?consumer_key=${Constants.Keys.ConsumerKey}&consumer_secret=${Constants.Keys.ConsumerSecret}`
        return fetch(url)
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.length > 0){
                    this.setState({storeItems: responseJson});
                }
            })
            .catch((error) => {
                console.error(error);
                console.log(error)
            });
    }

    renderStoreItems(){
        const {containerStyle, titleStyle} = styles;
        return(
            <View style={containerStyle}>
                <FlatList
                    data = {demoStore}
                    renderItem={({item}) => (
                        <StoreItem item={item}/>
                    )}
                    keyExtractor={item => item.id.toString()}
                    ListHeaderComponent={ <Text style={titleStyle}>Tienda</Text>}
                    numColumns={2}
                    showsVerticalScrollIndicator={false}

                />

            </View>
        );
    }

    render(){
        const {viewStyle} = styles;
        /*if(this.state.storeItems.length === 0){
            return false;
        }*/
        return(
            <View style={viewStyle}>
                <Header color={'#9e40d7'}/>
                {this.renderStoreItems()}
            </View>
        );
    }
}

const styles = {
    viewStyle: {
        backgroundColor: '#ededed',
        height: height-80,
        width,
        alignItems: 'center'
    },
    containerStyle: {
        paddingBottom: 100,
        width: width - 30,
        alignItems: 'space-between'
    },
    titleStyle: {
        fontFamily: 'montserrat-alternates-bold',
        fontSize: 30,
        marginBottom: 10,
        marginTop: 20,
    },
};
export default Store;