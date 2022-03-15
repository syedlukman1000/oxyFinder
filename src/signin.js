import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native';

import { BarIndicator } from 'react-native-indicators';

import * as  firebase from 'firebase';

import AuthContext from './context/authContext'

const windowWidth = Dimensions.get('window').width;
const signin = (props) => {
    const [mail, onChangeText] = React.useState("");
    const [pass, onChangeNumber] = React.useState(null);

    const [loading, setLoading] = React.useState(false)

    const [err, setErr] = React.useState(null)

    const { signedIn } = useContext(AuthContext)


    const signinfunc = (email, password) => {
        setLoading(true)
        firebase.default.auth().signInWithEmailAndPassword(email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                signedIn(user)
                setErr(null)
                setLoading(false)

                /*props.navigation.navigate('main', {
                    screen: 'selling',
                    params: {
                        screen: 'sellers',
                        params: { uid: user.uid }
                    },
                })*/

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorMessage)
                console.log(error)
                setLoading(false)
                setErr(error.message)
                // ..
            });
    }

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
        <TouchableOpacity
            style={styles.link}
            onPress={() => props.navigation.navigate('Sign Up')}
        >
            <Text style={styles.link}>Don't have an account? signup instead</Text>
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
                        <BarIndicator color='white' size={20} style={{ padding: 0, margin: 0 }} />

                    </View>
                </TouchableOpacity>
                :
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => signinfunc(mail, pass)}
                >
                    <Text style={styles.insidebtn}>Sign In</Text>
                </TouchableOpacity>

        }


    </View>

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

export default signin;