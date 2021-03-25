import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  PixelRatio,
  StyleSheet,
} from "react-native";

import "firebase/firestore";
import "firebase/auth";

function getPixelRatio() {
  return PixelRatio.get() <= 2;
}

function PhoneGraphic() {
  return (
    <View
      style={{
        margin: 40,
        alignSelf: "center",
        width: getPixelRatio() ? 264 : 100,
        height: getPixelRatio() ? 533 : 202,
        padding: 8,
        borderRadius: getPixelRatio() ? 20 : 10,
        backgroundColor: "#f6f9fc",
        boxShadow:
          "0 50px 100px -20px rgb(50 50 93 / 25%), 0 30px 60px -30px rgb(0 0 0 / 30%), inset 0 -2px 6px 0 rgb(10 37 64 / 35%)",
      }}
    >
      <View
        style={{
          width: "100%",
          height: "100%",
          padding: 20,
          alignItems: "center",
        }}
      >
        <View
          style={{
            borderRadius: 30,
            width: getPixelRatio() ? 60 : 20,
            height: getPixelRatio() ? 60 : 20,
            alignSelf: "center",
            backgroundColor: "#F6F8FA",
          }}
        />
        <Text style={{ fontWeight: "600", marginTop: 8, marginBottom: 8 }}>
          Jason Ramirez
        </Text>
        <Text style={{ textAlign: "center", fontSize: 11, color: "#586069" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
    </View>
  );
}

export default PhoneGraphic;
