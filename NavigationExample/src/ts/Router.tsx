import * as React from 'react';
import { ListView, Text, TouchableOpacity, View } from 'react-native';

import EventEmitter = require('eventemitter3');

import styles from './styles/Styles';

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
        let ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
            dataSource: ds.cloneWithRows(this.menuItems)
        };
    }

    // protected methods used by sub classes

    protected onItemSelect(item) {

    }

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

    protected renderNavigation() {
        return (
            <ListView
                style={styles.menuContainer}
                dataSource={this.state.dataSource}
                renderRow={(item) => this.renderMenuItem(item)}
            />
        );
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

    private renderMenuItem(item) {
        return (
            <TouchableOpacity onPress={() => this.onItemSelect(item)}>
                <Text style={styles.menuItem}>{item}</Text>
            </TouchableOpacity>
        );
    }
} 