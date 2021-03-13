import { StyleSheet, Dimensions } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");

const imageHeight = Math.round((windowWidth * 5) / 10);

const ratio = windowWidth / 500;
const phoneMaxWidth = 575.98;

export default StyleSheet.create({
  container: {
    fontFamily: "System",
    flex: 1,
    backgroundColor: "white",
    width: windowWidth,
    height: "100%",
  },

  backgroundImage: {
    // flex: 1,
    width: windowWidth < phoneMaxWidth ? null : windowWidth,
    height: windowHeight,
    marginBottom: 0,
  },

  secondaryView: {
    marginTop: 70,
    width: windowWidth,
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
