import React, { useState, useCallback } from "react";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import styles from "./home.style";
import { Entypo } from '@expo/vector-icons';
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
  SafeAreaView
} from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { DATA, FEATURESDATA } from "./home.data.js";

import ApplyScreen from "../apply/Apply.js";
import LegalScreen from "../legal/Legal.js";
import LoginScreen from "../login/Login.js";
import DashboardScreen from "../../chefPages/dashboard/Sidebar";
import Footer from "../../components/Footer"

import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import "firebase/auth";


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

const phoneMaxWidth = 575.98

var unsubscribe;

const FeaturesItem = ({ image, title, description }) => (
  <View
    style={{
      borderRadius: 5,
      alignItems: "center",
      justifyContent: 'center',
      margin: 8,
      padding: 20,
      width: windowWidth < phoneMaxWidth ? 200 : windowWidth / 3,
      height: 250,
      backgroundColor: "#F5F5F7",
    }}
  >
    <Image
      style={{ resizeMode: "contain", marginBottom: 10, width: windowWidth < phoneMaxWidth ? 60 : 120, height: windowWidth < phoneMaxWidth ? 60 : 120 }}
      source={image}
    />
    <Text style={{ textAlign: 'center', fontWeight: "500", fontSize: windowWidth < phoneMaxWidth ? 17 : 24 }}>{title}</Text>
    <Text style={{ textAlign: "center", margin: 8 }}>{description}</Text>
  </View>
);

const Item = ({ title, image }) => (
  <View style={{ margin: 16, width: windowWidth / 4, height: windowWidth / 4 }}>
    <Image
      style={{ marginBottom: 10, borderRadius: 5, width: '100%', height: '100%' }}
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

    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />

      {/* Provider section */}

      <ImageBackground resizeMode={'cover'} style={styles.backgroundImage} source={windowWidth < phoneMaxWidth ? require("../../assets/img/cook.svg") : require("../../assets/img/test.svg")} >
        <View style={styles.secondaryView}>
          <View style={{ marginTop: 50, marginBottom: 50, alignItems: "center", width: 'auto', height: '50%', }}>
            <Text style={{ width: windowWidth, textAlign: "center", color: "black", fontSize: normalize(30), fontWeight: "500" }}>
              Ready to start cooking {"\n"} and selling?
              </Text>
            <Text style={{ marginTop: 20, textAlign: "center", color: "black", fontSize: windowWidth < phoneMaxWidth ? 14 : 20 }}>
              Apply now to join the team
              </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate("Apply")}
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
                }}>
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

  var db = firebase.firestore();

  const [userLoggedIn, setIsUserLoggedIn] = React.useState(false)
  const [userData, setUserData] = React.useState({
    user: [],
    userID: ""
  })

  // Verify if user is logged in
  React.useEffect(() => {
    unsubscribe = firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setIsUserLoggedIn(true)
        db.collection('chefs').doc(user.uid).get().then(function (doc) {
          if (doc.exists) {
            setUserData({
              user: doc.data(),
              userID: user.uid
            })
          } else {
            console.log("No such document!");
          }
        }).catch(function (error) {
          console.log("Error getting document:", error);
        });
        return
      } else {
        // No user is signed in.
        setIsUserLoggedIn(false)
      }
    })
    // unsubscribe()
  })

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
                  navigation.navigate(userLoggedIn ? 'Dashboard' : 'Login',
                    {
                      navigation: navigation,
                      userID: userData.userID
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
                {userLoggedIn ? (
                  <Text style={{ alignSelf: 'center', fontSize: 12 }}>{'Dashboard'}
                    <Entypo name="chevron-small-right" size={12} color="black" />
                  </Text>

                ) : (
                    <Text style={{ alignSelf: 'center', fontSize: 14 }}>{'Login'}</Text>
                  )}
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen options={{ headerShown: false }} name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Apply" component={ApplyScreen} />
        <Stack.Screen name="Legal" component={LegalScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default registerRootComponent(App);

{/* Current chefs section */ }
{/* <View style={{ marginTop: 60, width: '100%' }}>
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
          />  */}
{/* Consumer section */ }
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
{/* Footer */ }
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