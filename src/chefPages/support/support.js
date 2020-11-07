import React, { useState, useCallback, useEffect } from "react";
import styles from "./support.styles";
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image,
    Alert,
    Button,
    RecyclerViewBackedScrollView,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import "firebase/auth";


class SupportView extends React.Component {
    constructor() {
        super();
        this.state = {
            message: 'Welcome to Lidora support',
            subject: null,
            category: 'Report a Bug',
            description: null,
        };
    }



    render() {
        const user = firebase.auth().currentUser;
        const sendTicket = async () => {

            if (this.state.description === null) {
                alert("Please add a description.")
                return
            }
            var db = firebase.firestore();
            try {
                const potentialUserDoc = await db.collection("support").add({
                    email_address: user.email,
                    subject: this.state.subject,
                    category: this.state.category,
                    description: this.state.description,
                });
                this.setState({ message: "Thank you, we'll get in touch with you soon" })
                return;
            } catch (error) {
                console.log(error);
            }
        };


        return (
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <Text style={{ fontSize: 32, fontWeight: '500' }}>{this.state.message}</Text>
                    <View style={{ marginTop: 20 }} >
                        <View style={styles.inputContainer}>
                            <Text style={styles.formTitle}>Subject</Text>
                            <TextInput
                                style={styles.formInput}
                                placeholder={"Add a subject"}
                                onChangeText={(text) => (this.state.subject = text)}
                                defaultValue={""}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.formTitle}>Issue Category</Text>
                            <Picker
                                style={styles.formInput}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.state.category = itemValue
                                }
                            >
                                <Picker.Item
                                    label="Report a Bug"
                                    value="Report a Bug"
                                />
                                <Picker.Item
                                    label="Payment issue"
                                    value="Payment issue"
                                />
                                <Picker.Item
                                    label="Account issue"
                                    value="Account issue"
                                />
                                <Picker.Item
                                    label="Orders issue"
                                    value="Orders issue"
                                />
                                <Picker.Item
                                    label="Delivery issue"
                                    value="Delivery issue"
                                />
                            </Picker>
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.formTitle}>Description</Text>
                            <TextInput
                                style={styles.formInputDescription}
                                multiline={true}
                                maxLength={1000}
                                placeholder={"Add a description"}
                                onChangeText={(text) => (this.state.description = text)}
                                defaultValue={""}
                            />
                        </View>
                        <TouchableOpacity
                            onPress={sendTicket}
                            style={styles.editButton}
                        >
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

export default SupportView;
