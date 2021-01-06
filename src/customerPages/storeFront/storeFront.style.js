
import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window")

export default StyleSheet.create({

    container: {
        fontFamily: "System",
        backgroundColor: 'white',
        flex: 1,
        overflow: 'hidden', 
        textTransform: 'capitalize'

    },

    topBar: {
        justifyContent: 'center',
        alignItems: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000, 
        elevation: 1000
      },


    sectionList: {
        flexGrow: 0
    },

    listItemSeparatorStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '500',
        paddingLeft: 20,
        marginTop: 20
    },

    storeImage: {
        width: 80,
        height: 80, 
        borderRadius: 40, 
        borderWidth: 4, 
        borderColor: '#ecf0f1'
    },

    title: {
        fontSize: 18,
        fontWeight: '500', 
        textAlign: 'center'
    },

    description: {
        marginTop: 16,
        color: 'gray',
        fontSize: 14, 
        textAlign: 'center'
    },

    info: {
        color: 'gray',
        fontSize: 14, 
        textAlign: 'center'
    },

    storeInfoContainer: {
        padding: 20
    },

    menuImage: {
        width: 65,
        height: 65,
        borderRadius: 5
    },

    menuName: {
        fontSize: 18,
    },

    menuDescription: {
        marginTop: 8,
        fontSize: 15,
        color: 'gray',
    },

    menuPrice: {
        marginTop: 8,
        fontSize: 14,
    },

    header: {
        width: '100%',
        height: 50,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center', 
    },

    headerTitle: {
        fontSize: 17,
        fontWeight: '600',
        alignSelf: 'center'
    },



    comboImage: {
        width: 40,
        height: 40,
        borderRadius: 20, 
        marginRight: 16
    },

    bagContainer: {
        // flex:1,
        height: height,
        backgroundColor: 'white', 
    },

    itemDescriptionContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }, 

    contentContainerStyle: {
        padding: 16,
        backgroundColor: '#F3F4F9',
    },
      panelHandle: {
        width: 40,
        height: 2,
        backgroundColor: 'rgba(0,0,0,0.3)',
        borderRadius: 4
      },
      item: {
        padding: 20,
        justifyContent: 'center',
        backgroundColor: 'white',
        alignItems: 'center',
        marginVertical: 10,
      },
})


