import * as React from 'react';
import { useState } from 'react'
import {
    Text, View, SafeAreaView, ScrollView, SectionList
} from 'react-native';

import { LineChart, YAxis, XAxis, Grid, ProgressCircle } from 'react-native-svg-charts'

import firebase from "../../firebase/Firebase";
import "firebase/auth";
import "firebase/firestore";

import BalanceView from './balanceView'
import QuickLinksView from './quicklinks'
import LatestOrderView from './latestOrderView'
import styles from './dashboard.styles'

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import Modal from 'modal-enhanced-react-native-web';
import moment from 'moment';

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 }
const xAxisHeight = 30


var db = firebase.firestore();

const testdata = [
    {
        title: "Quick links",
        data: [1]
    },
]

var db = firebase.firestore();


function calculateDiffence(value1, value2) {
    return value1 / value2
}



class HomeScreen extends React.Component {

    constructor() {
        super();
        this.state = {

            totalAverage: 0,
            averageValues: [],

            goalType: '',
            monthlyIncomeGoal: 0,
            monthlySaleGoal: 0,
            goal: 0,

            monthlyIncome: 0,
            monthlyIncomeDifference: 0,
            monthlySales: 0,
            montlhySalesDifferent: 0,

            netVolume: 0,
            subscriptions: 0,
            totalSales: 0,
            deliveryFees: 0,

            visibleModal: null,
            data: testdata,
            value: null
        };
        this.goalTextInput = React.createRef()
    }

    // Fetch income this month, using date range


    // Fetch total sales

    // Fetch current goals 
    componentWillMount() {

        var user = firebase.auth().currentUser;
        const ref = db.collection('chefs').doc(user.uid)

        let currentComponent = this;

        //Query using timestamp
        ref.collection("completed_sales").orderBy('date_ordered', 'desc')
            .limit(31).get()
            .then(function (querySnapshot) {

                querySnapshot.forEach(function (doc) {
                    // get total from sale
                    const amountValue = doc.data().total;
                    let roundedAmountValue = Math.round((amountValue + Number.EPSILON) * 100) / 100

                    currentComponent.setState(state => {
                        const averageValues = [roundedAmountValue, ...state.averageValues];
                        return {
                            averageValues,
                            value: roundedAmountValue,
                        };
                    });

                    const averageValues = currentComponent.state.averageValues
                    // Calculate average revenue 
                    let totalAmountValue = eval(averageValues.join('+')) / querySnapshot.size
                    let roundedTotalAmountValue = Math.round((totalAmountValue + Number.EPSILON) * 100) / 100
                    currentComponent.setState({ totalAverage: roundedTotalAmountValue })
                });

                return
            })
            .catch(function (error) {
                console.log("Error getting documents: ", error);
            });

        // Fetch goals 

        ref.collection("goals").doc("monthly").get().then(function (doc) {
            if (doc.exists) {
                const data = doc.data()
                const monthlyIncomeGoal = data.income
                const monthlySaleGoal = data.sales
                currentComponent.setState({ monthlyIncomeGoal: monthlyIncomeGoal })
                currentComponent.setState({ monthlySaleGoal: monthlySaleGoal })
                return

                // TODO: -  Convert goals to show the progressView
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });

        // Fetch Reports
        ref.collection("statistic").doc("reports").get().then(function (doc) {
            if (doc.exists) {
                const docData = doc.data()
                currentComponent.setState(state => {
                    const data = [
                        {
                            title: "Finance summary",
                            data: [
                                { key: 1, totalBalance: docData["available"], toBank: docData["pending"] },
                            ]
                        },
                        ...state.data];
                    return {
                        data,
                        value: data
                    };
                });

                const monthlyIncome = docData["monthly_income"]
                const montlhyIncomeDifferent = calculateDiffence(monthlyIncome, currentComponent.state.monthlyIncomeGoal)

                const monthlySales = docData["monthly_sales"]
                const montlhySalesDifferent = calculateDiffence(monthlySales, currentComponent.state.monthlySaleGoal)

                const netVolume = docData["net_volume"]
                const subscriptions = docData["subscriptions"]
                const totalSales = docData["total_sales"]
                const deliveryFees = docData["delivery_fees"]

                currentComponent.setState({
                    monthlyIncome: monthlyIncome,
                    monthlyIncomeDifference: montlhyIncomeDifferent,
                    monthlySales: monthlySales,
                    montlhySalesDifferent: montlhySalesDifferent,
                    netVolume: netVolume,
                    subscriptions: subscriptions,
                    totalSales: totalSales,
                    deliveryFees: deliveryFees
                })
                return
            }
        })
            .catch(function (error) {
                console.log("Error getting document: ", error);
            });
    }

    // Set a goal 
    setGoal = () => {
        const goal = Number(this.state.goal)
        const goalType = this.state.goalType

        const goalRef = ref.collection("goals").doc("monthly")

        // Verify the goal type 
        if (goalType === 'income') {
            const difference = calculateDiffence(this.state.monthlyIncome, goal)

            this.setState({ monthlyIncomeGoal: goal, monthlyIncomeDifference: difference })
            goalRef.set({ 'income': goal }, { merge: true })
        } else {
            const difference = calculateDiffence(this.state.monthlySales, goal)
            this.setState({ monthlySaleGoal: goal, montlhySalesDifferent: difference })
            goalRef.set({ 'sales': goal }, { merge: true })
        }
        // Clear current goal in TextInput
        this.goalTextInput.current.clear();
        this.setState({ visibleModal: false })
    }

    renderButton = (text, onPress) => (
        <TouchableOpacity onPress={onPress}>
            <View>
                <Text onPress={onPress}>{text}</Text>
            </View>
        </TouchableOpacity>
    );

    renderModalContent = () => (
        <View style={styles.modalContainer}>
            <View style={styles.modalInputView}>
                <Text style={styles.modalInputText}>Add your monthly {this.state.goalType} goal</Text>
                <TextInput
                    ref={this.goalTextInput}
                    onChangeText={(text) => this.setState({ goal: text })}
                    style={styles.modalInput}
                    placeholder={"Enter goal"} />
            </View>
            <View style={styles.separator} />
            <View style={styles.inputButtonView}>
                {this.renderButton("Close", () => this.setState({ visibleModal: false, }))}
                <TouchableOpacity onPress={() => this.setState({ visibleModal: false })} style={styles.modalSaveButton}>
                    <Text onPress={() => this.setGoal()} >Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    // MARK: - RENDER
    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Modal
                    isVisible={this.state.visibleModal}
                    animationIn='fadeIn'
                    animationOut='fadeOut'
                    onBackdropPress={() => this.setState({ visibleModal: false })}>
                    {this.renderModalContent()}
                </Modal>

                <ScrollView>
                    <View style={styles.mainView}>
                        <View style={styles.averageView}>

                            {/* Gross Volume and Right Panel section
                                If there's data show Chart, if there's nothing show message
                            */}

                            {this.state.averageValues.length === 0 ? (
                                <View style={styles.emptyView}>
                                    <Text style={styles.emptyText}>There isn't enough data to display daily averages.</Text>
                                </View>
                            ) : (

                                    <View style={{
                                        flexDirection: 'column', borderRadius: 8, backgroundColor: 'white', marginRight: 30,
                                        marginBottom: 30,
                                        shadowColor: 'black',
                                        shadowColor: "#000",
                                        shadowOpacity: 0.1,
                                        shadowRadius: 10,
                                        elevation: 5,
                                        height: 300
                                    }}>
                                        <View style={{ margin: 16 }}>
                                            <Text style={styles.averageMainText}>{this.state.averageValues.length === 0 ? '0 on Average (Daily Average) ' : this.state.totalAverage + ' on Average (Daily Average)'} </Text>
                                        </View>

                                        <View style={styles.chartContainer}>
                                            <YAxis
                                                data={this.state.averageValues}
                                                style={{ marginBottom: xAxisHeight }}
                                                contentInset={verticalContentInset}
                                                svg={axesSvg}
                                            />
                                            <View style={styles.chartView}>
                                                <LineChart
                                                    style={{ flex: 1 }}
                                                    data={this.state.averageValues}
                                                    contentInset={verticalContentInset}
                                                    svg={{ strokeOpacity: 0.8, strokeWidth: 2, stroke: 'rgb(48, 209, 88)' }}
                                                    xMin={1}
                                                    xMax={31}
                                                >
                                                    <Grid />
                                                </LineChart>
                                                <XAxis
                                                    style={{ marginHorizontal: -10, height: xAxisHeight }}
                                                    data={this.state.averageValues}
                                                    formatLabel={(value, index) => index}
                                                    contentInset={{ left: -10, right: 10 }}
                                                    svg={axesSvg}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                )}
                        </View>

                        {/* Goals Section */}
                        <View style={styles.goalContainer}>
                            <View style={styles.goalShadowView}>
                                <View style={styles.goalView}>
                                    <Text style={styles.goalAmountText}>${this.state.monthlyIncome}</Text>
                                    <Text style={styles.goalDescriptionText}>Income this month</Text>
                                    <TouchableOpacity style={styles.goalButton} onPress={() => this.setState({ visibleModal: true, goalType: 'income' })}>
                                        <Text onPress={() => this.setState({ visibleModal: true, goalType: 'income' })} style={styles.goalButtonText}>Set goal</Text>
                                    </TouchableOpacity>
                                    <View style={styles.goalProgressContainer}>
                                        <ProgressCircle style={styles.progressCircle} progress={this.state.monthlyIncomeDifference} progressColor={'rgb(48, 209, 88)'} />
                                        <Text style={styles.progressText}> {this.state.monthlyIncomeGoal} </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.goalShadowView}>
                                <View style={styles.goalView}>
                                    <Text style={styles.goalAmountText}>{this.state.monthlySales}</Text>
                                    <Text style={styles.goalDescriptionText}>Monthly sales</Text>
                                    <TouchableOpacity style={styles.goalButton} onPress={() => this.setState({ visibleModal: true })}>
                                        <Text onPress={() => this.setState({ visibleModal: true, goalType: 'sales' })} style={styles.goalButtonText}>Set goal</Text>
                                    </TouchableOpacity>
                                    <View style={styles.goalProgressContainer}>
                                        <ProgressCircle style={styles.progressCircle} progress={this.state.montlhySalesDifferent} progressColor={'rgb(48, 209, 88)'} />
                                        <Text style={styles.progressText}> {this.state.monthlySaleGoal} </Text>
                                    </View>
                                </View>
                            </View>
                            {/* <ModalComp /> */}
                        </View>

                        <View style={styles.goalContainer}>
                            <View style={styles.goalShadowView}>
                                <View style={styles.goalView}>
                                    <Text style={styles.goalAmountText}>${this.state.netVolume}</Text>
                                    <Text style={styles.goalDescriptionText}>Net volume from sales</Text>
                                </View>
                            </View>
                            <View style={styles.goalShadowView}>
                                <View style={styles.goalView}>
                                    <Text style={styles.goalAmountText}>{this.state.totalSales}</Text>
                                    <Text style={styles.goalDescriptionText}>Total sales</Text>
                                </View>
                            </View>
                        </View>

                        <View style={styles.goalContainer}>
                            <View style={styles.goalShadowView}>
                                <View style={styles.goalView}>
                                    <Text style={styles.goalAmountText}>{this.state.subscriptions}</Text>
                                    <Text style={styles.goalDescriptionText}>Total subscription</Text>
                                </View>
                            </View>
                            <View style={styles.goalShadowView}>
                                <View style={styles.goalView}>
                                    <Text style={styles.goalAmountText}>${this.state.deliveryFees}</Text>
                                    <Text style={styles.goalDescriptionText}>Total delivery fees</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Right Panel Section */}

                    <View style={styles.rightPanelContainer}>
                        <SectionList
                            sections={this.state.data}
                            renderSectionHeader={({ section }) => {
                                return (
                                    <View style={styles.headerView}>
                                        <Text style={styles.title}>{section.title}</Text>
                                    </View>
                                );
                            }}
                            renderItem={({ item, section }) => {
                                switch (section.title) {
                                    case "Quick links":
                                        return (
                                            <QuickLinksView navigation={this.props.navigation} item={item} />
                                        )
                                    case "Finance summary":
                                        return <BalanceView item={item} />
                                    case "Latest orders":
                                        return <LatestOrderView />
                                    default:
                                        break;
                                }
                            }}
                            stickySectionHeadersEnabled={false}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView >
        );
    }
}


export default HomeScreen;

// Constants 
// const [totalAverage, setTotalAverage] = React.useState({ value: [] })
// const [averageValue, setAverageValue] = React.useState({ value: 0 })

// const [balance, setBalance] = React.useState({
//     value: [
//         {
//             title: "Finance summary",
//             data: [
//                 { key: 1, totalBalance: 10000, futurePayout: 1000, toBank: 1000 },
//             ]
//         },
//         {
//             title: "Latest orders",
//             data: [
//                 { key: 1, total: 100 },
//                 { key: 2, total: 16 },
//                 { key: 3, total: 54 },
//                 { key: 4, total: 90 },
//             ]
//         },
//     ]
// })
// const [order, setOrder] = React.useState({ value: [] })

// MARK: - FUNCTIONS 

// const ref = db.collection("chefs").doc("cAim5UCNHnXPAvvK0sUa")

// Fetch Daily average, using date range
// Fetch last 31 days timestamp 
// Convert date to timestamp 
// Calculate date range( max: 1 month ) 

// React.useEffect(() => {

//     let last31daysDate = moment().subtract(31, 'days').format();
//     let timestamp = moment(last31daysDate).format("X");
    // Query using timestamp
//     ref.collection("sales").where("date_ordered", ">", timestamp)
//         .get()
//         .then(function (querySnapshot) {
//             querySnapshot.forEach(function (doc) {
//                 console.log("FETCH AVERAGE")
//                 // get total from sale
//                 const amountValue = doc.data().total;
//                 let roundedAmountValue = Math.round((amountValue + Number.EPSILON) * 100) / 100
//                 setTotalAverage({ value: roundedAmountValue })

//                 // Calculate average revenue 
//                 let totalAmountValue = eval(totalAverage.join('+')) / data.length
//                 let roundedTotalAmountValue = Math.round((totalAmountValue + Number.EPSILON) * 100) / 100
//                 setAverageValue({ value: roundedTotalAmountValue })
//             });

//             return
//         })
//         .catch(function (error) {
//             console.log("Error getting documents: ", error);
//         });
// })


// Fetch latest orders, Top 4 orders (Limit 4 latest orders)
// React.useEffect(() => {
//     ref.collection("sales").orderBy("date_ordered").limit(5)
//         .get()
//         .then(function (querySnapshot) {
//             console.log("FETCH ORDERS")
//             querySnapshot.forEach(function (doc) {
//                 setBalance({
//                     value: [
//                         {
//                             title: "Latest orders",
//                             data: [
//                                 { key: 1, total: 100 },
//                                 { key: 2, total: 16 },
//                                 { key: 3, total: 54 },
//                                 { key: 4, total: 90 },
//                             ]
//                         }
//                     ]
//                 })
//             });
//         })
//         .catch(function (error) {
//             console.log("Error getting documents: ", error);
//         });
// })