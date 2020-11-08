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
    fontSize: 25,
    marginBottom: 50,

  },

  textStyle: {
    marginBottom: 10,
    color: "black",
    fontSize: 17,
  },


  input: {
    marginTop: 8,
    padding: 8,
    padding: 8,
    fontSize: 14,
    borderColor: '#d6d6d6',
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    backgroundColor: 'white'
  },

  loginButton: {
    borderWidth: 1,
    borderRadius: 6,
    marginTop: 10,
    height: 50,
    justifyContent: "center",
    backgroundColor: '#fafbfc',
    borderColor: 'rgba(27, 31, 35, 0.15)',
    backgroundColor: 'rgb(48, 209, 88)'

  },

  loginText: {
    color: 'white',
    textAlign: "center",
    fontWeight: '500',
    fontSize: 15
  },
});
