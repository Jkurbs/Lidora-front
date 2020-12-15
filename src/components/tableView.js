import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";

import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import ActivityIndicator from '../components/activityIndicator'
import MainButton from './buttons/mainButton'

class TableView extends React.Component {

    constructor(props) {
        super(props);
    }

    imageElement = (data, index) => (
        <Image
            style={styles.image}
            source={data}
        />
    );

    actionElement = (data, index) => {

        var buttons = []

        if (this.props.leftImage != null) {
            buttons.push(
                <TouchableOpacity
                    onPress={this.props.leftAction.bind(this, index)}>
                    <Image style={{ width: 20, height: 20 }} source={this.props.leftImage} />
                </TouchableOpacity>
            )
        }
        if (this.props.middleImage != null) {
            buttons.push(
                <TouchableOpacity style={styles.button}
                    onPress={this.props.middleAction.bind(this, data, index)}>
                    <Image style={{ width: 20, height: 20 }} source={this.props.middleImage} />
                </TouchableOpacity>
            )
        }

        if (this.props.rightImage != null) {
            buttons.push(
                <TouchableOpacity style={styles.button}
                    onPress={this.props.rightAction.bind(this, index)}>
                    <Image style={{ width: 20, height: 20 }} source={this.props.rightImage} />
                </TouchableOpacity>
            )
        }

        return <View style={{ backgroundColor: '#EEEEEE', borderRadius: 5, height: 40, width: 110, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', padding: 8 }}>
            {buttons}
        </View>
    };

    returnedData(cellIndex, selectedIndex, cellData, rowData) {
        if (cellIndex === 0) {
            return this.imageElement(rowData[0], selectedIndex)
        } else if (cellIndex === 3) {
            return this.actionElement(rowData, selectedIndex)
        } else {
            return cellData
        }
    }


    render() {
        if (this.props.hasData === null) {
            return <ActivityIndicator size={"small"} animating={!this.props.hasData} color={"gray"} />

        } else if (this.props.hasData === false) {
            return (
                <View style={styles.container}>
                    <Text style={{ alignSelf: 'center', marginBottom: 20 }}>There's no data at the moment</Text>
                    <MainButton text={"Add your first"} action={this.props.action} indicatorAnimating={false} />
                </View>
            )
        } else {
            if (this.props.hasImage === true) {
                return (
                    <View style={styles.container}>
                        <Table style={styles.table} borderStyle={{ borderColor: 'transparent' }}>
                            <Row data={this.props.tableHead} style={styles.head} textStyle={styles.headText} />
                            {
                                this.props.tableData.map((rowData, index) => (
                                    <TouchableOpacity onPress={this.props.didSelectCell.bind(this, rowData, index)}  >
                                        <TableWrapper key={index} style={styles.row}>
                                            {
                                                rowData.map((cellData, cellIndex) => (
                                                    <Cell key={cellIndex} data={this.returnedData(cellIndex, index, cellData, rowData)} textStyle={styles.text} />
                                                ))
                                            }
                                        </TableWrapper>
                                    </TouchableOpacity>
                                ))
                            }
                        </Table>
                    </View>
                )
            } else {
                return (
                    <View style={styles.container}>
                        <Table style={styles.table} borderStyle={{ borderColor: 'transparent' }}>
                            <Row onPress={this.leftAction} data={this.props.tableHead} style={styles.head} textStyle={styles.headText} />
                            {
                                this.props.tableData.map((rowData, index) => (
                                    <TouchableOpacity onPress={this.props.didSelectCell.bind(this, index)}  >
                                        <TableWrapper key={index} style={styles.row}>
                                            {
                                                rowData.map((cellData, cellIndex) => (
                                                    <Cell key={cellIndex} data={[cellIndex === rowData.length - 1 ? this.actionElement(rowData, index) : cellData]} textStyle={styles.text} />
                                                ))
                                            }
                                        </TableWrapper>

                                    </TouchableOpacity>
                                ))
                            }
                        </Table>
                    </View>
                )
            }
        }
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30 },
    table: {
        width: '100%',
        position: 'relative', backgroundColor: 'white', borderRadius: 5,
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 10.68,
        minWidth: '400px',
    },
    head: { height: 74, paddingLeft: 20, paddingRight: 20, borderBottomColor: '#CECECE', borderBottomWidth: 1 },
    body: { height: 100, paddingLeft: 20, paddingRight: 20, borderBottomColor: '#CECECE', borderBottomWidth: 1 },
    headText: { margin: 6, fontWeight: '600' },
    text: { margin: 6, marginTop: 16 },
    row: { height: 100, padding: 20, flexDirection: 'row', borderBottomColor: '#CECECE', borderBottomWidth: 1 },
    image: { borderRadius: 10, width: 60, height: 60, backgroundColor: '#E1E1E1' },
});

export default TableView;

