import React, { useState } from "react";
import { Image, View, StyleSheet, Text, TouchableOpacity } from "react-native";
import globalStyle from "../globalStyle";
import { useTheme } from "@react-navigation/native";
import MainButton from "../components/buttons/mainButton";
import ComplimentaryButton from "../components/buttons/complimentaryButton";

function DashboardNavBar(props) {
  const navigation = props.navigation;
  const { colors } = useTheme();
  const indicatorAnimating = props.indicatorAnimating;

  const goBack = () => {
    if (navigation) {
      navigation.goBack();
    } else {
      props.backButtonTapped();
    }
  };

  return (
    <View
      style={[
        styles.container,
        globalStyle.backgroundPrimary,
        { borderBottomColor: colors.borderPrimary },
      ]}
    >
      <View style={styles.leftContainer}>
        <TouchableOpacity onPress={() => goBack()}>
          <Image
            style={styles.image}
            source={require("../assets/icon/delete-gray-48.png")}
          ></Image>
        </TouchableOpacity>
        <Text style={{ color: colors.textSecondary }}>{props.title}</Text>
      </View>
      {props.hasOptions ? (
        <View style={styles.rightContainer}>
          {props.hasComplimentary ? (
            <ComplimentaryButton
              text={"Save and add more"}
              hasLeftIcon={false}
              indicatorAnimating={indicatorAnimating}
              action={() => props.mainButtonTapped()}
            />
          ) : null}
          <MainButton
            text={props.mainButtonTitle}
            hasLeftIcon={false}
            indicatorAnimating={indicatorAnimating}
            action={() => props.mainButtonTapped()}
          />
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    padding: 15,
  },

  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 20,
  },
});

export default DashboardNavBar;
