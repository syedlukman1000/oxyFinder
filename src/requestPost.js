import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native'

import * as  firebase1 from 'firebase';

import RequestsContext from './context/requestsContext'

import firebase from 'firebase'
import { firebaseConfig } from './config';
//firebase.initializeApp(firebaseConfig)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

import AuthContext from './context/authContext'




var db = firebase1.default.firestore();

const requestScreen = (props) => {
    const { user } = React.useContext(AuthContext)
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [address, setAddress] = useState('');
    const [pin, setPin] = useState('');
    const [phone, setPhone] = useState('');

    const { fetchRequestsAgain } = useContext(RequestsContext)

    const requestfunc = (name, quantity, address, pin, phone) => {
        db.collection("requests").add({
            name: name,
            quantity: quantity,
            address: address,
            pin: pin,
            phone: phone,
            uuid: user.uid
        })
            .then((docRef) => {
                console.log("Document written with ID: ", docRef.id);
                fetchRequestsAgain()
                props.navigation.navigate('requests')


            })
            .catch((error) => {
                console.error("Error adding document: ", error);
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

        <TouchableOpacity
            style={styles.button}
            onPress={() => requestfunc(name, quantity, address, pin, phone)}
        >
            <Text style={styles.insidebtn}>Request</Text>
        </TouchableOpacity>

    </View>
}

const styles = StyleSheet.create({
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

export default requestScreen;
