import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';

import { BarIndicator } from 'react-native-indicators';


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

var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})");

const windowWidth = Dimensions.get('window').width;
const signup = (props) => {
    const [mail, onChangeText] = React.useState("");
    const [pass, onChangeNumber] = React.useState(null);
    const [pin, onChangepin] = React.useState("");

    const [loading, setLoading] = React.useState(false)

    const [err, setErr] = React.useState(null)
    const [passErr, setPassErr] = React.useState(null)

    const [initializing, setInitializing] = useState(true);
    const [user, setUser] = useState();


    const signupfunc = (email, password) => {
        setErr(null)
        setPassErr(null)

        setLoading(true)
        if (strongRegex.test(password)) {
            setPassErr(null)
            firebase1.default.auth().createUserWithEmailAndPassword(email, password)

                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    db.collection("user").add({
                        email: email,
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
        else {
            setPassErr("password must contain a lowercase character[a-z], uppercase character[A-Z], digit[0-9], special character[!@#\$%\^&\*] and must be of length greater than 6")
            setLoading(false)
        }
    }

    if (!user) {
        return <View style={styles.body}>
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
                onPress={() => props.navigation.navigate('Sign In')}
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
                (passErr) ?
                    <Text style={styles.err}>{passErr}</Text>
                    :
                    null

            }
            {
                (loading) ?
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <View style={styles.loading}>
                            <BarIndicator color='white' size={20} style={{ padding: 0, margin: 0 }} />

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
        margin: 12,
        padding: 12,
        width: windowWidth * 0.9,
        borderColor: "#D2D5D8",
        borderStyle: "solid",
        borderWidth: 1.5,
        borderRadius: 5,

    },
    input: {
        margin: 12,
        padding: 12,
        width: windowWidth * 0.9,
        borderColor: "#D2D5D8",
        borderStyle: "solid",
        borderWidth: 1.5,
        borderRadius: 5,


    },
    body: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"

    },
    link: {
        color: "blue"
    },
    button: {
        backgroundColor: "black",
        color: "white",
        width: windowWidth * 0.9,
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