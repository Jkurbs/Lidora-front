import { StyleSheet } from "react-native";

const userImageViewSize = 120;

export default StyleSheet.create({
  root: {
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: "center",
    justifyContent: "center",
  },


  headerText: {
    fontSize: 40,
  },
  textStyle: {
    marginTop: 10,
    marginBottom: 10,
    color: "black",
    fontSize: 17,
  },
  input: {
    marginTop: 8,
    padding: 8,
    padding: 8,
    fontSize: 14,
    borderColor: 'rgb(99, 99, 102)',
    borderWidth: 1,
    borderRadius: 5,
    height: 50
  },

  userLink: {
    color: "white",
  },
});
