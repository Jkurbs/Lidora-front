// import React from "react";
// import styles from './editProfile.styles';

import Geocoder from 'react-native-geocoding';
// import { GoogleMapReact, Circle } from 'google-map-react';

// import { withGoogleMap, GoogleMap, Circle } from 'react-google-maps';



import {
    View
} from "react-native";

import firebase from "../../../firebase/Firebase";
import "firebase/firestore";
import "firebase/auth";

var db = firebase.firestore();

Geocoder.init("AIzaSyBNaHVtCYg7DcmHfKNtiuTV2REcWwonbH4"); // use a valid API key



import React, { Component } from 'react';
import { withGoogleMap, GoogleMap } from 'react-google-maps';
class OrderSettingsView extends Component {
    render() {
        const GoogleMapExample = withGoogleMap(props => (
            <GoogleMap
                defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
                defaultZoom={13}
            >
            </GoogleMap>
        ));
        return (
            <div>
                <GoogleMapExample
                    containerElement={<div style={{ height: `500px`, width: '500px' }} />}
                    mapElement={<div style={{ height: `100%` }} />}
                />
            </div>
        );
    }
};
export default OrderSettingsView;


// const AnyReactComponent = ({ text }) =>

//     <View style={{ backgroundColor: 'red', width: 100, height: 100 }}>{text}</View>;


// class OrderSettingsView extends React.Component {

//     constructor() {
//         super();
//         this.state = {
//             userId: firebase.auth().currentUser.uid,
//             indicatorAnimating: false,
//             center: {

//             },

//             zoom: 15
//         };
//     }




//     componentDidMount() {
//         // Address Geocoding
//         let currentComponent = this
//         Geocoder.from("14212 NE 3RD CT 33161")
//             .then(json => {
//                 var location = json.results[0].geometry.location;
//                 console.log(location)
//                 currentComponent.setState({ center: location })
//             })
//             .catch(error => console.warn(error));

//     }


//     render() {

//         const GoogleMapExample = withGoogleMap(props => (
//             <GoogleMap
//                 defaultCenter={{ lat: 40.756795, lng: -73.954298 }}
//                 defaultZoom={13}
//             >
//             </GoogleMap>
//         ));


//         return (

//             <View>
//                 <GoogleMapExample
//                     containerElement={<div style={{ height: `500px`, width: '500px' }} />}
//                     mapElement={<div style={{ height: `100%` }} />}
//                 />
//             </View>








//             //     <View style={{ backgroundColor: 'red', width: '60%', height: '100%' }} >
//             //         <MyMapComponent center={this.state.center} zoom={this.state.zoom} />

//             //         {/* <AnyReactComponent
//             //                 lat={this.state.center.lat}
//             //                 lng={this.state.center.lng}
//             //                 text="Where you are"
//             //             /> */}

//             //         {/* <Circle
//             //                 // ref={(circle) => {this._circle = circle}}
//             //                 // defaultCenter = {KYIV}
//             //                 center={this.state.center}
//             //                 // defaultDraggable={true}
//             //                 // defaultEditable={true}
//             //                 defaultRadius={2000}
//             //                 onDragEnd={this.dragCircle}
//             //                 options={{
//             //                     strokeColor: 'red',
//             //                     fillColor: 'red',
//             //                     fillOpacity: 0.1
//             //                 }}
//             //             /> */}



//             //     </View >
//         );
//     }
// }

// export default OrderSettingsView;
