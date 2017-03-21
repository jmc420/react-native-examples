import * as React from 'react';
import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base';
import EventEmitter = require('eventemitter3');

import EventBus from "../EventBus";

interface NavBarProps {
    title:string;
}

export default class NavBar extends React.Component<NavBarProps, any> {
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
                        <Title>{this.props.title}</Title>
                    </Body>
                    <Right >
                        <Button transparent onPress={() => this.openSettings()}>
                            <Icon name="settings" />
                        </Button>
                    </Right>
                </Header>
        );
    }

    private openDrawer() {
        this.eventEmitter.emit(EventBus.DRAWER_EVENT);
    }

    private openSettings() {
        this.eventEmitter.emit(EventBus.MENU_EVENT, "Settings");
    }
}