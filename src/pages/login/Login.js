import React, { useState } from "react";
import { View, Text, TextInput, Image, Button } from "react-native";
import styles from "./login.styles.js";
import firebase from "../../firebase/Firebase";

function Login({ route }) {

  const [isChef, setIsChef] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const { navigation } = route.params;

  const onSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword('test@gmail.com', '123456')
      .then(data => {
        const userName = data.user.uid;
        // toggle state variable
        // useEffect hook on parent component
        // redirect to private route
        console.log("UID: ", userName)
        navigation.navigate('Dashboard', { user: data.user })
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
      <Text style={styles.headerText}>Lidora Login</Text>
      {isChef ? (
        <View style={styles.formContainer}>
          <Text style={styles.textStyle}>Chef Login</Text>
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
          <View style={{ padding: 20 }}>
            <Button title="Login" onPress={onSubmit} />
            {/* <Button
              title="Hungry?"
              style={styles.userLink}
              onPress={() => setIsChef(false)}
            /> */}
          </View>

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
