import * as React from 'react';
import { Container, Content, Text, View } from 'native-base';

import INavBarProps from "../navigation/INavBarProps";
import NavBar from "../navigation/NavBar";

export default class View1 extends React.Component<INavBarProps, any> {

    render() {
        return (
            <Container>
                <NavBar title={this.props.title} back={this.props.back}/>
                <Content padder style={{backgroundColor: '#fff'}} >
                    <View>
                        <Text>View1</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}