import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import RegularButton from "../buttons/complimentaryButton";
import AnimatedHideView from "react-native-animated-hide-view";
import { TextInput } from "react-native-gesture-handler";
const { width: windowWidth } = Dimensions.get("window");

function RadioButton(props) {
  return (
    <View
      style={{
        height: 15,
        width: 15,
        borderRadius: 7.5,
        borderWidth: 1,
        borderColor: props.selected ? "#2EA44F" : "gray",
        alignItems: "center",
        justifyContent: "center",
        padding: 5,
      }}
    >
      {props.selected ? (
        <View
          style={{
            height: 11,
            width: 11,
            margin: 3,
            borderRadius: 5.5,
            backgroundColor: "#2EA44F",
            alignSelf: "center",
          }}
        />
      ) : null}
    </View>
  );
}

function ItemAlert(props) {
  const [selected, setSelected] = React.useState(false);

  return (
    <AnimatedHideView visible={props.isVisible} style={styles.container}>
      <View style={styles.alert}>
        <Text style={styles.title}>Create a New menu Group</Text>
        {/* <Text style={styles.secondaryText}>Customers will be able to shop by different groups.</Text> */}
        <View style={styles.inputContainer}>
          <Text style={{ fontWeight: "500" }}>Group Name</Text>
          <TextInput
            style={styles.textInput}
            autoCapitalize={"words"}
            onChangeText={(text) => {
              props.onTextChange(text);
            }}
          />
        </View>
        <TouchableOpacity
          onPress={() => {
            setSelected(!selected);
            props.groupSales(!selected);
          }}
          style={{ flexDirection: "row", marginTop: 16 }}
        >
          <RadioButton selected={selected} />
          <Text style={{ marginLeft: 8 }}>
            Sell all items in this group together
          </Text>
        </TouchableOpacity>
        <View style={styles.buttonContainer}>
          <RegularButton action={props.cancelAction} text={"Cancel"} />
          <TouchableOpacity onPress={props.addAction} style={styles.button}>
            <Text style={styles.text}>{"Add"}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </AnimatedHideView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "center",
    height: "100%",
    width: windowWidth,
    position: "absolute",
    alignSelf: "center",
    zIndex: 99999,
  },

  alert: {
    backgroundColor: "white",
    borderRadius: 5,
    width: 550,
    height: 250,
    alignSelf: "center",
    padding: 30,
    shadowColor: "#000",
    shadowColor: "#000",
    shadowOpacity: 0.13,
    shadowRadius: 10.68,
  },

  title: {
    fontSize: 25,
    fontWeight: "600",
    marginBottom: 8,
  },

  secondaryText: {
    color: "#9F9F9F",
  },

  inputContainer: {
    marginTop: 8,
  },

  textInput: {
    marginTop: 8,
    borderColor: "#9F9F9F",
    borderWidth: 1,
    height: 30,
    borderRadius: 5,
    padding: 8,
  },

  buttonContainer: {
    position: "absolute",
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "flex-end",
    bottom: 10,
  },

  button: {
    backgroundColor: "#9F9F9F",
    width: 100,
    height: 30,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  text: {
    fontSize: 14,
    color: "white",
  },
});

export default ItemAlert;
