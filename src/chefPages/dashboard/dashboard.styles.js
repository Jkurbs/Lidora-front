import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("screen");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },

    mainView: {
        height: '100%',
        flexDirection: 'colunm',
        backgroundColor: 'white'
    },

    modalContainer: {
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '60%',
        height: 200,
        borderRadius: 6,
        flexDirection: 'column',
        justifyContent: 'space-around'
    },

    modalInputView: {
        paddingTop: 30,
        paddingLeft: 20,
        paddingBottom: 20
    },

    modalInputText: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 16
    },

    modalInput: {
        backgroundColor: '#f4f9f4',
        height: 40, width: 250,
        paddingHorizontal: 16,
        borderRadius: 6
    },

    inputButtonView: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        height: 80
    },

    modalSaveButton: {
        marginLeft: 20,
        marginRight: 20
    },

    averageView: {
        width: '60%',
        margin: 30
    },

    averageViewTextView: {
        margin: 16
    },

    averageMainText: {
        color: 'black',
        fontSize: 18,
        marginRight: 8
    },

    emptyView: {
        height: 400,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    emptyText: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 14,
        marginRight: 8
    },

    chartContainer: {
        height: 400,
        width: '100%',
        flexDirection: 'row'
    },

    chartView: {
        flex: 1,
        marginLeft: 10
    },

    chart: {
        flex: 1
    },



    goalContainer: {
        margin: 20,
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },


    goalShadowView: {
        alignSelf: 'center',
        backgroundColor: 'white',
        margin: 20,
        width: 300,
        height: 120,
        borderRadius: 10,
        shadowColor: 'black',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    goalView: {
        flexDirection: 'column',
        margin: 16

    },

    goalAmountText: {
        fontSize: 20,
        fontWeight: '500',
        marginRight: 8
    },

    goalDescriptionText: {
        color: 'black',
        fontSize: 15,
        marginRight: 8
    },

    goalButton: {
        marginTop: 10,
        height: 60,
        width: 100
    },

    goalButtonText: {
        marginTop: 10, height: 60, width: 100
    },

    goalProgressContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        right: 20,
    },

    progressCircle: {
        height: 90,
        width: 90
    },

    progressText: {
        position: 'absolute'
    },

    separator: {
        alignSelf: 'center',
        height: 0.5,
        width: "100%",
        backgroundColor: '#D6D6D6'
    },

    rightPanelContainer: {
        position: 'absolute',
        right: 0,
        width: '35%',
        height: '100%',
        backgroundColor: '#F5F5F7',
        padding: 20
    },

    headerView: {
        marginTop: 20,
        marginBottom: 20
    },


    valueContainer: {
        marginBottom: 20
    },

    descriptionText: {
        color: 'rgb(99, 99, 102)',
        marginBottom: 8
    },

    valueText: {
        fontWeight: '500',
        fontSize: 18
    },


    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
});
