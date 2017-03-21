import * as React from 'react';
import { Container, Content, Text, View } from 'native-base';

import NavBar from './NavBar';

export default class View2 extends React.Component<any, any> {

    render() {
        return (
            <Container>
                <NavBar title="View2"/>
                <Content padder style={{backgroundColor: '#fff'}} >
                    <View>
                        <Text>View2</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}