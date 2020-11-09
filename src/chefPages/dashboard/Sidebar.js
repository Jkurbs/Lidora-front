import * as React from "react";
import { Image, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from "react-native";
import { createSideTabNavigator } from "react-navigation-side-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import MenuScreen from "../menu/menu";
import InventoryScreen from "../inventory/inventory";
import DashboardScreen from "../dashboard/Dashboard.web";
import OrdersScreen from "../order/Order.web";
import SupportScreen from "../support/support";

import firebase from "../../firebase/Firebase";
import "firebase/firestore";

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

function TabNavigator() {
    var options = { weekday: "long", month: "long", day: "numeric" };
    var today = new Date();
    const todayDate = today.toLocaleDateString("en-US", options);

    return (
        <Tab.Navigator
            navigationOptions={{
                // Hide the header from AppNavigator stack
                header: null,
            }}
            tabBarOptions={{
                activeTintColor: "#34C759",
                inactiveTintColor: "black",
                tabStyle: { marginBottom: 20 },

                style: {
                    paddind: 60,
                    width: 200,
                    paddingTop: 250,
                },
                iconHorizontal: true,
                labelSize: 13,
                showLabel: true,
                tabWidth: 200,
                header: null,

                headerStyle: {
                    backgroundColor: "#f4511e",
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
                        fontWeight: "bold",
                    },
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
    const { user, navigation } = route.params;
    // get name and picture from firebase
    var db = firebase.firestore();
    const [userData, setUserData] = React.useState({ user: [] })

    React.useEffect(() => {
        // Fetch Current chef 
        db.collection('chefs').doc("cAim5UCNHnXPAvvK0sUa").get().then(function (doc) {
            console.log("data: ", doc.data())
            if (doc.exists) {
                setUserData({ user: doc.data() })
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }, [])

    return (
        <View style={{ height: '100%' }}>
            <View style={{ flexDirection: 'column', position: "absolute", zIndex: 100, top: 50, left: 20 }}>
                <Image style={{ height: 100, width: 100, borderRadius: 50, marginBottom: 16 }} source={{ uri: userData.user.imageURL }} />
                <Text style={{ fontSize: 20, fontWeight: '500' }}>Welcome {userData.user.first_name}</Text>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-around', position: "absolute", zIndex: 100, bottom: 50, left: 20 }}>
                <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => signOut(navigation)}>
                    <Text style={{ color: 'rgb(142, 142, 147)' }}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Support')}>
                    <Text style={{ color: 'rgb(142, 142, 147)', fontWeight: '500' }}>Support</Text>
                </TouchableOpacity>
            </View>

            <TabNavigator />
        </View>
    );
}

export default Dashboard;
