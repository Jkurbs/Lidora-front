import React, { useState } from "react";
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import styles from "./login.styles.js";
import firebase from "../../firebase/Firebase";
import activityIndicator from '../../components/activityIndicator'

function Login({ route }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginText, setLoginText] = useState("Login");
  const [indicatorAnimating, setIndicatorAnimating] = useState(false);

  const { navigation } = route.params;

  const onSubmit = () => {
    setLoginText("")
    setIndicatorAnimating(true)
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        const userName = data.user.uid;
        navigation.navigate('Dashboard', { navigation: navigation, user: data.user })
        setIndicatorAnimating(false)
        setLoginText("Login")
      })
      .catch(function (error) {
        // Handle Errors here.
        setIndicatorAnimating(false)
        setLoginText("Login")
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage)
        // ...
      });
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={{ width: '80%' }}>
          <Text style={styles.headerText}>Sign in to your account</Text>
          <View style={{ marginBottom: 16 }}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput
              style={styles.input}
              type="email"
              placeholder="Email"
              onChangeText={(text) => setEmail(text)}
            />

          </View>

          <View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.inputTitle}>Password</Text>
              {/* <TouchableOpacity
                onPress={onSubmit}>
                <Text style={{ fontSize: 13, fontWeight: '500', color: 'rgb(48, 209, 88)' }}>Forgot password?</Text>
              </TouchableOpacity> */}
            </View>
            <TextInput
              style={styles.input}
              type="password"
              placeholder="Password"
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={onSubmit}>
            <ActivityIndicator hidesWhenStopped={true} animating={indicatorAnimating} color="#0000ff" style={{ position: 'absolute', alignSelf: 'center' }} />
            <Text style={styles.loginText}>{loginText}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

function forgotPassword() {


}

export default Login;
