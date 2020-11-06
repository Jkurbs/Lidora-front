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
            title: "title of the support issue",
            type: "type of issue", //use Picker library
            description: "Description of the issue",
            email: null
        };
    }

    render() {
        return (
            <View style={styles.editItemContainer}>
                <View style={styles.inputContainer}>
        <Text style={styles.formTitle}>{this.props.user.email}</Text>
                    <TextInput
                        style={styles.formInput}
                        placeholder={"Issue Title"}
                        onChangeText={(text) => (this.state.title = text)}
                        defaultValue={""}
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Text style={styles.formTitle}>Issue Category</Text>
                    <Picker
                        selectedValue={this.type}
                        style={styles.formInput}
                        onValueChange={(itemValue, itemIndex) =>
                            setSelectedValue(itemValue)
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
                            label="Customer complaint"
                            value="Customer complaint"
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
                    //onPress={this.props.handleSaveButtonClick} need to build the thing I am sure works with firebase...maybe
                    style={styles.editButton}
                >
                    <Text style={styles.buttonText}>Send</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SupportView;
