
import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD0Yhvuj4vV5LjGIonS5K0mN39EJ9U5m-U",
    authDomain: "lidora-b01f7.firebaseapp.com",
    databaseURL: "https://project-id.firebaseio.com",
    projectId: "lidora-b01f7",
    storageBucket: "gs://lidora-b01f7.appspot.com",
    messagingSenderId: "715036890158",
    appId: "1:715036890158:ios:9c8a8ba4d68d9617de7bbf",
    measurementId: "G-measurement-id"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp;