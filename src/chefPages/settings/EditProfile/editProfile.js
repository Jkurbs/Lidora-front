import React from "react";
import styles from './editProfile.styles';
import {
    View,
    TextInput,
    TouchableOpacity,
<<<<<<< HEAD
    ActivityIndicator,
=======
>>>>>>> changes
    Text,
    Image,
    ScrollView
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import firebase from "../../../firebase/Firebase";
import "firebase/firestore";
import "firebase/auth";
import Button from '../../../components/buttons/mainButton'

import * as DocumentPicker from 'expo-document-picker';

<<<<<<< HEAD

=======
>>>>>>> changes
var db = firebase.firestore();

class EditProfileView extends React.Component {

    constructor() {
        super();
        this.state = {
            userId: firebase.auth().currentUser.uid,
<<<<<<< HEAD
            image: '',
            firstName: '',
            lastName: '',
            username: '',
            description: '',
            email: '',
            gender: '',
            buttonText: 'Submit',
            indicatorAnimating: false
        };
    }

    componentDidMount() {
        let currentComponent = this

        // Fetch Current chef 
        db.collection('chefs').doc(currentComponent.state.userId).get().then(function (doc) {
            if (doc.exists) {
                const user = doc.data()
                currentComponent.setState({
                    image: user.imageURL ?? '',
                    firstName: user.first_name,
                    lastName: user.last_name,
                    username: user.username ?? '',
                    description: user.description ?? '',
                    gender: user.gender ?? '',
                    email: user.email_address ?? '',
                })
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

=======
            image: null,
            firstName: null,
            lastName: null,
            username: null,
            description: null,
            email: null,
            gender: null
        };
    }

>>>>>>> changes
    // Pick image from computer folder 
    pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "image/*" // all images files
        });
        if (!result.cancelled) {
            this.setState({
                image: result,
            });
        } else {
            // Show error to user
        }
    }
<<<<<<< HEAD

    save = () => {
        let currentComponent = this
        currentComponent.setState({ indicatorAnimating: true, buttonText: '' })
        const user = firebase.auth().currentUser;
        if (typeof this.state.image != 'string') {
            var storage = firebase.storage().ref('chefs')
            storage.put(this.state.image.file).then((snapshot) => {
                snapshot.ref.getDownloadURL().then(function (downloadURL) {
                    const userId = firebase.auth().currentUser.uid;
                    currentComponent.setState({ image: downloadURL })
                    db.collection('chefs').doc(userId).set({
                        imageURL: downloadURL
                    }, { merge: true })
                        .then(function () {
                            user.updateProfile({
                                photoURL: downloadURL,
                            }).then(function () {
                                // Update successful.

                            }).catch(function (error) {
                                // An error happened.
                                alert(error)
                            });
                        })
                        .catch(function (error) {
                            // The document probably doesn't exist.
                            console.error("Error updating document: ", error);
                        });
                });
            })
        }

        user.updateProfile({
            displayName: currentComponent.state.firstName + ' ' + currentComponent.state.lastName,
            email: this.state.email
        }).then(function () {
            // Update successful.
            db.collection('chefs').doc(currentComponent.state.userId).set({
                first_name: currentComponent.state.firstName,
                last_name: currentComponent.state.lastName,
                username: currentComponent.state.username,
                description: currentComponent.state.description,
                gender: currentComponent.state.gender,
                email_address: currentComponent.state.email,
            }, { merge: true })
                .then(function () {
                    console.log("Document successfully updated!");
                    currentComponent.setState({ indicatorAnimating: false, buttonText: 'Submit' })
                })
                .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        }).catch(function (error) {
            // An error happened.
            alert(error)
            console.log("Update updating user: ", error)

        });
    };

=======

    componentDidMount() {
        let currentComponent = this

        // Fetch Current chef 
        db.collection('chefs').doc(currentComponent.state.userId).get().then(function (doc) {
            if (doc.exists) {
                const user = doc.data()
                currentComponent.setState({
                    image: user.imageURL,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    username: user.username,
                    description: user.description,
                    gender: user.gender,
                    email: user.email_address,
                })
            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    save = () => {

        var storage = firebase.storage().ref('chefs')

        storage.put(this.state.image.file).then((snapshot) => {

            snapshot.ref.getDownloadURL().then(function (downloadURL) {
                const userId = firebase.auth().currentUser.uid;
                this.setState({ image: downloadURL })
                db.collection('chefs').doc(userId).set({
                    imageURL: downloadURL
                }, { merge: true })
                    .then(function () {
                        console.log("Document successfully updated!");
                    })
                    .catch(function (error) {
                        // The document probably doesn't exist.
                        console.error("Error updating document: ", error);
                    });
            });
        })

        const user = firebase.auth().currentUser;

        user.updateProfile({
            displayName: this.state.firstName + ' ' + this.state.lastName,
            photoURL: this.state.image,
            email: this.state.email
        }).then(function () {
            // Update successful.
            db.collection('chefs').doc(this.state.userId).set({
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                username: this.state.username,
                description: this.state.description,
                gender: this.state.gender,
                email_address: this.state.email,
            }, { merge: true })
                .then(function () {
                    console.log("Document successfully updated!");
                })
                .catch(function (error) {
                    // The document probably doesn't exist.
                    console.error("Error updating document: ", error);
                });
        }).catch(function (error) {
            // An error happened.
        });
    };

>>>>>>> changes
    render() {
        return (
            <View style={styles.container}>
                <ScrollView style={{ marginLeft: 60, height: '100%' }} >
                    <View style={styles.itemContainer}>
                        <View style={styles.imageContainer}>
                            <Image style={{
                                height: 50, width: 50, borderRadius: 25, backgroundColor: 'rgb(174,174,178)'
                            }} source={this.state.image}
                            />
                            <View style={{ flexDirection: 'column' }}>
                                <Text style={styles.name}>{this.state.firstName} {this.state.lastName}</Text>
                                <Text onPress={this.pickDocument.bind(this)} style={styles.imageButton}>Change Profile photo</Text>
                            </View>
<<<<<<< HEAD
=======
                        </View>
                        <View>
                            <View style={styles.inputView}>
                                <Text style={styles.formTitle}>First name</Text>
                                <TextInput
                                    style={styles.formInput}
                                    placeholder={"First name"}
                                    onChangeText={(text) => (this.state.firstName = text)}
                                    defaultValue={this.state.firstName}
                                />
                            </View>

                            <View style={styles.inputView}>
                                <Text style={styles.formTitle}>Last name</Text>
                                <TextInput
                                    style={styles.formInput}
                                    placeholder={"Last name"}
                                    onChangeText={(text) => (this.state.lastName = text)}
                                    defaultValue={this.state.lastName}
                                />
                            </View>

                            <View style={styles.inputView}>
                                <Text style={styles.formTitle}>Username</Text>
                                <View style={{ flexDirection: 'column' }}>
                                    <TextInput
                                        style={styles.formInput}
                                        placeholder={"Username"}
                                        onChangeText={(text) => (this.state.username = text)}
                                        defaultValue={this.state.username}
                                    />
                                    <Text style={{ paddingTop: 8, width: 445, marginLeft: 20, fontSize: 12, color: '#646464' }}>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</Text>
                                </View>
                            </View>

                            <View style={[styles.inputView, styles.bioView]}>
                                <Text style={styles.formTitle}>Bio</Text>
                                <TextInput
                                    style={styles.formInputDescription}
                                    multiline={true}
                                    maxLength={1000}
                                    placeholder={"Description"}
                                    onChangeText={(text) => (this.state.description = text)}
                                    defaultValue={this.state.description}
                                />
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 40, marginBottom: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: '500' }}>Personal Information</Text>
                                <Text style={{ color: '#646464' }}>This won't be a part of your public profile.</Text>
                            </View>

                            <View style={styles.inputView}>
                                <Text style={styles.formTitle}>Email</Text>
                                <TextInput
                                    style={styles.formInput}
                                    placeholder={"Email address"}
                                    onChangeText={(text) => (this.state.email = text)}
                                    defaultValue={this.state.email}
                                />
                            </View>
>>>>>>> changes
                        </View>
                        <View>
                            <View style={styles.inputView}>
                                <Text style={styles.formTitle}>First name</Text>
                                <TextInput
                                    style={styles.formInput}
                                    placeholder={"First name"}
                                    onChangeText={(text) => (this.setState({ firstName: text }))}
                                    defaultValue={this.state.firstName}
                                />
                            </View>

<<<<<<< HEAD
                            <View style={styles.inputView}>
                                <Text style={styles.formTitle}>Last name</Text>
                                <TextInput
                                    style={styles.formInput}
                                    placeholder={"Last name"}
                                    onChangeText={(text) => (this.setState({ lastName: text }))}
                                    defaultValue={this.state.lastName}
                                />
                            </View>

                            <View style={styles.inputView}>
                                <Text style={styles.formTitle}>Username</Text>
                                <TextInput
                                    style={styles.formInput}
                                    placeholder={"Username"}
                                    onChangeText={(text) => (this.setState({ username: text }))}
                                    defaultValue={this.state.username}
                                />
                                {/* <Text style={{ paddingTop: 8, width: 445, marginLeft: 20, fontSize: 12, color: '#646464' }}>Help people discover your account by using the name you're known by: either your full name, nickname, or business name.</Text> */}
                            </View>

                            <View style={[styles.inputView, styles.bioView]}>
                                <Text style={styles.formTitle}>Description</Text>
                                <View style={{ flexDirection: 'column' }}>
                                    <TextInput
                                        style={styles.formInputDescription}
                                        multiline={true}
                                        maxLength={1000}
                                        placeholder={"Description"}
                                        onChangeText={(text) => (this.setState({ description: text }))}
                                        defaultValue={this.state.description}
                                    />
                                    <Text style={{ paddingTop: 8, width: 445, marginLeft: 20, fontSize: 12, color: '#646464' }}>Write a short description about yourself.</Text>
                                </View>
                            </View>

                            <View style={{ marginLeft: 20, marginTop: 40, marginBottom: 20 }}>
                                <Text style={{ fontSize: 20, fontWeight: '500' }}>Personal Information</Text>
                                <Text style={{ color: '#646464' }}>This won't be a part of your public profile.</Text>
                            </View>

                            <View style={styles.inputView}>
                                <Text style={styles.formTitle}>Email</Text>
                                <TextInput
                                    style={styles.formInput}
                                    placeholder={"Email address"}
                                    onChangeText={(text) => (this.state.email = text)}
                                    defaultValue={this.state.email}
                                />
                            </View>
                        </View>

=======
>>>>>>> changes
                        <View style={styles.inputView}>
                            <Text style={styles.formTitle}>Gender</Text>
                            <Picker
                                selectedValue={this.state.gender}
                                style={styles.formInput}
                                onValueChange={(itemValue, itemIndex) =>
                                    this.state.gender = itemValue
                                }>
<<<<<<< HEAD
                                <Picker.Item
                                    label="Undefined"
                                    value="Undefined"
                                />
                                <Picker.Item
                                    label="Male"
                                    value="Male"
                                />
                                <Picker.Item
=======
                                <Picker.Item
                                    label="Male"
                                    value="Male"
                                />
                                <Picker.Item
>>>>>>> changes
                                    label="Female"
                                    value="Female"
                                />
                            </Picker>
                        </View>
<<<<<<< HEAD
                        <Button text={this.state.buttonText} indicatorAnimating={this.state.indicatorAnimating} action={this.save.bind(this)} />
=======
                        <Button text={"Submit"} action={this.save.bind(this)} />
>>>>>>> changes
                    </View>
                </ScrollView>
            </View>
        );
    }
}

export default EditProfileView;
