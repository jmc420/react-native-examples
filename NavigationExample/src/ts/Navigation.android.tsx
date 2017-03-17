import * as React from 'react';
import { Button, DrawerLayoutAndroid, ListView, Navigator, Text, View } from 'react-native';
import * as Ionicons from 'react-native-vector-icons/Ionicons';

import IRoute from './IRoute';
import Router from './Router';

import styles from './styles/Styles';

export default class Navigation extends Router {

    private navigator: Navigator;

    private static DRAWER: string = "Drawer";
    private static TOOLBAR: string = "Toolbar";

    constructor() {
        super();
    }

    componentDidMount() {
       
    }

    render() {
        var self = this;

        return (
            <DrawerLayoutAndroid
                drawerWidth={200}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                ref={Navigation.DRAWER}
                renderNavigationView={() => self.renderNavigation()}>
                <Ionicons.ToolbarAndroid
                    actions={[{ title: 'Settings', iconName: 'md-settings', show: 'always', showWithText: false }]}
                    navIconName="md-menu"
                    onActionSelected={self.onActionSelected}
                    onIconClicked={() => self.onIconClicked()}
                    ref={Navigation.TOOLBAR}
                    style={styles.toolBar}
                    titleColor="white"
                    title="" />
                <Navigator
                    ref={(ref) => self.navigator = ref}
                    configureScene={(route) => Navigator.SceneConfigs.FloatFromLeft}
                    initialRoute={{
                        id: 'Home',
                        title: 'Home',
                        index: 0
                    }}
                    renderScene={(route, navigator) => self.renderScene(route, navigator)}
                />
            </DrawerLayoutAndroid>

        );
    }

    protected onItemSelect(item) {
        var drawer: any = this.refs[Navigation.DRAWER];

        console.log("Selected "+item);
        drawer.closeDrawer();
        this.navigator.replace(this.routeMap[item]);
    }

    protected renderScene(route, navigator) {
        var toolBar: any = this.refs[Navigation.TOOLBAR];

        if (toolBar) {
            toolBar.title = route.id;
        }

        return super.renderScene(route, navigator);
    }

    private onActionSelected(position) {
        console.log("Action " + position);
        if (position === 0) { // index of 'Settings'
        }
    }

    private onIconClicked() {
        console.log("Menu clicked ");
        var drawer: any = this.refs[Navigation.DRAWER];

        drawer.openDrawer();
    }

}
