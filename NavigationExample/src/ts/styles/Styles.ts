
import { Platform, React, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    container: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#FFF",
        flex: 1,
        flexDirection: 'column',
        top: (Platform.OS === 'ios') ? 70 : 0
    },
    menuContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: 'row',
        top: 20
    },
    menuItem: {
        backgroundColor: '#FFF',
        color: '#3F51B5',
        padding: 0,
        textAlign: 'left'
    },
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
