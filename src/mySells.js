import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView, ActivityIndicator, Dimensions } from 'react-native'

import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';

import firebase from 'firebase'
import { firebaseConfig } from './config';
//firebase.initializeApp(firebaseConfig)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

import * as  firebase1 from 'firebase';

import AuthContext from './context/authContext'
import UserContext from "./context/userContext";
import SellersContext from './context/sellersContext'

import { BarIndicator } from 'react-native-indicators';

var db = firebase1.default.firestore();

const windowWidth = Dimensions.get('window').width;
const mySellsScreen = () => {
    const { mySells, fetchAgain } = React.useContext(SellersContext)
    const [loading, setLoading] = React.useState(false)

    console.log(mySells)

    //console.log(`mysells = ${mySells}`)
    const deletefunc = (sid) => {
        setLoading(sid)
        db.collection("sellers").doc(sid).delete().then(() => {
            console.log("Document successfully deleted!");
            fetchAgain()
            setLoading(false)

        }).catch((error) => {
            console.error("Error removing document: ", error);
            setLoading(false)
        });


    }

    const [expandedItems, setExpandedItems] = useState("")

    const expand = (sid) => {

        if (sid == expandedItems) {
            setExpandedItems("")

        }
        else {
            setExpandedItems(sid)

        }
    }

    return <View style={styles.body}>

        {
            (mySells.length == 0) ?
                <Text style={{ color: "#939FAB" }}>no sells by you</Text>
                :

                <FlatList
                    scrollEnabled={true}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.sid}
                    data={mySells}
                    renderItem={({ item }) => {
                        console.log(item)
                        return <View style={[styles.outerview]}>
                            <View style={styles.row}>
                                <Text style={styles.name}>{item.name}</Text>
                                <View style={styles.pinexp}>
                                    <Text style={styles.marig}>{item.pin}</Text>
                                    <TouchableOpacity onPress={() => expand(item.sid)}>
                                        {(item.sid == expandedItems)
                                            ?
                                            <MaterialIcons name="expand-less" size={24} color="black" />
                                            :
                                            <MaterialIcons name="expand-more" size={24} color="black" />
                                        }
                                    </TouchableOpacity>
                                    {
                                        (loading == item.sid)
                                            ?
                                            <BarIndicator color='black' size={15} style={{ padding: 0, margin: 0 }} />
                                            :
                                            <TouchableOpacity onPress={() => deletefunc(item.sid)}><MaterialIcons name="delete" size={24} color="black" /></TouchableOpacity>
                                    }
                                </View>



                            </View>
                            <View style={{ display: (item.sid == expandedItems) ? "flex" : "none" }}>
                                <View style={styles.rowsimple}>
                                    <MaterialCommunityIcons name="bottle-soda-outline" size={20} color="black" style={{ marginRight: 10 }} />
                                    <Text>{item.quantity} cylinders</Text>
                                </View>
                                <View style={styles.rowsimple}>
                                    <Feather name="phone" size={20} color="black" style={{ marginRight: 10 }} />
                                    <Text>{item.phone}</Text>
                                </View>
                                <View style={styles.rowsimple}>
                                    <Entypo name="address" size={20} color="black" style={{ marginRight: 10 }} />
                                    <Text>{item.address}</Text>
                                </View>


                            </View>


                        </View>
                    }}


                />


        }


    </View>
}

const styles = StyleSheet.create({
    rowsimple: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10
    },
    pinexp: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center"

    },
    marig: {
        marginRight: 10

    },
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
        width: windowWidth * 0.9,
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
        marginTop: 20
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
        padding: 15,
        width: windowWidth * 0.9,
        borderRadius: 5,
        marginBottom: 30,
        borderColor: "#D2D5D8",
        borderStyle: "solid",
        borderWidth: 1.5

    }

})

export default mySellsScreen;