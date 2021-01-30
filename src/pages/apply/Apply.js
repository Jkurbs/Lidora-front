import React from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet
} from "react-native";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import "firebase/auth";


class Apply extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      message: "Let's get you started",

    };
  }



  render() {
    const user = firebase.auth().currentUser;

    const apply = async () => {
      if (this.state.description === null) {
        alert("Please add a description.")
        return
      }
      var db = firebase.firestore();
      try {
        const potentialChefDoc = await db.collection("potential_chef").add({
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          email_address: this.state.email,

        });
        this.setState({ message: "Thank you, we'll get in touch with you soon" })
        return;
      } catch (error) {
        // There's an error
      }
    };


    return (
      <View style={styles.container}>
        <View style={styles.itemContainer}>
          <Text style={{ marginTop: 50, fontSize: 32, fontWeight: '500' }}>{this.state.message}</Text>
          <View style={{ marginTop: 20 }} >
            <View style={styles.inputContainer}>
              <Text style={styles.formTitle}>First name</Text>
              <TextInput
                style={styles.formInput}
                placeholder={"First name"}
                onChangeText={(text) => (this.state.firstName = text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.formTitle}>Last name</Text>
              <TextInput
                style={styles.formInput}
                placeholder={"Last name"}
                onChangeText={(text) => (this.state.lastName = text)}
              />
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.formTitle}>Email address</Text>
              <TextInput
                style={styles.formInput}
                placeholder={"Email address"}
                onChangeText={(text) => (this.state.email = text)}
              />
            </View>

            <TouchableOpacity
              onPress={apply}
              style={styles.editButton}>
              <Text style={styles.buttonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

export default Apply;


const styles = StyleSheet.create({
  container: {
    fontFamily: "System",
    backgroundColor: 'white',
    flex: 1,
    height: '100%',

  },

  itemContainer: {
    width: '40%'
  },

  inputContainer: {
    flexDirection: 'column',
    width: '95%',
    marginTop: 8,
  },

  formTitle: {
    fontSize: 14,
    fontWeight: "500",
  },

  menuForm: {
    flexDirection: "column",
    height: '100%',
    backgroundColor: '#F5F5F7',
    flex: 1,
    width: '40%',
  },

  formInput: {
    marginTop: 8,
    paddingLeft: 8,
    fontSize: 14,
    textAlignVertical: 'top',
    borderColor: '#d6d6d6',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    backgroundColor: 'white'
  },

  formInputDescription: {
    marginTop: 8,
    padding: 8,
    padding: 8,
    fontSize: 14,
    borderColor: '#d6d6d6',
    borderWidth: 1,
    borderRadius: 5,
    height: 100,
    backgroundColor: 'white'
  },

  itemContainer: {
    marginTop: 20,
    flexDirection: 'column',
    padding: 20,
    justifyContent: 'center',
  },

  editButton: {
    backgroundColor: "rgb(174,174,178)",
    borderRadius: 10,
    height: 50,
    width: 120,
    justifyContent: "center",
    margin: 20,
  },

  buttonText: {
    textAlign: "center",
    color: 'white',
    fontWeight: '500'
  }
})
