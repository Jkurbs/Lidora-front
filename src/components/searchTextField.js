import React from "react";
import { View, Image, TextInput, StyleSheet } from "react-native";
import { useTheme } from "@react-navigation/native";

function SearchTextField(props) {
  const { colors } = useTheme();
  const [text, setText] = React.useState("");
  return (
    <View>
      <Image
        style={styles.searchIcon}
        source={require("../assets/icon/search.png")}
      />
      <TextInput
        style={[
          styles.formInput,
          { color: colors.textSecondary, borderColor: colors.borderPrimary },
        ]}
        placeholder={props.placeholder}
        onChangeText={(value) => {
          props.onChangeText(value.toLowerCase());
        }}
      ></TextInput>
    </View>
  );
}

const styles = StyleSheet.create({
  formInput: {
    padding: 8,
    fontSize: 12,
    textAlignVertical: "top",
    borderWidth: 1,
    borderRadius: 5,
    height: 30,
    width: 192,
    backgroundColor: "white",
    textIndent: "25px",
  },

  searchIcon: {
    position: "absolute",
    top: 9,
    left: 8,
    fontSize: 15,
    width: 15,
    height: 15,
    tintColor: "gray",
    transform: "scaleX(-1)",
  },
});

export default SearchTextField;
