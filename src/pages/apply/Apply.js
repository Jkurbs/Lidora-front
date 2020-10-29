import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DATA } from "./apply.data.js";
import styles from "./apply.styles.js";

<<<<<<< HEAD:src/apply/Apply.js
import Wizard from "../components/Wizard";
import Input from "../components/Input";
=======
import Wizard from "../../components/Wizard.js";
import Input from "../../components/Input.js";
>>>>>>> 2f59ea7386e892d11cfdb10ca63b81796b157b73:src/pages/apply/Apply.js

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      message: "Let's get you started, we just have a few question for you",
    };
  }
  render() {
    return (
      <View style={styles.root}>
        <View
          style={{
            marginTop: 80,
            padding: 30,
            alignSelf: "center",
            position: "absolute",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 25, textAlign: "center" }}>
            Let's get you started {"\n"} We just have a few question for you
          </Text>
        </View>
        <View style={styles.root}>
          {/* <Wizard
            initialValues={{
              firstName: "",
              lastName: "",
              email: "",
            }}
          >
            {forms.map((el) => (
              <Wizard.Step key={el.name}>
                {({ onChangeValue, values }) => (
                  <View style={styles.container}>
                    <Input
                      onChangeValue={onChangeValue}
                      placeholder={el.placeholder}
                      value={values[el.name]}
                      name={el.name}
                    />
                  </View>
                )}
              </Wizard.Step>
            ))}
          </Wizard> */}
        </View>
      </View>
    );
  }
}
