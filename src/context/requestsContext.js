import React from 'react'

const RequestsContext = React.createContext()

import UserContext from "./userContext";


import * as  firebase1 from 'firebase';

import firebase from 'firebase'
import { firebaseConfig } from './../config';
import AuthContext from './authContext';
//firebase.initializeApp(firebaseConfig)
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app(); // if already initialized, use that one
}


var db = firebase1.default.firestore();

export const RequestsProvider = ({ children }) => {

    const [loadingRequests, setLoadingRequests] = React.useState(true)
    const { user } = React.useContext(AuthContext)
    const { userdata, fetchUser } = React.useContext(UserContext)

    const [requestsData, setRequestsData] = React.useState([])
    const [myRequests, setMyRequests] = React.useState([])


    React.useEffect(() => {

        db.collection("requests").where("pin", "==", userdata.pin)
            .get()
            .then((querySnapshot) => {
                const data = []
                querySnapshot.forEach((doc) => {
                    data.push({ ...doc.data(), rid: doc.id })
                });
                if (data.length < 5) {
                    var p = userdata.pin
                    var ub = p.slice(0, 3) + "999"
                    var lb = p.slice(0, 3) + "000"
                    db.collection("requests").where("pin", "<=", ub).where("pin", ">=", lb)
                        .get()
                        .then((querySnapshot) => {
                            var datad = []
                            querySnapshot.forEach((doc) => {
                                datad.push({ ...doc.data(), rid: doc.id })
                            });
                            setRequestsData(datad)
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                }
                else {
                    setRequestsData(data)
                }
                setLoadingRequests(false)

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                setLoadingRequests(false)
            });


        db.collection("requests").where("uuid", "==", userdata.uid)
            .get()
            .then((querySnapshot) => {
                const data1 = []
                querySnapshot.forEach((doc) => {
                    data1.push({ ...doc.data(), rid: doc.id })
                    console.log(doc.id)

                });
                setMyRequests(data1)

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    }, [userdata])

    const fetchRequestsAgain = () => {
        setLoadingRequests(true)
        db.collection("requests").where("pin", "==", userdata.pin)
            .get()
            .then((querySnapshot) => {
                const data = []
                querySnapshot.forEach((doc) => {
                    data.push({ ...doc.data(), rid: doc.id })
                });
                if (data.length < 5) {
                    var p = userdata.pin
                    var ub = p.slice(0, 3) + "999"
                    var lb = p.slice(0, 3) + "000"
                    db.collection("requests").where("pin", "<=", ub).where("pin", ">=", lb)
                        .get()
                        .then((querySnapshot) => {
                            var datad = []
                            querySnapshot.forEach((doc) => {
                                datad.push({ ...doc.data(), rid: doc.id })
                            });
                            setRequestsData(datad)
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                }
                else {
                    setRequestsData(data)
                }
                setLoadingRequests(false)

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                setLoadingRequests(false)
            });
        db.collection("requests").where("uuid", "==", userdata.uid)
            .get()
            .then((querySnapshot) => {
                const data1 = []
                querySnapshot.forEach((doc) => {
                    data1.push({ ...doc.data(), rid: doc.id })
                    console.log(doc.id)

                });
                setMyRequests(data1)

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    }


    const fetchPin = (pin) => {
        setLoadingRequests(true)
        db.collection("requests").where("pin", "==", pin)
            .get()
            .then((querySnapshot) => {
                const data = []
                querySnapshot.forEach((doc) => {
                    data.push({ ...doc.data(), rid: doc.id })
                });
                if (data.length < 5) {
                    var p = pin
                    var ub = p.slice(0, 3) + "999"
                    var lb = p.slice(0, 3) + "000"
                    db.collection("sellers").where("pin", "<=", ub).where("pin", ">=", lb)
                        .get()
                        .then((querySnapshot) => {
                            var datad = []
                            querySnapshot.forEach((doc) => {
                                datad.push({ ...doc.data(), sid: doc.id })
                            });
                            setRequestsData(datad)
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                }
                else {
                    setRequestsData(data)
                }
                setLoadingRequests(false)

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                setLoadingRequests(false)
            });

    }




    return <RequestsContext.Provider value={{ requestsData, myRequests, fetchRequestsAgain, fetchPin, loadingRequests }}>
        {children}
    </RequestsContext.Provider>
}

export default RequestsContext