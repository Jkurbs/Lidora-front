import React, { useState } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";


class ActivityIndicatorView extends React.Component {
    render() {
        return (
            <View style={[styles.container, styles.horizontal]}>
                <ActivityIndicator
                    size={this.props.size}
                    hidesWhenStopped={true} animating={this.props.isAnimating} color={this.props.color} style={{ position: 'absolute', alignSelf: 'center' }} />
            </View>
        )
    }
}

export default ActivityIndicatorView;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

