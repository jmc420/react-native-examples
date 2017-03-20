import * as React from 'react';
import { Body, Button, Container, Content, Drawer, Header, Icon, Left, List, ListItem, Right, Text, Title, View } from 'native-base';

import styles from '../styles/Styles';

import NavBar from './NavBar';

export default class Home extends React.Component<any, any> {

    render() {
        return (
            <Container>
                <NavBar/>
                <Content style={{ flex: 1, backgroundColor: '#fff'}} >
                    <View>
                        <Text style={{top:20, left:20}}>Home Screen</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}