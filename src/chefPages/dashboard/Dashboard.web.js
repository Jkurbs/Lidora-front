import * as React from 'react';
import { Image, Text, Button, View, SafeAreaView, ScrollView } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts'
import 'firebase/firestore';

const grossData = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
const netData = [50, 10, 40, 95, -4, -24, 85, 91]


function HomeScreen() {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F8FA' }}>

            {/* <CustomHeader title='Home' isHome={true} navigation={navigation} /> */}
            <ScrollView style={{ marginBottom: 0,  }}>

                {/* Today Section */}
                <View style={{ alignSelf: 'center', width: '100%', height: 120, backgroundColor: 'white'}}>
                    <View style={{ position: 'absolute', bottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'column', margin: 8 }}>
                            <Text style={{ color: 'black', fontSize: 23, fontWeight: '500' }}>$0.00</Text>
                            <Text style={{ color: 'black', fontSize: 13 }}>Total balance</Text>
                        </View>
                        <View style={{ flexDirection: 'column', margin: 8 }}>
                            <Text style={{ color: 'black', fontSize: 23, fontWeight: '500' }}>$0.00</Text>
                            <Text style={{ color: 'black', fontSize: 13 }}>Future payouts</Text>
                        </View>
                        <View style={{ flexDirection: 'column', margin: 8 }}>
                            <Text style={{ color: 'black', fontSize: 23, fontWeight: '500' }}>$0.00</Text>
                            <Text style={{ color: 'black', fontSize: 13 }}>In transit to bank</Text>
                        </View>
                    </View>
                </View>

                {/* Payouts section */}
                <View>
                    <View style={{
                         flexDirection: 'row', justifyContent:'center', width:'90%', margin:'auto'
                    }}>
                    {/* Gross Volume */}
                    <View style={{
                         backgroundColor: 'white', margin: 20, width: '65%', height: 200, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'column', margin: 16 }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginRight: 8 }}>Today</Text>
                            <Text style={{ color: 'rgb(48, 209, 88)', fontSize: 22, fontWeight: '500', marginRight: 8 }}>$100.00</Text>
                        </View>
                        <LineChart
                            style={{ bottom: 10, height: 100, width: '100%' }}
                            data={grossData}
                            svg={{ stroke: 'rgb(48, 209, 88)' }}
                            contentInset={{ top: 20, bottom: 20 }}
                        >
                            <Grid direction={'VERTICAL'} />
                        </LineChart>
                    </View>
                    <View style={{
                         backgroundColor: 'white', margin: 20, width: '30%', height: 200, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'column', margin: 16 }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginRight: 8 }}>Today</Text>
                            <Text style={{ color: 'rgb(48, 209, 88)', fontSize: 22, fontWeight: '500', marginRight: 8 }}>$100.00</Text>
                        </View>
                    </View>
                    </View>

                    {/*MONTHLY OVERVIEW */}


                    <View style={{width:'90%', margin:'auto'}}>
                    <Text style={{ color: 'black', fontSize: 24, fontWeight: '500', marginleft: 10 }}>Monthly Overview</Text>
                    </View>
                    <View style={{
                         flexDirection: 'row', justifyContent:'center',width:'90%', margin:'auto'
                    }}>
                    {/* Income this month */}
                    <View style={{
                        alignSelf: 'center', backgroundColor: 'white', margin: 20, width:"30%", height: 120, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'column', margin: 16 }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginRight: 8 }}>Income this month</Text>
                            <Text style={{ color: 'rgb(48, 209, 88)', fontSize: 22, fontWeight: '500', marginRight: 8 }}>$50.00</Text>
                        </View>
                    </View>

                    {/* Net volume from sales */}

                    <View style={{
                        alignSelf: 'center', backgroundColor: 'white', margin: 20, width:"30%",  height: 120, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'column', margin: 16 }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginRight: 8 }}>Net volume from sales</Text>
                            <Text style={{ color: 'rgb(48, 209, 88)', fontSize: 22, fontWeight: '500', marginRight: 8 }}>$16</Text>
                        </View>
                    </View>

                    {/* Total customers */}

                    <View style={{
                        alignSelf: 'center', backgroundColor: 'white', margin: 20, width:"30%",  height: 120, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'column', margin: 16 }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginRight: 8 }}>Total customers</Text>
                            <Text style={{ color: 'rgb(48, 209, 88)', fontSize: 22, fontWeight: '500', marginRight: 8 }}>160</Text>
                        </View>
                    </View>
                    </View>
                    {/* Total fees spent */}
                    <View style={{
                         flexDirection: 'row', justifyContent:'center',width:'90%', margin:'auto'
                    }}>
                    <View style={{
                        alignSelf: 'center', backgroundColor: 'white', margin: 20, width:"30%", height: 120, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'column', margin: 16 }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginRight: 8 }}>Total fees spent</Text>
                            <Text style={{ color: 'rgb(48, 209, 88)', fontSize: 22, fontWeight: '500', marginRight: 8 }}>$50.00</Text>
                        </View>
                    </View>

                    {/* Inventory loss */}

                    <View style={{
                        alignSelf: 'center', backgroundColor: 'white', margin: 20, width:"30%",  height: 120, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'column', margin: 16 }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginRight: 8 }}>Inventory loss</Text>
                            <Text style={{ color: 'rgb(48, 209, 88)', fontSize: 22, fontWeight: '500', marginRight: 8 }}>16 items</Text>
                        </View>
                    </View>

                    {/* Total sales */}

                    <View style={{
                        alignSelf: 'center', backgroundColor: 'white', margin: 20, width:"30%",  height: 120, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'column', margin: 16 }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginRight: 8 }}>Total sales</Text>
                            <Text style={{ color: 'rgb(48, 209, 88)', fontSize: 22, fontWeight: '500', marginRight: 8 }}>160</Text>
                        </View>
                    </View>
                    </View>
                </View>
                
            </ScrollView>
        </SafeAreaView >
    );
}


export default HomeScreen;

