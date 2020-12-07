import * as React from 'react';
import {
    TouchableOpacity, Image, Text, View, StyleSheet, TextInput, Animated, ScrollView, SectionList,
    Switch
} from 'react-native';
import ModalTextField from '../components/modalTextField';
import ModalTextBox from '../components/modalTextBox';
import RegularButton from '../components/buttons/regularButton';
import { Picker } from '@react-native-picker/picker';
import foodData from '../assets/foodData.json';
import MultiSelect from 'react-native-multiple-select'


const DATA = [
    {
        "title": "Ingredients",
        "data": [
            {
                "name": "Banana",
                "quantity": 1,
                "unit": 'gram'
            },
            {
                "name": "Dates",
                "quantity": 1,
                "unit": 'gram'
            },
        ]
    },
]

const FlatListItemSeparator = () => {
    return (
        //Item Separator
        <View style={styles.listItemSeparatorStyle} />
    );
};


const Item = ({ name, quantity, unit }) => (
    <View>
        <View style={styles.item}>
            <Text style={styles.title}>{name}</Text>
            <Text style={styles.title}>{`${quantity}${unit}`}</Text>
        </View>
    </View>

);


class MenuRightSidebar extends React.Component {

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
        let { isActive, translateX } = this.state;
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
        if (this.props.mode == 'Add') {
            this.props.handleMode("Details")
        }
    }

    renderChildComponent() {
        console.log("THIS IS THE ITEM:", this.props.item.description)
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


    render() {
        let { isActive, translateX, valueX } = this.state;
        return (
            <>
                <Animated.View style={[styles.animated, { transform: [{ translateX }] }]}  >
                    <View style={styles.orderModal}>
                        <TouchableOpacity style={styles.cancelButton} onPressIn={() => this.cancelModal()} >
                            <Image style={styles.cancel} source={require('../assets/icon/cancel.png')} />
                        </TouchableOpacity>
                        <this.renderChildComponent />
                    </View>
                </Animated.View>
            </>
        )
    }
}

export default MenuRightSidebar;



const generateKey = (pre) => {
    return `${pre}_${new Date().getTime()}`;
}

// ADD ITEM COMPONENT 
class Add extends React.Component {

    constructor() {
        super();
        const item = {
            key: generateKey(""),
            name: "Pick Ingredient",
            quantity: 12.29,
            unit: 'Piece'
        }

        this.state = {
            item: item,
            results: []
        }
    }

    state = {
        selectedItems: []
    };



    handleSearch = (text) => {
        const filter = (a, f) => {
            let keys = Object.keys(f)
            if (keys.length == 1) {
                return a.filter(x => x[keys[0]].toLowerCase().includes(f[keys[0]].toLowerCase()))
            } else return a.filter(x => Object.values(f).every(fv => {
                return Object.values(x).some(v => v.toLowerCase().includes(fv.toLowerCase()))
            }))
        }

        let arr = filter(foodData, { name: text })

        let newArr = arr.sort((a, b) => (a.name.length > b.name.length) ? 1 : -1)


        this.setState(state => {
            const limit = newArr.filter((val, i) => i < 10)
            return {
                results: limit,
            };
        });

    }

    onSelectedItemsChange = selectedItem => {

        let ingredient = this.state.results.filter((ing) => {
            return ing.ID == selectedItem
        })
        this.setState(state => {
            return {
                item: ingredient[0]
            };
        });
        console.log(ingredient[0])
    };

    render() {
        console.log("SIDE BAR INVENTORIES: ", this.props.inventories)
        return (
            <ScrollView style={{ height: '100%' }}>
                <View style={styles.modalHeader}>
                    <Text style={styles.titleText}>Add Menu Item</Text>
                    <View style={styles.saveButton}>
                        <RegularButton text={"Save"} action={this.props.addInventoryItem.bind(this, this.state.item)} />
                    </View>
                </View>

                <View>

                    <Image
                        style={styles.detailsItemImage}
                        source={this.props.item.image}
                    // onLoad={() => this.state.item.image = this.props.image}
                    />


                </View>

                <ModalTextField placeholder={"Add Name"} onChangeText={(text) => this.state.item.quantity = text} />

                <ModalTextField placeholder={"Add price"} onChangeText={(text) => this.state.item.quantity = text} />

                <MultiSelect
                items={this.props.inventories}
                uniqueKey="name"
                ref={(component) => { this.multiSelect = component }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={this.state.selectedItems}
                selectText="Pick Ingredients"
                searchInputPlaceholderText="Search Ingredients..."
                onChangeInput={(text) => console.log(text)}
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
              />

                <View style={{}}>
                    <Text>Visibility</Text>
                    <Text style={{ color: '#646464' }}>If enabled the menu item will be visible to customers.</Text>
                    <View style={{
                        padding: 16,
                        marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F5F5F5',
                    }}>
                        <Text>Visible </Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                            ios_backgroundColor="#3e3e3e"
                        // onValueChange={toggleSwitch}
                        // value={isEnabled}
                        />

                    </View>
                </View>

                <View>
                    <Text>Description</Text>
                    <TextInput style={styles.textBox}
                        multiline={true}
                        maxLength={100}
                        placeholder={'Add a description'}
                        onChangeText={(text) => this.state.item.description = text}
                        defaultValue={""}
                    />
                </View>

            </ScrollView>
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
            <ScrollView style={{ height: '120%' }}>
                <View style={styles.modalHeader}>
                    <Text style={styles.titleText}>Details</Text>
                </View>
                <Image
                    style={styles.detailsItemImage}
                    source={this.props.item.image}
                />
                <ModalTextBox title={'Name'} subtitle={this.props.item.name} />
                <ModalTextBox title={'Price'} subtitle={`${'$'}${this.props.item.price}`} />

                <SectionList style={styles.sectionList}
                    ItemSeparatorComponent={FlatListItemSeparator}
                    renderItem={({ item, index, section }) =>
                        <Item name={item.name} quantity={item.quantity} unit={item.unit} />
                    }
                    renderSectionHeader={({ section: { title } }) => (
                        <Text style={styles.header}>{title}</Text>
                    )}
                    sections={[{title:'Ingredients',data:[{name:"cheese",quantity:4,unit:'Gram'}]}]}
                    keyExtractor={(item, index) => item + index}
                />
                <View style={styles.sectionList}>
                    <Text style={styles.header}>Description</Text>
                    <Text style={[styles.item, styles.description]}>{this.props.item.description}</Text>
                </View>
            </ScrollView >
        )
    }
}

// EDIT ITEM COMPONENT 
class Edit extends React.Component {

    constructor(props) {
        super(props);
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
            <ScrollView style={{ height: '120%' }}>
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
                        onPress={() => { this.props.handleSaveButtonClick(this.state.item) }}
                        style={styles.editButton}>
                        <Text style={styles.buttonText}>Save</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        )
    }
}


const styles = StyleSheet.create({

    orderModal: {
        position: 'absolute',
        backgroundColor: '#FFFFFF',
        width: '397px',
        height: '809px',
        top: '30',
        right: '13px',
        borderRadius: '5px',
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 10.68,

    },

    detailsItemImage: {
        width: 70,
        height: 70,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 16,
        backgroundColor: 'rgb(174,174,178)'
    },

    animated: {
        flex: 1,
        position: 'absolute',
        alignSelf: 'center',
        top: '105px',
        right: '-423px',
        display: 'block',
    },

    titleText: {
        fontWeight: 500,
        fontSize: '18px',
        alignSelf: 'center',
    },

    pickerStyle: {
        padding: 8,
        fontSize: 15,
        color: '#8E8E93',
        textAlignVertical: 'top',
        borderColor: '#F5F5F5',
        borderTopColor: '#d9d9d9',
        height: '42px',
        width: '100%',
        backgroundColor: '#F5F5F5',
        textIndent: '19px',
    },

    modalHeader: {
        flexDirection: 'row',
        marginTop: '40px',
        marginBottom: '23px',
        justifyContent: 'center',
        backgroundColor: 'white'
    },

    saveButton: {
        position: "absolute",
        right: '10px',
        top: '-10px',
    },

    cancelButton: {
        borderRadius: '50%',
        position: "absolute",
        left: '23px',
        top: '36px',
        width: 30,
        height: 30,
        zIndex: 1,
    },

    cancel: {
        width: 30,
        height: 30,
        tintColor: 'gray',
    },

    sectionList: {
        marginTop: 20,
    },

    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F5F5F5',
        height: 42,
        padding: 8
    },


    header: {
        fontSize: 16,
        fontWeight: '500',
        backgroundColor: "#fff",
        marginBottom: 10,
        padding: 8
    },
    title: {
        fontSize: 13,
        alignSelf: 'center'
    },

    listItemSeparatorStyle: {
        height: 0.5,
        width: '100%',
        backgroundColor: '#CECECE',
    },

    description: {
        height: 'auto'
    },

    formInput: {
        paddingLeft: 8,
        fontSize: 14,
        textAlignVertical: 'top',
        borderColor: '#d6d6d6',
        borderWidth: 1,
        borderRadius: 5,
        height: 40,
        backgroundColor: 'white'
    },


    textBox: {
        padding: 8,
        fontSize: 14,
        color: '#000000',
        height: '80px',
        width: '100%',
        backgroundColor: '#F5F5F5',
        textAlignVertical: 'center'
    },

    textBoxText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlignVertical: 'center',
        top: '20%'
    },
})

