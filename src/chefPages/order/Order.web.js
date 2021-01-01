import { CalendarList } from 'react-native-calendars';
import * as React from 'react';
import { View, ScrollView } from 'react-native';
import styles from "./orders.styles";

import TableView from '../../components/tableView';
import HeaderBar from '../../components/headerBar';
import Alert from '../../components/Alerts/alert'

import firebase from "../../firebase/Firebase";
import "firebase/firestore";

var db = firebase.firestore();
const ref = db.collection('chefs')

class OrdersScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            userID: firebase.auth().currentUser.uid,
            tableHead: ['Order Id', 'Total', 'Ordered date', 'Delivery Date', 'Actions'],
            tableData: [
                ["#1", "$199", "11/18/2020", "11/19/2020", ""],
                ["#1", "$199", "11/18/2020", "11/19/2020", ""]
            ],
            hasData: true,
            isAlertVisible: false,
            showCalendar: false
        };
    }

    // componentDidMount() {
    //     let currentComponent = this;
    //     // Fetch Current chef 
    //     ref.doc(this.state.userID).collection("incoming_sales").get().then(function (querySnapshot) {
    //         if (querySnapshot.empty) {
    //             currentComponent.setState({
    //                 hasData: false,
    //             });
    //         } else {
    //             querySnapshot.forEach(function (doc) {
    //                 const data = doc.data()
    //                 const propertyValues = [data.name, data.quantity, data.unit, '', '']
    //                 let currentTableData = [...currentComponent.state.tableData];
    //                 currentTableData.push(propertyValues);
    //                 currentComponent.setState({
    //                     tableData: currentTableData,
    //                     hasData: true,
    //                 });
    //             });
    //         }
    //     });
    // }


    didSelectCell = (selectedIndex) => {

    }

    leftActionSelected = (selectedIndex) => {

    }

    middleActionSelected = (selectedIndex) => {
        this.setState({ isAlertVisible: !this.state.isAlertVisible })
    }

    rightActionSelected = (selectedIndex) => {

    }

    showModal = () => {
        this.setState({ showCalendar: !this.state.showCalendar });
        console.log(this.state.showCalendar)
    }


    // data = this.state.tableData.filter(data => {
    //     return data.nama.toLowerCase().match(searchText);
    // });

    render() {
        return (
            <View style={styles.container}>
                <HeaderBar
                    title={"Customer orders"}
                    subtitle={this.state.tableData.length}
                    search={console.log("test")}
                    isSearchEnabled={false}
                    show={this.showModal.bind(this)}
                />
                <ScrollView>
                    <TableView
                        tableHead={this.state.tableHead}
                        tableData={this.state.tableData}
                        hasData={this.state.hasData}
                        hasImage={false}
                        didSelectCell={this.didSelectCell.bind(this)}
                        middleImage={require('../../assets/icon/remove-100.png')}
                        rightImage={require('../../assets/icon/info-100.png')}
                        middleAction={this.middleActionSelected.bind(this)}
                        rightAction={this.rightActionSelected.bind(this)}
                    />
                </ScrollView>
                <Alert
                    action={this.middleActionSelected}
                    isVisible={this.state.isAlertVisible}
                    buttonTitle1={"Delete from inventory"} />
            </View>
        );
    }
}
export default OrdersScreen;
