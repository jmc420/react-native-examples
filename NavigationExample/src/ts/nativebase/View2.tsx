import * as React from 'react';
import { Container, Content, Text, View } from 'native-base';

import INavBarProps from "./INavBarProps";
import NavBar from './NavBar';

export default class View2 extends React.Component<INavBarProps, any> {

    render() {
        return (
            <Container>
                <NavBar title={this.props.title} back={this.props.back}/>
                <Content padder style={{backgroundColor: '#fff'}} >
                    <View>
                        <Text>View2</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}