import React from "react";
import { registerRootComponent } from "expo";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BottomSheet from "reanimated-bottom-sheet";
import { Dimensions } from "react-native";
import { DATA } from "./app.data.js";
import { StyleSheet, Text, View, SectionList } from "react-native";
import styles from './app.styles.js';
import ChefInfoView from "../components/chefInfoView";
import EmptyBag from "../components/emptyBagView";
import MenuView from "../components/menuView";
import ItemInfoView from "../components/itemInfoView";

const Stack = createStackNavigator();
const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

const sheetRef = React.createRef();
let item;

const Item = ({ title }) => (
  <View style={menuStyles.item}>
    <Text style={menuStyles.title}>{title}</Text>
  </View>
);

class HomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      bagTitle: "View Bag",
      bagClosed: true,
      item,
    };
    this.showBag = this.showBag.bind(this);
    this.renderContent = this.renderContent.bind(this);
  }

  // FUNCTIONS
  showBag = (item) => {
    this.item = item;
    sheetRef.current.snapTo(1);
    if (item.price !== undefined) {
      this.setState({
        bagTitle: item.name,
        bagClosed: false,
        item: item,
      });
    } else {
      this.setState({
        bagTitle: this.state.bagTitle,
      });
    }
  };

  fullBag() {
    return <Text>{"Not empty"}</Text>;
  }

  renderElement() {
    if (this.state.bagClosed === true) {
      return <EmptyBag />;
    } else {
      return <ItemInfoView item={this.item} />;
    }
  }

  renderContent = () => (
    <View
      style={styles.viewContainer}
    >
      <Text
        onPress={this.showBag}
        style={{
          backgroundColor: "#ecf0f1",
          fontSize: 17,
          fontWeight: "600",
          textAlign: "center",
          position: "absolute",
          padding: 16,
          width: windowWidth,
          height: 60,
        }}
      >
        {this.state.bagTitle}
      </Text>
      {this.renderElement(this.state.item)}
    </View>
  );

  render() {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <SectionList
          style={{ marginBottom: 100 }}
          sections={DATA}
          renderSectionHeader={({ section }) => {
            return (
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{section.title}</Text>
              </View>
            );
          }}
          renderItem={({ item }) => {
            if (item.type === "User") {
              return <ChefInfoView item={item} />;
            }
            return <MenuView item={item} showBag={this.showBag} />;
          }}
          stickySectionHeadersEnabled={false}
        />
        {/* Bottomsheet View */}

        <BottomSheet
          ref={sheetRef}
          snapPoints={[100, windowHeight - 100]}
          borderRadius={10}
          renderContent={this.renderContent}
          onOpenStart={() => {
            // calling logic to show bag
            this.setState({
              bagClosed: false,
            });
          }}
          onCloseEnd={() => {
            // calling logic to hide bag
            this.setState({
              bagTitle: "View Bag",
              bagClosed: true,
            });
          }}
        />
      </View>
    );
  }
}

class App extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Menu"
            component={HomeScreen}
            options={{
              // headerTitle: props => <LogoTitle {...props} />,
              headerRight: () => (
                <Ionicons
                  style={{ paddingRight: 16 }}
                  name="ios-list"
                  size={26}
                  color="black"
                />
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default registerRootComponent(App);
