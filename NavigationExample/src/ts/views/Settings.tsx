import * as React from 'react';
import { Container, Content, Text, View } from 'native-base';

import INavBarProps from "../navigation/INavBarProps";
import NavBar from "../navigation/NavBar";

export default class Settings extends React.Component<INavBarProps, any> {

    render() {
        return (
            <Container>
                <NavBar navigation={this.props.navigation}/>
                <Content padder style={{backgroundColor: '#fff'}} >
                    <View>
                        <Text>Settings</Text>
                    </View>
                </Content>
            </Container>
        );
    }
}