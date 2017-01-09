import * as React from 'react';
import { DrawerLayoutAndroid, Text, View } from 'react-native';

import Toolbar from './Toolbar.android';
import styles from './Styles';

interface DrawerLayoutProps {
    navigator:Navigator;
}

export default class DrawerLayout extends React.Component<DrawerLayoutProps, any> {

  constructor(props) {
    super(props);
  }

  componentDidMount() {

  }

  render() {
    var navigationView = (
      <View style={{ flex: 1, backgroundColor: '#fff' }}>
        <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>In the Drawer!</Text>
      </View>
    );

    return (
      <View style={styles.container}>
        <DrawerLayoutAndroid drawerWidth={300}
          drawerPosition={DrawerLayoutAndroid.positions.Left}
          renderNavigationView={() => navigationView}
          ref={'DRAWER'}>
          <Toolbar style={styles.toolbar}
            sidebarRef={this} />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>Content</Text>
          </View>
        </DrawerLayoutAndroid>
      </View>);
  }
}
