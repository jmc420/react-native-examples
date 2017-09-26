import * as React from 'react';
import { Platform, StyleSheet, ViewStyle } from "react-native";

const styles = StyleSheet.create({
    
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        flex: 1,
        flexDirection: 'column',
        top: (Platform.OS === 'ios') ? 70 : 0
    } as ViewStyle,
    menuContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: 'row',
        top: (Platform.OS === 'ios') ? 20 : 0
    } as ViewStyle,
    menuItem: {
        backgroundColor: '#FFF',
        color: '#3F51B5',
        fontSize: 16,
        padding: 10,
        paddingLeft:20,
        textAlign: 'left'
    } as ViewStyle,
    navBar: {
        backgroundColor: '#3F51B5'
    },
    navBarText: {
        color: 'white',
        fontSize: 16,
        marginVertical: 10,
    },
    navBarTitleText: {
        fontWeight: '500',
        marginVertical: 9,
    },
    navBarLeftButton: {
        paddingLeft: 10,
        paddingTop: 5
    },
    navBarRightButton: {
        paddingRight: 10,
        paddingTop: 5
    },
    toolBar: {
        backgroundColor: '#3F51B5',
        height:56
    },
});

export default styles;
