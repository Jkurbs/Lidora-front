import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated,Dimensions } from "react-native";
import { registerRootComponent } from "expo";

import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';

import firebase from '../../firebase/Firebase';
import "firebase/firestore";

import TableView from '../../components/tableView';
import HeaderBar from '../../components/headerBar';
import CalendarModal from '../../components/calendarModal';
import InventoryRightSidebar from '../../components/inventoryRightSidebar';



var db = firebase.firestore();
const ref = db.collection('chefs')

const getWidth = Dimensions.get('window').width;

class Test2 extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            tableHead: ['Image', 'Name', 'Price', 'Actions'],
            tableData: [],
            hasData: null,
            showCalendar:false,
            isInvModalActive:true,
            interpolateBar: this.animVal.interpolate({inputRange:[0,1],outputRange:[getWidth,getWidth-397]}),
            windowWidth:""
        }
    }
    
    animVal = new Animated.Value(0);
    
    animatedTransitionShrink = Animated.spring(this.animVal,{toValue:1})
    animatedTransitionGrow = Animated.spring(this.animVal,{toValue:0})
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
        let getWidth = ''
        window.addEventListener('resize', function() {
            // your custom logic
            getWidth = Dimensions.get('window').width;
            currentComponent.setState({
                interpolateBar: currentComponent.animVal.interpolate({inputRange:[0,1],outputRange:[getWidth,getWidth-397]})
            })
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

    showCalendarModal = () => {
        console.log("SHOWCALENDAR!")
        this.setState({ showCalendar: !this.state.showCalendar });
        console.log(this.state.showCalendar)
    }

    showInventoryModal = () => {
        this.setState({isInvModalActive: !this.state.isInvModalActive})
        this.child.current.handleSlide(this.state.isInvModalActive);
        if(this.state.isInvModalActive === true){
            this.animatedTransitionShrink.start();

        } else {
            this.animatedTransitionGrow.start();
        }
        
    }

    handleWidth = () => {
        let {isActive,translateX} = this.state;
        Animated.spring(translateX, {
            toValue: isActive ? -420 : 0,
            duration: 20
        }).start(finished => {
    
              this.setState((prevState, props) => ({
                isActive: !prevState.isActive,
              }));
              console.log(this.state.isActive)
            
          });
        };

    render() {
        return (
            <>
            <HeaderBar 
                title={"Menu"}
                subtitle={"11 Items"}
                search={""}
                isSearchEnabled={true}
                showCal={this.showCalendarModal.bind(this)}
                showInv={this.showInventoryModal.bind(this)}
            />
            <Animated.View style={{width: this.state.interpolateBar}}>
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
            </Animated.View>
            <CalendarModal
                show={this.state.showCalendar}
            />
            <InventoryRightSidebar 
                isActive={this.state.isInvModalActive}
                ref={this.child}
            />
            </>
        )
    }
}


export default registerRootComponent(Test2);

