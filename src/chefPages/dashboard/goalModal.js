import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";
import Dialog from "react-native-dialog";

export default function GoalModal() {
    const [monthlyGoal, setMonthlyGoal] = useState(0);
    const [visible, setVisible] = useState(false);

    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleSendGoal = () => {
        setVisible(false);
    };
    console.log(monthlyGoal)
    return (
        <View style={styles.container}>
            <Button title="Show dialog" onPress={showDialog} />
            <Dialog.Container visible={visible}>
        <Dialog.Title>Testing an input</Dialog.Title>
        <Dialog.Input
            onChangeText={goal => setMonthlyGoal({goal})}
            />
        <Dialog.Button label="OK" onPress={handleSendGoal} />
      </Dialog.Container>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
