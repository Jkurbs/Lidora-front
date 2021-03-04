import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { Table, TableWrapper, Row, Cell } from "react-native-table-component";
import ActivityIndicator from "../components/activityIndicator";
import MainButton from "./buttons/mainButton";
import globalStyle from "../globalStyle";
import { useTheme } from "@react-navigation/native";
import { SimpleLineIcons } from "@expo/vector-icons";

import styled from "styled-components";
import Tooltip from "@material-ui/core/Tooltip";

import { makeStyles } from "@material-ui/core/styles";

const StyledTooltip = styled((props) => (
  <Tooltip
    classes={{ popper: props.className, tooltip: "tooltip" }}
    {...props}
  />
))`
  & .tooltip {
    background-color: white;
    color: #000;
    border: "1px solid #red";
  }
`;

const useStyles = makeStyles((theme) => ({
  arrow: {
    "&:before": {
      border: "1px solid #E6E8ED",
      borderRadius: "2px",
    },
    color: theme.palette.common.white,
  },
  tooltip: {
    border: "1px solid #E6E8ED",
    color: "#E6E8ED",
  },
}));

function TableView(props) {
  const { colors } = useTheme();
  let classes = useStyles();

  const imageElement = (data, index) => (
    <Image style={styles.image} source={data} />
  );

  const actionElement = (data, index) => {
    return (
      <TouchableOpacity
        style={[
          { alignSelf: "center", alignItems: "center", marginRight: 120 },
        ]}
      >
        <Tooltip
          style={{ backgroundColor: "red" }}
          arrow={true}
          classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
          placement="bottom"
          title={
            <View
              style={{
                flexDirection: "column",
                justifyContent: "space-around",
                height: 120,
                width: 120,
              }}
            >
              <Text>Actions</Text>

              <TouchableOpacity onPress={() => props.editAndDetailsAction()}>
                <Text>Edit</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.editAndDetailsAction()}>
                <Text>View item details</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => props.deleteAction()}>
                <Text>Delete item</Text>
              </TouchableOpacity>
            </View>
          }
          aria-label="add"
        >
          <View style={{ width: "auto" }}>
            <SimpleLineIcons
              name="options"
              size={18}
              color={colors.textTertiary}
            />
          </View>
        </Tooltip>
      </TouchableOpacity>
    );
  };

  const returnedData = (cellIndex, selectedIndex, cellData, rowData) => {
    if (cellIndex === 0) {
      return imageElement(rowData[0], selectedIndex);
    } else if (cellIndex === rowData.length - 1) {
      return actionElement(rowData, selectedIndex);
    } else {
      return cellData;
    }
  };

  if (props.hasData === null) {
    return (
      <ActivityIndicator
        size={"small"}
        animating={!props.hasData}
        color={"gray"}
      />
    );
  } else if (props.hasData === false) {
    return (
      <View
        style={{ position: "relative", justifyContent: "center", height: 400 }}
      >
        <View
          style={{
            alignSelf: "center",
            width: "30%",
            alignItems: "flex-start",
          }}
        >
          <Text style={{ color: colors.textPrimary, fontSize: 30 }}>
            Add your first item
          </Text>
          <Text
            style={{
              color: colors.textSecondary,
              fontSize: 15,
              marginBottom: 20,
            }}
          >
            Items are what you sell to customers.{" "}
          </Text>
          <MainButton
            text={"Add Item"}
            action={props.buttonAction}
            indicatorAnimating={false}
            hasLeftIcon={true}
          />
        </View>
      </View>
    );
  } else {
    if (props.hasImage === true) {
      return (
        <View style={[styles.container]}>
          <Table
            style={[styles.table, { backgroundColor: colors.bgSecondary }]}
            borderStyle={{}}
          >
            <Row
              data={props.tableHead}
              style={[styles.head]}
              textStyle={styles.headText}
            />
            {props.tableData.map((rowData, index) => (
              <TouchableOpacity
                onPress={props.didSelectCell.bind(this, rowData, index)}
              >
                <TableWrapper
                  key={index}
                  style={
                    index === 0
                      ? [
                          styles.rowWithCorner,
                          { borderColor: colors.borderPrimary },
                        ]
                      : [styles.row, { borderColor: colors.borderPrimary }]
                  }
                >
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={returnedData(cellIndex, index, cellData, rowData)}
                      textStyle={styles.text}
                    />
                  ))}
                </TableWrapper>
              </TouchableOpacity>
            ))}
          </Table>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <Table
            style={styles.table}
            borderStyle={{ borderColor: "transparent" }}
          >
            <Row
              onPress={leftAction}
              data={props.tableHead}
              style={styles.head}
              textStyle={styles.headText}
            />
            {props.tableData.map((rowData, index) => (
              <TouchableOpacity onPress={props.didSelectCell.bind(this, index)}>
                <TableWrapper key={index} style={styles.row}>
                  {rowData.map((cellData, cellIndex) => (
                    <Cell
                      key={cellIndex}
                      data={[
                        cellIndex === rowData.length - 1
                          ? actionElement(rowData, index)
                          : cellData,
                      ]}
                      textStyle={styles.text}
                    />
                  ))}
                </TableWrapper>
              </TouchableOpacity>
            ))}
          </Table>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30 },
  table: { width: "100%", position: "relative" },
  head: { height: 74, paddingLeft: 20, paddingRight: 20 },
  body: { height: 100, paddingLeft: 20, paddingRight: 20 },
  headText: { margin: 6, fontWeight: "600" },
  text: { margin: 6, marginTop: 16 },
  row: {
    height: 100,
    padding: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderBottomWidth: 0.5,
  },
  rowWithCorner: {
    height: 100,
    padding: 20,
    flexDirection: "row",
    borderWidth: 1,
    borderBottomWidth: 0.5,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  image: {
    borderRadius: 10,
    width: 60,
    height: 60,
    backgroundColor: "#E1E1E1",
  },
});

export default TableView;
