import * as React from 'react';
import { Alert, Text, View } from 'react-native';
import ExampleModule from './ExampleModule';

import styles from './Styles';

export default class ExampleBridge extends React.Component<any, any> {

    constructor() {
        super();
    }

    componentDidMount() {
        this.showAlert();
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

    private callExampleModule() {
        ExampleModule.show('Press OK to call React Native', () => {
            this.showAlert();
        });
    }

    private showAlert() {
        Alert.alert(
            'Example Bridge',
            'Press OK to call native code',
            [
                { text: 'OK', onPress: () => this.callExampleModule() },
            ],
            { cancelable: false }
        )
    }
} 