import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { registerRootComponent } from "expo";

import { Table, TableWrapper, Row, Rows, Cell } from 'react-native-table-component';

import firebase from "../../firebase/Firebase";
import "firebase/firestore";


var db = firebase.firestore();
const ref = db.collection('chefs')

const data = [
    {
        key: 1,
        name: "Add a menu item",
        description:
            "Tip: click the green button to add your first menu item.",
        price: '$$',
        image: '',
    },
];

class ExampleOne extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['Head', 'Head2', 'Head3', 'Head4'],
            tableData: [
                ['../../assets/img/cook.svg', '1', '2', '3', '4'],
                ['../../assets/img/cook.svg', 'a', 'b', 'c', 'd'],
                ['../../assets/img/cook.svg', '1', '2', '3', '4'],
                ['../../assets/img/cook.svg', 'a', 'b', 'c', 'd']
            ]
        }
    }

    //FETCH CURRENT CHEF MENU
    // componentDidMount() {
    //     let currentComponent = this;
    //     // Fetch Current chef 
    //     ref.doc('spE8oRHDBChYPTVgF8BayBTJKmP2').collection("inventory").get().then(function (querySnapshot) {
    //         querySnapshot.forEach(function (doc) {
    //             const data = doc.data()
    //             const propertyValues = [data.name, data.quantity, data.unit, data.type]
    //             let currentTableData = [...currentComponent.state.tableData];
    //             currentTableData.push(propertyValues);
    //             currentComponent.setState({
    //                 tableData: currentTableData
    //             });
    //         });
    //     });
    // }

    element = (data, index) => (
        <Image
            style={{ marginBottom: 10, borderRadius: 5, width: 50, height: 50 }}
        // source={require(String(data))}
        />
    );

    render() {
        const state = this.state;
        return (
            <View style={styles.container}>
                <Table borderStyle={{ borderColor: 'transparent' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
                    {

                        state.tableData.map((rowData, index) => (

                            <TableWrapper key={index} style={styles.row}>
                                {


                                    rowData.map((cellData, cellIndex) => (
                                        console.log("CELL DATA: ", cellData)

                                        //<Cell key={cellIndex} data={cellIndex === 0 ? this.element(cellData, index) : cellData} textStyle={styles.text} />

                                    ))
                                }
                            </TableWrapper>
                        ))
                    }
                </Table>
                {/* <Table style={{ width: '80%', alignSelf: 'center', }} borderStyle={{ borderRadius: 5, borderWidth: 2, borderColor: '#c8e1ff' }}>
                    <Row data={state.tableHead} style={styles.head} textStyle={styles.headText} />
                    <Rows data={state.tableData} borderStyle={{ borderWidth: 0 }} style={{ height: 60 }} textStyle={styles.text} />

                    {
                        state.tableData.map((rowData, index) => (
                            <TableWrapper key={index} style={styles.row}>
                                {
                                    rowData.map((cellData, cellIndex) => (
                                        <Cell key={cellIndex} data={cellIndex === 3 ? this.element(cellData, index) : cellData} textStyle={styles.text} />
                                    ))
                                }
                            </TableWrapper>
                        ))
                    }


                </Table> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#808B97' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB', borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});

export default registerRootComponent(ExampleOne);

