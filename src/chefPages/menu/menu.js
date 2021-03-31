import React, { useState, useEffect } from "react";
import styles from "./menu.styles";
import { View, ScrollView, Text, TouchableHighlight } from "react-native";
import { useTheme } from "@react-navigation/native";
import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import TableView from "../../components/tableView";
import HeaderBar from "../../components/headerBar";
import { Overlay } from "react-native-elements";
import Modal from "modal-react-native-web";
import DeleteButton from "../../components/buttons/destructiveButton";
import ComplimentaryButton from "../../components/buttons/complimentaryButton";

var db = firebase.firestore();
const ref = db.collection("chefs");
const menuDetailsName = "Menu Details";

const SearchComponent = ({ buttonAction, subtitle, search }) => (
  <HeaderBar
    title={"Menu"}
    buttonAction={() => buttonAction()}
    subtitle={subtitle}
    search={(term) => {
      search(term);
    }}
    isSearchEnabled={true}
  />
);

function Menu(props) {
  const { colors } = useTheme();
  const navigation = props.navigation;
  const userID = firebase.auth().currentUser.uid;

  const [tableHead] = useState([
    "Image",
    "Name",
    "Price",
    "Category",
    "Actions",
  ]);
  const [tableData, setTableData] = useState([]);
  const [fullData, setFullData] = useState([]);
  const [filteredTableData, setFilteredTableData] = useState([]);
  const [filteredFullData, setFilteredFullData] = useState([]);
  const [item, setItem] = useState({});
  const [hasData, setHasData] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [visibleModal, setVisibleModal] = useState(null);
  const menuRef = ref.doc(userID).collection("menu");

  // Fetch Menu
  useEffect(() => {
    async function fetchData() {
      menuRef.onSnapshot(function (querySnapshot) {
        if (querySnapshot.empty) {
          setHasData(false);
        } else {
          querySnapshot.forEach(function (doc) {
            const data = doc.data();
            const propertyValues = [
              data.imageURL,
              data.name,
              `$${data.price}`,
              data.group,
              null,
            ];
            setTableData((prevState) => [...prevState, propertyValues]);
            setFullData((prevState) => [...prevState, data]);
            setHasData(true);
          });
        }
      });
    }
    fetchData();
  }, []);

  // MARK: - Functions

  const deleteAction = () => {
    setVisibleModal(true);
  };

  const addItem = () => {
    navigation.navigate(menuDetailsName, { mode: "add" });
  };

  const editAction = (data) => {
    const item = fullData.filter((item) => item.name === data[1])[0];
    navigation.navigate(menuDetailsName, { mode: "edit", item: item });
  };

  const detailsAction = (data, selectedItem) => {
    var item;
    if (data) {
      item = fullData.filter((item) => item.name === data[1])[0];
    }

    navigation.navigate(menuDetailsName, {
      mode: "details",
      item: selectedItem ?? item,
    });
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
    detailsAction(null, item);
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
            title={"Menu"}
            buttonAction={() => addItem()}
            subtitle={tableData.length}
            search={(term) => {
              search(term);
            }}
            isSearchEnabled={true}
            hasButton={true}
          />
          <TableView
            tableType={"Menu"}
            tableHead={tableHead}
            tableData={isSearching ? filteredTableData : tableData}
            hasData={hasData}
            hasImage={true}
            didSelectCell={(item, selectedIndex) => {
              didSelectCell(item, selectedIndex);
            }}
            buttonAction={(index) => detailsAction()}
            deleteAction={(item) => deleteAction(item)}
            editAction={(index, data) => editAction(data)}
            detailsAction={(index, data) => detailsAction(data)}
          />

          <Overlay
            onBackdropPress={() => setVisibleModal(!visibleModal)}
            fullscreen={false}
            isVisible={visibleModal}
            ModalComponent={Modal}
          />

          {/* Modal */}
          <Modal
            animationType="fade"
            transparent={true}
            visible={visibleModal}
            onDismiss={() => {
              //alert("Modal has been closed.");
            }}
          >
            <View
              opacity={0.5}
              style={{
                // flex: 1,
                height: "100%",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  marginTop: 22,
                  width: 400,
                  height: 150,
                  borderRadius: 5,
                  backgroundColor: "white",
                  padding: 16,
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  <Text style={{ fontSize: 20, fontWeight: "600" }}>
                    Delete Item
                  </Text>
                  <Text
                    style={[
                      styles.alertDescription,
                      { color: colors.textSecondary },
                    ]}
                  >
                    Are you sure you want to delete this product? This can't be
                    undone.
                  </Text>

                  <View
                    style={{
                      width: 100,
                      marginTop: 16,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <ComplimentaryButton
                      text={"Cancel"}
                      hasLeftIcon={false}
                      indicatorAnimating={false}
                      action={() => setVisibleModal(false)}
                    />
                    <DeleteButton
                      action={() => {
                        deleteAction();
                      }}
                      text={"Delete"}
                      indicatorAnimating={false}
                      hasLeftIcon={false}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}

export default Menu;
