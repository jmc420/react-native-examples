import * as React from 'react';
import { Content, Drawer, Text, List, Icon } from 'native-base';

import { Navigator} from 'react-native-deprecated-custom-components';
import EventEmitter = require('eventemitter3');

import styles from '../styles/Styles';
import EventBus from "../event/EventBus";
import Home from "../views//Home";
import IRoute from "./IRoute";
import RouteMapFactory from "./RouteMapFactory";
import Settings from "../views/Settings";
import SideBar from "./SideBar";
import View1 from "../views/View1";
import View2 from "../views/View2";

export default class Navigation extends React.Component<any, any> {

    private drawer: any;
    private eventEmitter: EventEmitter;
    private menuItems: string[];
    private navigator: Navigator;
    private routeMap: { [id: string]: IRoute } = {};
    private useBackButton;

    constructor(props) {
        super(props);

        let eventBus: EventBus = new EventBus();

        this.eventEmitter = eventBus.getEventEmitter();
        this.useBackButton = false;
        this.routeMap = RouteMapFactory.createRouteMap();
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
                    initialRoute={this.routeMap["Home"]}
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
                return (<Home navigation={route.props.navigation}/>);

            case 'View1':
                return (<View1 navigation={route.props.navigation}/>);

            case 'View2':
                return (<View2 navigation={route.props.navigation}/>);

            case 'Settings':
                return (<Settings navigation={route.props.navigation}/>);
        }
    }

}
