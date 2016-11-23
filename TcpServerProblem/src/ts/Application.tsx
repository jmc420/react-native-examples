
import * as React from "react";
import { View } from "react-native";

import EventBus from './events/EventBus';
import Root from './view/Root';
import ExampleTcpServer from './ExampleTcpServer';

export default class Application extends React.Component<any,any> {

  constructor() {
    
    super();
    new EventBus();
  }

  componentDidMount() {
    let server:ExampleTcpServer = new ExampleTcpServer();
  }

  render() {
    return (<Root></Root>);
    
  }
}