import * as React from 'react';
import { Body, Button, Header, Icon, Left, Right, Title } from 'native-base';
import EventEmitter = require('eventemitter3');

import EventBus from "../event/EventBus";
import INavBarProps from "./INavBarProps";

export default class NavBar extends React.Component<INavBarProps, any> {
    private eventEmitter:EventEmitter;

    constructor(props) {
        super(props);
        this.eventEmitter = EventBus.getInstance().getEventEmitter();
    }
    
    render() {
        return (
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.openDrawer()}>
                            <Icon name={(this.props.navigation.state.params.back) ? "arrow-back" : "menu"}/>
                        </Button>
                    </Left>
                    <Body>
                        <Title>{this.props.navigation.state.params.title}</Title>
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
        if (this.props.navigation.state.params.back) {
            this.eventEmitter.emit(EventBus.MENU_POP_EVENT);
        } else {
            this.eventEmitter.emit(EventBus.DRAWER_EVENT);
        }
    }

    private openSettings() {
        this.eventEmitter.emit(EventBus.MENU_PUSH_EVENT, "Settings");
    }
}