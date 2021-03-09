import React from "react";
// import styles from "./menu.styles";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
} from "react-native";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import { useTheme } from "@react-navigation/native";
import globalStyle from "../../globalStyle";
import { FlatGrid } from "react-native-super-grid";
const { width: windowWidth } = Dimensions.get("screen");

var db = firebase.firestore();
const ref = db.collection("chefs");

function ProductSettings() {
  const useGlobalStyles = globalStyle();
  const { colors } = useTheme();

  //View
  //View
  //Title
  //Description
  //Grid
  //View
  //View
  //Title
  //Description
  //Grid
  //View
  //View

  return (
    <View style={[useGlobalStyles.backgroundPrimary, styles.container]}>
      <View>
        <Text style={[styles.title]}>Product Settings</Text>
        <Text styles={{ color: colors.textSecondary }}>
          Manage Lidora products for your Store.
        </Text>
        <FlatGrid
          itemDimension={(windowWidth / 3, windowWidth / 3)}
          data={[1, 2, 3, 4, 5, 6]}
          renderItem={({ item }) => (
            <Text
              style={{
                backgroundColor: "red",
              }}
            >
              {item}
            </Text>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 8,
  },

  description: {},
});

export default ProductSettings;
