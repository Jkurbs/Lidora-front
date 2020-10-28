import React, { useState } from "react";
import { View, Text, TextInput, Image } from "react-native";
import styles from "./login.styles.js";
const Login = () => {
  const [isChef, setIsChef] = useState(false);
  const chefImg = require("../../assets/img/chef.jpg");
  const custImg = require("../../assets/img/food.svg");
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Lidora Login</Text>
      <Image source="../../assets/img/chef.jpg" style={styles.imageStyle} />

      {isChef ? (
        <View>
          <Text style={styles.textStyle}>Chef Login</Text>
          <TextInput style={styles.emailStyle} placeholder="Email" />
          <TextInput style={styles.passwordStyle} placeholder="Password" />
          <Text style={styles.userLink} onPress={() => setIsChef(false)}>Hungry?</Text>
        </View>
      ) : (
        <View>
          <Text style={styles.textStyle}>Customer Login</Text>
          <TextInput style={styles.emailStyle} placeholder="Email" />
          <TextInput style={styles.passwordStyle} placeholder="Password" />
          <Text style={styles.userLink} onPress={() => setIsChef(true)}>
            Are you a registered chef?
          </Text>
        </View>
      )}
    </View>
  );
};

export default Login;
