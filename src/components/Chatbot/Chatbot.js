import React, { Component } from 'react';
import {Dimensions, KeyboardAvoidingView, Text} from 'react-native';

import { GiftedChat, Bubble, Send, Message } from 'react-native-gifted-chat';
import uuid from 'uuid';
import { ApiAiClient } from 'api-ai-javascript';
import {Header} from "../common/Header";
import { isIphoneX } from '../common/is-iphone-x';


//Access token for test, not real
const dialogflow = new ApiAiClient({
    accessToken: '21f9376bd6474eb7ba1601e9c8dc86b7'
});

// The screen's width
const {width, height} = Dimensions.get('window');

const FOOTER_SIZE = isIphoneX() ? 110 : 80;

class Chatbot extends Component {
    constructor(props){
        super();
        this.state = {
            messages: [],
            user: {
                _id: '2',
                name: 'Chatbot',
                avatar: require('../../../assets/chatbot.png'),
            },
        };
    }

    componentWillMount() {
        this.setState({
            messages: [
                {
                    _id: '1',
                    text: 'Hola, ¿en qué puedo ayudarte?',
                    createdAt: new Date(),
                    user: this.state.user,
                },
            ],
        });
    }

    appendToChat(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages),
        }));
    }

    onSend(messages = []) {
        this.appendToChat(messages);
        this.sendQuery(messages).done();
    }

    async sendQuery(messages = []) {
        const response = await dialogflow.textRequest(messages[0].text);
        this.appendToChat([{
            _id: uuid.v4(),
            text: response.result.fulfillment.speech === '' ? '¿Puedes repetirlo?' : response.result.fulfillment.speech,
            createdAt: new Date(),
            user: this.state.user,
        }]);
    }

    renderBubble (props) {
        return (
            <Bubble
                {...props}
                textStyle={{
                    right: {
                        color: '#000',
                        fontFamily: 'montserrat-alternates-bold',
                    },
                    left: {
                        color: '#000',
                        fontFamily: 'montserrat-alternates-light',
                    }
                }}
                wrapperStyle={{
                    right: {
                        backgroundColor: '#fff',
                    },
                    left: {
                        backgroundColor: '#fff'
                    }
                }}
            />
        )
    }

    renderSend(props) {
        return (
            <Send
                {...props}
                label={'Enviar'}
           />
        );
    }




    render(){
        const {viewStyle, titleStyle} = styles;
        return(
            <KeyboardAvoidingView style={viewStyle} behavior="padding">
                <Header color={'#62b6de'}/>
                <Text style={titleStyle}>Chatbot</Text>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={messages => this.onSend(messages)}
                    user={{
                        _id: 1,
                        avatar: require('../../../assets/user.png')
                    }}
                    renderBubble={this.renderBubble}
                    renderSend={this.renderSend}
                    showUserAvatar={true}
                    placeholder={'Escribe un mensaje...'}

                />
            </KeyboardAvoidingView>
        );
    }
}

const styles = {
    viewStyle: {
        backgroundColor: '#f1f1f1',
        height: height - FOOTER_SIZE ,
        width
    },
    inputContainerStyle:{
        flex: 1,
        flexDirection: 'column',
    },
    textInputStyle:{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    titleStyle: {
        fontFamily: 'montserrat-alternates-bold',
        fontSize: 30,
        marginTop: 20,
        marginLeft: 25,
    },
};
export default Chatbot;