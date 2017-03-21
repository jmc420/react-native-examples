import * as React from 'react';
import { Container, Content, Text, View } from 'native-base';

import NavBar from './NavBar';

export default class Home extends React.Component<any, any> {

    render() {
        return (
            <Container>
                <NavBar title="Home"/>
                <Content padder style={{backgroundColor: '#fff'}} >
                    <View>
                        <Text>Home Screen</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}