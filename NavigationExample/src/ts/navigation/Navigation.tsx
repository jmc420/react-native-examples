import * as React from 'react';
import { Content, Drawer, Text, List, Icon } from 'native-base';

import { NavigationActions, NavigationContainer, NavigationRouteConfigMap, StackNavigator, StackNavigatorConfig } from 'react-navigation';
import EventEmitter = require('eventemitter3');

import styles from "../styles/Styles";
import EventBus from "../event/EventBus";
import Home from "../views//Home";
import IRoute from "./IRoute";
import RouteMapFactory from "./RouteMapFactory";
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
    private navigationRouteMap:NavigationRouteConfigMap;
    private routeMap: { [id: string]: IRoute } = {};
    private useBackButton;

    constructor(props) {
        super(props);

        let eventBus: EventBus = new EventBus();

        this.eventEmitter = eventBus.getEventEmitter();
        this.useBackButton = false;
        this.navigationRouteMap = this.createNavigationRouteConfig();
        this.menuItems = this.createMenuItems(this.navigationRouteMap);
        this.routeMap = RouteMapFactory.createRouteMap();
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
            let backAction = NavigationActions.back({
            });
            this.dispatcher.dispatch(backAction);
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
                {this.renderNavigator()}
            </Drawer>
        );
    }

    private createMenuItems(routeMap:NavigationRouteConfigMap): string[] {
        var result: string[] = [];

        for (var key in routeMap) {
            result.push(key);
        }
        return result;
    }

    private createNavigationRouteConfig(): NavigationRouteConfigMap {
        let config: NavigationRouteConfigMap = {
            Home: { screen: Home,
            navigationOptions: {title: 'Home' }},
            View1: { screen: View1 },
            View2: { screen: View2 },
            Settings: { screen: Settings },
        }
        return config;
    }

    private navigateToScreen(option, useBackButton: boolean) {
        let params = this.routeMap[option].props.navigation.state.params;

        if (useBackButton) {
            let navigateAction = NavigationActions.navigate({
                routeName: option,
                params: params
            });
            this.dispatcher.dispatch(navigateAction);
        }
        else {
            let resetAction = NavigationActions.reset({
                index: 0,
                actions: [
                  NavigationActions.navigate({ routeName: option, params:params})
                ]
              });
              this.dispatcher.dispatch(resetAction, params);
        }
    }

    private renderNavigator() {
        let options: StackNavigatorConfig = {
            headerMode: 'none',
            initialRouteName:'Home',
            initialRouteParams:this.routeMap["Home"].props.navigation.state.params
        };
        let navigator = StackNavigator(this.navigationRouteMap, options);

        return React.createElement(navigator, { ref: nav => { this.dispatcher = nav; } });
    }

}
