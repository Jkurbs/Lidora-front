import React, { Component, useState } from "react";
import { Button, StyleSheet, View, Dimensions, Modal, TextInput } from "react-native";

class ModalComp extends Component {
    state = {
        modal: false,
        monthlyGoal: 0,
    };

    handleModal = () => {
        this.setState({
            modal: !this.state.modal ? true : false,
        });
    };

    render() {
        return (
            <View>
                <Button title="Open" onPress={this.handleModal}></Button>

                <Modal visable={this.state.modal} >
                    <View
                        style={{
                            marginTop: 50,
                            backgroundColor: "red",
                        }}
                    >
                        <Text> Set a goal</Text>
                        <TextInput
                            style={{
                                height: 40,
                                borderColor: "gray",
                                borderWidth: 1,
                            }}
                            onChangeText={(text) => monthlyGoal(text)}
                        ></TextInput>
                    </View>
                    <Button title="close" onPress={this.state.modal}></Button>
                </Modal>
            </View>
        );
    }
}

export default ModalComp;
