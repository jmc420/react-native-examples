import * as React from 'react';
import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base';
import EventEmitter = require('eventemitter3');

import EventBus from "../event/EventBus";
import INavBarProps from "./INavBarProps";

export default class NavBar extends React.Component<INavBarProps, any> {
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
                            <Icon name={(this.props.back) ? "arrow-back" : "menu"}/>
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
        if (this.props.back) {
            this.eventEmitter.emit(EventBus.MENU_POP_EVENT);
        } else {
            this.eventEmitter.emit(EventBus.DRAWER_EVENT);
        }
    }

    private openSettings() {
        this.eventEmitter.emit(EventBus.MENU_PUSH_EVENT, "Settings");
    }
}