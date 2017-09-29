import * as React from 'react';
import { Content, Drawer, Text, List, Icon } from 'native-base';

import { Navigator} from 'react-native-deprecated-custom-components';
import EventEmitter = require('eventemitter3');

import styles from '../styles/Styles';
import EventBus from "../event/EventBus";
import Home from "../views//Home";
import IRoute from "./IRoute";
import Settings from "../views/Settings";
import SideBar from "./SideBar";
import View1 from "../views/View1";
import View2 from "../views/View2";

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
        this.eventEmitter.addListener(EventBus.DRAWER_EVENT, () => {
            this.drawer._root.open();
        });

        this.eventEmitter.addListener(EventBus.MENU_REPLACE_EVENT, (option: string) => {
            this.drawer._root.close();
            console.log("Option " + option);
            this.navigateToScreen(option, false);
        });

        this.eventEmitter.addListener(EventBus.MENU_POP_EVENT, () => {
            var routes = this.navigator.getCurrentRoutes();

            if (routes.length == 0) {
                return false;
            }
            console.log("Pop");
            this.navigator.pop();
        });

        this.eventEmitter.addListener(EventBus.MENU_PUSH_EVENT, (option: string) => {
            this.drawer._root.close();
            console.log("Option " + option);
            this.navigateToScreen(option, true);
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

    private navigateToScreen(item, useBackButton:boolean) {
        if (useBackButton) {
            this.navigator.push(this.routeMap[item]);
        }
        else {
            this.navigator.replace(this.routeMap[item]);
        }
    }

    private renderScene(route, navigator) {

        switch (route.id) {
            case 'Home':
                return (<Home title="Home" back={false}/>);

            case 'View1':
                return (<View1 title="View1" back={false}/>);

            case 'View2':
                return (<View2 title="View2" back={false}/>);

            case 'Settings':
                return (<Settings title="Settings" back={true}/>);
        }
    }

}
