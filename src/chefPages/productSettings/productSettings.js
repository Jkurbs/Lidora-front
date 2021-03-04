import React from "react";
// import styles from "./menu.styles";
import { View, ScrollView } from "react-native";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import Tooltip from "@material-ui/core/Tooltip";

var db = firebase.firestore();
const ref = db.collection("chefs");

function ProductSettings(props) {}

export default ProductSettings;
