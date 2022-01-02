import React from 'react'
import AuthContext from './authContext'

const UserContext = React.createContext();


import * as  firebase1 from 'firebase';

import firebase from 'firebase'
import { firebaseConfig } from './../config';
//firebase.initializeApp(firebaseConfig)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}

var db = firebase1.default.firestore();

export const UserProvider = ({ children }) => {
    const [userdata, setUserdata] = React.useState({ uid: "", pin: "" });

    const [loadingUser, setLoadingUser] = React.useState(true)

    const { user } = React.useContext(AuthContext)

    React.useEffect(() => {
        db.collection("user").where("uid", "==", user.uid)
            .get()
            .then((querySnapshot) => {

                querySnapshot.forEach((doc) => {
                    setUserdata(doc.data())
                });

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });
        setLoadingUser(false)


    }, [user])





    return <UserContext.Provider value={{ userdata, loadingUser }}>
        {children}
    </UserContext.Provider>
}

export default UserContext;