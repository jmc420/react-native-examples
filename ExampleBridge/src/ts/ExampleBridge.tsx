import * as React from 'react';
import { Alert, Text, View } from 'react-native';

import styles from './Styles';

export default class ExampleBridge extends React.Component<any, any> {

    constructor() {
        super();
    }

    componentDidMount() {
        Alert.alert(
            'Example Bridge',
            'Press OK to call native code',
            [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ],
            { cancelable: false }
        )
    }

    render() {
        return (
            <View style={styles.container} >
                <Text>
                    Welcome to React Native Example Bridge!
                </Text>
            </View>
        );
    }

    // protected methods used by sub classes

} 