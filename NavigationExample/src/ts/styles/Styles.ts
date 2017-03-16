
import { React, StyleSheet } from "react-native";

const styles = StyleSheet.create({
    
    container: {
        //justifyContent: "center",
        //alignItems: "center",
        backgroundColor: "#F0F8FF",
        flex: 1,
        flexDirection: 'column',
        top: 70
    } as React.ViewStyle,

    menuContainer: {
        backgroundColor: '#FFF',
        flex: 1,
        flexDirection: 'row',
        top: 20
    },
    menuItem: {
        color: '#3F51B5',
        padding: 10,
        textAlign: 'left'
    },

    navBar: {
        backgroundColor: '#3F51B5',
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
    scene: {
        flex: 1,
        paddingTop: 63,
    }
});

export default styles;
