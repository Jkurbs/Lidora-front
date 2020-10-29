import React, { useState, useCallback } from "react";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import styles from "../../components/style";
import { Ionicons } from "@expo/vector-icons";
import {
  Platform,
  PixelRatio,
  Dimensions,
  Image,
  ImageBackground,
  Text,
  View,
  TouchableOpacity,
  Linking,
  TextInput,
  FlatList,
  Button
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DATA, FEATURESDATA } from "./home.data.js";

import ApplyScreen from "../apply/Apply.js";
import LegalScreen from "../legal/Legal.js";
import LoginScreen from "../login/Login.js";
import DashboardScreen from "../../chefPages/dashboard/Dashboard";

import firebase from "../../firebase/Firebase";
import "firebase/firestore";

const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");

const scale = windowWidth / 400;

export function normalize(size) {
  const newSize = size * scale;
  if (Platform.OS === "ios") {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
}

const url = "https://www.instagram.com/lidoralive/";

const FeaturesItem = ({ image, title, description }) => (
  <View
    style={{
      borderRadius: 5,
      alignItems: "center",
      margin: 8,
      padding: 20,
      width: 200,
      height: 250,
      backgroundColor: "#F5F5F7",
    }}
  >
    <Image
      style={{ resizeMode: "contain", marginBottom: 10, width: 60, height: 60 }}
      source={image}
    />
    <Text style={{ fontWeight: "500" }}>{title}</Text>
    <Text style={{ textAlign: "center", margin: 8 }}>{description}</Text>
  </View>
);

const Item = ({ title, image }) => (
  <View style={{ margin: 16, width: 200, height: 240 }}>
    <Image
      style={{ marginBottom: 10, borderRadius: 5, width: "auto", height: 200 }}
      source={image}
    />
    <Text style={styles.title}>{title}</Text>
  </View>
);

function HomeScreen({ navigation }) {

  // Properties 
  const [value, setValue] = useState("Looking for your favorite food?");
  const [messageValue, setMessageValue] = useState(
    "Join our waiting list And follow us on Instagram to stay updated."
  );
  const [customerEmail, setText] = useState("");


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

  // Function to handle instagram button pressed
  const handleSocialPress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Don't know how to open this URL: ${url}`);
    }
  }, [url]);

  const renderFeaturesItem = ({ item }) => (
    <FeaturesItem
      image={item.image}
      title={item.title}
      description={item.description}
    />
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} image={item.image} />
  );

  return (

    <View style={styles.container}>
      <StatusBar style="auto" />
      {/* Provider section */}
      <View style={{ width: '100%', height: '20%' }}>
        <ImageBackground
          style={{
            resizeMode: 'cover',
            width: windowWidth,
            height: windowWidth,
          }}
          source={require("../../assets/img/cook.svg")}
        >
          <View
            style={{
              width: '100%',
              flexDirection: "column",
              alignItems: "center",
            }}>

            <View
              style={{
                marginTop: 200,
                alignItems: "center",
                width: windowWidth,
                height: windowHeight - 200,
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
                  fontSize: 17,
                }}
              >
                Apply now to join the team
          </Text>
            </View>
            <View
              style={{
                width: 150,
                height: 45,
                borderRadius: 25,
              }}
            >
              <TouchableOpacity
                onPress={() => navigation.navigate("Apply")}
                style={{
                  alignItems: "center",
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
            style={{ marginTop: 40 }}
            data={FEATURESDATA}
            renderItem={renderFeaturesItem}
            keyExtractor={(item) => item.id}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        {/* Current chefs section */}
        {/* <View style={{ marginTop: 60 }}>
              <Text style={{ fontSize: 30, fontWeight: "500", marginLeft: 16 }}>
                Some of our chefs
        </Text>
              <FlatList
                style={{ marginTop: 40 }}
                data={DATA}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
              />
            </View> */}

        {/* Consumer section */}
        {/* <View
              style={{
                width: windowWidth,
                alignItems: "center",
                alignContent: "center",
              }}
            >
              <View
                style={{ marginTop: 90, alignItems: "center", width: windowWidth }}
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
                  {value}
                </Text>
                <Text
                  style={{
                    marginTop: 20,
                    marginBottom: 50,
                    textAlign: "center",
                    color: "black",
                    fontSize: 17,
                  }}
                >
                  {messageValue}
                </Text>
                <View
                  style={{
                    padding: 10,
                    width: windowWidth,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={{
                      backgroundColor: "#f4f9f4",
                      height: 60,
                      width: windowWidth - 50,
                      paddingHorizontal: 16,
                      borderRadius: 6,
                    }}
                    placeholder={"Email address"}
                    onChangeText={(text) => setText(text)}
                    defaultValue={customerEmail}
                  />
                  <Text
                    onPress={sendToEmailList}
                    style={{
                      borderRadius: 6,
                      marginLeft: 10,
                      padding: 20,
                      backgroundColor: "black",
                      color: "white",
                    }}
                  >
                    Send
            </Text>
                </View> */}
        {/* </View> */}
      </View>

      {/* Footer */}
      {/* <View
        style={{
          alignItems: "center",
          marginTop: 30,
          marginBottom: 20,
          padding: 20,
        }}>
        <Ionicons
          onPress={handleSocialPress}
          name="logo-instagram"
          size={26}
          color="gray"
        />
        <Text style={{ padding: 15, color: "black" }}>
          Lidora {"\u00A9"} 2020
        </Text>
        <Text onPress={() => navigation.navigate("Legal")}>
          Privacy & Legal
        </Text>
      </View> */}
    </View>
  );
}

const Stack = createStackNavigator();

const MyTheme = {
  dark: false,
  colors: {
    primary: "rgb(46, 204, 113)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "black",
    border: "rgb(199, 199, 204)",
    notification: "rgb(255, 69, 58)",
  },
};

function App() {
  // function Platform
  // protected routes?
  return (
    <NavigationContainer theme={MyTheme}>
      <Stack.Navigator
        initialRouteName="Lidora"
        screenOptions={{
          headerMode: "none",
          headerTransparent: true,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Lidora" component={HomeScreen}
          options={({ navigation, route }) => ({
            headerRight: () => (
              <TouchableOpacity
                onPress={() => {
                  /* 1. Navigate to the Details route with params */
                  navigation.navigate('Login', {
                    navigation: navigation,
                    otherParam: 'anything you want here',
                  });
                }}
                style={{
                  justifyContent: 'center',
                  alignContent: 'center', backgroundColor: 'white', marginRight: 16, width: 90, height: 40, borderRadius: 20, shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,
                  elevation: 7,
                }}
              >
                <Text style={{ alignSelf: 'center', fontSize: 17 }}>Login</Text>
              </TouchableOpacity>

              // <Button
              //   onPress={() => alert('This is a button!')}
              //   title="Login"
              //   color="white"
              //   borderRadius="10"

              // />
            ),
          })}
        />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Apply" component={ApplyScreen} />
        <Stack.Screen name="Legal" component={LegalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);
