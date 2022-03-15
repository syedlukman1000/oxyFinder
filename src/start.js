import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';


const start = (props) => {

    return <View style={styles.body}>
        <View style={styles.upper}>
            <MaterialCommunityIcons name="gas-cylinder" size={100} color="white" />
            <Text style={[styles.title]}>oxyFinder</Text>
        </View>
        <View style={styles.buttons}>
            <TouchableOpacity onPress={() => props.navigation.navigate("Sign In")} style={styles.button1}><Text>Sign In</Text></TouchableOpacity>
            <TouchableOpacity onPress={() => props.navigation.navigate("Sign Up")} style={styles.button2}><Text>Sign Up</Text></TouchableOpacity>
        </View>
    </View>
}

const styles = StyleSheet.create({
    upper: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"

    },
    body: {
        backgroundColor: "black",
        flex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"

    },
    title: {
        color: "white",
        fontWeight: "700",
        fontSize: 25
    },
    button1: {
        backgroundColor: "white",
        color: "black",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginRight: 20

    },
    button2: {
        backgroundColor: "white",
        color: "black",
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 20,
        marginLeft: 20

    },
    buttons: {
        display: "flex",
        flexDirection: "row",
        marginBottom: 20

    }
}

)
export default start