import * as React from 'react';
import { View, Text } from 'react-native';

import styles from './Styles';

export default class Navigation extends React.Component<any,any> {
 
  constructor() {
    super();

  }

  componentDidMount() {
    
  }

  render() {
    return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Welcome to Android React Native
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.ios.js
                </Text>
                <Text style={styles.instructions}>
                    Press Cmd+R to reload, {"\n"}
                    Cmd+D or shake for dev menu
                </Text>
            </View>
    );
  }
}
