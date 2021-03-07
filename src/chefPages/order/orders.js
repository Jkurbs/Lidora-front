import React from "react";
import styles from "./orders.styles";
import { View, ScrollView } from "react-native";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import TableView from "../../components/tableView";
import HeaderBar from "../../components/headerBar";

var db = firebase.firestore();
const ref = db.collection("chefs");
const menuDetailsName = "MenuDetails";

const SearchComponent = ({ buttonAction, subtitle, search }) => (
  <HeaderBar
    title={"Orders"}
    buttonAction={() => buttonAction()}
    subtitle={subtitle}
    search={(term) => {
      search(term);
    }}
    isSearchEnabled={true}
  />
);

function Menu(props) {
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
  const [visibleModal, setVisibleModal] = React.useState(null);

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
            data.total,
            data.total,
            data.total,
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

  const deleteAction = () => {
    setVisibleModal(true);
    // if (isSearching === true) {
    //   fullData = tfilteredFullData;
    // }
    // let newItem = {
    //   ...fullData[selectedIndex],
    //   key: fullData[selectedIndex].key,
    //   image: fullData[selectedIndex].imageURL,
    // };
    // handleDetails(newItem);
    // setItem(newItem);
    // setIsAlertVisible(true);
  };

  const addItem = () => {
    navigation.navigate(menuDetailsName, { mode: "add" });
  };

  const editAction = (data) => {
    const item = fullData.filter((item) => item.name === data[1])[0];
    navigation.navigate(menuDetailsName, { mode: "edit", item: item });
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
          <SearchComponent
            title={"Orders"}
            buttonAction={() => addItem()}
            subtitle={tableData.length}
            search={(term) => {
              search(term);
            }}
            isSearchEnabled={true}
          />
          <TableView
            tableHead={tableHead}
            tableData={isSearching ? filteredTableData : tableData}
            hasData={hasData}
            hasImage={false}
            didSelectCell={(item, selectedIndex) => {
              didSelectCell(item, selectedIndex);
            }}
            buttonAction={(index) => detailsAction()}
            deleteAction={(item) => deleteAction(item)}
            editAction={(index, data) => editAction(data)}
            detailsAction={(index, data) => detailsAction(data)}
          />
          {/* <Modal
            isVisible={visibleModal}
            onBackdropPress={() => setVisibleModal(false)}
          >
            {
              <View>
                <Text>TEst</Text>
              </View>
            }
          </Modal> */}
        </ScrollView>
      </View>
    );
  }
}

export default Menu;
