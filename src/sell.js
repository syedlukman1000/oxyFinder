

import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from 'react-native'

import * as  firebase1 from 'firebase';

import SellersContext from './context/sellersContext'
import AuthContext from './context/authContext'

import firebase from 'firebase'
import { firebaseConfig } from './config';
//firebase.initializeApp(firebaseConfig)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}






var db = firebase1.default.firestore();

const sellScreen = (props) => {
    const { user } = React.useContext(AuthContext)
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [address, setAddress] = useState('');
    const [pin, setPin] = useState('');
    const [phone, setPhone] = useState('');

    const [loading, setLoading] = React.useState(false)

    const { fetchAgain } = useContext(SellersContext)

    const sellfunc = (name, quantity, address, pin, phone) => {
        setLoading(true)
        db.collection("sellers").add({
            name: name,
            quantity: quantity,
            address: address,
            pin: pin,
            phone: phone,
            uuid: user.uid
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                fetchAgain()
                props.navigation.navigate('sellers')
                setLoading(false)


            })
            .catch((error) => {
                console.error("Error adding document: ", error);
                setLoading(false)

            });
    }
    return <View style={styles.body}>
        <TextInput
            value={name}
            onChangeText={setName}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
            placeholder="Name"
        />
        <TextInput
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
        />
        <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
        />
        <TextInput
            placeholder="Pin"
            value={pin}
            onChangeText={setPin}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
        />
        <TextInput
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            autoCapitalize="none"
            autoCorrect={false}
            style={styles.input}
        />
        {
            (loading) ?
                <TouchableOpacity
                    style={styles.button}
                >
                    <View style={styles.loading}>
                        <ActivityIndicator />

                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => sellfunc(name, quantity, address, pin, phone)}
                >
                    <Text style={styles.insidebtn}>Sell</Text>
                </TouchableOpacity>

        }


    </View>
}

const styles = StyleSheet.create({
    loading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    body: {
        alignItems: "center"
    },
    input: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 330,
        borderRadius: 7,
        marginBottom: 20,
        borderWidth: 2

    },
    button: {
        backgroundColor: "black",
        color: "white",
        width: 330,
        textAlign: "center",
        paddingVertical: 13,
        borderRadius: 7,
        marginTop: 20
    },
    insidebtn: {
        color: "white",
        textAlign: "center"
    }
})

export default sellScreen;
