import { registerRootComponent } from 'expo';
import * as React from 'react';
import { Image, Text, Button, View, SafeAreaView, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {createSideTabNavigator} from 'react-navigation-side-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { LineChart, Grid } from 'react-native-svg-charts'
import { TouchableOpacity } from 'react-native-gesture-handler';

import OrdersScreen from '../order/Order.web.js';;
import CustomHeader from '../../components/customHeader.js';

import firebase from '../../firebase/Firebase';
import 'firebase/firestore';


const Tab = createSideTabNavigator();
const Drawer = createDrawerNavigator();
const StackHome = createStackNavigator();
const StackOrder = createStackNavigator();

const navOptionHandler = () => ({
    headerShown: false
})



function CustomDrawerContent(props) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'red' }}>

        </SafeAreaView>
    )
}


function TabNavigator(props) {
    console.log(props)

    return (

        <Tab.Navigator
            // screenOptions={({ route }) => ({
            //     tabBarIcon: ({ focused, color, size }) => {
            //         let iconName;

            //         if (route.name === 'Home') {
            //             iconName = focused
            //                 ? require('../../assets/icon/home-black.png')
            //                 : require('../../assets/icon/home.png')
            //         } else if (route.name === 'Customer Orders') {
            //             iconName = focused ?
            //                 require('../../assets/icon/order-black.png')
            //                 : require('../../assets/icon/order.png');
            //         }

            //         // You can return any component that you like here!
            //         return <Image source={iconName} style={{ width: 20, height: 20 }}
            //             resizeMode='contain' />;
            //     },
            // })}
            tabBarOptions={{
                activeTintColor: 'rgb(48, 209, 88)',
                inactiveTintColor: 'gray',
                style:{width:296, paddingTop:320},
                iconHorizontal: true,
                iconSize: 32,
                labelSize: 18,
                showLabel: true,
                tabWidth: 300,
            }}
        >   
            <Tab.Screen name="Home" component={HomeStack} />
            <Tab.Screen name="Customer Orders" component={OrderStack} />
        </Tab.Navigator>

    )
}


const grossData = [50, 10, 40, 95, -4, -24, 85, 91, 35, 53, -53, 24, 50, -20, -80]
const netData = [50, 10, 40, 95, -4, -24, 85, 91]

function HomeStack() {
    return (
        <StackHome.Navigator initialRouteName="Home">
            <StackHome.Screen name="Home" component={HomeScreen} options={navOptionHandler} />
        </StackHome.Navigator>
    )
}

function OrderStack() {
    return (
        <StackOrder.Navigator initialRouteName="Order">
            <StackOrder.Screen name="Order" component={OrdersScreen} options={navOptionHandler} />
        </StackOrder.Navigator>
    )
}


function Dashboard({route}) {

    const { user } = route.params;
    console.log(user.email)
    //get name and picture from firebase
    var db = firebase.firestore();
    const [userData,setUserData] = React.useState({user:[]})
       React.useEffect(() => {
        db.collection('chefs').where("email_address","==",user.email).get().then((snapshot) => {
            snapshot.docs.forEach(doc => {
              setUserData({user:doc.data()})
            })
        })

        
    }, [])
    console.log("chefuserData",userData.user)

        return (
            <>

            <NavigationContainer independent={true}>
            <View style={{ flexDirection: 'column', height: 70, position: "absolute", zIndex: 100, top:100, left:30 }}>
                <Image style={{ height: 160, width: 160, borderRadius: 80, marginRight: 8 }} source={{ uri: userData.user.imageURL }} />
                <Text style={{ fontSize: 20, fontWeight: '700', padding: '10px' }}>Welcome {userData.user.first_name}</Text>
            </View>
                <Drawer.Navigator drawerPosition={'right'} initialRouteName="MenuTab" drawerContent={CustomDrawerContent}>
                    <Drawer.Screen name="MenuTab" component={TabNavigator} />
                    <Drawer.Screen name="Notifications" component={NotificationsScreen} />
                </Drawer.Navigator>
            </NavigationContainer>
            </>
        );
    }


function HomeScreen({ navigation}) {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#F5F8FA' }}>

            <CustomHeader title='Home' isHome={true} navigation={navigation} />
            <ScrollView style={{ marginBottom: 0 }}>

                {/* Today Section */}
                <View style={{ marginTop: 25, alignSelf: 'center', width: '90%', height: 120, backgroundColor: 'rgb(48, 209, 88)', borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row', padding: 8, alignItems: 'center', padding: 10 }}>
                        <Text style={{ color: 'white', fontSize: 17, fontWeight: '500', marginRight: 8 }}>Today</Text>
                        <Text style={{ color: 'white' }}>MEME 24</Text>
                    </View>
                    <View style={{ position: 'absolute', bottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                        <View style={{ flexDirection: 'column', margin: 8 }}>
                            <Text style={{ color: 'white', fontSize: 23, fontWeight: '500' }}>$0.00</Text>
                            <Text style={{ color: 'white', fontSize: 13 }}>Total balance</Text>
                        </View>
                        <View style={{ flexDirection: 'column', margin: 8 }}>
                            <Text style={{ color: 'white', fontSize: 23, fontWeight: '500' }}>$0.00</Text>
                            <Text style={{ color: 'white', fontSize: 13 }}>Future payouts</Text>
                        </View>
                        <View style={{ flexDirection: 'column', margin: 8 }}>
                            <Text style={{ color: 'white', fontSize: 23, fontWeight: '500' }}>$0.00</Text>
                            <Text style={{ color: 'white', fontSize: 13 }}>In transit to bank</Text>
                        </View>
                    </View>
                </View>

                {/* Payouts section */}
                <View>
                    {/* Gross Volume */}
                    <View style={{
                        alignSelf: 'center', backgroundColor: 'white', margin: 20, width: '90%', height: 200, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'column', margin: 16 }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginRight: 8 }}>Gross volume</Text>
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

                    {/* Net Volume */}

                    <View style={{
                        alignSelf: 'center', backgroundColor: 'white', margin: 20, width: '90%', height: 190, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'column', margin: 16 }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginRight: 8 }}>Net volume</Text>
                            <Text style={{ color: 'rgb(48, 209, 88)', fontSize: 22, fontWeight: '500', marginRight: 8 }}>$50.00</Text>
                        </View>
                        <LineChart
                            style={{ bottom: 10, height: 100, width: '100%' }}
                            data={netData}
                            svg={{ stroke: 'rgb(48, 209, 88)' }}
                            contentInset={{ top: 20, bottom: 20 }}
                        >
                            <Grid direction={'VERTICAL'} />
                        </LineChart>
                    </View>

                    {/* New Customers */}

                    <View style={{
                        alignSelf: 'center', backgroundColor: 'white', margin: 20, width: '90%', height: 190, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'column', margin: 16 }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginRight: 8 }}>New customers</Text>
                            <Text style={{ color: 'rgb(48, 209, 88)', fontSize: 22, fontWeight: '500', marginRight: 8 }}>16</Text>
                        </View>
                        <LineChart
                            style={{ bottom: 10, height: 100, width: '100%' }}
                            data={netData}
                            svg={{ stroke: 'rgb(48, 209, 88)' }}
                            contentInset={{ top: 20, bottom: 20 }}
                        >
                            <Grid direction={'VERTICAL'} />
                        </LineChart>
                    </View>

                    {/* New Customers */}

                    <View style={{
                        alignSelf: 'center', backgroundColor: 'white', margin: 20, width: '90%', height: 190, borderRadius: 10, shadowColor: 'black', shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5,
                    }}>
                        <View style={{ flexDirection: 'column', margin: 16 }}>
                            <Text style={{ color: 'black', fontSize: 17, fontWeight: '500', marginRight: 8 }}>Total Fees</Text>
                            <Text style={{ color: 'rgb(48, 209, 88)', fontSize: 22, fontWeight: '500', marginRight: 8 }}>$160</Text>
                        </View>
                        <LineChart
                            style={{ bottom: 10, height: 100, width: '100%' }}
                            data={netData}
                            svg={{ stroke: 'rgb(48, 209, 88)' }}
                            contentInset={{ top: 20, bottom: 20 }}
                        >
                            <Grid direction={'VERTICAL'} />
                        </LineChart>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView >
    );
}


function NotificationsScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button onPress={() => navigation.goBack()} title="Go back home" />
        </View>
    );
}

export default Dashboard;

