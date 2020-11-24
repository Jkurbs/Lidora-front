import * as React from "react";
import { Text, View, Dimensions } from "react-native";
import { createSideTabNavigator } from "react-navigation-side-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from './EditProfile/editProfile';
import { ScrollView } from "react-native-gesture-handler";

const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");

const Tab = createSideTabNavigator();
const StackEditProfile = createStackNavigator();

const navOptionHandler = () => ({
    headerShown: false,
    header: null,
});

function TabNavigator({ userData }) {

    console.log("DATA TAB: ", userData)

    var options = { weekday: "long", month: "long", day: "numeric" };
    var today = new Date();
    const todayDate = today.toLocaleDateString("en-US", options);

    return (
        <Tab.Navigator
            tabBarOptions={{
                activeTintColor: "#34C759",
                inactiveTintColor: "black",
                tabStyle: { marginBottom: 20 },
                style: {
                    width: 200,
                    paddingTop: 30,
                },
                iconHorizontal: true,
                labelSize: 13,
                showLabel: true,
                tabWidth: 200,
                headerStyle: {
                    backgroundColor: "#f4511e",
                    // color: 'green'
                },
            }}
        >
            <Tab.Screen
                options={{
                    title: "Edit Profile",
                    tabBarLabel: "Edit Profile",
                    // backgroundColor: "#f4511e",
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
                name="Edit Profile"
                component={EditProfileStack}
                ini
            // initialParams={{ userData: userData }}
            />
        </Tab.Navigator>
    );
}

// Stack to show the Dashboard
function EditProfileStack({ userData }) {
    return (
        <StackEditProfile.Navigator initialRouteName="Edit Account">
            <StackEditProfile.Screen
                name="Edit Account"
                component={EditProfileScreen}
                options={navOptionHandler}
                initialParams={{ userData: userData }}
            />
        </StackEditProfile.Navigator>
    );
}

function Dashboard({ route }) {

    const phoneMaxWidth = 575.98
    const { navigation, userData } = route.params;
    console.log("SIDE BAR USER DATA: ", userData)

    if (windowWidth < phoneMaxWidth) {
        return <MobileDashboard />
    } else {
        return <WebDashboard navigation={navigation} userData={userData} />
    }
}


function WebDashboard({ navigation, userData }) {
    return (
        <View style={{ height: '100%', backgroundColor: 'red' }}>
            <Text onPress={() => navigation.navigate("Dashboard", navigation = { navigation })}>Back</Text>
            <View style={{ marginTop: 50, height: '100%' }} >
                < TabNavigator userData={userData} />
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
