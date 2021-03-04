import React from "react";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import styles from "./home.style";
import { Entypo } from "@expo/vector-icons";
import {
  Platform,
  PixelRatio,
  Dimensions,
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";

import { AppearanceProvider, useColorScheme } from "react-native-appearance";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";
import { FEATURESDATA } from "./home.data.js";

import ApplyScreen from "../apply/Apply.js";
import LegalScreen from "../legal/Legal.js";
import LoginScreen from "../login/Login.js";
import DashboardScreen from "../../chefPages/Sidebar";
import Footer from "../../components/Footer";

import ProductSettingsScreen from "../../chefPages/productSettings/productSettings";
import StoreDesignScreen from "../../chefPages/storeDesign/storeDesign";
// import SettingScreen from "../../chefPages/settings/settingsSideBar";
import StoreFront from "../../customerPages/storeFront/storeFront";
import * as Linking from "expo-linking";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import "firebase/auth";

import MenuDetailsScreen from "../../chefPages/menu/menuDetails";

const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");

const scale = windowWidth / 400;

var db = firebase.firestore();

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const phoneMaxWidth = 575.98;

var unsubscribe;

const CustomDefaultTheme = {
  colors: {
    ...DefaultTheme.colors,
    background: "#f6f8fa",
    bgSecondary: "white",
    bgTertiary: "#FAFBFC",
    bgCanvas: "white",

    // Inputs
    inputBg: "white",
    inputBorder: "#e1e4e8",
    inputTextColor: "black",

    // Texts
    textPrimary: "#24292e",
    textSecondary: "#586069",
    textTertiary: "#6a737d",
    textPlaceholder: "#6a737d",
    textDisabled: "#6a737d",
    textInverse: "white",
    textLink: "#0366d6",
    textDanger: "#cb2431",
    textSuccess: "#22863a",
    textWarning: "#b08800",
    textWhite: "#fff",

    // Borders
    borderPrimary: "#e1e4e8",
    borderSecondary: "#eaecef",
    borderTertiary: "#d1d5da",
    borderOverlay: "#e1e4e8",
    borderInverse: "#fff",
    borderInfo: "#0366d6",
    borderDanger: "#d73a49",
    borderSuccess: "#34d058",
    borderWarning: "#f9c513",

    // Btn
    btnText: "#24292e",
    btnBg: "#fafbfc",
    btnBorder: "rgba(27,31,35,0.15)",
    btnShadow: "0 1px 0 rgba(27,31,35,0.04)",
    btnInsetShadow: "0 1px 0 hsla(0,0%,100%,0.25)",
    btnHoverBg: "#f3f4f6",
    btnHoverBorder: "rgba(27,31,35,0.15)",
    btnSelectedBg: "#edeff2",
    btnFocusBg: "#fafbfc",
    btnFocusBorder: "rgba(27,31,35,0.15)",
    btnFocusShadow: "0 0 0 3px rgba(3,102,214,0.3)",
    btnPrimaryText: "white",
    btnPrimaryBg: "#2ea44f",
    btnPrimaryBorder: "rgba(27,31,35,0.15)",
    btnPrimaryShadow: "0 1px 0 rgba(27,31,35,0.1)",
    btnPrimarySnsetShadow: " 0 1px 0 hsla(0,0%,100%,0.03)",

    deletionText: "#cb2431",
    deletionBg: "#ffeef0",
    deletionBorder: "#d73a49",
  },
};

const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,

    background: "#0d1117",
    bgSecondary: "#0d1117",
    bgTertiary: "#21262d",
    bgCanvas: "#0d1117",
    card: "rgb(255, 255, 255)",
    notification: "rgb(255, 69, 58)",

    // Texts
    textPrimary: "#C9D1D9",
    textSecondary: "#8b949e",
    textTertiary: "#8b949e",

    textLink: "#58a6ff",
    textDanger: "#f85149",
    textSuccess: "#56d364",
    colorTextWarning: "#e3b341",
    textWhite: "#f0f6fc",

    // Inputs
    inputBg: "#0d1117",
    inputBorder: "#21262d",
    inputTextColor: "white",

    // Primary btn
    btnPrimaryBg: "#238636",
    btnPrimaryBorder: "#2ea043",
    btnBg: "#21262d",

    // Border
    borderPrimary: "#30363d",
  },
};

const FeaturesItem = ({ image, title, description }) => (
  <View
    style={{
      borderRadius: 5,
      alignItems: "center",
      justifyContent: "center",
      margin: 8,
      padding: 20,
      width: windowWidth < phoneMaxWidth ? 200 : windowWidth / 3,
      height: 250,
      backgroundColor: "#F5F5F7",
    }}
  >
    <Image
      style={{
        resizeMode: "contain",
        marginBottom: 10,
        width: windowWidth < phoneMaxWidth ? 60 : 120,
        height: windowWidth < phoneMaxWidth ? 60 : 120,
      }}
      source={image}
    />
    <Text
      style={{
        textAlign: "center",
        fontWeight: "500",
        fontSize: windowWidth < phoneMaxWidth ? 17 : 24,
      }}
    >
      {title}
    </Text>
    <Text style={{ textAlign: "center", margin: 8 }}>{description}</Text>
  </View>
);

const Item = ({ title, image }) => (
  <View style={{ margin: 16, width: windowWidth / 4, height: windowWidth / 4 }}>
    <Image
      style={{
        marginBottom: 10,
        borderRadius: 5,
        width: "100%",
        height: "100%",
      }}
      source={image}
    />
    <Text style={styles.title}>{title}</Text>
  </View>
);

function HomeScreen() {
  const [titleText, setTitleText] = React.useState(
    "Looking for your favorite food?"
  );
  const [secondaryText, setSecondaryText] = React.useState(
    "Join our waiting list And follow us on Instagram to stay updated"
  );
  const [customerEmail, setCustomerEmail] = React.useState("");

  // Function to Add potential user to email list
  const addUser = async () => {
    var db = firebase.firestore();
    try {
      const potentialUserDoc = await db.collection("potential_users").add({
        email_address: customerEmail,
      });
      return;
    } catch (error) {
      console.log(error);
    }
  };

  const sendToEmailList = () => {
    const newCustomerTitle = "Thank you!";
    const newMessage = "We'll keep you updated.";
    setValue(newCustomerTitle);
    setMessageValue(newMessage);
    addUser();
  };

  const renderFeaturesItem = ({ item }) => (
    <FeaturesItem
      image={item.image}
      title={item.title}
      description={item.description}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      {/* Provider section */}
      <ImageBackground
        resizeMode={"cover"}
        style={styles.backgroundImage}
        source={
          windowWidth < phoneMaxWidth
            ? require("../../assets/img/cook.svg")
            : require("../../assets/img/test.svg")
        }
      >
        <View style={styles.secondaryView}>
          <View
            style={{
              marginTop: 50,
              marginBottom: 50,
              alignItems: "center",
              width: "auto",
              height: "50%",
            }}
          >
            <Text
              style={{
                width: windowWidth,
                textAlign: "center",
                color: "black",
                fontSize: normalize(30),
                fontWeight: "500",
              }}
            >
              Ready to start cooking {"\n"} and selling?
            </Text>
            <Text
              style={{
                marginTop: 20,
                textAlign: "center",
                color: "black",
                fontSize: windowWidth < phoneMaxWidth ? 14 : 20,
              }}
            >
              Apply now to join the team
            </Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Apply")}
              style={{
                alignItems: "center",
                marginTop: 20,
                width: 150,
                height: 45,
                borderRadius: 25,
                backgroundColor: "black",
              }}
            >
              <Text
                style={{
                  color: "white",
                  margin: 12.5,
                  textAlign: "center",
                  fontWeight: "500",
                }}
              >
                Apply now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>

      {/* Provide section */}
      <View style={{ marginTop: 60 }}>
        <Text style={{ fontSize: 30, fontWeight: "500", marginLeft: 16 }}>
          What we provide
        </Text>
        <FlatList
          style={{ marginTop: 20 }}
          data={FEATURESDATA}
          renderItem={renderFeaturesItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        />
      </View>
      <Footer />
    </SafeAreaView>
  );
}

const Stack = createStackNavigator();

const MyTheme = {
  dark: true,
  colors: {
    primary: "rgb(46, 204, 113)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "black",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

function App(props) {
  const scheme = useColorScheme();
  const [userLoggedIn, setUserLoggedIn] = React.useState(null);
  const [userData, setUserData] = React.useState({ user: [], userID: "" });
  const [location, setLocation] = React.useState({});

  // Verify if user is logged in

  React.useEffect(() => {
    // Fetch Current chef
    const currentComponent = this;
    unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        db.collection("chefs")
          .doc(user.uid)
          .get()
          .then(function (doc) {
            if (doc.exists) {
              setUserLoggedIn(true);
              setUserData({ user: doc.data(), userID: user.uid });
            } else {
              console.log("No such document!");
            }
          })
          .catch(function (error) {
            console.log("Error getting document:", error);
          });
        return;
      } else {
        // No user is signed in.
        setUserLoggedIn(false);
      }
    });
  }, []);

  let currentURL = window.location.href;
  let getChefandID = currentURL.split("?");
  let storeName = currentURL.split("=")[1];

  if (typeof getChefandID[1] != "undefined") {
    return <StoreFront storeName={storeName} />;
  } else {
    return (
      <NavigationContainer
        theme={scheme === "dark" ? CustomDarkTheme : CustomDefaultTheme}
      >
        <Stack.Navigator
          initialRouteName="Lidora"
          screenOptions={{
            headerMode: "none",
            headerTransparent: true,
          }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          {/* <Stack.Screen name="Settings" component={SettingScreen} /> */}
          <Stack.Screen
            name="Lidora"
            component={HomeScreen}
            options={({ navigation, route }) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => {
                    /* 1. Navigate to the Details route with params */
                    navigation.navigate(userLoggedIn ? "Dashboard" : "Login", {
                      navigation: navigation,
                      userData: userData,
                      userID: userData.userID,
                    });
                  }}
                  style={{
                    justifyContent: "center",
                    alignContent: "center",
                    backgroundColor: "white",
                    marginRight: 16,
                    width: 90,
                    height: 40,
                    borderRadius: 20,
                    shadowColor: "#000",
                    shadowOffset: {
                      width: 0,
                      height: 3,
                    },
                    shadowOpacity: 0.29,
                    shadowRadius: 4.65,
                    elevation: 7,
                  }}
                >
                  {userLoggedIn ? (
                    <Text style={{ alignSelf: "center", fontSize: 12 }}>
                      {"Dashboard"}
                      <Entypo
                        name="chevron-small-right"
                        size={12}
                        color="black"
                      />
                    </Text>
                  ) : (
                    <Text style={{ alignSelf: "center", fontSize: 14 }}>
                      {"Login"}
                    </Text>
                  )}
                </TouchableOpacity>
              ),
            })}
          />
          <Stack.Screen
            options={{ headerShown: false }}
            name="Dashboard"
            component={DashboardScreen}
          />
          <Stack.Screen name="Apply" component={ApplyScreen} />
          <Stack.Screen name="Legal" component={LegalScreen} />
          <Stack.Screen name="MenuDetails" component={MenuDetailsScreen} />
          <Stack.Screen
            name="ProductSettings"
            component={ProductSettingsScreen}
          />
          <Stack.Screen name="StoreDesign" component={StoreDesignScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default registerRootComponent(App);
