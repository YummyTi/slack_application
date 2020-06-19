import React from 'react';
import {connect} from 'react-redux';
import {Grid} from "semantic-ui-react";
import './App.css';

import ColorPanelComponent from "./ColorPanel/ColorPanel";
import SidePanelComponent from "./SidePanel/SidePanel";
import MessagesComponent from "./Messages/Messages";
import MetaPanelComponent from "./MetaPanel/MetaPanel";

const App = ({currentUser, currentChannel}) => {
    return (
        <>
            <Grid
                columns='equal'
                className='app'
                style={{background: '#eee'}}
            >
                <ColorPanelComponent/>
                <SidePanelComponent
                    key={currentUser && currentUser.uid}
                    currentUser={currentUser}
                />

                <Grid.Column
                    style={{marginLeft: 320}}
                >
                    <MessagesComponent
                        key={currentChannel && currentChannel.id}
                        currentChannel={currentChannel}
                    />
                </Grid.Column>

                <Grid.Column
                    width={4}
                >
                    <MetaPanelComponent/>
                </Grid.Column>
            </Grid>
        </>
    );
};

const mapStateToProps = state => ({
    currentUser: state.user.currentUser,
    currentChannel: state.channel.currentChannel
});

export default connect(mapStateToProps)(App);
