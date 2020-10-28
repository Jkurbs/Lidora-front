import React, { useState } from "react";
import { View, Text, TextInput, Image, Button } from "react-native";
import styles from "./login.styles.js";
import firebase from "../../firebase/Firebase.js";

const Login = () => {
  const [isChef, setIsChef] = useState(false);
  const chefImg = require("../../assets/img/chef1.jpg");
  const custImg = require("../../assets/img/splash.png");

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        console.log(data)
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Lidora Login</Text>
      {isChef ? (
        <View style={styles.formContainer}>
          <Text style={styles.textStyle}>Chef Login</Text>
          <TextInput
            style={styles.emailStyle}
            type="email"
            placeholder="Email"
            defaultValue=""
            onChangeText={(value) => setEmail(value)}
          />
          <TextInput
            style={styles.passwordStyle}
            type="password"
            placeholder="Password"
            defaultValue=""
            onChangeText={(value) => setPassword(value)}
          />
          <Button title="Login" onPress={onSubmit} />
          <Button
            title="Hungry?"
            style={styles.userLink}
            onPress={() => setIsChef(false)}
          />
        </View>
      ) : (
        <View style={styles.formContainer}>
          <Text style={styles.textStyle}>Customer Login</Text>
          <TextInput style={styles.emailStyle} placeholder="Email" />
          <TextInput style={styles.passwordStyle} placeholder="Password" />
          <Button
            title="Are you a chef?"
            style={styles.userLink}
            onPress={() => setIsChef(true)}
          />
        </View>
      )}
    </View>
  );
};

export default Login;
