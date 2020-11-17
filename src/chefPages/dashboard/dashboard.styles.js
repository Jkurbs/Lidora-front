import { StyleSheet, Dimensions } from "react-native";

const { height: windowHeight } = Dimensions.get("screen");

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F7',
    },

    mainView: {
        height: '100%',
        flexDirection: 'colunm',
        backgroundColor: '#F5F5F7',
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
        height: 300,
        width: '95%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 8,
        marginRight: 60,
        shadowColor: 'black',
        shadowColor: "#000",
        // shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },

    emptyText: {
        alignSelf: 'center',
        color: 'black',
        fontSize: 14,
        marginRight: 8
    },

    chartContainer: {
        height: '80%',
        width: '100%',
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 20,
        marginBottom: 20
    },

    chartView: {
        flex: 1,
        marginLeft: 10
    },

    chart: {
        flex: 1
    },

    goalContainer: {
        marginLeft: 15,
        marginRight: 15,
        width: '60%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },


    goalShadowView: {
        marginBottom: 20,
        alignSelf: 'center',
        backgroundColor: 'white',
        width: '45%',
        height: 120,
        borderRadius: 6,
        shadowColor: 'black',
        shadowColor: "#000",
        // shadowOffset: { width: 5, height: 5 },
        shadowOpacity: 0.1,
        shadowRadius: 10,
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
        fontSize: 13,
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
        height: 80,
        width: 80
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
        backgroundColor: 'white',
        margin: 30,
        padding: 20,
        borderRadius: 6,
        shadowColor: 'black',
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
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
