import * as React from 'react';
import { Navigator, Text, TouchableOpacity } from 'react-native';
import Drawer from 'react-native-drawer';
import * as Icon from 'react-native-vector-icons/MaterialIcons';
import EventEmitter = require('eventemitter3');

import styles from './styles/Styles';
import IRoute from './IRoute';
import Router from './Router';

export default class Navigation extends Router {

    private drawer: Drawer;
    private navigator: Navigator;
    private navigationBarRouteMapper;
    private useBackButton;

    constructor() {
        super();

        this.useBackButton = false;
        this.navigationBarRouteMapper = this.createNavigationBarRouteMapper();
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
                content={self.renderNavigation()}
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

    protected onItemSelect(item) {
        if (this.useBackButton) {
            this.navigator.push(this.routeMap[item]);
        }
        else {
            this.navigator.replace(this.routeMap[item]);
        }
        this.drawer.close()
    }

    private createBackButton(eventEmitter: EventEmitter) {
        return (
            <TouchableOpacity
                style={styles.navBarLeftButton}
                onPress={() => { eventEmitter.emit('back') }}>
                <Icon name='chevron-left' size={25} color={'white'} />
            </TouchableOpacity>
        )
    }

    private createHomeButton(eventEmitter: EventEmitter) {
        return (
            <TouchableOpacity
                style={styles.navBarLeftButton}
                onPress={() => { eventEmitter.emit('openMenu') }}>
                <Icon name='menu' size={25} color={'white'} />
            </TouchableOpacity>
        );
    }

    private createNavigationBarRouteMapper(): any {
        var self = this;

        return {
            LeftButton(route, navigator, index, navState) {
                switch (route.id) {
                    case 'Home':
                        return self.createHomeButton(self.eventEmitter);

                    default:
                        if (self.useBackButton) {
                            return self.createBackButton(self.eventEmitter);
                        }
                        return self.createHomeButton(self.eventEmitter);
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
