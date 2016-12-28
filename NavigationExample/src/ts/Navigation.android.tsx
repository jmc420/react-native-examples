import * as React from 'react';
import {Text,View} from 'react-native';
import * as Ionicons from 'react-native-vector-icons/Ionicons';

import styles from './Styles';

export default class Navigation extends React.Component<any,any> {
 
  constructor() {
    super();

  }

  componentDidMount() {
    
  }

  render() {
        return (
            <View style={{flex: 1}}>
             <Ionicons.ToolbarAndroid
                actions={[{title: 'Settings', iconName: 'md-settings', show: 'always', showWithText: false}]}
                navIconName="md-menu"
                onActionSelected={this.onActionSelected}
                onIconClicked={this.onIconClicked}       
                style={{backgroundColor:'green', height:56}}
                titleColor="white"
                title=""/>
             <View style={{flex: 1}}>
                <Text>Content</Text>
             </View>   
            </View>
        );
    }

    onActionSelected(position) {
        console.log("Action "+position);
        if (position === 0) { // index of 'Settings'
        }
    }

    onIconClicked() {
        console.log("Menu clicked ");
    }
}
