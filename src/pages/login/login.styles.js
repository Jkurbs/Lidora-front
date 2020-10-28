import { StyleSheet } from "react-native";

const userImageViewSize = 120;

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    marginBottom: 10,
    borderRadius: 5,
    width: "auto",
    height: 200,
  },
  headerText: {
    fontSize: 25,
    marginTop: -200,

  },
  textStyle: {
    marginTop: 10,
    marginBottom: 10,
    color: "black",
    fontSize: 17,
  },
  emailStyle: {
    margin: 5,
  },
  passwordStyle: {
    
    marginBottom: 20,
  },
  userLink: {
    color: "skyblue",
  }
});
