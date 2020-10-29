import { StyleSheet } from 'react-native'

const userImageViewSize = 120

export default StyleSheet.create({

    container: {
        width: "100%",

        fontFamily: 'System',
        flex: 1,
        backgroundColor: '#fff',
    },
    userImage: {
        marginTop: 8.0,
        marginLeft: 13.0,
        width: userImageViewSize,
        height: userImageViewSize,
        position: "absolute",
        borderRadius: userImageViewSize / 2,
    },
    userName: {
        marginLeft: userImageViewSize + 32.0,
        marginRight: -13.0,
        marginTop: 8.0,
        fontSize: 21,
        fontWeight: "bold"
    },
    lineStyle: {
        borderWidth: 0.3,
        borderColor: '#CCCCCC',
        marginLeft: 13.0
    },
    schedule: {
        alignContent: 'flex-end'
    },

    // User Icons 
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: userImageViewSize + 32.0,
        marginTop: 13.0,
    },

    icons: {
        paddingRight: 8,
    },

    // Menu
    root: {
        marginTop: 21,
        padding: 8,
    },
    titleContainer: {
        shadowColor: '#00000021',
        shadowOffset: {
            width: 2
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
    },
    title: {
        fontSize: 18,
        color: "#000000"
    },
    menuContainer: {
        paddingVertical: 20,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    content: {
        marginLeft: 13,
        flex: 1,
    },
    contentHeader: {
        justifyContent: 'space-between',
        marginBottom: 6
    },
    separator: {
        height: 1,
        backgroundColor: "#CCCCCC"
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 10,
        marginLeft: 20,
        marginRight: 16.0,
    },
    time: {
        fontSize: 11,
        color: "#808080",
    },
    name: {
        fontSize: 16,
        fontWeight: '500'
    },
    description: {
        fontSize: 14,
        marginRight: 16.0,
        marginTop: 8.0,
        marginBottom: 8.0
    },
    price: {
        fontSize: 15,
        fontWeight: '600'
    }
});