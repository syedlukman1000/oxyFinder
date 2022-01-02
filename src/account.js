import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native'
import AuthContext from './context/authContext'

import * as  firebase from 'firebase';


const AccountScreen = (props) => {

    const { signedOut } = useContext(AuthContext)

    const [loading, setLoading] = React.useState(false)

    const [err, setErr] = React.useState(null)

    const signout = () => {
        setLoading(true)
        firebase.default.auth().signOut()
            .then((userCredential) => {
                signedOut()
                setErr(null)
                setLoading(false)
                //props.navigation.navigate('sign')
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

    return <View style={styles.body}>
        <Text>account screen</Text>
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
                    onPress={() => signout()}
                >
                    <Text style={styles.insidebtn}>Sign Out</Text>
                </TouchableOpacity>

        }

        <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('mySells')}
        >
            <Text style={styles.insidebtn}>My Sells</Text>
        </TouchableOpacity>
        <TouchableOpacity
            style={styles.button}
            onPress={() => props.navigation.navigate('myRequests')}
        >
            <Text style={styles.insidebtn}>My Requests</Text>
        </TouchableOpacity>

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

export default AccountScreen;