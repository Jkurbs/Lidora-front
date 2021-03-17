import React, { useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
} from "react-native";
import firebase from "../../firebase/Firebase";
import styles from "../login/login.styles";
import Input from "../../components/inputs/input";
import { useTheme } from "@react-navigation/native";
const { width: windowWidth } = Dimensions.get("screen");

import "firebase/firestore";
import "firebase/auth";

const phoneMaxWidth = 575.98;

function Apply() {
  const [disable, setDisable] = useState(true);
  const [indicatorAnimating, setIndicatorAnimating] = useState(false);
  const { colors } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={{ width: "80%" }}>
          <Text style={styles.headerText}>Apply</Text>
          <Input
            width={"100%"}
            hasTitle={false}
            placeholder={"Home address"}
            onChangeText={() => console.log("")}
          />

          <Input
            width={"100%"}
            hasTitle={false}
            placeholder={"Email address"}
            onChangeText={() => console.log("")}
          />
          <Input
            width={"100%"}
            hasTitle={false}
            placeholder={"First name"}
            onChangeText={() => console.log("")}
          />
          <Input
            width={"100%"}
            hasTitle={false}
            placeholder={"Last name"}
            onChangeText={() => console.log("")}
          />
          <TouchableOpacity
            disabled={disable}
            onPress={() => submit()}
            style={[
              disable
                ? {
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 24,
                    width: "100%",
                    height: 40,
                    backgroundColor: colors.btnPrimaryBg,
                    borderRadius: 5,
                    opacity: 0.5,
                  }
                : {
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 24,
                    width: "100%",
                    height: 40,
                    backgroundColor: colors.btnPrimaryBg,
                    borderRadius: 5,
                  },
            ]}
          >
            <Text style={{ color: "white", fontWeight: 16, fontWeight: "600" }}>
              {indicatorAnimating ? "" : "Submit"}
            </Text>
            {/* <ActivityIndicator hidesWhenStopped={true} animating={indicatorAnimating} color={colors.textSecondary} style={{marginBottom: 16, alignSelf: 'center'}} /> */}
          </TouchableOpacity>
        </View>
      </View>
      {/* <Footer /> */}
    </View>
  );

  // return (
  //   <View style={styles.container}>
  //     <View style={styles.formContainer}>
  //       <View style={{ width: "80%" }}>
  //         <Text
  //           style={{
  //             marginTop: 80,
  //             fontWeight: "600",
  //             fontSize: 20,
  //           }}
  //         >
  //           Join
  //         </Text>

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

  //         <TouchableOpacity
  //           disabled={disable}
  //           onPress={() => submit()}
  //           style={[
  //             disable
  //               ? {
  //                   alignItems: "center",
  //                   justifyContent: "center",
  //                   marginTop: 24,
  //                   width: "100%",
  //                   height: 40,
  //                   backgroundColor: colors.btnPrimaryBg,
  //                   borderRadius: 5,
  //                   opacity: 0.5,
  //                 }
  //               : {
  //                   alignItems: "center",
  //                   justifyContent: "center",
  //                   marginTop: 24,
  //                   width: "100%",
  //                   height: 40,
  //                   backgroundColor: colors.btnPrimaryBg,
  //                   borderRadius: 5,
  //                 },
  //           ]}
  //         >
  //           <Text style={{ color: "white", fontWeight: 16, fontWeight: "600" }}>
  //             {indicatorAnimating ? "" : "Submit"}
  //           </Text>
  //           {/* <ActivityIndicator hidesWhenStopped={true} animating={indicatorAnimating} color={colors.textSecondary} style={{marginBottom: 16, alignSelf: 'center'}} /> */}
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </View>
  // );
}

export default Apply;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "center",
//     backgroundColor: "white",
//   },

//   formContainer: {
//     marginTop: 50,
//     width: "40%",
//     height: 500,
//     padding: 0,
//     borderRadius: 8.0,
//     justifyContent: "center",
//     alignItems: "center",
//     borderColor: "rgba(219,219,219, 1)",
//     borderWidth: windowWidth < phoneMaxWidth ? 0 : 1,
//   },

//   buttonText: {
//     textAlign: "center",
//     color: "white",
//     fontWeight: "500",
//   },
// });
