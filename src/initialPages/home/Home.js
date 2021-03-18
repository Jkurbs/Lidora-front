import React, { useState } from "react";
import { registerRootComponent } from "expo";
import styles from "./home.style";
import { useTheme } from "@react-navigation/native";
import { Entypo } from "@expo/vector-icons";
import { GLView } from "expo-gl";

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
} from "react-native";

import { useColorScheme } from "react-native-appearance";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import { createStackNavigator } from "@react-navigation/stack";

import ApplyScreen from "../apply/Apply.js";
import LegalScreen from "../legal/Legal.js";
import LoginScreen from "../login/Login.js";
import DashboardScreen from "../../chefPages/Sidebar";
import Footer from "../../components/Footer";

import DeliveryApplicationScreen from "../../chefPages/productSettings/deliveryApplication";
import StoreDesignScreen from "../../chefPages/storeDesign/storeDesign";
import StoreFront from "../../customerPages/storeFront/storeFront";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import "firebase/auth";
import MenuDetailsScreen from "../../chefPages/menu/menuDetails";
import { LinearGradient } from "expo-linear-gradient";

const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");

const DATA = [
  {
    id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
    title: "Escape your 9-5 desk job.",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "End your commute.",
  },
  {
    id: "58694a0f-3da1-471f-bd96-145571e29d72",
    title: "Get paid for cooking.",
  },
  {
    id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
    title: "Do what you love.",
  },
];

function getPixelRatio() {
  return PixelRatio.get() <= 2;
}

const scale = windowWidth / 450;

function getRandomInt() {
  const max = windowWidth / 10;
  return Math.floor(Math.random() * (max - 50 + 1) + 50);
}

var db = firebase.firestore();

const stackOption = () => ({
  headerShown: false,
});

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

const chefImages = [
  {
    image: require("../../assets/img/chef.jpg"),
    size: getRandomInt(),
    top: Math.random() * 150,
  },
  {
    image: require("../../assets/img/chef1.jpg"),
    size: getRandomInt(),
    top: Math.random() * 150,
  },
  {
    image: require("../../assets/img/chef3.jpg"),
    size: getRandomInt(),
    top: Math.random() * 150,
  },
  {
    image: require("../../assets/img/chef4.jpg"),
    size: getRandomInt(),
    top: Math.random() * 150,
  },
];

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

    // Borders
    colorAutoGray0: "#fafbfc",
    colorAutoGray1: "#f6f8fa",
    colorAutoGray2: "#e1e4e8",
    colorAutoGray3: "#d1d5da",
    colorAutoGray4: "#959da5",
    colorAutoGray5: "#6a737d",
    colorAutoGray6: "#586069",
    colorAutoGray7: "#444d56",
    colorAutoGray8: "#2f363d",
    colorAutoGray9: "#24292e",
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

    // Grays
    colorAutoGray0: "#fafbfc",
    colorAutoGray1: "#f6f8fa",
    colorAutoGray2: "#e1e4e8",
    colorAutoGray3: "#d1d5da",
    colorAutoGray4: "#959da5",
    colorAutoGray5: "#6a737d",
    colorAutoGray6: "#586069",
    colorAutoGray7: "#444d56",
    colorAutoGray8: "#2f363d",
    colorAutoGray9: "#24292e",
  },
};

const FeaturesItem = ({ image, title, description }) => (
  <View
    style={{
      alignItems: "center",
      justifyContent: "center",
      margin: 8,
      width: getPixelRatio() ? windowWidth / 4 : windowWidth / 3,
      height: getPixelRatio() ? windowWidth / 4 : windowWidth / 3,
      backgroundColor: "#F5F5F7",
    }}
  >
    <Text
      style={{
        textAlignVertical: "center",
        textAlign: "center",
        alignSelf: "center",
        fontWeight: "500",
        fontSize: windowWidth < phoneMaxWidth ? 17 : 24,
      }}
    >
      {title}
    </Text>
  </View>
);

function HomeScreen(props) {
  const { colors } = useTheme();
  const navigation = props.navigation;

  const renderFeaturesItem = ({ item }) => (
    <FeaturesItem
      image={item.image}
      title={item.title}
      description={item.description}
    />
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        // Background Linear Gradient
        colors={["#144620", "#165c26", "#176f2c"]}
        style={
          (styles.backgroundImage,
          {
            height: getPixelRatio() ? windowHeight - 200 : "100%",
          })
        }
      >
        <View style={styles.secondaryView}>
          <View
            style={{
              padding: 16,
              paddingBottom: 40,
              marginTop: 20,
              width: "100%",
              height: "50%",
            }}
          >
            <Text
              style={{
                textAlign: "left",
                color: "white",
                width: "75%",
                fontSize: getPixelRatio() ? 40 : 25,
                fontWeight: "600",
              }}
            >
              Home cooks deserve to get paid doing what they love. Lidora makes
              it easy.
            </Text>

            <Text
              style={{
                marginTop: 20,
                width: "75%",
                color: "white",
                fontSize: getPixelRatio() ? 18 : 16,
              }}
            >
              Many home cooks and chefs of all sizes, use Lidora software to
              deliver food to customers, accept payments and manage their
              kitchen online.
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Apply")}
              style={{
                marginTop: 20,
                justifyContent: "center",
                alignContent: "center",
                backgroundColor: "white",
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
              <Text
                style={{ alignSelf: "center", fontSize: 12, fontWeight: "600" }}
              >
                Start Now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Users section */}
      <View
        style={{
          marginTop: 20,
          height: 200,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          padding: 20,
        }}
      >
        {chefImages.map((image) => (
          <Image
            style={{
              width: image.size,
              height: image.size,
              top: image.top,
              borderRadius: image.size / 2,
            }}
            source={image.image}
          />
        ))}
      </View>

      {/* Storefront section */}
      <View style={{ padding: 20, marginTop: getPixelRatio() ? 180 : 40 }}>
        <Text
          style={{
            marginBottom: 16,
            fontWeight: "600",
            fontSize: 17,
            color: colors.btnPrimaryBg,
          }}
        >
          A unified platform
        </Text>
        <View
          style={{
            width: "100%",
            flexDirection: getPixelRatio() ? "row" : "column",
            height: 400,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: getPixelRatio() ? "50%" : "100%",
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: getPixelRatio() ? 40 : 20,
                width: "100%",
              }}
            >
              A fully integrated Store front for your customers
            </Text>
            <Text
              style={{
                marginTop: 16,
                fontSize: getPixelRatio() ? 18 : 18,
              }}
            >
              We bring together everything that’s required to build a great
              custom Store Front for your customer, to accept payments, sell
              your food and everything in between.
            </Text>
          </View>
          <Image
            style={{
              width: getPixelRatio() ? "50%" : "100%",
              height: getPixelRatio() ? "100%" : "50%",
            }}
            source={require("../../assets/img/Kyoto.jpg")}
          />
        </View>
      </View>

      {/* Delivery section */}
      <View style={{ padding: 20, marginTop: 40 }}>
        <View
          style={{
            width: "100%",
            flexDirection: getPixelRatio() ? "row" : "column",
            height: 400,
            justifyContent: "space-between",
          }}
        >
          <View
            style={{
              flexDirection: "column",
              width: getPixelRatio() ? "50%" : "100%",
            }}
          >
            <Text
              style={{
                fontWeight: "600",
                fontSize: getPixelRatio() ? 40 : 20,
                width: "100%",
              }}
            >
              Lidora can also take care of delivery for you.
            </Text>
            <Text
              style={{
                marginTop: 16,
                fontSize: getPixelRatio() ? 18 : 18,
              }}
            >
              We bring together everything that’s required to build a great
              custom Store Front for your customer, to accept payments and sell
              your food and everything in between.
            </Text>
          </View>
          <Image
            style={{
              width: getPixelRatio() ? "50%" : "100%",
              height: getPixelRatio() ? "100%" : "50%",
            }}
            source={require("../../assets/img/Kyoto.jpg")}
          />
        </View>
      </View>

      <View style={{ marginTop: 40 }}>
        <Text
          style={{
            fontWeight: "600",
            fontSize: getPixelRatio() ? 40 : 30,
            padding: 40,
          }}
        >
          Lidora makes it possible for you to
        </Text>
        <FlatList
          style={{ marginTop: 20, marginBottom: 100 }}
          showsHorizontalScrollIndicator={false}
          data={DATA}
          renderItem={renderFeaturesItem}
          keyExtractor={(item) => item.id}
          horizontal={true}
        />
      </View>
    </View>
  );
}

const Stack = createStackNavigator();

function App(props) {
  const scheme = useColorScheme();
  const [userLoggedIn, setUserLoggedIn] = React.useState(null);
  const [userData, setUserData] = React.useState({ user: [], userID: "" });

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
              headerTintColor: "#fff",
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
            options={stackOption}
            name="Dashboard"
            component={DashboardScreen}
          />
          <Stack.Screen name="Apply" component={ApplyScreen} />
          <Stack.Screen name="Legal" component={LegalScreen} />
          <Stack.Screen
            options={stackOption}
            name="Menu Details"
            component={MenuDetailsScreen}
          />
          <Stack.Screen
            options={stackOption}
            name="Delivery Application"
            component={DeliveryApplicationScreen}
          />
          <Stack.Screen name="StoreDesign" component={StoreDesignScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default registerRootComponent(App);
