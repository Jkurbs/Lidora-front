import { StyleSheet, Dimensions } from "react-native";
const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");

const phoneMaxWidth = 575.98;

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  headerText: {
    fontSize: 35,
    marginBottom: 16,
    fontWeight: "490",
  },

  inputTitle: {
    fontWeight: "490",
  },

  textStyle: {
    marginBottom: 10,
    color: "black",
    fontSize: 17,
  },

  formContainer: {
    width: windowWidth < phoneMaxWidth ? "50%" : "40%",
    marginTop: 50,
    height: 500,
    padding: 0,
    borderRadius: 8.0,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(219,219,219, 1)",
    borderWidth: windowWidth < phoneMaxWidth ? 0 : 1,
  },

  input: {
    marginTop: 8,
    padding: 8,
    padding: 8,
    fontSize: 14,
    borderColor: "#d6d6d6",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    backgroundColor: "white",
  },

  loginButton: {
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 40,
    height: 50,
    justifyContent: "center",
    borderColor: "rgba(27, 31, 35, 0.15)",
    backgroundColor: "rgb(48, 209, 88)",
  },

  loginText: {
    color: "white",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 15,
  },
});
