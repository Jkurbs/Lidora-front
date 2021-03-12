import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

function ComplimentaryButton(props) {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={props.action}
      style={[
        styles.button,
        {
          backgroundColor: colors.btnBg,
          borderColor: colors.borderPrimary,
        },
      ]}
    >
      <Text style={[styles.text, { color: colors.textSecondary }]}>
        {props.indicatorAnimating ? "" : props.text}
      </Text>
    </TouchableOpacity>
  );
}

export default ComplimentaryButton;

const styles = StyleSheet.create({
  button: {
    width: "auto",
    padding: 16,
    height: 30,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },
});
