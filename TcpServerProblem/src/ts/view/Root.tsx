import * as React from 'react';
import { View, Text } from 'react-native';

import styles from './Styles';

import EventBus from '../events/EventBus';
import IEventBus from '../events/IEventBus';
import IMessage from '../messages/IMessage';
import MessageType from '../messages/MessageType';


export default class Root extends React.Component<any,any> {

protected connectionCount:Number = 0;
protected serverState:String = "initialising";

constructor() {
    super();
    this.state = {connectionCount:this.connectionCount, serverState:this.serverState};
}

  componentDidMount() {
    let bus:IEventBus = EventBus.getInstance();

    bus.addEventListener(MessageType.CONNECTION_CLOSED, function() {
      this.connectionCount--;
      this.updateState();
    }, this);

     bus.addEventListener(MessageType.CONNECTION_OPENED, function() {
      this.connectionCount++;
      this.updateState();
    }, this);

    bus.addEventListener(MessageType.SERVER_CLOSED, function() {
      this.serverState = "closed";
      this.updateState();
    }, this);

     bus.addEventListener(MessageType.SERVER_LISTENING, function() {
      this.serverState = "listening";
      this.updateState();
    }, this);
  }

  updateState() {
      this.setState({connectionCount:this.connectionCount, serverState:this.serverState});
  }

  render() {
    return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    Tcp Server
                </Text>
                <Text style={styles.instructions}>
                    Number of connections {this.state.connectionCount}
                </Text>
                <Text style={styles.instructions}>
                    Server {this.state.serverState}
                </Text>
            </View>
    );
  }
}
