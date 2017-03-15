import * as React from 'react';
import { Navigator, Text, TouchableOpacity } from 'react-native';
import Drawer from 'react-native-drawer';
import * as Icon from 'react-native-vector-icons/MaterialIcons';
import EventEmitter = require('eventemitter3');

import styles from './styles/Styles';
import Home from './views/Home';
import Menu from './views/Menu';
import View1 from './views/View1';
import View2 from './views/View2';

export default class Navigation extends React.Component<any, any> {

    private componentMap: any;
    private drawer: Drawer;
    private eventEmitter: EventEmitter;
    private navigator: Navigator;
    private navigationBarRouteMapper;

    constructor() {
        super();

        this.eventEmitter = new EventEmitter();
        this.navigationBarRouteMapper = this.createNavigationBarRouteMapper();

        this.componentMap = {
            'Home': {
                title: 'Home',
                id: 'Home'
            },
            'View1': {
                title: 'View1',
                id: 'View1'
            },
            'View2': {
                title: 'View2',
                id: 'View2'
            }
        }

    }

    componentDidMount() {
        var self = this;

        this.eventEmitter.addListener('openMenu', () => {
            self.drawer.open();
        });

        this.eventEmitter.addListener('back', () => {
            self.navigator.pop();
        });
    }

    render() {
        var self = this;

        return (
            <Drawer
                ref={(ref) => self.drawer = ref}
                type="overlay"
                content={<Menu navigate={(route) => {
                    self.navigator.push(self.componentMap[route]);
                    self.drawer.close()
                }} />}
                tapToClose={true}
                openDrawerOffset={0.2}
                panCloseMask={0.2}
                closedDrawerOffset={-3}
                styles={{
                    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
                    main: { paddingLeft: 3 }
                }}
                tweenHandler={(ratio) => ({
                    main: { opacity: (2 - ratio) / 2 }
                })}>
                <Navigator
                    ref={(ref) => self.navigator = ref}
                    configureScene={(route) => Navigator.SceneConfigs.FloatFromLeft}
                    initialRoute={{
                        id: 'Home',
                        title: 'Home',
                        index: 0
                    }}
                    renderScene={(route, navigator) => self.renderScene(route, navigator)}
                    navigationBar={
                        <Navigator.NavigationBar
                            style={styles.navBar}
                            routeMapper={self.navigationBarRouteMapper} />
                    }
                />
            </Drawer>
        );
    }

    private renderScene(route, navigator) {
        switch (route.id) {
            case 'Home':
                return (<Home navigator={navigator} />);

            case 'View1':
                return (<View1 navigator={navigator} />);

            case 'View2':
                return (<View2 navigator={navigator} />);
        }
    }

    private createNavigationBarRouteMapper(): any {
        var self = this;

        return {
            LeftButton(route, navigator, index, navState) {
                switch (route.id) {
                    case 'Home':
                        return (
                            <TouchableOpacity
                                style={styles.navBarLeftButton}
                                onPress={() => { self.eventEmitter.emit('openMenu') }}>
                                <Icon name='menu' size={25} color={'white'} />
                            </TouchableOpacity>
                        )
                    default:
                        return (
                            <TouchableOpacity
                                style={styles.navBarLeftButton}
                                onPress={() => { self.eventEmitter.emit('back') }}>
                                <Icon name='chevron-left' size={25} color={'white'} />
                            </TouchableOpacity>
                        )
                }
            },

            RightButton(route, navigator, index, navState) {
                return (
                    <TouchableOpacity
                        style={styles.navBarRightButton}>
                        <Icon name='settings' size={25} color={'white'} />
                    </TouchableOpacity>
                )
            },

            Title(route, navigator, index, navState) {
                return (
                    <Text style={[styles.navBarText, styles.navBarTitleText]}>
                        {route.title}
                    </Text>
                )
            }
        }
    }
}
