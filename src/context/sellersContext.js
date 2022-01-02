import React from 'react'

const SellersContext = React.createContext()

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

export const SellersProvider = ({ children }) => {


    const [loadingSellers, setLoadingSellers] = React.useState(true)
    const { user } = React.useContext(AuthContext)
    const { userdata, fetchUser } = React.useContext(UserContext)
    const [mySells, setMySells] = React.useState([])
    const [dt, setdt] = React.useState([])


    React.useEffect(() => {

        db.collection("sellers").where("pin", "==", userdata.pin)
            .get()
            .then((querySnapshot) => {
                const data = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data())
                });
                if (data.length < 5) {
                    var p = userdata.pin
                    var ub = p.slice(0, 3) + "999"
                    var lb = p.slice(0, 3) + "000"
                    db.collection("sellers").where("pin", "<=", ub).where("pin", ">=", lb)
                        .get()
                        .then((querySnapshot) => {
                            var datad = []
                            querySnapshot.forEach((doc) => {
                                datad.push({ ...doc.data(), sid: doc.id })
                            });
                            setdt(datad)
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                }
                else {
                    setdt(data)
                }
                setLoadingSellers(false)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                setLoadingSellers(false)
            });



        db.collection("sellers").where("uuid", "==", userdata.uid)
            .get()
            .then((querySnapshot) => {
                const data1 = []
                querySnapshot.forEach((doc) => {
                    data1.push({ ...doc.data(), sid: doc.id })
                });
                setMySells(data1)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });


    }, [userdata])

    const fetchAgain = () => {
        setLoadingSellers(true)
        db.collection("sellers").where("pin", "==", userdata.pin)
            .get()
            .then((querySnapshot) => {
                const data = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data())
                });
                if (data.length < 5) {
                    var p = userdata.pin
                    var ub = p.slice(0, 3) + "999"
                    var lb = p.slice(0, 3) + "000"
                    db.collection("sellers").where("pin", "<=", ub).where("pin", ">=", lb)
                        .get()
                        .then((querySnapshot) => {
                            var datad = []
                            querySnapshot.forEach((doc) => {
                                datad.push({ ...doc.data(), sid: doc.id })
                            });
                            setdt(datad)
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                }
                else {
                    setdt(data)
                }
                setLoadingSellers(false)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                setLoadingSellers(false)

            });
        db.collection("sellers").where("uuid", "==", userdata.uid)
            .get()
            .then((querySnapshot) => {
                const data1 = []
                querySnapshot.forEach((doc) => {
                    data1.push({ ...doc.data(), sid: doc.id })

                });
                setMySells(data1)

            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
            });

    }

    const fetchPin = (pin) => {
        setLoadingSellers(true)
        db.collection("sellers").where("pin", "==", pin)
            .get()
            .then((querySnapshot) => {
                const data = []
                querySnapshot.forEach((doc) => {
                    data.push(doc.data())
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
                            setdt(datad)
                        })
                        .catch((error) => {
                            console.log("Error getting documents: ", error);
                        });
                }
                else {
                    setdt(data)
                }
                setLoadingSellers(false)
            })
            .catch((error) => {
                console.log("Error getting documents: ", error);
                setLoadingSellers(false)
            });

    }


    return <SellersContext.Provider value={{ dt: dt, mySells, loadingSellers, fetchAgain, fetchPin }}>
        {children}
    </SellersContext.Provider>
}

export default SellersContext