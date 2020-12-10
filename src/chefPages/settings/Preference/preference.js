import React from "react";
import {
    View,
    Text,
    Switch,
} from "react-native";
import firebase from "../../../firebase/Firebase";
import "firebase/firestore";
import "firebase/auth";
import Slider from '@react-native-community/slider';


var db = firebase.firestore();

class PreferenceView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isEnabled: props.route.params.userData.user.isDarkMode,
            userID: props.route.params.userData.user.userID
        };
    }

    componentDidMount() {
        let currentComponent = this
    }

    save = () => {

    }

    toggleSwitch = () => {
        
        console.log('switchpressed')
        this.setState(state => {
            return {
                isEnabled: !state.isEnabled
            };
        });
        console.log(this.state.isEnabled)
        console.log(this.state.userID)
        //change Darkmode setting in firebase
        db.collection('chefs').doc(this.state.userID).update(
            {isDarkMode:!this.state.isEnabled}   
        )
    }


    render() {
        return (
            <View style={{
                flex: 1,
                height: '100%',
                backgroundColor: 'white'
            }}>
                <View style={{ margin: 20 }} >
                    <Text style={{ fontSize: 25 }}>Dark mode</Text>
                    <Switch
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.state.isEnabled ? "#f5dd4b" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={this.toggleSwitch}
                        value={this.state.isEnabled}
                    />
                </View>

                <View style={{ margin: 20 }} >
                    <Text style={{ fontSize: 25 }}>Brightness</Text>
                    <Slider
                        style={{ width: 200, height: 40 }}
                        minimumValue={0}
                        maximumValue={1}
                        minimumTrackTintColor="gray"
                        maximumTrackTintColor="#000000"
                    />
                </View>
            </View>
        );
    }
}

export default PreferenceView;
