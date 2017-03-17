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

        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(this.menuItems)
        };
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

    private renderMenuItem(item) {
        return (
            <Button title={item} style={styles.menuItem} onPress={() => this.onItemSelect(item)}>{item}</Button>
        );
    }

    private renderNavigation() {
        return (<View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/*<Text style={{ margin: 10, fontSize: 15, textAlign: 'left' }}>I'm in the Drawer!</Text>*/}
            <ListView
                style={styles.menuContainer}
                dataSource={this.state.dataSource}
                renderRow={(item) => this.renderMenuItem(item)}
            />
        </View>);
    }

    protected renderScene(route, navigator) {
        var toolBar: any = this.refs[Navigation.TOOLBAR];

        //toolBar.title = route.id;

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

    private onItemSelect(item) {
        var drawer: any = this.refs[Navigation.DRAWER];

        console.log("Selected "+item);
        drawer.closeDrawer();
        this.navigator.replace(this.routeMap[item]);
    }
}
