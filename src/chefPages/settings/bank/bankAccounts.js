import React from "react";
import { StatusBar, View, Image, Text, FlatList, TouchableOpacity, ScrollView, StyleSheet } from "react-native";

import CardAlert from '../../../components/addCardAlert'
import firebase from '../../../firebase/Firebase';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

import ReactPlaceholder from 'react-placeholder';



// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51HL8h8LjpR7kl7iGeWLOW7OGQw2qAix0ToeOkzAgOUceEiOUDsGDmuDI1tQyNWSkOiQvdwOxFBpQEw4rBoDuI3Dc00i6Fa8VWD');

import "firebase/firestore";

var db = firebase.firestore();
const ref = db.collection('chefs')


const FlatListItemSeparator = () => {
    return <View style={{ backgroundColor: '#EEEEEE', height: 1 }} />

}

const Item = ({ account }) => (
    <View style={styles.item}>
        <View style={{ flexDirection: 'row' }}>

            <ReactPlaceholder showLoadingAnimation={true} type='rect' ready={account.brand != null} style={{ width: 30, height: 30, alignSelf: 'center', borderRadius: 5 }}>
                {account.brand ? (
                    <Image style={styles.image} source={require(`../../../assets/icon/${account.brand.toLowerCase()}.png`)} />
                ) : (
                        <Image style={styles.image} source={require(`../../../assets/icon/unknown.png`)} />
                    )
                }

            </ReactPlaceholder>

            <ReactPlaceholder showLoadingAnimation={true} type='text' rows={1} ready={account.last4 != null} style={{
                width: 150, borderRadius: 5
            }} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <Text style={styles.cardNumber}>{"****"}{account.last4}</Text>
                        <View style={{ justifyContent: 'center', backgroundColor: '#E1E1E1', height: 20, width: 50, borderRadius: 5, marginLeft: 5 }}>
                            <Text style={{ fontWeight: '500', color: '#636161', alignSelf: 'center', fontSize: 12 }}>{account.currency ? (account.currency.toUpperCase()) : ('...')}</Text>
                        </View>
                        {
                            account.isDefault ? (
                                <View style={{ justifyContent: 'center', backgroundColor: '#D6ECFF', height: 20, width: 50, borderRadius: 5, marginLeft: 5 }}>
                                    <Text style={{ fontWeight: '500', color: '#0071D3', alignSelf: 'center', fontSize: 12 }}>Default</Text>
                                </View>
                            ) : (
                                    <View style={{ justifyContent: 'center', height: 20, width: 50, borderRadius: 5, marginLeft: 5 }}>
                                        <Text style={{ fontWeight: '500', color: '#0071D3', alignSelf: 'center', fontSize: 12 }}></Text>
                                    </View>
                                )
                        }
                    </View>
                    <TouchableOpacity>
                        <Image />
                    </TouchableOpacity>
                </View>
            </ReactPlaceholder>
        </View>
    </View>

);


class BankAccounts extends React.Component {

    constructor() {
        super();
        this.child = React.createRef();
        this.state = {
            userID: firebase.auth().currentUser.uid,
            accounts: [

            ],
            isAlertVisible: false,
        };
    }

    // Fetch bank accounts 
    componentDidMount() {
        let currentComponent = this;
        ref.doc(this.state.userID).collection("external_accounts").onSnapshot(function (querySnapshot) {
            currentComponent.setState({ accounts: [] })
            querySnapshot.forEach(function (doc) {
                const data = doc.data()
                if (data.brand === null) { return }
                let accounts = [...currentComponent.state.accounts];
                accounts.push(data)
                currentComponent.setState({
                    accounts: accounts,
                    hasData: true,
                });
            });
        });
    }

    showAlert = () => {
        this.setState({ isAlertVisible: !this.state.isAlertVisible })
    }

    cancelAlert = () => {
        this.setState({ isAlertVisible: !this.state.isAlertVisible })
    }


    render() {

        const renderItem = ({ item }) => (
            <Item account={item} />
        );
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.showAlert.bind(this)}
                    style={{
                        alignSelf: 'flex-end',
                        width: 60, height: 30, justifyContent: 'center', backgroundColor: 'white', borderRadius: 5, marginTop: 20, marginRight: 20,
                        shadowColor: "#000",
                        shadowColor: "#000",
                        shadowOpacity: 0.13,
                        shadowRadius: 10.68,
                        borderWidth: 1,
                        borderColor: 'rgb(239, 239, 239)'

                    }}>
                    <Text style={{ alignSelf: 'center', color: '#3c4257', fontWeight: '500' }}>Add</Text>
                </TouchableOpacity>
                <ScrollView>
                    <FlatList
                        style={styles.flatList}
                        data={this.state.accounts}
                        renderItem={renderItem}
                        ItemSeparatorComponent={FlatListItemSeparator}
                        keyExtractor={item => item.token}
                    />
                </ScrollView>
                <Elements stripe={stripePromise}>
                    <CardAlert
                        stripe={stripePromise}
                        isVisible={this.state.isAlertVisible}
                        cancelAction={this.cancelAlert.bind(this)}

                    />
                </Elements>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },

    flatList: {
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 20,
        marginTop: 40,
        shadowColor: "#000",
        shadowColor: "#000",
        shadowOpacity: 0.13,
        shadowRadius: 10.68,
    },

    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },

    title: {
        fontSize: 32,
    },

    image: {
        width: 30,
        height: 30,
        borderRadius: 2,
        marginRight: 16,
        alignSelf: 'center'
    }
});

export default BankAccounts;
