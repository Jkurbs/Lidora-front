import React from "react";
import styles from "./orders.styles";
import { View, ScrollView } from "react-native";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import TableView from "../../components/tableView";
import HeaderBar from "../../components/headerBar";
import moment from "moment";

var db = firebase.firestore();
const ref = db.collection("chefs");
const menuDetailsName = "MenuDetails";

function Order(props) {
  const navigation = props.navigation;
  const userID = firebase.auth().currentUser.uid;

  const [tableHead] = React.useState([
    "Amount",
    "Status",
    "Quantity",
    "Date",
    "Actions",
  ]);
  const [tableData, setTableData] = React.useState([]);
  const [fullData, setFullData] = React.useState([]);
  const [filteredTableData, setFilteredTableData] = React.useState([]);
  const [filteredFullData, setFilteredFullData] = React.useState([]);
  const [hasData, setHasData] = React.useState(null);
  const [isSearching, setIsSearching] = React.useState(false);
  const ordersRef = ref.doc(userID).collection("orders");

  // Fetch Menu
  React.useEffect(() => {
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

  const addItem = () => {
    navigation.navigate(menuDetailsName, { mode: "add" });
  };

  const detailsAction = (data) => {
    const item = fullData.filter((item) => item.name === data[1])[0];
    navigation.navigate(menuDetailsName, { mode: "details", item: item });
  };

  // Called when cell is selected
  const didSelectCell = (item, selectedIndex) => {
    if (isSearching === true) {
      fullData = filteredFullData;
    }
    item = {
      ...fullData[selectedIndex],
      image: fullData[selectedIndex].imageURL,
    };
    detailsAction(item);
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
            buttonAction={(index) => detailsAction()}
            detailsAction={(index, data) => detailsAction(data)}
          />
        </ScrollView>
      </View>
    );
  }
}

export default Order;
