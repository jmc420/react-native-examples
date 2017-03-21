import * as React from 'react';
import { Content, Drawer, Text, List, Icon } from 'native-base';

import { Navigator } from 'react-native';
import EventEmitter = require('eventemitter3');

import styles from '../styles/Styles';
import EventBus from "../EventBus";
import Home from './Home';
import IRoute from '../IRoute';
import Settings from './Settings';
import SideBar from './SideBar';
import View1 from './View1';
import View2 from './View2';

export default class Navigation extends React.Component<any, any> {

    private drawer: any;
    private eventEmitter: EventEmitter;
    private menuItems: string[];
    private navigator: Navigator;
    protected routeMap: { [id: string]: IRoute } = {};
    private useBackButton;

    constructor() {
        super();

        let eventBus: EventBus = new EventBus();

        this.eventEmitter = eventBus.getEventEmitter();
        this.useBackButton = false;
        this.routeMap = this.createRouteMap();
        this.menuItems = this.createMenuItems(this.routeMap);
    }

    componentDidMount() {
        var self = this;

        this.eventEmitter.addListener(EventBus.DRAWER_EVENT, () => {
            self.drawer._root.open();
        });

        this.eventEmitter.addListener(EventBus.MENU_EVENT, (option: string) => {
            self.drawer._root.close();
            console.log("Option " + option);
            this.navigateToScreen(option);
        });
    }

    render() {
        var self = this;

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar menuItems={this.menuItems} />}
                onClose={() => console.log("Close drawer")}>
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
            </Drawer>
        );
    }

    private createMenuItems(routeMap: { [id: string]: IRoute }): string[] {
        var result: string[] = [];

        for (var key in routeMap) {
            var route: IRoute = routeMap[key];

            result.push(route.id);
        }
        return result;
    }

    private createRouteMap(): { [id: string]: IRoute } {
        return {
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
            },
            'Settings': {
                title: 'Settings',
                id: 'Settings'
            }
        }
    }

    private navigateToScreen(item) {
        if (this.useBackButton) {
            this.navigator.push(this.routeMap[item]);
        }
        else {
            this.navigator.replace(this.routeMap[item]);
        }
    }

    private renderScene(route, navigator) {

        switch (route.id) {
            case 'Home':
                return (<Home />);

            case 'View1':
                return (<View1 />);

            case 'View2':
                return (<View2 />);

            case 'Settings':
                return (<Settings />);
        }
    }

}