import * as React from 'react';
import {
    TouchableOpacity, Image, Text, View, StyleSheet, TextInput, Animated, ScrollView,
    Switch, Dimensions
} from 'react-native';
import ModalTextField from '../../components/modalTextField';
import ModalTextFieldWithTitle from '../../components/modalTextFieldWithTitle';
import ModalTextBox from '../../components/modalTextBox';
import ModalMenuIngredient from '../../components/modalMenuItemAddIngredient';
import ModalItemListIngr from '../../components/modalItemListIngr';
import RegularButton from '../../components/buttons/regularButton';
import { Picker } from '@react-native-picker/picker';
import MultiSelectField from '../../components/MultiSelectField';
import * as DocumentPicker from 'expo-document-picker';
import foodData from '../../assets/foodData.json';
import MultiSelect from 'react-native-multiple-select';


const { width: windowWidth, height: windowHeight } = Dimensions.get("screen");


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
            item: item,
            image: this.props.item.image,
        }
        this.renderChildComponent = this.renderChildComponent.bind(this);
        this.pickDocument = this.pickDocument.bind(this);
        this.handleSaveButtonClick = this.handleSaveButtonClick.bind(this);
    }

    // Pick image from computer folder 
    pickDocument = async () => {
        const result = await DocumentPicker.getDocumentAsync({
            type: "image/*" // all images files
        });
        if (!result.cancelled) {
            this.setState({
                image: result,
            });
        } else {
            // Show error to user
        }
    }

    // Configure save button click 
    handleSaveButtonClick(editItem) {
        editItem.image = this.state.image
        this.props.updateMenuItem(editItem)
        this.props.handleMode("Details")
        this.state.image = null
    }

    handleSlide = (checkActive) => {
        let { isActive, translateX } = this.state;
        if (checkActive === true) {
            this.props.handleMode("Details")
        }
        Animated.spring(translateX, {
            toValue: checkActive ? 0 : -420,
            duration: 20
        }).start(finished => {
            this.setState((prevState, props) => ({
                isActive: !prevState.isActive,
            }));
        });
    };

    cancelModal = () => {
        this.props.showInv()
        // TODO: When canceling, find way to reset placeholder text in add item mode without lag
        if (this.props.mode == 'Add') {
            this.props.handleMode("Details")
        }
    }

    clearImage = () => {
        this.setState({
            image: null,
        });
    }

    renderChildComponent() {
        switch (this.props.mode) {
            case "Details":
                return <Details
                    item={this.props.item}
                    deleteInventoryItem={this.props.deleteInventoryItem}
                    editMenuItem={this.props.editMenuItem}
                />
            case "Edit":
                return <Edit
                    item={this.props.item}
                    image={this.state.image}
                    ingredients={this.props.inventories}
                    handleSaveButtonClick={this.handleSaveButtonClick}
                    handleAddNewItemButtonClick={this.handleAddNewItemButtonClick}
                    updateMenuItem={this.props.updateMenuItem}
                    handleMode={this.props.handleMode}
                    handleImagePicking={this.pickDocument}
                    clearImage={this.clearImage}
                />
            case "Add":
                return <Add
                    item={this.props.item}
                    image={this.state.image}
                    group={this.props.group}
                    ingredients={this.props.inventories}
                    handleMode={this.props.handleMode}
                    addMenuItem={this.props.addMenuItem}
                    handleCancelButtonClick={this.handleCancelButtonClick}
                    handleImagePicking={this.pickDocument}
                    clearImage={this.clearImage}
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
                            <Image style={styles.cancel} source={require('../../assets/icon/cancel.png')} />
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

    constructor(props) {
        super(props);
        const item = {
            key: generateKey(""),
            name: "Add Name",
            price: 0,
            description: ""
        }

        this.state = {
            item: item,
            selectedItems: [],
            addedIngredients: [],
            isVisible: false,
            results:[]
        }
        this.props.clearImage()
    }

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

    onSelectedItemsChange = selectedItems => {
        let ingredients = selectedItems.map((selectedIng) => {
            return foodData.filter((ing) => {
                return ing.name == selectedIng
            })[0]
        })
        this.setState({ selectedItems });
        //ADD INGREDIENT TO LIST IF IN selectedItems
        ingredients.map((ingr) => {
            var foundIndex = this.state.addedIngredients.findIndex(x => x.name == ingr.name);
            if (foundIndex === -1) {
                this.state.addedIngredients.push(ingr)
            }
        })
        //REMOVE INGREDIENT FROM LIST IF NOT FOUND IN selectedItems
        if (this.state.addedIngredients.length > 1) {
            this.state.addedIngredients.map((ingr) => {
                var foundIndex = ingredients.findIndex(x => x.name == ingr.name);
                if (foundIndex === -1) {
                    this.state.addedIngredients = this.state.addedIngredients.filter((item) => {
                        return item.name != ingr.name
                    })
                }
            })
        }
    };

    onQuantityInput = (input, item) => {
        var foundIndex = this.state.addedIngredients.findIndex(x => x.name == item.name);
        this.state.addedIngredients[foundIndex].quantity = input;
    }

    onUnitChange = (unit, item) => {
        var foundIndex = this.state.addedIngredients.findIndex(x => x.name == item.name);
        this.state.addedIngredients[foundIndex].unit = unit;
    }

    toggleSwitch = () => {
        this.setState(state => {
            return {
                isVisible: !state.isVisible
            };
        });
    }

    onSavePress = () => {
        let fullItem = this.state.item
        fullItem.image = this.props.image
        fullItem.ingredients = this.state.addedIngredients
        fullItem.isVisible = this.state.isVisible
        fullItem.group = this.props.group
        this.props.addMenuItem(this.state.item)
        this.props.handleMode("Details")
        this.props.clearImage()
    }

    render() {
        return (
            <ScrollView style={{height: '100%', paddingBottom: 200 }}   contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.modalHeader}>
                    <Text style={styles.titleText}>Add Menu Item</Text>
                    <View style={styles.saveButton}>
                        <RegularButton text={"Save"} action={() => this.onSavePress()} />
                    </View>
                </View>
                <View>
                    <Image
                        style={styles.detailsItemImage}
                        source={this.props.image}
                        onLoad={() => this.state.item.image = this.props.image} />
                    <Text onPress={this.props.handleImagePicking} style={styles.addImageButton}>Add Image</Text>
                </View>

                <ModalTextField placeholder={"Add Name"} onChangeText={(text) => this.state.item.name = text} />
                <ModalTextField placeholder={"Add price"} onChangeText={(text) => this.state.item.price = text} />

                <MultiSelectField
                    results={this.state.results}
                    items={this.props.ingredients}
                    item={this.props.item}
                    selectedItems={this.state.selectedItems}
                    isActive={this.state.isActive}
                    onSelected={this.onSelectedItemsChange}
                    onChangeInput={this.handleSearch}
                />

                <View>
                <Text style={{ padding: 8, fontWeight: '500', fontSize: 20}}>{(this.state.selectedItems.length == 0) ? "": "Ingredients"}</Text>
                    <View style={(this.state.selectedItems.length == 0) ? { display: 'none' } : { display: 'inline' }}>
                        <div>
                            {this.state.addedIngredients.map(item =>
                                <ModalMenuIngredient title={item.name} placeholder={"Add quantity"} onChangeText={text => this.onQuantityInput(text, item)} onUnitChange={value => this.onUnitChange(value, item)}/>
                            )}
                        </div>
                    </View>
                </View> 
               
                <View style={{marginTop: 8}}>
                    <View style={{padding: 8}}>
                    <Text style={{fontWeight: '500', fontSize: 20}}>Visibility</Text>
                    <Text style={{ color: '#646464' }}>If enabled the menu item will be visible to customers.</Text>
                    </View>
                    <View style={{
                         borderTop: '1px solid #d9d9d9', borderBottom: '1px solid #d9d9d9', height: 42,
                         alignItems: 'center',
                        padding: 16,
                        marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F5F5F5',
                    }}>
                        <Text>Visible </Text>
                        <Switch
                            trackColor={{ false: "white", true: "rgb(48, 209, 88)" }}
                            thumbColor={'white'}
                            onValueChange={() => this.toggleSwitch()}
                            value={this.state.isVisible}
                        />
                    </View>
                </View>

                <View style={{marginTop: 8}}>
                    <Text style={{fontWeight: '500', fontSize: 20, padding: 8}}>Description</Text>
                    <TextInput style={[styles.textBox, {borderTop: '1px solid #d9d9d9', borderBottom: '1px solid #d9d9d9'}]}
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
                <View>
                    <ModalItemListIngr title={'Ingredients'} array={this.props.item.ingredients} />
                </View>
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
            key: this.props.item.key,
            name: this.props.item.name,
            price: this.props.item.price,
            description: this.props.item.description,
            ingredients: this.props.item.ingredients,
            image: this.props.item.image,
            isVisible: this.props.item.isVisible

        }
        const initial = false

        this.state = {
            item: item,
            selectedItems: this.props.item.ingredients.map(ingr => ingr.name),
            isActive: initial,
            isVisActive: initial, 
            isVisible: false,
            results:[], 
            addedIngredients: [],

        }
    }


    onSelectedItemsChange = selectedItems => {
        let ingredients = selectedItems.map((selectedIng) => {
            return foodData.filter((ing) => {
                return ing.name == selectedIng
            })[0]
        })
        this.setState({ selectedItems });
        //ADD INGREDIENT TO LIST IF IN selectedItems
        ingredients.map((ingr) => {
            var foundIndex = this.state.addedIngredients.findIndex(x => x.name == ingr.name);
            if (foundIndex === -1) {
                this.state.addedIngredients.push(ingr)
            }
        })
        //REMOVE INGREDIENT FROM LIST IF NOT FOUND IN selectedItems
        if (this.state.addedIngredients.length > 1) {
            this.state.addedIngredients.map((ingr) => {
                var foundIndex = ingredients.findIndex(x => x.name == ingr.name);
                if (foundIndex === -1) {
                    this.state.addedIngredients = this.state.addedIngredients.filter((item) => {
                        return item.name != ingr.name
                    })
                }
            })
        }
    };

    onQuantityInput = (input, item) => {
        let newItem = {
            ...item,
            quantity: input
        }
        var foundIndex = this.state.item.ingredients.findIndex(x => x.id == newItem.id);
        this.state.item.ingredients[foundIndex] = newItem;
    }

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

    toggleSwitch = () => {

        //change rendered value from props mode to state
        this.setState(state => {
            return {
                isVisActive: true
            };
        });

        this.setState(state => {
            return {
                item: {
                    ...state.item,
                    isVisible: !state.item.isVisible
                }
            };
        });
    }

    onSavePress = () => {
        this.props.handleSaveButtonClick(this.state.item)
    }


    render() {
        let currentIngr
        if (this.state.isActive === false) {
            currentIngr = this.props.item.ingredients
        } else {
            currentIngr = this.state.item.ingredients
        }
        return (
            <ScrollView style={{height: '100%', paddingBottom: 200 }} contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.modalHeader}>
                    <Text style={styles.titleText}>Edit Item</Text>
                    <View style={styles.saveButton}>
                        <RegularButton text={"Save"} action={() => this.onSavePress()} />
                    </View>
                </View>
                <View>
                    <Image
                        style={styles.detailsItemImage}
                        source={this.props.image}
                    />
                    <Text onPress={this.props.handleImagePicking} style={styles.addImageButton}>Add Image</Text>
                </View>
                <ModalTextFieldWithTitle title={'Name'} placeholder={this.props.item.name} onChangeText={(text) => this.state.item.name = text} />
                <ModalTextFieldWithTitle title={'Price'} placeholder={this.props.item.price} onChangeText={(text) => this.state.item.price = text} />
                <ModalTextFieldWithTitle title={'Description'} placeholder={this.props.item.description} onChangeText={(text) => this.state.item.description = text} />
    

                <MultiSelectField
                    results={this.state.results}
                    items={this.props.ingredients}
                    item={this.props.item}
                    selectedItems={(this.state.isActive === false) ? this.props.item.ingredients.map(ingr => ingr.name) : this.state.selectedItems}
                    isActive={this.state.isActive}
                    onSelected={(item) => this.onSelectedItemsChange(item)}
                    onChangeInput={this.handleSearch}
                />
                <Text style={{ padding: 8, fontWeight: '500', fontSize: 20}}>Ingredients</Text>
                <View style={(this.state.selectedItems.length == 0) ? { display: 'none' } : { display: 'inline' }}>
                    <div>
                        {currentIngr.map(item =>
                            <ModalMenuIngredient title={item.name} unit={item.unit} quantity={item.quantity} onChangeText={text => this.onQuantityInput(text, item)} />
                        )}
                    </div>
                </View>

                <View style={{marginTop: 8}}>
                    <View style={{padding: 8}}>
                    <Text style={{fontWeight: '500', fontSize: 20}}>Visibility</Text>
                    <Text style={{ color: '#646464' }}>If enabled the menu item will be visible to customers.</Text>
                    </View>
                    <View style={{
                         borderTop: '1px solid #d9d9d9', borderBottom: '1px solid #d9d9d9', height: 42,
                         alignItems: 'center',
                        padding: 16,
                        marginTop: 8, flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F5F5F5',
                    }}>
                        <Text>Visible </Text>
                        <Switch
                            trackColor={{ false: "white", true: "rgb(48, 209, 88)" }}
                            thumbColor={'white'}
                            onValueChange={() => this.toggleSwitch()}
                            value={this.state.isVisActive ? this.state.item.isVisible : this.props.item.isVisible}
                        />
                    </View>
                </View>
                <View style={{marginTop: 8}}>
                    <Text style={{fontWeight: '500', fontSize: 20, padding: 8}}>Description</Text>
                    <TextInput style={[styles.textBox, {borderTop: '1px solid #d9d9d9', borderBottom: '1px solid #d9d9d9'}]}
                        multiline={true}
                        maxLength={100}
                        placeholder={'Add a description'}
                        onChangeText={(text) => this.state.item.description = text}
                        defaultValue={this.props.item.description}
                    />
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

    description: {
        height: 'auto', 
        borderTop: '1px solid #d9d9d9', 
        borderBottom: '1px solid #d9d9d9'

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
        textAlignVertical: 'center', 
    },

    textBoxText: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        textAlignVertical: 'center',
        top: '20%'
    },

    addImageButton: {
        alignSelf: 'center', 
        fontWeight: '500', 
        color: 'gray', 
        marginBottom: 8 

    }
})