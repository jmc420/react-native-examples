import * as React from 'react';
import { Text,View } from 'react-native';

import styles from '../styles/Styles';

export default class Home extends React.Component<any, any> {

    render(){
        return (
            <View style={styles.container}>
                <Text>Home Screen</Text>
            </View>
        );
    }
}