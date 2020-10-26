import { StyleSheet } from "react-native";

const userImageViewSize = 120;

export default StyleSheet.create({
    container: {
        fontFamily: "System",
        flex: 1,
        backgroundColor: "#fff",
      },

    //  Menu styles
      root: {
        marginTop: 21,
        padding: 8,
      },
      titleContainer: {
        shadowColor: "#00000021",
        shadowOffset: {
          width: 2,
        },
        shadowOpacity: 0.5,
        shadowRadius: 4,
        marginVertical: 8,
      },
      title: {
        marginLeft: 13,
        fontSize: 18,
        fontWeight: "500",
        color: "#000000",
      },
      container: {
        paddingVertical: 20,
        flexDirection: "row",
        alignItems: "flex-start",
      },


  viewContainer = {
    backgroundColor: "white",
    fontSize: 20,
    height: windowHeight,
    width: windowWidth,
    marginBottom: -200,
  }
});
