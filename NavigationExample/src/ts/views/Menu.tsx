import * as React from 'react';
import { Button, ListView, View } from 'react-native';

import styles from '../styles/Styles';

export default class Menu extends React.Component<any, any> {

    private navigate;

    constructor(props) {
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2
            })
        };
        this.navigate = props.navigate;
    }

    componentDidMount() {
        this.setState({
            dataSource: this.state.dataSource.cloneWithRows(['Home', 'View1', 'View2'])
        });
    }

    renderMenuItem(item) {
        return (
            <Button title={item} style={styles.menuItem} onPress={() => this.onItemSelect(item)}>{item}</Button>
        );
    }

    onItemSelect(item) {
        this.navigate(item);
    }

    render() {
        return (
            <ListView
                style={styles.menuContainer}
                dataSource={this.state.dataSource}
                renderRow={(item) => this.renderMenuItem(item)}
            />
        );
    }
}