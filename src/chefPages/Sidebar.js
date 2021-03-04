import * as React from "react";
import { Image, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MenuScreen from "./menu/menu";
import InventoryScreen from "./inventory/inventory";
import OrdersScreen from "./order/orders";
import SupportScreen from "./support/support";
import { useTheme } from "@react-navigation/native";
import useGlobalStyles from "../globalStyle";
import firebase from "../firebase/Firebase";

import "firebase/firestore";
var db = firebase.firestore();

import { Entypo } from "@expo/vector-icons";
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
        headerShown: false,
      }}
    >
      <Stack.Screen
        options={{
          title: todayDate,
          tabBarLabel: "Menu",
          backgroundColor: "#f4511e",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          selected: {
            color: "red",
          },
        }}
        name="Menu"
        component={MenuStack}
      />

      <Stack.Screen
        options={{
          title: todayDate,
          tabBarLabel: "Inventory",
          backgroundColor: "#f4511e",
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "regular",
          },
          color: "green",
        }}
        name="Inventory"
        component={InventoryStack}
      />
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
        component={OrdersStack}
      />
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
  firebase
    .auth()
    .signOut()
    .then(function () {
      // Sign-out successful.
      navigation.goBack();
    })
    .catch(function (error) {
      // An error happened.
      alert(error);
    });
}

function SideBar({ route }) {
  const { userID, navigation } = route.params;
  const phoneMaxWidth = 575.98;
  // get name and picture from firebase
  const [userData, setUserData] = React.useState({ user: [] });

  React.useEffect(() => {
    // Fetch Current chef
    db.collection("chefs")
      .doc(userID ?? firebase.auth().currentUser.uid)
      .onSnapshot(function (doc) {
        if (doc.exists) {
          setUserData({ user: doc.data() });
        } else {
          console.log("No such document!");
        }
      });
  }, []);

  //add userID to userData
  userData.user.userID = userID;
  if (windowWidth < phoneMaxWidth) {
    return <MobileDashboard userID={userID} userData={userData} />;
  } else {
    return (
      <WebDashboard
        userID={userID}
        userData={userData}
        navigation={navigation}
      />
    );
  }
}

function WebDashboard({ userID, userData, navigation, menuOptions }) {
  return (
    <View style={{ height: windowHeight, maxHeight: "100%" }}>
      <SideBarItems
        userID={userID}
        userData={userData}
        navigation={navigation}
        menuOptions={menuOptions}
      />
    </View>
  );
}

function MobileDashboard(userID, userData) {
  return (
    <View
      style={{ height: "100%", alignItems: "center", justifyContent: "center" }}
    >
      <Text style={{ fontSize: 17, alignSelf: "center", marginTop: 50 }}>
        Dashboard will soon be available on mobile.
      </Text>
      <TouchableOpacity onPress={() => alert("Copy")}>
        <View
          style={{
            marginTop: 20,
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <Text>Click to Copy your profile link</Text>
          <Entypo name="clipboard" size={20} color="gray" />
        </View>
      </TouchableOpacity>
    </View>
  );
}

function SideBarItems({ userData, navigation }) {
  const globalStyle = useGlobalStyles();
  const { colors } = useTheme();

  const [selected, setSelected] = React.useState({ name: "Dash" });
  const [isAlertVisible, setIsAlertVisible] = React.useState(false);

  const optionSelected = (name) => {
    setSelected({ name: name });
  };

  const iconStyle = (name) => {
    if (name === selected.name) {
      return {
        tintColor: colors.btnPrimaryBg,
      };
    } else {
      return {
        color: colors.textSecondary,
      };
    }
  };

  const textStyle = (name) => {
    if (name === selected.name) {
      return {
        color: colors.btnPrimaryBg,
        marginLeft: 8,
        fontSize: 13,
        marginRight: 8,
        fontWeight: "600",
      };
    } else {
      return {
        color: colors.textSecondary,
        marginLeft: 8,
        fontSize: 13,
        marginRight: 8,
      };
    }
  };

  return (
    <View style={globalStyle.backgroundPrimary}>
      <View
        style={{
          width: 200,
          height: "100%",
          backgroundColor: colors.bgTertiary,
          borderRightWidth: 1,
          borderRightColor: colors.borderPrimary,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            position: "absolute",
            zIndex: 100,
            top: 20,
            left: 20,
          }}
        >
          {/* LIDORA */}
          <Text
            style={[
              { fontSize: 20, fontWeight: "700" },
              { color: colors.textPrimary },
            ]}
          >
            LIDORA
          </Text>

          {/* Inner buttons */}
          <View style={{ marginTop: 40 }}>
            <TouchableOpacity
              style={{
                marginBottom: 24,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("Menu");
                optionSelected("Menu");
              }}
            >
              <Image
                style={[{ width: 18, height: 18 }, iconStyle("Menu")]}
                source={require("../assets/icon/menu-50.png")}
              />
              <Text style={textStyle("Menu")}>Menu</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={{
                marginBottom: 24,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("Orders");
              }}
            >
              <Image
                style={[{ width: 20, height: 20 }, iconStyle("Orders")]}
                source={require("../assets/icon/orders-48.png")}
              />

              <Text style={textStyle("Orders")}>Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginBottom: 24,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("Store design");
              }}
            >
              <Image
                style={[{ width: 18, height: 18 }, iconStyle("Store design")]}
                source={require("../assets/icon/store-64.png")}
              />
              <Text style={textStyle("Orders")}>Store design</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginBottom: 24,
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => {
                navigation.navigate("StoreDesign");
              }}
            >
              <Image
                style={[{ width: 18, height: 18 }, iconStyle("Settings")]}
                source={require("../assets/icon/settings-48.png")}
              />
              <Text style={textStyle("Settings")}>Settings</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Outside buttons */}
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-around",
            position: "absolute",
            zIndex: 100,
            bottom: 50,
            left: 20,
          }}
        >
          <TouchableOpacity
            style={{ marginBottom: 20 }}
            onPress={() => signOut(navigation)}
          >
            <Text style={{ color: "rgb(142, 142, 147)" }}>Log Out</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Support")}>
            <Text style={{ color: "rgb(142, 142, 147)", fontWeight: "500" }}>
              Support
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View
        style={{
          width: windowWidth - 200,
          height: "100%",
          position: "absolute",
          left: 200,
        }}
      >
        <TabNavigator navigation={navigation} userData={userData} />
      </View>
    </View>
  );
}

export default SideBar;
