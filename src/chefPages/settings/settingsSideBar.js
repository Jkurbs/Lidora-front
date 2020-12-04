import * as React from "react";
import { Text, View, TouchableOpacity, Dimensions } from "react-native";
import { createSideTabNavigator } from "react-navigation-side-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import EditProfileScreen from './EditProfile/editProfile';
import BankAccountScreen from './bank/bankAccounts'
import PreferenceScreen from './Preference/preference';


const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");

const Tab = createSideTabNavigator();

const StackEditProfile = createStackNavigator();
const StackBankAccount = createStackNavigator();
const StackPreference = createStackNavigator();


const navOptionHandler = () => ({
    headerShown: false,
    header: null,
});

function TabNavigator({ userData }) {

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
                    paddingTop: 120,
                },
                iconHorizontal: true,
                labelSize: 13,
                showLabel: true,
                tabWidth: 200,
                headerStyle: {
                    backgroundColor: "#f4511e",
                },
            }}
        >
            <Tab.Screen
                options={{
                    title: "Edit Profile",
                    tabBarLabel: "Edit Profile",
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
                name="Edit Profile"
                component={EditProfileStack}
                ini
            />

            {/* <Tab.Screen
                options={{
                    title: "Preferences",
                    tabBarLabel: "Preferences",
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
                name="Preferences"
                component={PreferenceStack}
                ini
            // initialParams={{ userData: userData }}
            /> */}

            <Tab.Screen
                options={{
                    title: "Bank accounts",
                    tabBarLabel: "Bank accounts",
                    headerTintColor: "#fff",
                    headerTitleStyle: {
                        fontWeight: "bold",
                    },
                }}
                name="Bank accounts"
                component={BankAccountsStack}
                ini
            />
        </Tab.Navigator>
    );
}

// Stack to show EditProfile
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

// Stack to show bank accounts 
function BankAccountsStack({ userData }) {
    return (
        <StackBankAccount.Navigator initialRouteName="Bank accounts">
            <StackBankAccount.Screen
                name="Bank accounts"
                component={BankAccountScreen}
                options={navOptionHandler}
                initialParams={{ userData: userData }}
            />
        </StackBankAccount.Navigator>
    );
}

// Stack to show Preferences
function PreferenceStack({ userData }) {
    return (
        <StackPreference.Navigator initialRouteName="Preferences">
            <StackPreference.Screen
                name="Preferences"
                component={PreferenceScreen}
                options={navOptionHandler}
                initialParams={{ userData: userData }}
            />
        </StackPreference.Navigator>
    );
}

function Dashboard({ route }) {

    const phoneMaxWidth = 575.98
    const { navigation, userData } = route.params;

    if (windowWidth < phoneMaxWidth) {
        return <MobileDashboard />
    } else {
        return <WebDashboard navigation={navigation} userData={userData} />
    }
}


function WebDashboard({ navigation, userData }) {
    return (
        <View style={{ height: '100%' }}>
            <View style={{ flexDirection: 'column', position: "absolute", zIndex: 100, top: 30, left: 20 }}>
                <TouchableOpacity style={{ marginTop: 16, marginBottom: 20 }} onPress={() => navigation.navigate("Dashboard", navigation = { navigation })}>
                    <Text style={{ fontWeight: '500' }}>Back</Text>
                </TouchableOpacity>
            </View>
            < TabNavigator userData={userData} />
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
