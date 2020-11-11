import * as React from 'react';
import { Text, View, SafeAreaView, ScrollView, StyleSheet, SectionList } from 'react-native';
import { LineChart, YAxis, XAxis, Grid, ProgressCircle } from 'react-native-svg-charts'

import firebase from "../../firebase/Firebase";
import "firebase/firestore";

import BalanceView from './balanceView'
import LatestOrderView from './latestOrderView'
import moment from 'moment'

import { loadStripe } from '@stripe/stripe-js';
import { useStripe, Elements } from '@stripe/react-stripe-js';

const axesSvg = { fontSize: 10, fill: 'grey' };
const verticalContentInset = { top: 10, bottom: 10 }
const xAxisHeight = 30

// const data = []
const data = [180, 132, 166, 140, 190, 200, 85, 231, 35, 53, 180, 24, 150, 100, 500, 180, 132, 166, 140, 190, 200, 85, 231, 35, 53, 180, 24, 150, 100, 500]

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

function HomeScreen() {

    // const stripe = useStripe();
    var db = firebase.firestore();

    // Constants 
    // const [totalAverage, setTotalAverage] = React.useState({ value: [] })
    // const [averageValue, setAverageValue] = React.useState({ value: 0 })

    // const [balance, setBalance] = React.useState({
    //     value: [ ]
    // })

    // MARK: - FUNCTIONS 

    const ref = db.collection("chefs").doc("cAim5UCNHnXPAvvK0sUa")

    let averageValue = eval(data.join('+')) / data.length
    let roundedAverageValue = Math.round((averageValue + Number.EPSILON) * 100) / 100

    // Fetch Daily average, using date range
    // Fetch last 31 days timestamp 
    // Convert date to timestamp 
    // Calculate date range( max: 1 month ) 

    // React.useEffect(() => {
    //     let last31daysDate = moment().subtract(31, 'days').format();
    //     let timestamp = moment(last31daysDate).format("X");
    //     // Query using timestamp
    //     ref.collection("sales").where("date_ordered", ">", timestamp)
    //         .get()
    //         .then(function (querySnapshot) {
    //             querySnapshot.forEach(function (doc) {
    //                 // get total from sale
    //                 const data = doc.data()
    //                 const amountValue = data.total;
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
    //         // Set Balance 
    //         const data = doc.data()
    //         setBalance({
    //             value: [
    //                 {
    //                     title: "Finance summary",
    //                     data: [
    //                         { key: 1, totalBalance: data.total_balance, futurePayout: data.future_payout, toBank: data.to_bank },
    //                     ]
    //                 }
    //             ]
    //         })
    //         return
    //     })
    //         .catch(function (error) {
    //             console.log("Error getting document: ", error);
    //         });
    // })


    // Fetch latest orders, Top 4 orders (Limit 4 latest orders)
    // React.useEffect(() => {
    //     ref.collection("sales").orderBy("date_ordered").limit(4)
    //         .get()
    //         .then(function (querySnapshot) {
    //             console.log("FETCH ORDERS")
    //             querySnapshot.forEach(function (doc) {

    // setBalance(prevArray => [...prevArray, newValue])
    // setBalance({
    //     value: [
    //         {
    //             title: "Latest orders",
    //             data: [
    //                 { key: 1, total: 100 },
    //                 { key: 2, total: 16 },
    //                 { key: 3, total: 54 },
    //                 { key: 4, total: 90 },
    //             ]
    //         }
    //     ]
    // })
    //             });
    //         })
    //         .catch(function (error) {
    //             console.log("Error getting documents: ", error);
    //         });
    // })


    // Fetch income this month, using date range


    // Fetch total sales


    // Fetch and convert goals 


    // MARK: - RENDER
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <ScrollView>

                <View style={{ height: '100%', flexDirection: 'colunm', backgroundColor: 'white' }}>
                    <View style={{
                        width: '60%', margin: 30
                    }}>

                        <View style={{ margin: 16 }}>
                            <Text style={{ color: 'black', fontSize: 18, marginRight: 8 }}>{data.length === 0 ? '0 on Average (Daily Average) ' : roundedAverageValue + ' on Average (Daily Average)'} </Text>
                        </View>

                        {/* Gross Volume and Right Panel section
                            If there's data show Chart, if there's nothing show message
                        */}

                        {data.length === 0 ? (
                            <View style={{ height: 400, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ alignSelf: 'center', color: 'black', fontSize: 14, marginRight: 8 }}>There isn't enough data to display daily averages.</Text>
                            </View>
                        ) : (
                                <View style={{ height: 400, width: '100%', flexDirection: 'row' }}>
                                    <YAxis
                                        data={data}
                                        style={{ marginBottom: xAxisHeight }}
                                        contentInset={verticalContentInset}
                                        svg={axesSvg}
                                    />
                                    <View style={{ flex: 1, marginLeft: 10 }}>
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


                    {/* Monthly Section */}
                    <View style={{ margin: 20, width: '60%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{
                            alignSelf: 'center', backgroundColor: 'white', margin: 20, width: 300, height: 120, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                        }}>
                            <View style={{ flexDirection: 'column', margin: 16 }}>
                                <Text style={{ fontSize: 20, fontWeight: '500', marginRight: 8 }}>$0.00</Text>
                                <Text style={{ color: 'black', fontSize: 15, marginRight: 8 }}>Income this month</Text>
                                <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 20, }}>
                                    <ProgressCircle style={{ height: 90, width: 90 }} progress={0.0} progressColor={'rgb(48, 209, 88)'} />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            alignSelf: 'center', backgroundColor: 'white', margin: 20, width: 300, height: 120, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                        }}>
                            <View style={{ flexDirection: 'column', margin: 16 }}>
                                <Text style={{ fontSize: 20, fontWeight: '500', marginRight: 8 }}>5</Text>
                                <Text style={{ color: 'black', fontSize: 15, marginRight: 8 }}>Total sales</Text>
                                <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 20, }}>
                                    <ProgressCircle style={{ height: 90, width: 90 }} progress={0.0} progressColor={'rgb(48, 209, 88)'} />
                                </View>
                            </View>
                        </View>
                    </View>

                    <View style={{ margin: 20, width: '60%', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
                        <View style={{
                            alignSelf: 'center', backgroundColor: 'white', margin: 20, width: 300, height: 120, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                        }}>
                            <View style={{ flexDirection: 'column', margin: 16 }}>
                                <Text style={{ fontSize: 20, fontWeight: '500', marginRight: 8 }}>$0.00</Text>
                                <Text style={{ color: 'black', fontSize: 15, marginRight: 8 }}>Net volume from sales</Text>
                                <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 20, }}>
                                    <ProgressCircle style={{ height: 90, width: 90 }} progress={0.0} progressColor={'rgb(48, 209, 88)'} />
                                </View>
                            </View>
                        </View>
                        <View style={{
                            alignSelf: 'center', backgroundColor: 'white', margin: 20, width: 300, height: 120, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                        }}>
                            <View style={{ flexDirection: 'column', margin: 16 }}>
                                <Text style={{ fontSize: 20, fontWeight: '500', marginRight: 8 }}>$0.00</Text>
                                <Text style={{ color: 'black', fontSize: 15, marginRight: 8 }}>Total sales</Text>
                                <View style={{ alignItems: 'center', justifyContent: 'center', position: 'absolute', right: 20, }}>
                                    <ProgressCircle style={{ height: 90, width: 90 }} progress={0.0} progressColor={'rgb(48, 209, 88)'} />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* Right Panel Section */}

                <View style={{ position: 'absolute', right: 0, width: '35%', height: '100%', backgroundColor: '#F5F5F7', padding: 20 }}>
                    <SectionList
                        sections={DATA}
                        renderSectionHeader={({ section }) => {
                            return (
                                <View style={{ marginTop: 20, marginBottom: 20 }}>
                                    <Text style={styles.title}>{section.title}</Text>
                                </View>
                            );
                        }}
                        renderItem={({ item, section }) => {
                            switch (section.title) {
                                case "Finance summary":
                                    return <BalanceView />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginHorizontal: 16
    },
    item: {
        backgroundColor: "#f9c2ff",
        padding: 20,
        marginVertical: 8
    },
    header: {
        fontSize: 32,
        backgroundColor: "#fff"
    },
    title: {
        fontSize: 17
    }
});

export default HomeScreen;
