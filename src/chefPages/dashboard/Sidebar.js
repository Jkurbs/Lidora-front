import * as React from "react";
import { Image, Text, View, TouchableOpacity, Dimensions, Clipboard } from "react-native";

import { createSideTabNavigator } from "react-navigation-side-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MenuScreen from "../menu/menu";
import InventoryScreen from "../inventory/inventory";
import DashboardScreen from "../dashboard/Dashboard.web";
import OrdersScreen from "../order/Order.web";
import SupportScreen from "../support/support";

import firebase from "../../firebase/Firebase";
import "firebase/firestore";

import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import "./darkMode.css"

import { Entypo } from '@expo/vector-icons';

const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");

const Tab = createSideTabNavigator();
const StackInventory = createStackNavigator();
const StackOrders = createStackNavigator();
const StackMenu = createStackNavigator();
const StackDashboard = createStackNavigator();
const StackSupport = createStackNavigator();

const navOptionHandler = () => ({
    headerShown: false,
    header: null,
});

function TabNavigator({ navigation, userData }) {

    var options = { weekday: "long", month: "long", day: "numeric" };
    var today = new Date();
    const todayDate = today.toLocaleDateString("en-US", options);

    return (
        <Tab.Navigator
            navigationOptions={{
                // Hide the header from AppNavigator stack
                header: false,
            }}
            tabBarOptions={{
                activeTintColor: "#34C759",
                inactiveTintColor: "black",
                tabStyle: { marginBottom: 20 },

                style: {
                    width: 200,
                    paddingTop: 300,
                },
                iconHorizontal: true,
                labelSize: 13,
                showLabel: true,
                tabWidth: 200,
                header: false,

                headerStyle: {
                    backgroundColor: "#f4511e",
                    color: 'green'
                },
            }}
        >
            <Tab.Screen
                options={{
                    title: todayDate,
                    tabBarLabel: "Dashboard",
                    backgroundColor: "#f4511e",
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
                initialParams={{ navigation: navigation, userData: userData }}
                name="Dashboard"
                component={DashboardStack}
            />

            <Tab.Screen
                options={{
                    title: todayDate,
                    tabBarLabel: "Menu",
                    backgroundColor: "#f4511e",
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
                name="Menu"
                component={MenuStack}
            />

            <Tab.Screen
                options={{
                    title: todayDate,
                    tabBarLabel: "Inventory",
                    backgroundColor: "#f4511e",
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "regular",
                    },
                    color: 'green'
                }}
                name="Inventory"
                component={InventoryStack}
            ></Tab.Screen>
            <Tab.Screen
                options={{
                    title: todayDate,
                    tabBarLabel: "Customer orders",
                    backgroundColor: "#f4511e",
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
                name="Orders"
                component={OrdersStack}
            />
            <Tab.Screen
                options={{
                    title: todayDate,
                    tabBarLabel: "",
                    backgroundColor: "#f4511e",
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
                name="Support"
                component={SupportStack}
            />
        </Tab.Navigator>
    );
}

// Stack to show the Dashboard
function DashboardStack() {
    return (
        <StackOrders.Navigator initialRouteName="Dashboard">
            <StackOrders.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={navOptionHandler}
            />
        </StackOrders.Navigator>
    );
}

// Stack to show the Orders
function OrdersStack() {
    return (
        <StackOrders.Navigator initialRouteName="Orders">
            <StackOrders.Screen
                name="Orders"
                component={OrdersScreen}
                options={navOptionHandler}
            />
        </StackOrders.Navigator>
    );
}

// Stack to show the Support
function SupportStack() {
    return (
        <StackSupport.Navigator initialRouteName="Support">
            <StackSupport.Screen
                name="Support"
                component={SupportScreen}
                options={navOptionHandler}
            />
        </StackSupport.Navigator>
    );
}

// Stack to show the Inventory
function InventoryStack() {
    return (
        <StackInventory.Navigator initialRouteName="Inventory">
            <StackInventory.Screen
                name="Inventory"
                component={InventoryScreen}
                options={navOptionHandler}
            />
        </StackInventory.Navigator>
    );
}

// Stack to show the Menu
function MenuStack() {
    return (
        <StackMenu.Navigator initialRouteName="Menu">
            <StackMenu.Screen
                name="Menu"
                component={MenuScreen}
                options={navOptionHandler}
            />
        </StackMenu.Navigator>
    );
}

// Sign out 
function signOut(navigation) {
    firebase.auth().signOut().then(function () {
        // Sign-out successful.
        navigation.goBack()
    }).catch(function (error) {
        // An error happened.
    });
}

function Dashboard({ route }) {

    const { userID, navigation } = route.params;
    const phoneMaxWidth = 575.98
    // get name and picture from firebase
    var db = firebase.firestore();
    const [userData, setUserData] = React.useState({ user: [] })

    React.useEffect(() => {
        // Fetch Current chef 
        db.collection('chefs').doc(userID).onSnapshot(function (doc) {
            if (doc.exists) {
                setUserData({ user: doc.data() })
            } else {
                console.log("No such document!");
            }
        })

    }, [])
    //add userID to userData
    userData.user.userID = userID
    if (windowWidth < phoneMaxWidth) {
        return <MobileDashboard userID={userID} userData={userData} />
    } else {
        return (
            <div className={userData.user.isDarkMode ? "darkWebDash" : "none"}>
                <WebDashboard userData={userData} navigation={navigation} />
            </div>
        )
    }
}


function WebDashboard({ userID, userData, navigation }) {

    const copyToClipboard = () => {
        Clipboard.setString(`lidora.app/?${userData.user.title.replace(/\s/g, '')}=${userID}`);
        alert("Link copied")

    };

    return (
        <View style={{ height: windowHeight, maxHeight: '100%' }}>
            <View style={{ flexDirection: 'column', position: "absolute", zIndex: 100, top: 50, left: 20 }}>
                <ReactPlaceholder showLoadingAnimation={true} type='round' delay={1000} ready={userData != null} style={{ width: 100, height: 100, marginBottom: 16 }}>
                    <Image style={{
                        height: 100, width: 100, borderRadius: 50, marginBottom: 16, backgroundColor: 'rgb(174,174,178)'
                    }} source={{ uri: userData.user.imageURL }} />
                </ReactPlaceholder>
                <ReactPlaceholder showLoadingAnimation={true} type='text' rows={1} delay={1000} ready={userData != null} >
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Welcome {userData.user.first_name}</Text>
                </ReactPlaceholder>
                <TouchableOpacity onPress={() => copyToClipboard()}>
                    <View style={{ marginTop: 10, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: "gray", fontWeight: '500', fontSize: 14, marginRight: 8 }} >Copy your link</Text>
                        <Entypo name="clipboard" size={12} color="gray" />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={{ marginTop: 16, marginBottom: 40 }} onPress={() => navigation.navigate("Settings", { userData: userData, navigation: navigation })}>
                    <Text style={{ fontWeight: '500' }}>Settings</Text>
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'column', justifyContent: 'space-around', position: "absolute", zIndex: 100, bottom: 50, left: 20 }}>
                <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => signOut(navigation)}>
                    <Text style={{ color: 'rgb(142, 142, 147)' }}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Support')}>
                    <Text style={{ color: 'rgb(142, 142, 147)', fontWeight: '500' }}>Support</Text>
                </TouchableOpacity>
            </View>
            <TabNavigator navigation={navigation} userData={userData} />
        </View >
    )
}

function MobileDashboard(userID, userData) {
    const copyToClipboard = () => {
        Clipboard.setString(`lidora.app/${userData.user.title.replace(/\s/g, '')}=${userID}`);
        alert("Link copied")
    };

    return (
        <View style={{ height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 17, alignSelf: 'center', marginTop: 50 }}>Dashboard will soon be available on mobile.</Text>
            <TouchableOpacity onPress={() => copyToClipboard()}>
                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-around' }}>
                    <Text >Click to Copy your profile link</Text>
                    <Entypo name="clipboard" size={20} color="gray" />
                </View>
            </TouchableOpacity>
        </View>
    )
}
export default Dashboard;
