import * as React from 'react';
import { Text } from 'react-native';

import EventEmitter = require('eventemitter3');

import Home from './views/Home';
import IRoute from './IRoute';
import View1 from './views/View1';
import View2 from './views/View2';

export default class Navigation extends React.Component<any, any> {

    protected eventEmitter: EventEmitter;
    protected menuItems: string[];
    protected routeMap: { [id: string]: IRoute } = {};

    constructor() {
        super();

        this.routeMap = this.createRouteMap();
        this.menuItems = this.createMenuItems(this.routeMap);
        this.eventEmitter = new EventEmitter();
    }

    // protected methods used by sub classes

    protected renderScene(route, navigator) {

        switch (route.id) {
            case 'Home':
                return (<Home />);

            case 'View1':
                return (<View1 />);

            case 'View2':
                return (<View2 />); 
        }
    }

    // private methods

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
            }
        }
    }
} 