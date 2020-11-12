import React, { Component, useState } from "react";
import {
    Button,
    StyleSheet,
    TouchableOpacity,
    View,
    Dimensions,
    Modal,
    TextInput,
    Text,
} from "react-native";
import Styles from "./modalStyles";

class ModalComp extends Component {
    state = {
        modal: false,
        monthlyGoal: 0,
    };
    handleModal = () => {
        this.setState({
            modal: !this.state.modal ? true : false,
        });
        console.log(this.state.monthlyGoal)
        console.log(this.state.modal);
    };

    render() {
        return (
            <View style={{width:'100%'}}>
                <Button
                    label='Set'
                    style={Styles.showButton}
                    onPress={this.handleModal}
                >
                </Button>

                <Modal visable={this.state.modal}>
                    <View
                        style={{
                            marginTop: 50,
                            backgroundColor: "red",
                            //width: "100%",
                            //height: "100%",
                        }}
                    >
                        <Text> Set a goal</Text>
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: "gray",
                                borderWidth: 1,
                            }}
                            onChangeText={(text) => this.monthlyGoal(text)}
                        ></TextInput>
                        <Button
                            label='Set Goal'
                            style={Styles.showButton}
                            onPress={this.handleModal}
                        ></Button>
                    </View>
                </Modal>
            </View>
        );
    }
}

export default ModalComp;
