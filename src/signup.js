import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';


import * as  firebase1 from 'firebase';

import firebase from 'firebase'
import { firebaseConfig } from './config';
//firebase.initializeApp(firebaseConfig)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

var db = firebase1.default.firestore();


const signup = (props) => {
    const [mail, onChangeText] = React.useState("");
    const [pass, onChangeNumber] = React.useState(null);
    const [pin, onChangepin] = React.useState("");

    const [loading, setLoading] = React.useState(false)

    const [err, setErr] = React.useState(null)

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();


    const signupfunc = (email, password) => {
        setLoading(true)
        firebase1.default.auth().createUserWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                db.collection("user").add({
                    uid: user.uid,
                    pin: pin
                })
                    .then((docRef) => {
                        console.log("Document written with ID: ", docRef.id);

                    })
                    .catch((error) => {
                        console.error("Error adding document: ", error);
                    });
                props.navigation.navigate('main', { uid: user.uid })
                console.log(user)

                setErr(null)
                setLoading(false)

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                setLoading(false)
                setErr(error.message)
                // ..
            });
    }

    if (!user) {
        return <View style={styles.body}>
            <Text style={styles.head}>Sign Up</Text>
            <TextInput
                style={styles.input1}
                onChangeText={onChangeText}
                value={mail}
                placeholder="email"
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangeNumber}
                value={pass}
                placeholder="password"
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                onChangeText={onChangepin}
                value={pin}
                placeholder="pincode"

            />
            <TouchableOpacity
                style={styles.link}
                onPress={() => props.navigation.navigate('sign')}
            >
                <Text style={styles.link}>Already have an account? signin instead</Text>
            </TouchableOpacity>

            {
                (err) ?
                    <Text style={styles.err}>{err}</Text>
                    :
                    null

            }
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
                        onPress={() => signupfunc(mail, pass)}
                    >
                        <Text style={styles.insidebtn}>Sign Up</Text>
                    </TouchableOpacity>

            }






        </View>
    }

    return <Text>welcome</Text>
}



const styles = StyleSheet.create({
    err: {
        color: 'red',
        padding: 10,
        textAlign: 'center'

    },
    loading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    head: {
        fontWeight: "normal",
        fontSize: 22
    },
    input1: {
        height: 50,
        margin: 12,
        borderWidth: 1,
        padding: 10,
        width: 330,
        borderRadius: 7,
        marginTop: 130,
        borderWidth: 2

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
    body: {
        flex: 1,
        marginTop: 40,

        alignItems: "center"

    },
    link: {
        color: "blue"
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
});

export default signup;