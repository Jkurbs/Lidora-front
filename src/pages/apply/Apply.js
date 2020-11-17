import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { DATA } from "./apply.data.js";
import styles from "./apply.styles.js";

import Wizard from '../../components/Wizard';
import Input from "../../components/Input.js";

export const forms = [
  {
    message: 'Add your First name',
    placeholder: 'Enter your First name',
    name: 'firstName',
  },
  {
    message: 'Add your Last name',
    placeholder: 'Enter your Last name',
    name: 'lastName',
  },
  {
    message: 'Add your email address',
    placeholder: 'Enter your email',
    name: 'email',
  },
];


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
            height: '50%', width: '100%', marginTop: 80, padding: 30, alignSelf: "center", justifyContent: 'center', flexDirection: 'column',
          }} >
          <Text style={{ fontSize: 25, textAlign: "center" }}>
            Let's get you started {"\n"} We just have a few question for you
          </Text>
          <View style={{ height: 150, backgroundColor: 'brown' }}>
            <Wizard initialValues={{ firstName: "", lastName: "", email: "" }}>
              {forms.map((el) => (
                <Wizard.Step key={el.name}>
                  {({ onChangeValue, values }) => (
                    <View >
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
            </Wizard>
          </View>
        </View>
      </View>
    );
  }
}
