import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, Dimensions } from 'react-native'
import AuthContext from './context/authContext'

import { MaterialCommunityIcons } from '@expo/vector-icons';


import * as  firebase from 'firebase';

import { BarIndicator } from 'react-native-indicators';


const windowWidth = Dimensions.get('window').width;
const windowHeigth = Dimensions.get('window').height;


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
        <View style={{ height: windowHeigth * 0.5, justifyContent: "space-around" }}>
            <View style={styles.upper}>
                <MaterialCommunityIcons name="gas-cylinder" size={70} color="black" />
                <Text style={{ fontWeight: "700" }}>oxyFinder</Text>
            </View>

            <TouchableOpacity
                style={styles.applebutton}
                onPress={() => props.navigation.navigate('mySells')}
            >
                <Text style={styles.applebtn}>My Sells</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.applebutton}
                onPress={() => props.navigation.navigate('myRequests')}
            >
                <Text style={styles.applebtn}>My Requests</Text>
            </TouchableOpacity>



            {
                (loading) ?
                    <TouchableOpacity
                        style={styles.button}
                    >
                        <View style={styles.loading}>
                            <BarIndicator color='black' size={20} style={{ padding: 0, margin: 0 }} />

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
        </View>
        <Text style={{ color: "#939FAB", bottom: 0 }}>Made by Lukman and Chaitanya</Text>

    </View>
}

const styles = StyleSheet.create({
    applebutton: {
        color: "#5999DA",
        textAlign: "center"

    },
    applebtn: {
        color: "#5999DA",
        textAlign: "center",
        fontWeight: "600",
        fontSize: 15
    },
    upper: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"

    },
    loading: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'

    },
    body: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1
    },
    button: {
        backgroundColor: "transparent",
        color: "black",
        textAlign: "center",
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 1.5,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    insidebtn: {
        color: "black",
        textAlign: "center"
    }
})

export default AccountScreen;