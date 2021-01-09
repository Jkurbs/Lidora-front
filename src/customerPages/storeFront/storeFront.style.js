
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
        width: 100,
        height: 100, 
        borderRadius: 50, 
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
        fontSize: 16,
    },

    menuDescription: {
        marginTop: 8,
        fontSize: 13,
        color: 'gray',
    },

    menuPrice: {
        marginTop: 8,
        fontSize: 14,
    },

    sectionListHeader: {
        width: '100%',
        height: 50,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        justifyContent: 'center', 
    },

    sectionListHeaderButton: {
        justifyContent: 'center', position: 'absolute', left: 16 
    },

    sectionListHeaderText: {
        color: '#34C759', 
        fontSize: 17, 
        fontWeight: '500', 
        alignSelf: 'center' 
    },

    sectionListHeaderSeparator: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#C8C8C8',
        position: 'absolute',
         bottom: 0
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

    itemDescriptionContentContainer: {
        flexDirection: 'column',
        maxWidth: '50%'
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


      // Bag 
      backdrop: {
        backgroundColor: '#000',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      },

      bagSectionList: {
        borderTopLeftRadius: 5, 
        borderTopRightRadius: 5,
         marginTop: 30, 
         paddingBottom: '70%'
      },

      // group 
      groupContainer: {
        alignItems: 'center',
        margin: 20, 
        flexDirection: 'row'
      }

})


