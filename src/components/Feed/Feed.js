import React, { Component } from 'react';
import {AsyncStorage, Dimensions, FlatList, Text, View} from 'react-native';
import {FeedCard} from "./common/FeedCard";
import {
    AdMobBanner,
} from 'expo';
import {Header} from "../common/Header";



// The screen's width
const {width, height} = Dimensions.get('window');

class Feed extends Component {
    constructor(props){
        super(props);
        this.state = { posts: [], fbPosts: [], allPosts: [], retrieved: false ,token: "",  isFetching: false}
    }

    componentWillMount() {
        this.getPosts();
        this.retrieveToken().then((value) => {
            this.setState({token: value});
            this.getFBPosts(value);
        }).then();


    }

    componentDidUpdate() {
        if (this.state.fbPosts.length > 0 &&
            this.state.posts.length > 0 &&
            !this.state.retrieved) {
            let allPosts = [...this.state.posts];
            allPosts = allPosts.concat(this.state.fbPosts);
            this.orderPosts(allPosts);
            this.setState({retrieved: true})
        }
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

    orderPosts(posts){
        posts.sort((a,b) => a.date.localeCompare(b.date)).reverse();
        this.setState({allPosts: posts});
    }




    mapPosts(data){
        let wpPosts = [];
        data.forEach(function (element) {
            let post = {
                id: element.id,
                date: element.date,
                title: element.title.rendered,
                image: element.jetpack_featured_media_url,
                link: element.link,
                text: element.content.rendered,
            };
            post.text = post.text.replace('<p>', '');
            post.text = post.text.replace('<strong>', '');
            post.text = post.text.replace('</p>', '');
            post.text = post.text.replace('</strong>', '');
            wpPosts.push(post)
        });
        this.setState({posts: wpPosts});
    }

    mapFBPosts(data) {
        let fbPosts = [];
        data.forEach(function (element) {
            let imageUrl = "https://languagecast.org/wp-content/uploads/2018/08/logo-languagecast.png";
            let text = "Descubre más presionando en el post...";
            if(element.attachments !== undefined){
                imageUrl = element.attachments.data[0].media.image.src;
            }

            if(element.message !== undefined) {
                text = element.message;
            }

            let post = {
                id: element.id,
                date: element.created_time,
                title: 'Post',
                image: imageUrl,
                link: "https://www.facebook.com/" + element.id ,
                text: text,
            };
            fbPosts.push(post);
        });
        this.setState({fbPosts:  fbPosts});

    }


    getPosts(){
        return fetch('http://languagecast.org/wp-json/wp/v2/posts')
            .then((response) => response.json())
            .then((responseJson) => {
               this.mapPosts(responseJson);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    getFBPosts(token){
        //console.log(this.state.token);
        return fetch('https://graph.facebook.com/v3.2/LanguageCastMexico/posts?fields=attachments{media}' +
            ',id,message,created_time&access_token=' + token)
            .then((response) => response.json())
            .then((responseJson) => {
                //console.log(responseJson.data);
                this.mapFBPosts(responseJson.data);
            })
            .catch((error) => {
                Alert.alert(
                    'Oh oh',
                    'Por favor vuelve a iniciar sesión',
                    [
                        {text: 'OK', onPress: () => this.props.onPress()},
                    ],
                    { cancelable: false }
                );
                console.error(error);
            });
    }

    getAllPosts(){
        this.setState({retrieved: false});
        this.getPosts();
        this.getFBPosts(this.state.token);
        this.setState({ isFetching: false });
    }

    renderAd(index){
        const {bannerStyle} = styles;
        let ad;
        if(index> 0 && index % 5 === 0){
            ad =
            <AdMobBanner
                style={bannerStyle}
                bannerSize="mediumRectangle"
                adUnitID="ca-app-pub-3940256099942544/6300978111" // Test ID
                testDeviceID="EMULATOR"
                onDidFailToReceiveAdWithError={this.bannerError} />;
        }
        return ad;
    }

     renderFeeds(){
        const {containerStyle, titleStyle} = styles;
        return(
            <View style={containerStyle}>
                <FlatList
                    data = {this.state.allPosts}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    renderItem={({item, index}) => (
                        <View>
                            <FeedCard feed={item}/>
                            {this.renderAd(index)}
                        </View>
                    )
                    }
                    keyExtractor={feed => feed.id.toString()}
                    ListHeaderComponent={ <Text style={titleStyle}>News Feed</Text>}
                    showsVerticalScrollIndicator={false}
                    ListFooterComponent={<View style={{ height: 0, marginBottom: 250 }}></View>}

                />

            </View>
        );
    }

    bannerError() {
        console.log('An error');
        return;
    }

    onRefresh() {
        this.setState({ isFetching: true }, function() {  this.getAllPosts() });
    }

    render(){
        const {viewStyle, bottomBannerStyle} = styles;
        if(this.state.posts.length === 0){
            return false; //return false or a <Loader/> when you don't have anything in your message[]
        }
        return(
          <View style={viewStyle}>
              <Header color={'#ed316b'}/>

              {this.renderFeeds()}

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
    bannerStyle:{
        alignSelf: 'center',
        marginBottom: 10
    }
};
export default Feed;