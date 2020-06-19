import React, {useState} from "react";
import {Segment, Comment} from "semantic-ui-react";
import firebase from "../../firebase";

import MessagesHeader from "./MessagesHeader";
import MessageForm from "./MessageForm";

const MessagesComponent = ({currentChannel, currentUser}) => {
    let messagesRef = firebase.database().ref('messages');
    const channel = currentChannel;
    const user = currentUser;

    return(
        <>
            <MessagesHeader />

            <Segment>
                <Comment.Group className="messages">
                    {/*Messages*/}
                </Comment.Group>
            </Segment>

            <MessageForm
                messagesRef={messagesRef}
                currentChannel={channel}
                currentUser={user}
            />
        </>
    )
};

export default MessagesComponent;