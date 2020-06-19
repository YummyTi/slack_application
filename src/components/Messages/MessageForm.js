import React, {useState} from 'react';
import {connect} from 'react-redux';
import firebase from "../../firebase";

import {Segment, Button, Input} from 'semantic-ui-react';

const MessageForm = ({messagesRef, currentChannel, currentUser}) => {
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState([]);

    const [channel, setChannel] = useState(currentChannel);
    const [user, setUser] = useState(currentUser);


    console.log(channel);

    const handleChange = (e) => {
        setMessage(e.target.value)
    };

    const createMessage = () => {
        const message = {
            timestamp: firebase.database.ServerValue.TIMESTAMP,
            user: {
                id: user.uid,
                name: user.displayName,
                avatar: user.photoURL
            },
            content: message
        };

        return message
    };

    const sendMessage = () => {
        if (message) {
            //Send Message
            setLoading(true);
            messagesRef
                .child(channel.id)
                .push()
                .set(createMessage())
                .then(() => {
                    setLoading(false);
                    setMessage('');
                    setErrors([]);
                })
                .catch(err => {
                    console.error(err);
                    setErrors(errors.concat(err));
                    setLoading(false)
                })
        } else {
            setErrors(errors.concat({message: 'Add a message'}))
        }
    };

    return (
        <Segment className="message__form">
            <Input
                fluid
                name='message'
                value={message}
                onChange={handleChange}
                style={{marginBottom: '0.7em'}}
                label={<Button icon={'add'}/>}
                labelPosition="left"
                className={
                    errors.some(error => error.message.includes('message')) ? 'error' : ''
                }
                placeholder="Write your message"
            />
            <Button.Group icon widths='2'>
                <Button
                    onClick={sendMessage}
                    color='orange'
                    content='Add Reply'
                    labelPosition='left'
                    icon='edit'
                    style={{width: '30%', marginRight: '20px'}}
                />
                <Button
                    color='teal'
                    content='Upload Media'
                    labelPosition='right'
                    icon='cloud upload'
                    style={{width: '30%', marginLeft: '20px'}}
                />
            </Button.Group>
        </Segment>
    );
};

const mapStateToProps = state => ({
    currentChannel: state.channel.currentChannel,
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps)(MessageForm);