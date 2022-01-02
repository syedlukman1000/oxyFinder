import React from 'react'

const AuthContext = React.createContext();


import * as  firebase1 from 'firebase';

import firebase from 'firebase'
import { firebaseConfig } from './../config';
//firebase.initializeApp(firebaseConfig)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


export const AuthProvider = ({ children }) => {
    const [user, setUser] = React.useState({ uid: "" });
    const [initializing, setInitializing] = React.useState(true);


    function onAuthStateChanged(user) {
        if (!user) {
            setUser({ uid: "" });
        }
        else {
            setUser(user);
        }
        if (initializing) setInitializing(false);
    }
    React.useEffect(() => {
        const subscriber = firebase1.default.auth().onAuthStateChanged(onAuthStateChanged);
        return subscriber; // unsubscribe on unmount
    }, []);

    if (initializing) return null;

    const signedIn = (user) => {
        setUser(user);

    }
    const signedOut = () => {
        setUser({ uid: "" })
    }

    return <AuthContext.Provider value={{ user: user, signedIn, signedOut }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;