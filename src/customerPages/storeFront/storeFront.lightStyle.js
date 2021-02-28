
import { StyleSheet, Dimensions } from "react-native";
const { width, height } = Dimensions.get("window")

export default StyleSheet.create({

    // Backgrounds
    background: {
        fontFamily: "System",
        flex: 1,
        overflow: 'hidden', 
        textTransform: 'capitalize', 
    },

    // Texts

    textCentered: {
        alignSelf: 'center', 
        textAlign: 'center', 
        fontWeight: '600',
        fontSize: 16,
        color: 'white',
    }, 


    // MainNavBar 
    navBarBackground: {
        height: 45, 
        alignItems: 'center', 
        justifyContent: 'center', 
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

    // Chef Highlight

    chefHighlightContainer: {
        justifyContent: 'center',
        alignItems: "center",
        padding: 20
    },

    storeImage: {
        width: 100,
        height: 100, 
        borderRadius: 50, 
        borderWidth: 4, 
    },

    title: {
        fontSize: 17, 
        alignSelf: 'center',
        padding: 8,
        borderRadius: 10
    },

    description: {
        marginTop: 16,
        alignSelf: 'center', 
        textAlign: 'center'
    },

    storeInfoContainer: {
        padding: 20
    },
        
    info: {
        textAlign: 'center'
    },

     // Menu 
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
        fontSize: 14,
        fontWeight: '500', 
    },

    menuPrice: {
        marginTop: 8,
        fontSize: 14,
    },

    // Buttons 
    buttonPrimaryContainer: {
        alignSelf: 'center', 
        justifyContent: 'space-around', 
        flexDirection: 'row'
    },

    buttonPrimary: {       
        position: 'absolute',
        bottom: 30
    },

    buttonPrimaryDisable: { 
        opacity: 0.5,
        backgroundColor: '#2EA44F',
        borderColor: 'rgba(27, 31, 35, 0.15)', 
        borderWidth: 1, 
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

    buttonPrimaryText: {
        alignSelf: 'center', 
        fontWeight: '600', 
        fontSize: 17
    },

    primaryButtonSecondaryText: {
        alignSelf: 'center', 
        fontWeight: '600', 
        fontSize: 17, 
        color: '#fff'
    },

    primaryButtonAccessory: {
        position: 'absolute', 
        right: 20, 
        justifyContent: 'center', 
        alignSelf: 'center', 
        width: 30, 
        height: 30, 
        borderRadius: 15, 
        backgroundColor: 'rgba(000,000,000, 0.3)'
    },

    buttonSecondary: { 
        backgroundColor: '#2EA44F',
        borderColor: 'rgba(27, 31, 35, 0.15)', 
        borderWidth: 1
    },

    mainButtonAccessoryText: {
        fontWeight: '600', 
        fontSize: 17, 
        alignSelf: 'center', 
    },

    sectionList: {
        height: height, 
        width: '100%',
    },

    listItemSeparatorStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#E1E4E8',
    },

    sectionTitle: {
        paddingLeft: 20,
        marginTop: 20, 
        fontSize: 17, 
    },

    sectionListHeader: {
        width: '100%',
        height: 50,
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
        borderRadius: 5, 
        marginRight: 16
    },


    // BottomSheet
    bagContainer: {
        height: height,
    },

    itemDescriptionContainer: {
        marginTop: 30,
        marginBottom: 30,
        padding: 20,
        flexDirection: 'column',
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
        paddingRight: 16,
        margin: 10,
        justifyContent: 'center',
        alignItems: 'center',
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
        marginBottom: 50
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
        padding: 20,
        flexDirection: 'row'
    },

    // Checkout 
    checkoutItemCellContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    }, 

    checkoutItemContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'center', 
    },

    checkoutItemRightContainer: {
        alignSelf: 'center', 
        flexDirection: 'row', 
        justifyContent: 'center', 
        alignItems: 'center', 
    },

    menuQuantity: {
        fontWeight: '600', 
        marginRight: 8, 
        alignSelf: 'center'
    },

    totalContainer: {
        margin: 20
    },

    totalInnerContainer: {
        paddingBottom: 20, 
        flexDirection: 'row', 
        justifyContent: 'space-between'
    },

    // Totals 
    totalItemTitle: {
        fontSize: 14, 
    },
    
    removeImage: {
        marginLeft: 14,
        width: 25, 
        height: 25, 
        tintColor: '#586069', 
        alignSelf: 'center'
    }, 

    inputContainerWrapper: {
        width: '100%',
        // marginTop: 50, 
        padding: 20, 
        paddingTop: 0,
        alignItems: 'center', 
        flexDirection: 'column', 
        justifyContent: 'space-between'
    },

    inputContainer: { 
        marginTop: 8,
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
        fontSize: 17
    }, 


    // Checkout 

    checkoutDetailsContainer: {
        margin: 20,
        justifyContent: 'center'
    },
    
    checkoutDetailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },


    cardImage: {
        width: 30,
        height: 30,
        borderRadius: 2,
        marginRight: 16,
        alignSelf: 'center'
    }

})


