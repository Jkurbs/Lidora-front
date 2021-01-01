import * as React from "react";
import { Image, Text, View, TouchableOpacity, Dimensions, Clipboard, FlatList } from "react-native";

import { createStackNavigator } from "@react-navigation/stack";
import MenuScreen from "../menu/menu";
import InventoryScreen from "../inventory/inventory";
import DashboardScreen from "../dashboard/Dashboard.web";
import OrdersScreen from "../order/Order.web";
import SupportScreen from "../support/support";

import firebase from "../../firebase/Firebase";
import "firebase/firestore";
var db = firebase.firestore();

import moment from 'moment'

import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import "./darkMode.css"

import Alert from '../../components/Alerts/itemAlert'

import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");


const Stack = createStackNavigator();
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
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}>
            <Stack.Screen
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
                name="Dash"
                component={DashboardStack}
            />

            <Stack.Screen
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
                component={MenuStack}/>

            <Stack.Screen
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
                component={InventoryStack} />
            <Stack.Screen
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
                component={OrdersStack}/>
            <Stack.Screen
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
        </Stack.Navigator>
    );
}

// Stack to show the Dashboard
function DashboardStack() {
    return (
    <StackDashboard.Navigator initialRouteName="Dash">
        <StackDashboard.Screen
            name="Dash"
            component={DashboardScreen}
            options={navOptionHandler}
        />
        </StackDashboard.Navigator>
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
        alert(error)
    });
}

function SideBar({ route }) {

    const { userID, navigation } = route.params;
    const phoneMaxWidth = 575.98
    // get name and picture from firebase
    const [userData, setUserData] = React.useState({ user: [] })
    const [menuOptions, setMenuOptions] = React.useState([])

    React.useEffect(() => {
        // Fetch Current chef 
        db.collection('chefs').doc(userID ?? firebase.auth().currentUser.uid).onSnapshot(function (doc) {
            if (doc.exists) {
                setUserData({ user: doc.data() })
            } else {
                console.log("No such document!");
            }
        })
    }, [])

    React.useEffect(() => {
        db.collection('chefs').doc(userID ?? firebase.auth().currentUser.uid).collection("menu_categories").orderBy("date_added", "asc").onSnapshot(function (snapshot) {
            setMenuOptions([])
            snapshot.forEach(function (doc) {  
                setMenuOptions(prevState => [...prevState, doc.data().name])
            })
        })
    }, [])

    //add userID to userData
    userData.user.userID = userID
    if (windowWidth < phoneMaxWidth) {
        return <MobileDashboard userID={userID} userData={userData} />
    } else {
        return (
            <div className={userData.user.isDarkMode ? "darkWebDash" : "none"}>
                <WebDashboard userID={userID} userData={userData} navigation={navigation} menuOptions={menuOptions} />
            </div>
        )
    }
}


function WebDashboard({ userID, userData, navigation, menuOptions }) {
    return (
        <View style={{ height: windowHeight, maxHeight: '100%' }}>
            <SideBarItems userID={userID} userData={userData} navigation={navigation} menuOptions={menuOptions}/>
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




function SideBarItems({userID, userData, navigation, menuOptions}) {

    const copyToClipboard = () => {
        Clipboard.setString(`lidora.app/?${userData.user.title.replace(/\s/g, '')}=${userID}`);
        alert("Link copied")
    };
     
    const [selected, setSelected] = React.useState({ name: "Dash" })
    const [isAlertVisible, setIsAlertVisible] = React.useState(false)
    const [groupName, setNewGroupName] = React.useState("")
    // const [isHoveringMenuItem, setIsHoveringMenuItem] = React.useState(false)

    const cancelAlert = () => {
        setIsAlertVisible(!isAlertVisible)
    }

    const addsubMenu = () => {
        setIsAlertVisible(!isAlertVisible)
        db.collection('chefs').doc(userID).collection("menu_categories").doc().set({
            name: groupName,
            date_added: moment().format("X"),
        })
        .then(function() {
            console.log("Document successfully written!");
            setMenuOptions(prevState => [...prevState, groupName])
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
            setIsAlertVisible(!isAlertVisible)
        });
    }

    const optionSelected = (name) => {
        setSelected({name: name})
    }

    const buttonStyle = (name) => {
        if (name === selected.name ){
            return {
                marginTop: 8,
                backgroundColor: '#d9d9d9',
                padding: 5, 
                borderRadius: 2, 
                fontSize: 14
            }
        } else {
            return {
                marginTop: 8,
                padding: 5, 
                fontSize: 14
            }
        }
    }


    const Item = ({ title }) => (
        <View 
        // onMouseEnter={() =>  setIsHoveringMenuItem(true)}
        // onMouseLeave={() =>  setIsHoveringMenuItem(false)}
        style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <TouchableOpacity style={buttonStyle(title)} 
            onPress={() =>{
                optionSelected(title); navigation.navigate("Menu", {
                    screen:"Menu",
                    params: {
                        userData: userData, navigation: navigation, group: title
                    }
                    })}}>
                <Text style={{ fontWeight: '500', fontSize: 12 }}>{title}</Text>
            </TouchableOpacity>
        </View>
      );

    const renderItem = ({ item }) => (
        <Item title={item} />
      );

    return (
        <View style={{height: '100%', backgroundColor: 'blue'}}>
            <View style={{width: 200, height: '100%', backgroundColor: 'white', borderRight:'1px solid #d9d9d9'}}>
            <View style={{ flexDirection: 'column', position: "absolute", zIndex: 100, top: 50, left: 20 }}>
                <ReactPlaceholder showLoadingAnimation={true} type='round' delay={1000} ready={userData != null} style={{ width: 100, height: 100, marginBottom: 16 }}>
                    <Image style={{
                        height: 100, width: 100, borderRadius: 50, marginBottom: 16, backgroundColor: 'rgb(174,174,178)'
                    }} source={{ uri: userData.user.imageURL }}/>
                </ReactPlaceholder>
                <ReactPlaceholder showLoadingAnimation={true} type='text' rows={1} delay={1000} ready={userData != null} >
                    <Text style={{ fontSize: 20, fontWeight: '500' }}>Welcome {userData.user.first_name}</Text>
                </ReactPlaceholder>
                <TouchableOpacity onPress={() => copyToClipboard()}>
                    <View style={{ marginTop: 10, marginBottom: 16, flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: "gray", fontWeight: '500', fontSize: 14, marginRight: 8 }} >Copy your link</Text>
                        <Entypo name="clipboard" size={12} color="gray" />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={buttonStyle("Settings")}  onPress={() =>{optionSelected("Settings"); navigation.navigate("Settings", { userData: userData, navigation: navigation })} }>
                    <Text style={{ fontWeight: '500', fontSize: 12 }}>Settings</Text>
                </TouchableOpacity>


                {/* General */}
                <View style={{marginTop: 20}}>
                    <Text style={{fontWeight: '500', fontSize: 16}}>General</Text> 
                    <TouchableOpacity style={buttonStyle("Dash")}  onPress={() =>{optionSelected("Dash"); navigation.navigate("Dash",  { params: { userData: userData, navigation: navigation } })} }>
                        <Text style={{ fontWeight: '500', fontSize: 12 }}>Dashboard</Text>
                    </TouchableOpacity>
                </View>

                 {/* Menu */}
                <View style={{marginTop: 20}}>
                     <View style={{flexDirection: 'row', alignItems: 'center'}}>
                     <Text style={{fontWeight: '500', fontSize: 16, marginRight: 8}}>Menu</Text> 
                     <TouchableOpacity style={{padding: 3}} onPress={() =>{setIsAlertVisible(!isAlertVisible)} }>
                        <Ionicons name="ios-add-circle" size={22} color="rgb(0, 112, 201)" />
                    </TouchableOpacity>
                     </View>
                     <FlatList
                        data={menuOptions}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        />
                </View>

                {/* Inventory */}
                <View style={{marginTop: 20}}>
                    <Text style={{fontWeight: '500', fontSize: 16}}>Cooking Reports</Text> 
                    <TouchableOpacity style={buttonStyle("Inventory")}  onPress={() =>{optionSelected("Inventory"); navigation.navigate("Inventory",  { params: { userData: userData, navigation: navigation } })} }>
                        <Text style={{ fontWeight: '500', fontSize: 12 }}>Inventory</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'space-around', position: "absolute", zIndex: 100, bottom: 50, left: 20 }}>
                <TouchableOpacity style={{ marginBottom: 20 }} onPress={() => signOut(navigation)}>
                    <Text style={{ color: 'rgb(142, 142, 147)' }}>Log Out</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Support')}>
                    <Text style={{ color: 'rgb(142, 142, 147)', fontWeight: '500' }}>Support</Text>
                </TouchableOpacity>
            </View>
            </View>
            <View style={{width: windowWidth-200, height: '100%', position: 'absolute', left: 200}}>
            <TabNavigator navigation={navigation} userData={userData} />
            </View>

            <Alert
                cancelAction={cancelAlert}
                addAction={addsubMenu}
                onTextChange={(text) => {setNewGroupName(text)}}
                isVisible={isAlertVisible}
                buttonTitle1={"Add"} />
        </View>
    )
}

export default SideBar;
