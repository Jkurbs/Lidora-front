import React from "react";
import styles from './editProfile.styles';
import {
    View,
    TextInput,
    TouchableOpacity,
    Text,
    Image
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import firebase from "../../../firebase/Firebase";
import "firebase/firestore";
import "firebase/auth";
import { ScrollView } from "react-native-gesture-handler";


class EditProfileView extends React.Component {
    constructor() {
        super();
        this.state = {

        };
    }

    render() {
        const user = firebase.auth().currentUser;
        return (
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <ScrollView style={{ marginLeft: 60, height: '100%' }} >
                        <View style={styles.imageContainer}>
                            <Image style={{
                                height: 50, width: 50, borderRadius: 25, backgroundColor: 'rgb(174,174,178)'
                            }} source={require('../../../assets/img/chef1.jpg')} />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.name}>Kerby Jean</Text>
                                <Text style={styles.imageButton}>Change Profile photo</Text>
                            </View>
                        </View>
                        <View>
                            <View style={styles.inputView}>
                                <Text style={styles.formTitle}>First name</Text>
                                <TextInput
                                    style={styles.formInput}
                                    placeholder={"First name"}
                                    onChangeText={(text) => (this.state.description = text)}
                                    defaultValue={""}
                                />
                            </View>

                            <View style={styles.inputView}>
                                <Text style={styles.formTitle}>Last name</Text>
                                <TextInput
                                    style={styles.formInput}
                                    placeholder={"Last name"}
                                    onChangeText={(text) => (this.state.description = text)}
                                    defaultValue={""}
                                />
                            </View>

                            <View style={styles.inputView}>
                                <Text style={styles.formTitle}>Username</Text>
                                <View style={{ flexDirection: 'column' }}>
                                    <TextInput
                                        style={styles.formInput}
                                        placeholder={"Username"}
                                        onChangeText={(text) => (this.state.description = text)}
                                        defaultValue={""}
                                    />
                                    <Text style={{ width: 445, marginTop: 8, marginLeft: 20, fontSize: 12, color: '#646464' }}>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</Text>
                                </View>
                            </View>

                            <View style={[styles.inputView, styles.bioView]}>
                                <Text style={styles.formTitle}>Bio</Text>
                                <TextInput
                                    style={styles.formInputDescription}
                                    multiline={true}
                                    maxLength={1000}
                                    placeholder={"Bio"}
                                    onChangeText={(text) => (this.state.description = text)}
                                    defaultValue={""}
                                />
                            </View>
                            <View>
                                <Text>Personal Information</Text>
                                <Text style={{ color: '#646464' }}>This won't be a part of your public profile.</Text>
                            </View>

                            <View style={styles.inputView}>
                                <Text style={styles.formTitle}>Email</Text>
                                <TextInput
                                    style={styles.formInput}
                                    placeholder={"Email address"}
                                    onChangeText={(text) => (this.state.description = text)}
                                    defaultValue={""}
                                />
                            </View>
                        </View>

                        <View style={styles.inputView}>
                            <Text style={styles.formTitle}>Gender</Text>
                            <Picker
                                style={styles.formInput}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.state.category = itemValue
                                }>
                                <Picker.Item
                                    label="Male"
                                    value="Male"
                                />
                                <Picker.Item
                                    label="Female"
                                    value="Female"
                                />
                            </Picker>
                        </View>



                        <TouchableOpacity
                            // onPress={sendTicket}
                            style={styles.editButton}
                        >
                            <Text style={styles.buttonText}>Send</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default EditProfileView;
