import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';
import * as  firebase1 from 'firebase';

import firebase from 'firebase'
import { firebaseConfig } from './config';
//firebase.initializeApp(firebaseConfig)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


import AuthContext from './context/authContext'
import UserContext from "./context/userContext";


import RequestsContext from './context/requestsContext'


var db = firebase1.default.firestore();

const RequestsScreen = (props) => {

    const { user } = useContext(AuthContext)


    const { requestsData } = React.useContext(RequestsContext)
    console.log(`requests : ${requestsData}`)
    const nav = useNavigation();
    useEffect(() => {
        nav.setOptions({
            headerRight: () => <TouchableOpacity onPress={() => props.navigation.navigate('request')} >
                <MaterialIcons name="post-add" size={24} color="black" />
            </TouchableOpacity>
        });
    })



    return <View style={styles.body}>

        <FlatList
            scrollEnabled={true}
            showsVerticalScrollIndicator={false}
            keyExtractor={(item) => item.name}
            data={requestsData}
            renderItem={({ item }) => {
                return <View style={styles.outerview}>
                    <View style={styles.flex}>
                        <Text style={styles.name}>{item.name}</Text>
                        <View style={styles.innerview}>
                            <Text style={styles.quantity}>{item.quantity} cylinders</Text>
                            <Text style={styles.pin}>pin : {item.pin}</Text>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.button}><Text style={styles.insidebtn}>Contact</Text></TouchableOpacity>
                </View>
            }}


        />


    </View>
}

const styles = StyleSheet.create({
    body: {
        alignItems: "center",
        flex: 1
    },
    flex: {
        flex: 1
    },
    quantity: {
        fontSize: 10
    },
    pin: {
        fontSize: 10,
        marginRight: 100
    },
    name: {
        fontSize: 14,
        fontWeight: "bold"
    },
    button: {
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        paddingVertical: 8,
        paddingHorizontal: 8,
        borderRadius: 7
    },
    insidebtn: {
        color: "white",
        textAlign: "center",
        fontSize: 8
    },
    outerview: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 330,
        borderRadius: 7,
        marginBottom: 20,
        borderWidth: 2

    },
    innerview: {
        flexDirection: "row",
        justifyContent: "space-between"

    }

})

export default RequestsScreen;