import React from "react";
import styles from '../EditProfile/editProfile.styles';
import {
    View,
    TextInput,
    Text,
} from "react-native";
const firebase = require('firebase')
import "firebase/firestore";
import "firebase/auth";
import Button from '../../../components/buttons/mainButton'

class ChangePasswordView extends React.Component {

    constructor() {
        super();
        this.state = {
            oldPassword: null,
            newPassword: null,
            newPasswordConfirm: null,
            isAnimating: false

        };
    }

    componentDidMount() {

    }

    changePassword = () => {

        this.setState({ isAnimating: true })

        var user = firebase.auth().currentUser

        const oldPassword = this.state.oldPassword
        const newPassword = this.state.newPassword
        const newPasswordConfirm = this.state.newPasswordConfirm

        if (oldPassword, newPassword,
            newPasswordConfirm === null) { return alert("No field can be left empty.") }


        if (oldPassword === newPassword) { return alert("You can use your old password as the new password.") }

        if (newPassword !== newPasswordConfirm) { return alert("Please make sure both passwords match.") }

        var credential = firebase.auth.EmailAuthProvider.credential(
            user.email,
            oldPassword
        )

        user.reauthenticateWithCredential(credential).then(function () {
            // User re-authenticated.
            user.updatePassword(newPassword).then(function () {
                // Update successful.
                this.setState({ isAnimating: false })
                alert("Password successfully updated")
            }).catch(function (error) {
                // An error happened.
                this.setState({ isAnimating: false })
                alert(error)
            });
        }).catch(function (error) {
            // An error happened.
            this.setState({ isAnimating: false })
            alert(error)
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.itemContainer}>
                    <View>
                        <View style={styles.inputView}>
                            <Text style={styles.formTitle}>Old password</Text>
                            <TextInput
                                style={styles.formInput}
                                secureTextEntry={true}
                                onChangeText={(text) => (this.setState({ oldPassword: text }))}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <Text style={styles.formTitle}>New password</Text>
                            <TextInput
                                style={styles.formInput}
                                secureTextEntry={true}
                                onChangeText={(text) => (this.setState({ newPassword: text }))}
                            />
                        </View>
                        <View style={styles.inputView}>
                            <Text style={styles.formTitle}>Confirm new password</Text>
                            <TextInput
                                style={styles.formInput}
                                secureTextEntry={true}
                                onChangeText={(text) => (this.setState({ newPasswordConfirm: text }))}
                            />
                        </View>
                    </View>
                    <Button text={"Update"} indicatorAnimating={this.state.isAnimating} action={this.changePassword.bind(this)} />
                </View>
            </View>
        );
    }
}

export default ChangePasswordView;
