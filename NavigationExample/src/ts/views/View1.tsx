import * as React from 'react';
import { Text,View } from 'react-native';

import styles from '../styles/Styles';

export default class View1 extends React.Component<any, any> {

    render(){
        return (
            <View style={styles.container}>
                <Text>View1</Text>
            </View>
        );
    }
}