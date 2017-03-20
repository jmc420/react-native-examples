import * as React from 'react';
import { Body, Button, Header, Icon, Left, Right, Text, Title, View } from 'native-base';
import EventEmitter = require('eventemitter3');

import styles from '../styles/Styles';

import EventBus from "../EventBus";

export default class NavBar extends React.Component<any, any> {
    private eventEmitter:EventEmitter;

    constructor() {
        super();
        this.eventEmitter = EventBus.getInstance().getEventEmitter();
    }
    
    render() {
        return (
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.openDrawer()}>
                            <Icon name="menu" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Headers</Title>
                    </Body>
                    <Right >
                        <Button transparent onPress={this.props.openDrawer}>
                            <Icon name="settings" />
                        </Button>
                    </Right>
                </Header>
        );
    }

    private openDrawer() {
        this.eventEmitter.emit("openDrawer");
    }
}