import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { registerRootComponent } from "expo";

import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import firebase from '../../firebase/Firebase';
import "firebase/firestore";

import TableView from '../../components/tableView'

var db = firebase.firestore();
const ref = db.collection('chefs')

class Test2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Image', 'Name', 'Price', 'Actions'],
            tableData: [],
            hasData: null
        }
    }

    //FETCH CURRENT CHEF MENU
    componentDidMount() {
        console.log("COmponent did mount")
        let currentComponent = this;
        // Fetch Current chef 
        ref.doc('spE8oRHDBChYPTVgF8BayBTJKmP2').collection("menu").get().then(function (querySnapshot) {
            if (querySnapshot.empty) {
                currentComponent.setState({
                    hasData: false,
                });
            } else {
                querySnapshot.forEach(function (doc) {
                    const data = doc.data()
                    const propertyValues = [data.imageURL, data.name, data.price, '']
                    let currentTableData = [...currentComponent.state.tableData];
                    currentTableData.push(propertyValues);
                    currentComponent.setState({
                        tableData: currentTableData,
                        hasData: true,
                    });
                });
            }
        });
    }


    didSelectCell = (selectedIndex) => {
        alert(selectedIndex)
    }

    leftActionSelected = (selectedIndex) => {
        alert(selectedIndex)
    }

    middleActionSelected = (selectedIndex) => {
        alert("Middle Action")
    }

    rightActionSelected = (selectedIndex) => {
        alert(selectedIndex)
    }

    render() {
        return (
            <TableView
                tableHead={this.state.tableHead}
                tableData={this.state.tableData}
                hasData={this.state.hasData}
                hasImage={true}
                didSelectCell={this.didSelectCell.bind(this)}
                leftImage={require('../../assets/icon/edit.png')}
                middleImage={require('../../assets/icon/remove-100.png')}
                rightImage={require('../../assets/icon/info-100.png')}
                leftAction={this.leftActionSelected.bind(this)}
                middleAction={this.leftActionSelected.bind(this)}
                rightAction={this.rightActionSelected.bind(this)}
            />
        )
    }
}


export default registerRootComponent(Test2);

