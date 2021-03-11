import React from "react";
import {
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";

function MainButton(props) {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      style={[
        styles.button,
        {
          backgroundColor: colors.btnPrimaryBg,
          borderColor: colors.btnPrimaryBorder,
        },
      ]}
      onPress={() => props.action()}
    >
      <ActivityIndicator
        hidesWhenStopped={true}
        animating={props.indicatorAnimating}
        color="gray"
        style={{ position: "absolute", alignSelf: "center" }}
      />
      {props.hasLeftIcon ? (
        <View style={{ alignSelf: "center", marginRight: 4 }}>
          <Ionicons name="ios-add" size={24} color="white" />
        </View>
      ) : null}
      <Text style={styles.text}>
        {props.indicatorAnimating ? "" : props.text}
      </Text>
    </TouchableOpacity>
  );
}

export default MainButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 5,
    width: "auto",
    padding: 5,
    height: 30,
    justifyContent: "space-around",
    flexDirection: "row",
  },
  text: {
    color: "white",
    alignSelf: "center",
    textAlign: "center",
    fontWeight: "600",
    fontSize: 12,
  },
});
