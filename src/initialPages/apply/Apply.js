import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import firebase from "../../firebase/Firebase";
import styles from "../login/login.styles";
import Input from "../../components/inputs/input";

function Apply({ route }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginText, setLoginText] = useState("Apply");
  const [indicatorAnimating, setIndicatorAnimating] = useState(false);

  // const { navigation } = route.params;

  const onSubmit = () => {
    setLoginText("");
    setIndicatorAnimating(true);
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((data) => {
        navigation.navigate("Dashboard", {
          navigation: navigation,
          userID: data.user.uid,
        });
        setIndicatorAnimating(false);
        setLoginText("Login");
      })
      .catch(function (error) {
        // Handle Errors here.
        setIndicatorAnimating(false);
        setLoginText("Login");
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorMessage);
        // ...
      });
  };

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.formContainer}>
  //       <View style={{ width: "80%" }}>
  //         <Text style={styles.headerText}>Apply</Text>
  //         <Input
  //           width={"100%"}
  //           hasTitle={false}
  //           placeholder={"Home address"}
  //           onChangeText={() => console.log("")}
  //         />
  //         <Input
  //           width={"100%"}
  //           hasTitle={false}
  //           placeholder={"Email address"}
  //           onChangeText={() => console.log("")}
  //         />
  //         <Input
  //           width={"100%"}
  //           hasTitle={false}
  //           placeholder={"First name"}
  //           onChangeText={() => console.log("")}
  //         />
  //         <Input
  //           width={"100%"}
  //           hasTitle={false}
  //           placeholder={"Last name"}
  //           onChangeText={() => console.log("")}
  //         />
  //         <TouchableOpacity style={styles.loginButton} onPress={onSubmit}>
  //           {/* <ActivityIndicator
  //             hidesWhenStopped={true}
  //             animating={indicatorAnimating}
  //             color="#0000ff"
  //             style={{ position: "absolute", alignSelf: "center" }}
  //           /> */}
  //           <Text style={styles.loginText}>{loginText}</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //     {/* <Footer /> */}
  //   </View>
  // );
}

export default Apply;
