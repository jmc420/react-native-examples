import * as React from 'react';
import { DrawerLayoutAndroid, Text, View } from 'react-native';
import * as Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './Styles';

interface ToolbarProps {
    sidebarRef:DrawerLayoutAndroid;
}

export default class Toolbar extends React.Component<ToolbarProps, any> {

   protected sidebarRef:DrawerLayoutAndroid;

   constructor(props) {
    super(props);
    this.sidebarRef = props.sidebarRef;
  }

    componentDidMount() {

    }

    render() {
        return (
            <Ionicons.ToolbarAndroid
                actions={[{ title: 'Settings', iconName: 'md-settings', show: 'always', showWithText: false }]}
                navIconName="md-menu"
                onActionSelected={(position) => { this.onActionSelected(position)}}
                onIconClicked={() => {this.onIconClicked()}}
                style={{ backgroundColor: 'green', height: 56 }}
                titleColor="white"
                title="" />
        );
    }

    onActionSelected(position) {
        console.log("Action " + position);
        if (position === 0) { // index of 'Settings'
        }
    }

    onIconClicked() {
        console.log("Menu clicked ");
         this.sidebarRef.refs['DRAWER'].openDrawer();
    }
}
