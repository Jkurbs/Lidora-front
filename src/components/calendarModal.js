
import React, { Component } from 'react';
import { Text, View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AnimatedHideView from 'react-native-animated-hide-view';
const styles = StyleSheet.create({

    orderModal:{
        position:'absolute',
        backgroundColor: 'skyblue',
        width: '200px',
        height: '200px',
        top:'50',
        right:'13px',
        borderRadius:'5px'
    },

    animated:{
        flex:1,
        position:'absolute',
        alignSelf:'center',
        top:'60px',
        right:'10px',
    }



})




class CalendarModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
          showCalendar: this.props.show
        }
      }

    componentWillReceiveProps(){
        this.setState({showCalendar:this.props.show})
    }
  
    hideModal = () => {
        this.setState({ showCalendar: !this.state.showCalendar });
    }


    render(){
        return (
            <AnimatedHideView visible={this.props.show} style={styles.animated} >
            <View style={styles.orderModal}>           
            </View>
            </AnimatedHideView>
        )
    }
}

export default CalendarModal;