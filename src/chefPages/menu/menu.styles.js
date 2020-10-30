import { StyleSheet } from "react-native";

const userImageViewSize = 120;

export default StyleSheet.create({
  container: {
    fontFamily: "System",
    flex: 1,
    width: "100%",
    backgroundColor: "#E5E5E5",
    borderColor: "pink",
    borderWidth: 1,
    flexDirection: "row",
  },
  leftContainer: {
    width: "60%",
    height: "90%",
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: "white",
    margin: "auto",
    borderRadius: 10,
  },
  rightContainer: {
    width: "35%",
    height: "90%",
    alignContent: "center",
    backgroundColor: "white",
    margin: "auto",
    borderRadius: 10,
  },

  flatList: {
    marginTop: 90,
    width: "100%",
    backgroundColor: "white",
  },

  menuContent: {
    flexDirection: "row",
    width: "90%",
    marginTop: 20,
    marginBottom: 20,
    marginLeft: 20,
    paddingLeft: 20,
    height: 90,
  },

  menuWrapper: {
    flexDirection: "row",
    alignSelf: "center",
  },

  mainView: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "90%",
  },

  secondaryView: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingLeft: 20,
    paddingRight: 20,
  },

  image: {
    borderRadius: 5,
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#F5F5F7",
  },

  description: {
    marginTop: -50,
    marginLeft: 20,
    width: "100%",
  },

  title: {
    fontWeight: "500",
  },

  buttonBackground: {
    backgroundColor: "green",
    borderRadius: 10,
    height: 50,
    width: 120,
    justifyContent: "center",
    alignSelf: "flex-end",
    margin: 20,
  },
  buttonTitle: {
    textAlign: "center",
  },
  // Right side menu form
  menuForm: {
    flexDirection: "column",
    justifyContent: "space-around",
    width: "90%",
    marginTop: 100,
    marginBottom: 20,
    marginLeft: 20,
    paddingLeft: 20,
    height: 90,
  },
  formTitle: {
    marginTop: 200,
    textAlign: "center",
    fontSize: 25,
    fontWeight: "500",
  },
  formInput: {
    margin: 20,
    lineHeight: 50,
    fontSize: 18,
    textAlign: "center",
    textAlignVertical: 'top',
  },
  buttonView: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    // width: "40%",
  },
  addButton: {
    backgroundColor: "green",
    borderRadius: 10,
    height: 50,
    width: 120,
    justifyContent: "center",
    margin: 20,
  },
  editButton: {
    backgroundColor: "green",
    borderRadius: 10,
    height: 50,
    width: 120,
    justifyContent: "center",
    margin: 20,
  },
  deleteButton: {
    backgroundColor: "red",
    borderRadius: 10,
    height: 50,
    width: 120,
    justifyContent: "center",
    margin: 20,
  },
  buttonText: {
    textAlign: "center",

  }
});
