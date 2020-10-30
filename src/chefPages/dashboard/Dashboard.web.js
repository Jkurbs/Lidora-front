import * as React from 'react';
import { Image, Text, View, SafeAreaView, ScrollView } from 'react-native';
import { createSideTabNavigator } from 'react-navigation-side-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from "@expo/vector-icons";


import MenuScreen from '../menu/menu';

import firebase from '../../firebase/Firebase';
import 'firebase/firestore';

var date = new Date().getDate();


const Tab = createSideTabNavigator();
const Drawer = createDrawerNavigator();
const StackMenu = createStackNavigator();

const navOptionHandler = () => ({
    headerShown: false,
    header: null

})

function TabNavigator(props, currentDate) {

    console.log('CURRENT DATE:', currentDate)
    return (
        <Tab.Navigator

            tabBarOptions={{
                activeTintColor: '#34C759',
                inactiveTintColor: 'black',
                style: { paddind: 60, width: 296, paddingTop: 250 },
                iconHorizontal: true,
                labelSize: 15,
                showLabel: true,
                tabWidth: 300,
                header: null,

                headerStyle: {
                    backgroundColor: '#f4511e',
                },
            }}
        >
            <Tab.Screen
                options={{
                    title: 'Friday, October 30',
                    tabBarLabel: 'Menu',
                    backgroundColor: '#f4511e',
                    headerTintColor: '#fff',
                    headerTitleStyle: {
                        fontWeight: 'bold',
                    },
                }}

                name="Menu" component={MenuStack} />
        </Tab.Navigator>

    )
}


function MenuStack() {
    return (
        <StackMenu.Navigator initialRouteName="Menu">
            <StackMenu.Screen name="Menu" component={MenuScreen} options={navOptionHandler} />
        </StackMenu.Navigator>
    )
}


function Dashboard({ route }) {
    const { user } = route.params;
    //get name and picture from firebase

    const [currentDate, setCurrentDate] = React.useState('');

    var db = firebase.firestore();




    const [userData, setUserData] = React.useState({ user: [] })
    React.useEffect(() => {

        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        var sec = new Date().getSeconds(); //Current Seconds
        setCurrentDate(
            date + '/' + month + '/' + year
            + ' ' + hours + ':' + min + ':' + sec
        );




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
                <Image style={{ height: 120, width: 120, borderRadius: 60, marginBottom: 16 }} source={{ uri: userData.user.imageURL }} />
                <Text style={{ fontSize: 25, fontWeight: '700' }}>Welcome {userData.user.first_name}</Text>
            </View>
            <TabNavigator currentDate={currentDate} />
        </View>
    );
}

export default Dashboard;

