import * as React from 'react';
import EventEmitter = require('eventemitter3');
import { Button, Container, Content, Left, List, ListItem, Right, Text, Title, View } from 'native-base';

import EventBus from "../EventBus";

export default class NativeBaseSideBar extends React.Component<any, any> {

    private eventEmitter:EventEmitter;

    constructor() {
        super();
        this.eventEmitter = EventBus.getInstance().getEventEmitter();
    }

    render() {
        return (
            <Container>
                <Content style={{ flex: 1, backgroundColor: '#fff', top: -1 }}>
                    <List>
                        <ListItem button onPress={() => { this.select("Home") }} >
                            <Text>Home</Text>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }

    private select(option:String) {
        this.eventEmitter.emit("select", option);
    }
}