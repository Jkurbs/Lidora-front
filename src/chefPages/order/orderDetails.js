import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import globalStyle from "../../globalStyle";
import { useTheme } from "@react-navigation/native";
import Input from "../../components/inputs/input";
import MainButton from "../../components/buttons/mainButton";
import ComplimentaryButton from "../../components/buttons/complimentaryButton";

import firebase from "../../firebase/Firebase";
import "firebase/firestore";
import Geocoder from "react-native-geocoding";
import GoogleMapReact from "google-map-react";
import moment from "moment";
import { Entypo } from "@expo/vector-icons";
import { Overlay } from "react-native-elements";
import Modal from "modal-react-native-web";
import { Picker } from "@react-native-picker/picker";

Geocoder.init("AIzaSyBNaHVtCYg7DcmHfKNtiuTV2REcWwonbH4");

var db = firebase.firestore();
const ref = db.collection("chefs");

const customer = {
  title: "Customer",
  data: [
    {
      name: "John Doe",
      email: "kerby.jean@hotmail.fr",
      phone: "(786) 468-4596",
    },
  ],
};

const refundReasons = [
  "Select a reason",
  "Duplicate",
  "Fraudulent",
  "Requested by customer",
  "Other",
];

const CustomerCell = ({ item }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      width: "50%",
      marginBottom: 16,
    }}
  >
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-around",
        marginBottom: 8,
        height: "100%",
      }}
    >
      <Text style={styles.title}>Name</Text>
      <Text style={styles.title}>Customer email</Text>
      <Text style={styles.title}>Phone Number</Text>
    </View>

    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-between",
        marginBottom: 8,
        height: "100%",
      }}
    >
      <Text style={styles.title}>{item.name}</Text>
      <Text style={[styles.title]}>{item.email}</Text>
      <Text style={styles.title}>{item.phone}</Text>
    </View>
  </View>
);

const ItemsCell = ({ item }) => (
  <View
    style={{
      flexDirection: "row",
      justifyContent: "space-between",
      width: "50%",
      marginBottom: 8,
    }}
  >
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        height: "100%",
      }}
    >
      <Text style={[styles.title, { marginRight: 8 }]}>{item.quantity}X</Text>
      <Text style={styles.title}>{item.name}</Text>
    </View>
  </View>
);

function OrderDetails(props) {
  const { colors } = useTheme();
  const deselectedItem = props.deselectedItem;
  const item = props.item;
  const total = item.total / 100;

  const useGlobalStyles = globalStyle();
  const userID = firebase.auth().currentUser.uid;
  const ordersRef = ref.doc(userID).collection("orders");
  const [items, setItems] = useState([]);
  const [location, setLocation] = useState({});
  const [newArray, setNewArray] = useState([]);
  const [reason, setReason] = useState("");

  const [visibleModal, setVisibleModal] = useState(null);

  useEffect(() => {
    async function fetchData() {
      await ordersRef
        .doc(item.id)
        .collection("items")
        .onSnapshot(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const data = doc.data();
            setItems((prevState) => [...prevState, data]);
          });
        });
    }
    fetchData();
  }, []);

  useEffect(() => {
    Geocoder.from("515 Gulf Drive Baltimore, MD 21206")
      .then((json) => {
        var location = json.results[0].geometry.location;
        alert(location);
        setLocation(location);
      })
      .catch((error) => console.warn(error));
  }, []);

  // var grouped = _.mapValues(_.groupBy(items, "deliveryDates"), (clist) =>
  //   clist.map((item) => _.omit(item, "deliveryDates"))
  // );

  // Object.keys(grouped).forEach((key) => {
  //   let obj = {};
  //   var dates = key.split(",");
  //   if (key.length > 1) {
  //     obj["title"] = dates
  //       .map((x) => moment(x).format("dddd MMM, DD"))
  //       .join("\n");
  //     obj["data"] = grouped[key];
  //     obj["data"]["deliveryDates"] = dates;
  //     console.log(obj);
  //     setNewArray((prevState) => [...prevState, obj]);
  //   } else {
  //     obj["title"] = key.moment(x).format("dddd MMM, DD");
  //     obj["deliveryDates"] = dates;
  //     obj["data"]["deliveryDates"] = dates;
  //     console.log(obj);
  //     setNewArray((prevState) => [...prevState, obj]);
  //   }
  // });

  const refund = () => {
    setVisibleModal(!visibleModal);
  };

  if (newArray != []) {
    return (
      <View
        style={[
          useGlobalStyles.backgroundPrimary,
          { backgroundColor: "white" },
        ]}
      >
        <View
          style={[
            styles.navBarContainer,
            globalStyle.backgroundPrimary,
            { borderBottomColor: colors.borderPrimary },
          ]}
        >
          <View style={styles.leftContainer}>
            <TouchableOpacity onPress={() => deselectedItem()}>
              <Entypo name="chevron-small-left" size={24} color="black" />
            </TouchableOpacity>
            <View style={{ marginLeft: 16 }}>
              <Text style={{ color: colors.textSecondary }}>Order</Text>
              <Text style={[styles.titleText, { color: colors.textPrimary }]}>
                ${total}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => refund()}
            style={styles.rightContainer}
          >
            <Image
              style={styles.image}
              source={require("../../assets/icon/refund-left-48.png")}
            />
            <Text style={{ color: colors.textSecondary }}>Refund</Text>
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 40,
            width: "100%",
            height: "100%",
          }}
        >
          {/* Customer view */}
          <SectionList
            style={{ width: "50%", height: "100%" }}
            sections={[
              customer,
              {
                title: "Items",
                data: items,
              },
            ]}
            keyExtractor={(item, index) => item + index}
            renderItem={({ item, section }) => {
              switch (section.title) {
                case "Customer":
                  return <CustomerCell item={item} />;
                default:
                  return <ItemsCell item={item} />;
              }
            }}
            renderSectionHeader={({ section: { title } }) => (
              <Text style={[styles.header, { color: colors.textSecondary }]}>
                {title}
              </Text>
            )}
          />
          <View
            style={{
              width: "50%",
              height: "100%",
              flexDirection: "column",
            }}
          >
            <Text style={[styles.header, { color: colors.textSecondary }]}>
              Location
            </Text>
            <View
              style={{
                borderRadius: 5,
                borderWidth: 1,
                marginTop: 20,
                padding: 20,
                height: "40%",
                borderColor: colors.borderPrimary,
              }}
            >
              <View>
                <Text>Address: 14212 NE 3rd CT</Text>
                <Text>Distance between you and customer: 10 kl</Text>
              </View>
            </View>
          </View>
        </View>

        <Overlay
          onBackdropPress={() => setVisibleModal(!visibleModal)}
          fullscreen={false}
          isVisible={visibleModal}
          ModalComponent={Modal}
        />

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
                height: 400,
                borderRadius: 5,
                backgroundColor: "white",
                padding: 16,
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={{ fontSize: 20, fontWeight: "600" }}>
                  Refund order
                </Text>
                <Text
                  style={[
                    styles.alertDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  Refunds take 5-10 days to appear on a customer's statement.
                </Text>

                {/* Input here */}
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}
                >
                  <View style={{ width: "100%" }}>
                    <Input
                      placeholder={"Enter amount"}
                      defaultValue={`${total}`}
                      onChangeText={() => console.log("")}
                    />
                    <Picker
                      title={"Select a reason"}
                      style={[styles.input]}
                      dropdownIconColor={colors.textTertiary}
                      onValueChange={(itemValue, itemIndex) =>
                        setReason(itemValue)
                      }
                    >
                      {refundReasons.map((s, i) => {
                        return <Picker.Item key={i} value={s} label={s} />;
                      })}
                    </Picker>
                  </View>
                </View>

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
                  <MainButton
                    action={() => {
                      refund();
                    }}
                    text={"Refund"}
                    indicatorAnimating={false}
                    hasLeftIcon={false}
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

export default OrderDetails;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 40,
  },

  header: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
  },

  title: {
    // backgroundColor: "red",
  },

  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  uploadText: {
    textAlign: "center",
    fontWeight: "600",
  },

  addCategoryContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  button: {
    position: "absolute",
    width: 140,
    height: 50,
    borderRadius: 5,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    bottom: 0,
    right: 1,
  },
  text: {
    fontSize: 12,
    fontWeight: "600",
  },

  inputTitle: {
    fontWeight: "490",
    marginTop: 16,
  },

  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  input: {
    marginTop: 8,
    padding: 8,
    padding: 8,
    fontSize: 14,
    borderColor: "#d6d6d6",
    borderWidth: 1,
    borderRadius: 5,
    height: 50,
    width: 350,
  },

  inputTitle: {
    fontWeight: "490",
    marginTop: 16,
  },

  titleText: {
    fontSize: 20,
    fontWeight: "600",
  },

  navBarContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    padding: 15,
  },

  leftContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  rightContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },
  image: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
});
