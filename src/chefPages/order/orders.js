import React, { useState, useEffect } from "react";
import styles from "./orders.styles";
import { View, ScrollView } from "react-native";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import TableView from "../../components/tableView";
import HeaderBar from "../../components/headerBar";
import moment from "moment";
import OrderDetails from "./orderDetails";

var db = firebase.firestore();
const ref = db.collection("chefs");

function Order(props) {
  const userID = firebase.auth().currentUser.uid;
  const [tableHead] = React.useState([
    "Amount",
    "Status",
    "Quantity",
    "Date",
    "Actions",
  ]);
  const [tableData, setTableData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [filteredFullData, setFilteredFullData] = useState([]);
  const [hasData, setHasData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const ordersRef = ref.doc(userID).collection("orders");
  const [itemSelected, setItemSelected] = useState({
    selected: false,
    item: null,
  });

  // Fetch Menu
  useEffect(() => {
    ordersRef.onSnapshot(function (querySnapshot) {
      if (querySnapshot.empty) {
        setHasData(false);
      } else {
        querySnapshot.forEach(function (doc) {
          const data = doc.data();
          const propertyValues = [
            `$${data.total / 100}`,
            data.status,
            data.quantity,
            moment(data.timestamp).format("MMM, DD"),
            null,
          ];
          setTableData((prevState) => [...prevState, propertyValues]);
          setFullData((prevState) => [...prevState, data]);
          setHasData(true);
        });
      }
    });
  }, []);

  // MARK: - Functions

  // Called when cell is selected
  const didSelectCell = (item, selectedIndex) => {
    if (isSearching === true) {
      fullData = filteredFullData;
    }
    item = {
      ...fullData[selectedIndex],
    };

    setItemSelected({ selected: true, item: item });
  };

  // MARK: - Item actions
  const search = (searchTerm) => {
    let filteredData = tableData.filter((dataRow) =>
      dataRow[1].toLowerCase().includes(searchTerm)
    );
    let filteredReal = fullData.filter((dataRow) =>
      dataRow.name.toLowerCase().includes(searchTerm)
    );
    setIsSearching(true);
    setFilteredTableData(filteredData);
    setFilteredFullData(filteredReal);
  };

  if (tableData != []) {
    if (itemSelected.selected === true) {
      return (
        <OrderDetails
          item={itemSelected.item}
          deselectedItem={() => setItemSelected({ selected: false })}
        />
      );
    } else {
      return (
        <View style={[styles.container]}>
          <ScrollView>
            <HeaderBar
              title={"Orders"}
              buttonAction={() => addItem()}
              subtitle={tableData.length}
              search={(term) => {
                search(term);
              }}
              isSearchEnabled={false}
              hasButton={false}
            />
            <TableView
              tableType={"Orders"}
              tableHead={tableHead}
              tableData={isSearching ? filteredTableData : tableData}
              hasData={hasData}
              hasImage={false}
              didSelectCell={(item, selectedIndex) => {
                didSelectCell(item, selectedIndex);
              }}
              buttonAction={() => detailsAction()}
              detailsAction={(index, data) => detailsAction(data)}
            />
          </ScrollView>
        </View>
      );
    }
  }
}

export default Order;
