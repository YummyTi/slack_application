import React, {useEffect, useState} from "react";
import {connect} from 'react-redux';
import firebase from "../../firebase";
import {setCurrentChannel} from "../../actions";
import {Icon, Menu, Modal, Form, Input, Button} from "semantic-ui-react";

const Channels = ({currentUser, setCurrentChannel}) => {
    const [channels, setChannels] = useState([]);
    const [modal, setModal] = useState(false);
    const [firstLoad, setFirstLoad] = useState(true);
    const [channel, setChannel] = useState({channelName: '', channelDetail: ''});
    const [user, setUser] = useState(currentUser);
    const [activeChannel, setActiveChannel] = useState('');

    let channelsRef = firebase.database().ref('channels');


    useEffect(() => {
        addListener()
    }, []);

    const addListener = () => {
        let loadedChannels = [];
        channelsRef.on('child_added', snap => {
            loadedChannels.push(snap.val());
            setChannels(loadedChannels, () => setFirstChannel());
        })
    };

    const setFirstChannel = () => {
        const firstChannel = channels[0];
        if (firstLoad && channels.length>0){
            setCurrentChannel(firstChannel);
            setActivedChannel(firstChannel)
        }
        setFirstLoad(false)
    };

    const openModal = () => {
        setModal(true)
    };

    const closeModal = () => {
        setModal(false)
    };

    const handleChange = event => {
        setChannel({...channel, [event.target.name]: event.target.value})
    };

    const addChannel = () => {
        const key = channelsRef.push().key;

        const newChannel = {
            id: key,
            name: channel.channelName,
            details: channel.channelDetail,
            createdBy: {
                name: user.displayName,
                avatar: user.photoURL
            }
        };

        channelsRef
            .child(key)
            .update(newChannel)
            .then(() => {
                setChannel({...channel, channelName: '', channelDetail: ''});
                closeModal();
                console.log('channel added');
            })
            .catch(err => {
                console.log(err)
            })
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (isFormValid){
            addChannel();
        }
    };

    const isFormValid = () => channel.channelName && channel.channelDetail;

    const changeChannel = channel => {
        setActivedChannel(channel);
        setCurrentChannel(channel)
    };

    const setActivedChannel = channel => {
        setActiveChannel(channel.id)
    };

    return (
        <>
            <Menu.Menu>
                <Menu.Item>
                <span>
                    <Icon name='exchange'/> CHANNELS
                </span>{" "}
                    ({channels.length}) <Icon name='add' onClick={openModal} />
                </Menu.Item>
                {/*Channels*/}
                {
                    channels.length > 0 && channels.map(channel => (
                        <Menu.Item
                            key={channel.id}
                            onClick={() => changeChannel(channel)}
                            name={channel.name}
                            style={{opacity: 0.7}}
                            active={channel.id === activeChannel}
                        >
                            # {channel.name}
                        </Menu.Item>
                    ))
                }
            </Menu.Menu>

            {/*Add Channel*/}
            <Modal
                basic
                open={modal}
                onClose={closeModal}
            >
                <Modal.Header>
                    Add a Channel
                </Modal.Header>
                <Modal.Content>
                    <Form onSubmit={handleSubmit}>
                        <Form.Field>
                            <Input
                                fluid
                                label='Name of channel'
                                name='channelName'
                                value={channel.channelName}
                                onChange={handleChange}
                            />
                        </Form.Field>

                        <Form.Field>
                            <Input
                                fluid
                                label='About of channel'
                                name='channelDetail'
                                value={channel.channelDetail}
                                onChange={handleChange}
                            />
                        </Form.Field>
                    </Form>
                </Modal.Content>

                <Modal.Actions>
                    <Button
                        color='green'
                        inverted
                        onClick={handleSubmit}
                    >
                        <Icon name='checkmark'/> Add
                    </Button>

                    <Button
                        color='red'
                        inverted
                        onClick={closeModal}
                    >
                        <Icon name='remove'/> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser
});

export default connect(mapStateToProps, {setCurrentChannel})(Channels);