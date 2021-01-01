import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import MultiSelect from 'react-native-multiple-select';

class MultiSelectField extends Component {
    render() {
        return (
            <MultiSelect
            hideTags
            items={this.props.results}
            uniqueKey="name"
            displayKey="name"
            onSelectedItemsChange={(item) => this.props.onSelected(item)}
            selectedItems={this.props.selectedItems}
            selectText="Pick Ingredients"
            searchInputPlaceholderText="Search Ingredients..."
            onChangeInput={(text) => this.props.onChangeInput(text)}
            selectedItemTextColor="#CCC"
            selectedItemIconColor="#CCC"
            itemTextColor="#000"
            styleInputGroup={{padding:8, backgroundColor:'#F5F5F5', height: 42, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#d6d6d6' }}
            styleTextDropdown={{ padding:8, backgroundColor:'#F5F5F5', fontFamily: 'System', padding: 8 }}
            styleDropdownMenuSubsection={{ backgroundColor:'#F5F5F5', height: 42, borderTopWidth: 1, borderBottomWidth: 1, borderColor: '#d6d6d6' }}
            styleRowList={{ justifyContent: 'center', height: 42, borderBottomWidth: 1, borderColor: '#d6d6d6' }}
            styleTextDropdownSelected={{padding: 8}}
            
            itemFontSize={13}
            styleListContainer={{padding: 8}}
            searchInputStyle={{ height: 42, padding: 8}}
            ref={(component) => { this.multiSelect = component }}
        />
        )
    }
}

const styles = StyleSheet.create({
    formInput: {
        padding: 8,
        fontSize: 12,
        textAlignVertical: 'top',
        borderColor: '#d6d6d6',
        borderWidth: 1,
        borderRadius: 5,
        height: 33,
        width: 192,
        backgroundColor: 'white',
        textIndent: '25px',
    },

    searchIcon: {
        position: 'absolute',
        top: 9,
        left: 8,
        fontSize: 15,
        width: 15,
        height: 15,
        tintColor: 'gray',
        transform: 'scaleX(-1)'
    },
});

export default MultiSelectField;