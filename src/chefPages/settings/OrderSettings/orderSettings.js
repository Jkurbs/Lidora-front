import React from "react";
// import styles from './editProfile.styles';

import Geocoder from 'react-native-geocoding';
import GoogleMapReact from 'google-map-react';
import Slider from '@react-native-community/slider';
import { View, Text } from "react-native";
import MainButton from '../../../components/buttons/mainButton'

import firebase from "../../../firebase/Firebase";
import "firebase/firestore";
import "firebase/auth";
import ReactPlaceholder from 'react-placeholder';




var db = firebase.firestore();

Geocoder.init("AIzaSyBNaHVtCYg7DcmHfKNtiuTV2REcWwonbH4"); // use a valid API key

var circle;

const AnyReactComponent = ({ text, width }) =>

    <View style={{ backgroundColor: 'red', width: width, height: 100 }}>{text}</View>;

const apiIsLoaded = (map, maps, center, radius) => {
    circle = new maps.Circle({
        path: google.maps.SymbolPath.CIRCLE,
        strokeColor: "#00CF46",
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: "#00CF46",
        fillOpacity: 0.3,
        map,
        center: center,
        radius: radius
    });
};

class OrderSettingsView extends React.Component {

    constructor() {
        super();
        this.state = {
            userId: firebase.auth().currentUser.uid,
            indicatorAnimating: false,
            center: {

            },
            zoom: 11,
            radius: null
        };
    }


    componentDidMount() {
        let currentComponent = this

        db.collection('chefs').doc(currentComponent.state.userId).get().then(function (doc) {
            if (doc.exists) {
                const user = doc.data()
                const address = user.line1 + ' ' + user.city + ' ' + user.state + ' ' + user.postal_code

                currentComponent.setState({
                    address: address,
                })

                if (user.radius != null) {
                    currentComponent.setState({ radius: user.radius })
                }

                if (user.latitude && user.longitude != null) {
                    const center = { lat: user.latitude, lng: user.longitude }
                    currentComponent.setState({ center: center })
                    return
                } else {

                    Geocoder.from(address)
                        .then(json => {
                            var location = json.results[0].geometry.location;
                            doc.ref.set({ latitude: location.lat, longitude: location.lng }, { merge: true })
                            console.log(location)
                            currentComponent.setState({ center: location })
                        })
                        .catch(error => console.warn(error));
                }

            } else {
                console.log("No such document!");
            }
        }).catch(function (error) {
            console.log("Error getting document:", error);
        });
    }

    saveRadius = () => {
        db.collection('chefs').doc(this.state.userId).set({ radius: this.state.radius }, { merge: true })
        alert("Radius successfully updated.")
    }

    changeRadius = (radius) => {
        this.setState({ radius: radius })
        if (circle != null) {
            circle.setRadius(radius)
        }
    }

    render() {

        return (
            <View style={{ width: '100%', height: '100%' }} >
                <ReactPlaceholder showLoadingAnimation={false} type='rect' ready={this.state.radius != null} style={{ width: '70%', height: '100%' }}>
                    <View style={{ width: '70%', height: '100%' }}>
                        <GoogleMapReact
                            style={{ width: '60%' }}
                            bootstrapURLKeys={{ key: "AIzaSyBNaHVtCYg7DcmHfKNtiuTV2REcWwonbH4" }}
                            center={this.state.center}
                            defaultZoom={this.state.zoom}
                            draggable={false}
                            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps, this.state.center, this.state.radius)
                            }
                            yesIWantToUseGoogleMapApiInternals={true}
                        >
                            {/* <AnyReactComponent
                        lat={this.state.center.lat}
                        lng={this.state.center.lng}
                        width={this.state.width}
                        text="Where you are"
                    /> */}
                        </GoogleMapReact>

                    </View>
                </ReactPlaceholder>

                <View style={{ padding: 20, width: '30%', position: 'absolute', right: 0 }}>
                    <View style={{ alignSelf: 'flex-end', top: 10, right: 20 }}>
                        <MainButton text={"Save"} indicatorAnimating={false} action={this.saveRadius} />
                    </View>

                    <View style={{ marginTop: 50, marginBottom: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: '500', fontSize: 15 }}>Your address</Text>
                        <Text>{this.state.address}</Text>
                    </View>

                    <View style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                        <Text style={{ fontWeight: '500', fontSize: 15, marginBottom: 8 }}>Radius</Text>
                        <Slider
                            value={this.state.radius}
                            minimumValue={1000}
                            maximumValue={15000}
                            minimumTrackTintColor="#00CF46"
                            maximumTrackTintColor="#636161"
                            thumbTintColor={'white'}
                            onValueChange={radius => this.changeRadius(radius)}
                        />
                        <Text style={{ marginTop: 8, fontSize: 12, color: '#636161' }}>Only people inside of the radius will be able to order from you.</Text>
                    </View>
                </View>
            </View>
        );
    }
}

export default OrderSettingsView;
