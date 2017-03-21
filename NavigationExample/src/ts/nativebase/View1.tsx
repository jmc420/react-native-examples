import * as React from 'react';
import { Container, Content, Text, View } from 'native-base';

import NavBar from './NavBar';

export default class View1 extends React.Component<any, any> {

    render() {
        return (
            <Container>
                <NavBar title="View1"/>
                <Content padder style={{backgroundColor: '#fff'}} >
                    <View>
                        <Text>View1</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}