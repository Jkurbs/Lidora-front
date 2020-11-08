import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import styles from "./login.styles.js";
import firebase from "../../firebase/Firebase";

function Login({ route }) {

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { navigation } = route.params;

  const onSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword('test@gmail.com', '123456')
      .then(data => {
        const userName = data.user.uid;
        navigation.navigate('Dashboard', { navigation: navigation, user: data.user })
      })
      .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Login to access your Dashboard</Text>
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          type="email"
          placeholder="Email"
          defaultValue=""
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          type="password"
          placeholder="Password"
          defaultValue={email}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity
          style={styles.loginButton}
          onPress={onSubmit}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
