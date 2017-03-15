import * as React from 'react';
import { Navigator,Text,View } from 'react-native';
import * as Ionicons from 'react-native-vector-icons/Ionicons';

import DrawerLayout from './DrawerLayout.android';
import styles from './styles/Styles';

export default class Navigation extends React.Component<any, any> {

    constructor() {
        super();

    }

    componentDidMount() {

    }

    render() {
        return (
            <Navigator
                style={styles.container}
                initialRoute={{ name: 'openDrawerFromToolbar', index: 0 }}
                renderScene={this.navigatorRenderScene}
                configureScene={() => { return Navigator.SceneConfigs.PushFromRight; } } />
        );
    }

    navigatorRenderScene(route, navigator) {
        console.log("Route "+route);
        return (
            <DrawerLayout
                route={route}
                navigator={navigator}
                data={route.data} />
        );
    }

}
