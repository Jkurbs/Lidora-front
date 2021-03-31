import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

function Input(props) {
  const { colors } = useTheme();

  return (
    <View>
      <View style={[styles.container, { width: props.width ?? 350 }]}>
        {props.hasTitle ?? true ? (
          <Text
            style={[
              styles.inputTitle,
              {
                color: colors.textPrimary,
              },
            ]}
          >
            {props.title ?? props.placeholder}
          </Text>
        ) : null}
      </View>
      <TextInput
        style={[
          styles.input,
          {
            width: props.width ?? 350,
            backgroundColor: colors.inputBg,
            borderColor: colors.borderPrimary,
          },
        ]}
        defaultValue={props.defaultValue}
        placeholder={props.placeholder}
        secureTextEntry={props.secureTextEntry ?? false}
        onChangeText={(text) => props.onChangeText(text)}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    // zIndex: 1000,
    marginTop: 8,
    padding: 8,
    padding: 8,
    fontSize: 14,
    borderColor: "#d6d6d6",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
  },

  inputTitle: {
    fontWeight: "490",
    marginTop: 16,
  },
});

export default Input;
