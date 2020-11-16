import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";


class ActivityIndicatorView extends React.Component {
    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator />
                <ActivityIndicator size="large" />
                <ActivityIndicator size="small" color="#0000ff" />
                <ActivityIndicator size="large" color="#00ff00" />
            </View>
        )
    }
}

export default ActivityIndicatorView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'red',
        width: 100,
        height: 100
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

