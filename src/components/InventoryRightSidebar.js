
import * as React from 'react';
import { TouchableOpacity, Image, Text, View, StyleSheet, TextInput, Animated, ScrollView } from 'react-native';
import ModalSearchField from '../components/modalSearchField';
import ModalTextField from '../components/modalTextField';
import ModalTextBox from '../components/modalTextBox';
import RegularButton from '../components/buttons/regularButton';
import { Picker } from '@react-native-picker/picker';
import { Row } from 'react-native-table-component';
import foodData from '../assets/foodData.json';
import MultiSelect from 'react-native-multiple-select'

class InventoryRightSidebar extends React.Component {

    constructor(props) {
        super(props);

        const item = {
            key: 123,
            name: "ADD NEW ITEM",
            quantity: 12.29,
            unit: 'Piece'
        }
        this.state = {
          isActive: this.props.isActive,
          translateX: new Animated.Value(0),
          mode: this.props.mode,
          item: item
        }
        this.renderChildComponent = this.renderChildComponent.bind(this);


      }
    
    handleSlide = (checkActive) => {
    let {isActive,translateX} = this.state;
    Animated.spring(translateX, {
        toValue: checkActive ? 0 : -420,
        duration: 20
    }).start(finished => {

          this.setState((prevState, props) => ({
            isActive: !prevState.isActive,
          }));
          console.log(this.state.isActive)
        
      });
    };

    cancelModal = () => {
        this.props.showInv()
        // TODO: When canceling, find way to reset placeholder text in add item mode without lag
        if(this.props.mode == 'Add'){
        this.props.handleMode("Details")
        }
    }

    renderChildComponent() {
        switch (this.props.mode) {
            case "Details":
                return <Details
                    item={this.props.item}
                    deleteInventoryItem={this.props.deleteInventoryItem}
                    editInventoryItem={this.props.editInventoryItem}
                />
            case "Edit":
                return <Edit
                    item={this.state.item} 
                    handleSaveButtonClick={this.handleSaveButtonClick}
                    handleAddNewItemButtonClick={this.handleAddNewItemButtonClick}
                />
            case "Add":
                return <Add
                    item={this.props.item}
                    handleMode={this.props.handleMode}
                    addInventoryItem={this.props.addInventoryItem}
                    handleCancelButtonClick={this.handleCancelButtonClick}
                />
        }
    }


    render(){
        let {isActive,translateX,valueX} = this.state;
        return (
            <>
            <Animated.View style={[styles.animated,{transform:[{translateX}]}]}  >
            <View style={styles.orderModal}>  
            <TouchableOpacity style={styles.cancelButton} onPressIn={()=>this.cancelModal()} >
            <Image style={styles.cancel} source={require('../assets/icon/cancel.png')}/>
            </TouchableOpacity>
            <this.renderChildComponent />
            </View>
            </Animated.View>
            </>
        )
    }
}

export default InventoryRightSidebar;



const generateKey = (pre) => {
    return `${ pre }_${ new Date().getTime() }`;
}

// ADD ITEM COMPONENT 
class Add extends React.Component {

    constructor() {
        super();
        const item = {
            key: generateKey(""),
            name: "ADD NEW ITEM",
            quantity: 12.29,
            unit: 'Piece'
        }

        this.state = {
            item: item,
            results: []
        }
    }

    handleSearch = (text) => {
        const filter = (a, f) => {
            let keys = Object.keys(f)
            if(keys.length == 1) {
              return a.filter(x => x[keys[0]].toLowerCase().includes(f[keys[0]].toLowerCase()))
            } else return a.filter(x => Object.values(f).every(fv => {
              return Object.values(x).some(v => v.toLowerCase().includes(fv.toLowerCase()))
            }))
          }
          
        let arr = filter(foodData, {name:text})

        let newArr = arr.sort((a,b) => (a.name.length > b.name.length) ? 1 : -1 )


        this.setState(state => {
            const limit = newArr.filter((val,i)=>i<10)
            console.log(limit)
            return {
                results: limit,
            };
        });
        
    }

    render() {
        return (
            <ScrollView style={{ height: '100%' }}>
                <View style={styles.modalHeader}>
            <Text style={styles.titleText}>Add Inventory Item</Text> 
            <View style={styles.saveButton}>
            <RegularButton text={"Save"} action={this.props.addInventoryItem.bind(this, this.state.item)} />
            </View>
            </View>
            <MultiSelect
                items={this.state.results}
                uniqueKey="name"
                ref={(component) => { this.multiSelect = component }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={this.state.selectedItems}
                selectText="Pick Ingredients"
                searchInputPlaceholderText="Search Ingredients..."
                onChangeInput={(text) => this.handleSearch(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="#CCC"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#CCC"
                submitButtonText="Submit"
                styleMainWrapper={{ marginTop: 7 }}
                styleTextDropdown={{ fontFamily: 'System', padding: 8 }}
                styleDropdownMenuSubsection={{ height: 40, borderRadius: 5, borderWidth: 1, borderColor: '#d6d6d6' }}
                styleRowList={{ height: 40 }}
                itemFontSize={13}
                styleListContainer={{ marginTop: 20 }}
                searchInputStyle={{ height: 40 }}
                single={true}
              />
            <ModalTextField placeholder={"Add Quantity"}  onChangeText={(text) => this.state.item.quantity = text}/>
            <View>
            <Picker
                            selectedValue={this.value}
                            style={styles.pickerStyle}
                            onValueChange={value =>{
                                if (value != "0")
                                this.state.item.unit = value}}>
                            <Picker.Item label="Choose Unit" value="0" />
                            <Picker.Item label="Piece" value="Piece" />
                            <Picker.Item label="Gram" value="Gram" />
                            <Picker.Item label="Ounce" value="Ounce" />
                            <Picker.Item label="Liter" value="Liter" />
                        </Picker>
            </View>
            </ScrollView >
        )
    }
}

// DETAILS VIEW COMPONENT 
class Details extends React.Component {

    constructor() {
        super();
        const item = {
            key: generateKey(""),
            name: "ADD NEW ITEM",
            quantity: 12,
            unit: 'Piece'
        }

        this.state = {
            item: item
        }
    }

    render() {
        return (
            <ScrollView style={{ height: '100%' }}>
                <View style={styles.modalHeader}>
            <Text style={styles.titleText}>Details</Text> 
            </View>
            <ModalTextBox title={'Name'} subtitle={this.props.item.name} />
            <ModalTextBox title={'Quantity'} subtitle={`${this.props.item.quantity} ${this.props.item.unit}`} />
            <ModalTextBox title={'Date Added'} subtitle={'TBA'} />
            </ScrollView >
        )
    }
}

// EDIT ITEM COMPONENT 
class Edit extends React.Component {

    constructor(props) {
        super(props);
        // const item = {
        //     key: this.props.item.key,
        //     name: this.props.item.name,
        //     quantity: this.props.item.quantity,
        //     unit: this.props.item.unit
        // }
                const item = {
            key: '1234',
            name: 'Testeditname',
            quantity: 'testquantitiy',
            unit: 'testunitsss'
        }

        this.state = {
            item: item
        }
    }

    render() {
        return (
            <ScrollView style={{ height: '100%' }}>
            <View style={styles.modalHeader}>
                        <Text style={styles.titleText}>Edit Item</Text> 
                        </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.formTitle}>Name</Text>
                        <TextInput style={styles.formInput}
                            placeholder={'Add a name'}
                            onChangeText={(text) => this.state.item.name = text}
                            defaultValue={this.props.item.name}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.formTitle}>Unit</Text>
                        <Picker
                            selectedValue={this.state.language}
                            defaultValue={this.props.item.unit}
                            style={styles.formInput}
                            onValueChange={(itemValue, itemIndex) =>
                                this.state.item.unit = itemValue}>

                            <Picker.Item label="Piece" value="Piece" />
                            <Picker.Item label="Gram" value="Gram" />
                            <Picker.Item label="Ounce" value="Ounce" />
                            <Picker.Item label="Liter" value="Liter" />
                        </Picker>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.formTitle}>Quantity</Text>
                        <TextInput style={styles.formInput}
                            placeholder={'Edit Quantity'}
                            onChangeText={(text) => this.state.item.quantity = text}
                            defaultValue={this.props.item.quantity}
                        />
                    </View>
                    <View style={styles.detailsButtonContainer}>
                        <TouchableOpacity
                            onPress={()=>{this.props.handleSaveButtonClick(this.state.item)}}
                            style={styles.editButton}>
                            <Text style={styles.buttonText}>Save</Text>
                        </TouchableOpacity>
                    </View>
            </ScrollView >
        )
    }
}


const styles = StyleSheet.create({

    orderModal:{
        position:'absolute',
        backgroundColor: '#FFFFFF',
        width: '397px',
        height: '809px',
        top:'30',
        right:'13px',
        borderRadius:'10px',
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 10.68,
        
    },

    animated:{
        flex:1,
        position:'absolute',
        alignSelf:'center',
        top:'105px',
        right:'-423px',
        display:'block',
        // overflowX:'hidden'
    },

    titleText:{
        fontWeight:500,
        fontSize:'18px',
        alignSelf:'center',
    },

    pickerStyle: {
        padding: 8,
        fontSize: 15,
        color:'#8E8E93',
        textAlignVertical: 'top',
        borderColor: '#F5F5F5',
        borderTopColor:'#d9d9d9',
        height: '42px',
        width: '100%',
        backgroundColor: '#F5F5F5',
        textIndent: '19px',
    },

    modalHeader:{
        flexDirection: 'row',
        marginTop:'40px',
        marginBottom:'23px',
        justifyContent:'center'
        
    },

    saveButton: {
        position:"absolute",
        right:'10px',
        top:'-10px',
    },

    cancelButton:{
        borderRadius:'50%',
        position:"absolute",
        left:'23px',
        top:'36px',
        width:30,
        height:30,
        zIndex : 1,
    },

    cancel: {
        width:30,
        height:30,
        tintColor:'gray',
    }



})

