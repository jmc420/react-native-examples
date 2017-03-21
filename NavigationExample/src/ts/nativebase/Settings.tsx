import * as React from 'react';
import { Container, Content, Text, View } from 'native-base';

import NavBar from './NavBar';

export default class Settings extends React.Component<any, any> {

    render() {
        return (
            <Container>
                <NavBar title="Settings"/>
                <Content padder style={{backgroundColor: '#fff'}} >
                    <View>
                        <Text>Settings</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}