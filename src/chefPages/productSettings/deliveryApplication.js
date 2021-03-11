import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import globalStyle from "../../globalStyle";
import DashboardNavBar from "../../components/dashboardNavBar";
import Input from "../../components/inputs/input";

function DeliveryApplication(props) {
  const navigation = props.navigation;
  const [indicatorAnimating, setIndicatorAnimating] = useState(false);
  const useGlobalStyles = globalStyle();

  const saveAndAddMoreTapped = () => {
    navigation.goBack();
  };

  const submitApplicationTapped = () => {
    setIndicatorAnimating(true);
  };

  return (
    <View style={globalStyle.backgroundPrimary}>
      <DashboardNavBar
        navigation={navigation}
        title={"Delivery Application"}
        hasOptions={true}
        hasComplimentary={false}
        mainButtonTapped={() => submitApplicationTapped()}
        complemantaryButtonTapped={() => saveAndAddMoreTapped()}
        mainButtonTitle={"Submit application"}
        indicatorAnimating={indicatorAnimating}
      />
      <View style={styles.container}>
        <View>
          <Text style={[useGlobalStyles.textPrimary, styles.header]}>
            Delivery Application
          </Text>

          <Text style={useGlobalStyles.textSecondary}>
            Please add your address to see if you’re eligle for develivery.
          </Text>

          <View style={styles.imageContainer}>
            <View>
              <Input
                placeholder={"Line1"}
                onChangeText={() => console.log("")}
              />
              <Input
                placeholder={"State"}
                onChangeText={() => console.log("")}
              />
              <Input
                placeholder={"Zip code"}
                onChangeText={() => console.log("")}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default DeliveryApplication;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },

  header: {
    fontSize: 20,
    fontWeight: "600",
  },

  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  image: {
    marginTop: 8,
    width: "80%",
    height: "80%",
    borderWidth: 1,
    borderRadius: 5,
  },
  uploadText: {
    textAlign: "center",
    fontWeight: "600",
  },

  addCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  button: {
    position: "absolute",
    width: 140,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    bottom: 0,
    right: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },

  inputTitle: {
    fontWeight: "490",
    marginTop: 16,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
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
    width: 350,
  },

  inputTitle: {
    fontWeight: "490",
    marginTop: 16,
  },
});
