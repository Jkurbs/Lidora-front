import React, { PureComponent } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import firebase from '../firebase/Firebase'
import 'firebase/firestore';


class Step extends PureComponent {
    state = {

    }
    constructor(props) {
        super(props)
        this.addUser = this.addUser.bind(this);
    }

    addUser = async () => {
        console.log("Add user")
        var db = firebase.firestore();
        try {
            const potentialUserDoc = await db.collection('potential_chefs').add({
                first_name: this.props.values.lastName,
                last_name: this.props.values.firstName,
                email_address: this.props.values.email
            });
            return;
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (

            <View style={styles.root}>
                {this.props.children({
                    onChangeValue: this.props.onChangeValue,
                    values: this.props.values,
                })}
                <View style={styles.buttonWrapper}>
                    <Button
                        title="Prev"
                        disabled={this.props.currentIndex === 0}
                        onPress={this.props.prevStep}
                    />
                    {this.props.isLast ? (
                        <Button title="Submit" onPress={this.addUser} />
                    ) : (
                            <Button title="Next" onPress={this.props.nextStep} />
                        )}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    root: {
        position: 'relative',
        top: 320,
        // flex: 1,
    },
    buttonWrapper: {
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
        justifyContent: 'space-around',
    },
});

export default Step;