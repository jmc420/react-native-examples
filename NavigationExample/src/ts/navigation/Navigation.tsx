import * as React from 'react';
import { Content, Drawer, Text, List, Icon } from 'native-base';

import { NavigationActions, NavigationContainer, NavigationRouteConfigMap, StackNavigator, StackNavigatorConfig } from 'react-navigation';
import EventEmitter = require('eventemitter3');

import styles from "../styles/Styles";
import EventBus from "../event/EventBus";
import Home from "../views//Home";
import IRoute from "./IRoute";
import Settings from "../views/Settings";
import SideBar from "./SideBar";
import View1 from "../views/View1";
import View2 from "../views/View2";

var AppNavigator;

export default class Navigation extends React.Component<any, any> {

    private dispatcher:any;
    private drawer: any;
    private eventEmitter: EventEmitter;
    private menuItems: string[];
    private navigationContainer: NavigationContainer;
    private navigationRouteMap:NavigationRouteConfigMap;
    protected routeMap: { [id: string]: IRoute } = {};
    private useBackButton;

    constructor() {
        super();

        let eventBus: EventBus = new EventBus();
        let options: StackNavigatorConfig = {
            headerMode: 'none',
            initialRouteName:'View1'
        };

        this.eventEmitter = eventBus.getEventEmitter();
        this.useBackButton = false;
        this.routeMap = this.createRouteMap();
        this.navigationRouteMap = this.createNavigationRouteConfig();
        this.menuItems = this.createMenuItems(this.routeMap);
        this.navigationContainer = StackNavigator(this.navigationRouteMap, options);
        AppNavigator = this.navigationContainer;
    }

    componentDidMount() {
        this.eventEmitter.addListener(EventBus.DRAWER_EVENT, () => {
            this.drawer._root.open();
        });

        this.eventEmitter.addListener(EventBus.MENU_REPLACE_EVENT, (option: string) => {
            this.drawer._root.close();
            console.log("Option " + option);
            this.navigateToScreen(option, false);
        }, this);

        this.eventEmitter.addListener(EventBus.MENU_POP_EVENT, () => {
            console.log("Pop");
            NavigationActions.back();
        }, this);

        this.eventEmitter.addListener(EventBus.MENU_PUSH_EVENT, (option: string) => {
            this.drawer._root.close();
            console.log("Option " + option);
            this.navigateToScreen(option, true);
        }, this);
    }

    render() {
        var self = this;

        return (
            <Drawer
                ref={(ref) => { this.drawer = ref; }}
                content={<SideBar menuItems={this.menuItems} />}
                onClose={() => console.log("Close drawer")}>
                <AppNavigator ref={nav => { this.dispatcher = nav; }/>
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

    private createNavigationRouteConfig(): NavigationRouteConfigMap {
        let config: NavigationRouteConfigMap = {
            Home: { screen: Home },
            View1: { screen: View1 },
            View2: { screen: View2 },
            Settings: { screen: Settings },
        }
        return config;
    }

    private navigateToScreen(option, useBackButton: boolean) {

        if (useBackButton) {
            let navigateAction = NavigationActions.navigate({
                routeName: option
            });
            this.dispatcher.dispatch(navigateAction);
        }
        else {
            let resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: option})
                ]
              });
              this.dispatcher.dispatch(resetAction);
        }

    }

}
