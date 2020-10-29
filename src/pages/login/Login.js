import React, { useState } from "react";
import { View, Text, TextInput, Image, Button } from "react-native";
import navigationRef from './RootNavigation.js'
import styles from "./login.styles.js";
import firebase from "../../firebase/Firebase";

function Login({ route }) {

  const [isChef, setIsChef] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  console.log(password)

  const { navigation, otherParam } = route.params;

  const onSubmit = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword('test@gmail.com', '123456')
      .then(data => {
        const userName = data.user.displayName;
        // toggle state variable
        // useEffect hook on parent component
        // redirect to private route
        console.log(userName)
        console.log("userdata",data.user)

        navigation.navigate('Dashboard',{user: data.user})
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
            defaultValue={email}
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
