
import { StyleSheet, Dimensions } from "react-native";
const { height } = Dimensions.get("window")

export default StyleSheet.create({

    container: {
        fontFamily: "System",
        backgroundColor: 'white',
        flex: 1,
        overflow: 'hidden', 
        textTransform: 'capitalize', 
        color: '#24292E'
    },

    secondaryText: {
        fontSize: 15,
        color: '#586069'
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

    mainButton: { 
        backgroundColor: '#2EA44F', 
        justifyContent: 'center', 
        marginTop: 28, 
        borderRadius: 5, 
        height: 60, 
        width: '90%', 
        alignSelf: 'center', 
        position: 'absolute', 
        bottom: 16, 
        marginBottom: 20, 
    },

    mainButtonDisable: { 
        backgroundColor: '#2EA44F', 
        opacity: 0.5,
        justifyContent: 'center', 
        marginTop: 28, 
        borderRadius: 5, 
        height: 60, 
        width: '90%', 
        alignSelf: 'center', 
        position: 'absolute', 
        bottom: 16, 
        marginBottom: 20, 
    },

    mainButtonContainer: {
        alignSelf: 'center', 
        justifyContent: 'space-around', 
        flexDirection: 'row'
    },

    mainButtonText: {
        color: '#F6F8FA', 
        alignSelf: 'center', 
        fontWeight: '600', 
        fontSize: 17
    },

    mainButtonSecondaryText: {
        alignSelf: 'flex-end', 
        color: '#F6F8FA', 
        marginLeft: 8, 
        fontWeight: '600', 
        fontSize: 17
    },

    mainButtonAccessory: {
        position: 'absolute', 
        right: 20, 
        justifyContent: 'center', 
        alignSelf: 'center', 
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        backgroundColor: 'rgba(000,000,000, 0.3)'
    },

    mainButtonAccessoryText: {
        fontWeight: '600', 
        fontSize: 17, 
        alignSelf: 'center', 
        color: 'white'
    },

    // NavBar
    navBarContainer: {
        backgroundColor: 'white', 
        height: 45, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: '#ecf0f1'
    },

    navBarRightButtonContainer: { 
        width: '100%', 
        height: '100%', 
        alignItems: 'center' , 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    navBarRightButtonInnerContainer: { 
        position: 'absolute', 
        right: 16, 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'center'
    },

    navBarRightButton: { 
        alignSelf: 'flex-end', 
        margin: 8 , 
        fontWeight: '500' 
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
        fontSize: 17,
        fontWeight: '500',
        paddingLeft: 20,
        marginTop: 20
    },

    storeImage: {
        width: 100,
        height: 100, 
        borderRadius: 50, 
        borderWidth: 4, 
        borderColor: '#ecf0f1', 
    },

    title: {
        fontSize: 18,
        fontWeight: '500', 
        textAlign: 'center'
    },

    description: {
        marginTop: 16,
        color: '#586069',
        fontSize: 14, 
        textAlign: 'center'
    },

    info: {
        color: '#586069',
        fontSize: 14, 
        textAlign: 'center'
    },

    storeInfoContainer: {
        padding: 20
    },

    // Menu Cell 
    menuContainer: {
        alignItems: 'center',
        margin: 20,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    menuInnerContainer: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '70%' 
    },

    menuImage: {
        width: 65,
        height: 65,
        borderRadius: 5
    },

    menuName: {
        fontSize: 16,
        fontWeight: '500'
    },

    menuDescription: {
        marginTop: 8,
        fontSize: 13,
        color: '#586069',
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
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10 
    },

    sectionListHeaderButton: {
        justifyContent: 'center', position: 'absolute', left: 16 
    },

    sectionListHeaderText: {
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
        // paddingBottom: '70%'
    },

    stepperContainer: { 
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20, 
        borderRadius: 10, 
        borderColor: 'rgba(27, 31, 35, 0.15)', 
        borderWidth: 1, 
        width: 150, 
        alignSelf: 'center', 
        flexDirection: 'row', 
        justifyContent: 'space-around'
    },

    stepperText: { 
        alignSelf: 'center',
        color: 'gray', 
        fontWeight: '500'
    },

    stepperButton: { 
        width: 60, 
        height: 60, 
        borderRadius: 30, 
        justifyContent: 'center'
    },

    // group 
    groupContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 8, 
        marginLeft: 20,
        marginRight: 20,
        flexDirection: 'row'
    },


    // Checkout 
    checkoutItemCellContainer: {
        padding: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }, 

    checkoutItemContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    checkoutItemRightContainer: {
        alignSelf: 'center', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center'
    },

    menuQuantity: {
        fontWeight: '600', 
        marginRight: 8, 
        color: '#586069'
    },

    totalContainer: {
        margin: 20
    },

    totalInnerContainer: {
        paddingBottom: 20, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    

    Container: {
        flexDirection: 'column',
        maxWidth: '50%'
    },

    // Totals 
    totalItemTitle: {
        fontSize: 14, 
    },

    totalItemValue: {
        fontSize: 14,
        fontWeight: '500'
    },

    removeImage: {
        marginLeft: 14,
        width: 25, 
        height: 25, 
        tintColor: '#586069', 
    }, 

    inputContainerWrapper: { 
        padding: 20, 
        alignItems: 'center', 
        flexDirection: 'column', 
        justifyContent: 'space-between'
    },

    inputContainer: { 
        width: '100%', 
        flexDirection: 'column', 
        justifyContent: 'space-between'
    }, 

    inputTitle: {
        marginTop: 16,
        fontWeight: '490'
    },

    input: {
        marginTop: 8,
        padding: 8,
        padding: 8,
        fontSize: 14,
        borderColor: '#d6d6d6',
        borderWidth: 1,
        borderRadius: 5,
        height: 50,
        backgroundColor: 'white'
    },

    loginButton: {
        borderWidth: 1,
        borderRadius: 6,
        marginTop: 20,
        height: 50,
        width: '100%',
        justifyContent: "center",
        borderColor: 'rgba(27, 31, 35, 0.15)',
        backgroundColor: '#2EA44F'
    },

    loginText: {
        color: 'white',
        textAlign: "center",
        fontWeight: '500',
        fontSize: 15
    },


    // Cart 
    removeAlertContainer: {
        padding: 20, 
        backgroundColor: 'white', 
        paddingBottom: 20
    },

    removeAlertTitle: { 
        fontSize: 20, 
        fontWeight: '600', 
        marginBottom: 8
    }, 

    removeAlertDescription: {
        fontSize: 14
    }, 

    removeAlertButton: { 
        backgroundColor: '#FF7B72', 
        justifyContent: 'center', 
        marginTop: 16, 
        borderRadius: 5, 
        height: 60, 
        width: '100%', 
        alignSelf: 'center'
    }, 

    removeAlertButtonText: { 
        alignSelf: 'center', 
        color: 'white', 
        fontWeight: '600', 
        fontSize: 17
    },

    removeAlertSecondaryButton: { 
        justifyContent: 'center', 
        marginTop: 16, 
        borderRadius: 5, 
        height: 60, 
        width: '100%', 
        alignSelf: 'center'
    }, 

    removeAlertSecondaryButtonText: {
        alignSelf: 'center', 
        fontWeight: '600', 
        fontSize: 17
    }, 
})


