import * as React from 'react';
import EventEmitter = require('eventemitter3');
import { Body, Button, Container, Content, Header, Left, List, ListItem, Right, Text, Title, View } from 'native-base';

import EventBus from "../EventBus";

interface SideBarProps {
    menuItems:string[];
}

export default class NativeBaseSideBar extends React.Component<SideBarProps, any> {

    private eventEmitter:EventEmitter;

    constructor() {
        super();
        this.eventEmitter = EventBus.getInstance().getEventEmitter();
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>Menu</Title>
                    </Body>
                </Header>
                <Content style={{ flex: 1, backgroundColor: '#fff'}}>
                    <List dataArray={this.props.menuItems} renderRow={menuItem =>
                        <ListItem button onPress={() => { this.select(menuItem); }} >
                            <Text>{menuItem}</Text>
                        </ListItem>}
                    />
                </Content>
            </Container>
        );
    }

    private select(option:String) {
        if (option == "Settings") {
            this.eventEmitter.emit(EventBus.MENU_PUSH_EVENT, option);
        } else {
            this.eventEmitter.emit(EventBus.MENU_REPLACE_EVENT, option);
        }
    }
}