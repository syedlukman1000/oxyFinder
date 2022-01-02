import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, TextInput } from 'react-native'

import { useNavigation } from '@react-navigation/native'
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';



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


import SellersContext from './context/sellersContext'


var db = firebase1.default.firestore();

const sellersScreen = (props) => {

    const { user } = useContext(AuthContext)

    //const { pin } = useContext(UserContext)
    const [searchPin, setSearchPin] = useState('');
    console.log(searchPin)


    const { dt, loadingSellers, fetchPin, fetchAgain } = React.useContext(SellersContext)
    const { loadingUser } = React.useContext(UserContext)
    console.log(loadingSellers)
    console.log(loadingUser)
    console.log(dt)
    const nav = useNavigation();
    useEffect(() => {
        nav.setOptions({
            headerRight: () => <TouchableOpacity onPress={() => props.navigation.navigate('sell')} >
                <MaterialIcons name="post-add" size={24} color="black" />
            </TouchableOpacity>
        });
    })


    const fetch = (pin) => {
        fetchPin(pin)
        setSearchPin('')
    }
    return <View style={styles.body}>
        <View style={styles.uplayer}>
            <View style={styles.searchlayout}>
                <TextInput
                    value={searchPin}
                    onChangeText={setSearchPin}
                    autoCapitalize="none"
                    autoCorrect={false}
                    style={styles.input}
                    placeholder="Pincode"
                />
                <TouchableOpacity
                    style={styles.search}
                    onPress={() => fetch(searchPin)}
                >

                    <Text style={styles.insidebtn}>search</Text>

                </TouchableOpacity>
            </View>
            <TouchableOpacity

                onPress={() => fetchAgain()}
            >
                <FontAwesome name="refresh" size={24} color="black" />
            </TouchableOpacity>
        </View>
        {
            (loadingSellers || loadingUser) ?
                <ActivityIndicator size="large" style={styles.margintop} />
                :
                <FlatList
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.sid}
                    data={dt}
                    renderItem={({ item }) => {
                        return <View style={styles.outerview}>
                            <View style={styles.row}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text >{item.pin}</Text>
                            </View>


                        </View>
                    }}


                />
        }



    </View>
}

const styles = StyleSheet.create({
    searchlayout: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around"

    },
    search: {
        backgroundColor: "black",
        color: "white",
        textAlign: "center",
        paddingVertical: 8,
        paddingHorizontal: 8,
        height: 40,
        display: "flex",
        flexDirection: "row",
        alignItems: "center"

    },
    uplayer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: "space-between",
        width: 330,
        marginTop: 20,
        marginBottom: 20
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
        width: 200

    },
    row: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    body: {
        alignItems: "center",
        flex: 1,
        scrollEnabled: true
    },
    margintop: {
        marginTop: 30
    },
    flex: {
        flex: 1
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
        fontSize: 12
    },
    outerview: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',

        height: 50,
        padding: 20,
        width: 330,
        borderRadius: 7,
        marginBottom: 30,
        borderColor: "#D2D5D8",
        borderStyle: "solid",
        borderWidth: 2

    }

})

export default sellersScreen;