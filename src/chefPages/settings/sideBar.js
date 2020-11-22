import * as React from "react";
import { Image, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { createSideTabNavigator } from "react-navigation-side-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from './editProfile';

const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");

const Tab = createSideTabNavigator();
const StackEditProfile = createStackNavigator();


const navOptionHandler = () => ({
    headerShown: false,
    header: null,
});

function TabNavigator({ navigation, userID }) {

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
                    paddingTop: 50,
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
                    title: "Edit Profile",
                    tabBarLabel: "Edit Profile",
                    backgroundColor: "#f4511e",
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
                initialParams={{ navigation: navigation, userID: userID }}
                name="Edit Profile"
                component={EditProfileStack}
            />
        </Tab.Navigator>
    );
}

// Stack to show the Dashboard
function EditProfileStack() {
    return (
        <StackEditProfile.Navigator initialRouteName="Edit Account">
            <StackEditProfile.Screen
                name="Edit Account"
                component={EditProfileScreen}
                options={navOptionHandler}
            />
        </StackEditProfile.Navigator>
    );
}

function Dashboard({ route }) {

    const phoneMaxWidth = 575.98

    if (windowWidth < phoneMaxWidth) {
        return <MobileDashboard />
    } else {
        return <WebDashboard />
    }
}


function WebDashboard({ userData, navigation }) {
    return (
        <View style={{ borderRadius: 10, marginTop: 50, height: '100%', width: '100%', alignSelf: 'center' }}>
            <View style={{ borderRadius: 10, marginTop: 50, height: '80%', width: '80%', alignSelf: 'center' }}>
                <TabNavigator />
            </View>
        </View>
    )
}

function MobileDashboard() {
    return (
        <View style={{ borderRadius: 10, height: '100%', width: '80%', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 17, alignSelf: 'center' }}>Dashboard will soon be available on mobile.</Text>
        </View>
    )
}
export default Dashboard;
