import * as React from 'react';
import { useState } from 'react'
import {
    Text, View, SafeAreaView, ScrollView, StyleSheet, SectionList, Dimensions, Button
} from 'react-native';

import { LineChart, YAxis, XAxis, Grid, ProgressCircle } from 'react-native-svg-charts'

import firebase from "../../firebase/Firebase";
import "firebase/firestore";

import BalanceView from './balanceView'
import LatestOrderView from './latestOrderView'
import styles from './dashboard.styles'

import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';

import Modal from 'modal-enhanced-react-native-web';

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 }
const xAxisHeight = 30

const data = []
// const data = [180, 132, 166, 140, 190, 200, 85, 231, 35, 53, 180, 24, 150, 100, 500, 180, 132, 166, 140, 190, 200, 85, 231, 35, 53, 180, 24, 150, 100, 500]

var db = firebase.firestore();
const ref = db.collection('chefs').doc("cAim5UCNHnXPAvvK0sUa").collection("goals").doc("monthly")

const DATA = [
    {
        title: "Finance summary",
        data: [
            { key: 1, totalBalance: 10000, futurePayout: 1000, toBank: 1000 },
        ]
    },
    {
        title: "Latest orders",
        data: [
            { key: 1, total: 100 },
            { key: 2, total: 16 },
            { key: 3, total: 54 },
            { key: 4, total: 90 },
        ]
    },
]

var db = firebase.firestore();
let totalAverageValue = eval(data.join('+')) / data.length
let roundedTotalAverageValue = Math.round((totalAverageValue + Number.EPSILON) * 100) / 100


class HomeScreen extends React.Component {

    constructor() {
        super();
        this.state = {
            goalType: '',
            monthlyIncomeGoal: 0,
            monthlySaleGoal: 0,
            goal: 0,
            visibleModal: null
        };

        this.goalTextInput = React.createRef()
    }

    // Fetch income this month, using date range


    // Fetch total sales


    // Fetch current goals 
    componentDidMount() {
        let currentComponent = this;
        ref.get().then(function (doc) {
            if (doc.exists) {
                const data = doc.data()
                const monthlyIncomeGoal = data.income
                const monthlySaleGoal = data.sales
                currentComponent.setState({ monthlyIncomeGoal: monthlyIncomeGoal })
                currentComponent.setState({ monthlySaleGoal: monthlySaleGoal })

                // TODO: -  Convert goals to show the progressView
            } else {
                // doc.data() will be undefined in this case
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    // Set a goal 
    setGoal = () => {
        const goal = Number(this.state.goal)
        const goalType = this.state.goalType

        // Verify the goal type 
        if (goalType === 'income') {
            this.setState({ monthlyIncomeGoal: goal })
            ref.set({ 'income': goal }, { merge: true })
        } else {
            this.setState({ monthlySaleGoal: goal })
            ref.set({ 'sales': goal }, { merge: true })
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
                            <View style={{ margin: 16 }}>
                                <Text style={styles.averageMainText}>{data.length === 0 ? '0 on Average (Daily Average) ' : roundedTotalAverageValue + ' on Average (Daily Average)'} </Text>
                            </View>

                            {/* Gross Volume and Right Panel section
                                If there's data show Chart, if there's nothing show message
                            */}

                            {data.length === 0 ? (
                                <View style={styles.emptyView}>
                                    <Text style={styles.emptyText}>There isn't enough data to display daily averages.</Text>
                                </View>
                            ) : (

                                    <View style={styles.chartContainer}>
                                        <YAxis
                                            data={data}
                                            style={{ marginBottom: xAxisHeight }}
                                            contentInset={verticalContentInset}
                                            svg={axesSvg}
                                        />
                                        <View style={styles.chartView}>
                                            <LineChart
                                                style={{ flex: 1 }}
                                                data={data}
                                                contentInset={verticalContentInset}
                                                svg={{ strokeOpacity: 0.8, strokeWidth: 2, stroke: 'rgb(48, 209, 88)' }}
                                                xMin={1}
                                                xMax={31}
                                            >
                                                <Grid />
                                            </LineChart>
                                            <XAxis
                                                style={{ marginHorizontal: -10, height: xAxisHeight }}
                                                data={data}
                                                formatLabel={(value, index) => index}
                                                contentInset={{ left: -10, right: 10 }}
                                                svg={axesSvg}
                                            />
                                        </View>
                                    </View>
                                )}
                        </View>

                        {/* Goals Section */}
                        <View style={styles.goalContainer}>
                            <View style={styles.goalShadowView}>
                                <View style={styles.goalView}>
                                    <Text style={styles.goalAmountText}>$0.00</Text>
                                    <Text style={styles.goalDescriptionText}>Income this month</Text>
                                    <TouchableOpacity style={styles.goalButton} onPress={() => this.setState({ visibleModal: true, goalType: 'income' })}>
                                        <Text onPress={() => this.setState({ visibleModal: true, goalType: 'income' })} style={styles.goalButtonText}>Set goal</Text>
                                    </TouchableOpacity>
                                    <View style={styles.goalProgressContainer}>
                                        <ProgressCircle style={styles.progressCircle} progress={0.0} progressColor={'rgb(48, 209, 88)'} />
                                        <Text style={styles.progressText}> {this.state.monthlyIncomeGoal} </Text>
                                    </View>
                                </View>
                            </View>

                            <View style={styles.goalShadowView}>
                                <View style={styles.goalView}>
                                    <Text style={styles.goalAmountText}>0</Text>
                                    <Text style={styles.goalDescriptionText}>Monthly sales</Text>
                                    <TouchableOpacity style={styles.goalButton} onPress={() => this.setState({ visibleModal: true })}>
                                        <Text onPress={() => this.setState({ visibleModal: true, goalType: 'sales' })} style={styles.goalButtonText}>Set goal</Text>
                                    </TouchableOpacity>
                                    <View style={styles.goalProgressContainer}>
                                        <ProgressCircle style={styles.progressCircle} />
                                        <Text style={styles.progressText}> {this.state.monthlySaleGoal} </Text>
                                    </View>
                                </View>
                            </View>
                            {/* <ModalComp /> */}
                        </View>

                        <View style={styles.goalContainer}>
                            <View style={styles.goalShadowView}>
                                <View style={styles.goalView}>
                                    <Text style={styles.goalAmountText}>$0.00</Text>
                                    <Text style={styles.goalDescriptionText}>Net volume from sales</Text>
                                </View>
                            </View>
                            <View style={styles.goalShadowView}>
                                <View style={styles.goalView}>
                                    <Text style={styles.goalAmountText}>$0.00</Text>
                                    <Text style={styles.goalDescriptionText}>Total sales</Text>
                                </View>
                            </View>
                        </View>
                    </View>

                    {/* Right Panel Section */}

                    <View style={styles.rightPanelContainer}>
                        <SectionList
                            sections={DATA}
                            renderSectionHeader={({ section }) => {
                                return (
                                    <View style={styles.headerView}>
                                        <Text style={styles.title}>{section.title}</Text>
                                    </View>
                                );
                            }}
                            renderItem={({ item, section }) => {
                                switch (section.title) {
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


// Fetch Balances
// React.useEffect(() => {
//     ref.collection("statistics").doc("balance").get().then(function (doc) {
        // Set Balance 
        // const data = doc.data()
        // setBalance({
        //     value: [
        //         {
        //             title: "Finance summary",
        //             data: [
        //                 { key: 1, totalBalance: 10000, futurePayout: 1000, toBank: 1000 },
        //             ]
        //         }
        //     ]
        // })
//         return
//     })
//         .catch(function (error) {
//             console.log("Error getting document: ", error);
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