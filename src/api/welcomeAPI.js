
import { collection, query, where, getDocs, doc, setDoc, deleteDoc, updateDoc } from "firebase/firestore";


import { onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';


import { db, storage, auth } from '../firebaseConfig';

import { getStorage, ref, getDownloadURL, uploadBytesResumable} from "firebase/storage";
import { addDoc, serverTimestamp, Timestamp  } from "firebase/firestore";

const WelcomeContext = React.createContext({
    loaded: false,
    error: false,
    entries: null,
    numberOfEntries: 0,

});

export const WelcomeContextProvider = (props) => {

    const [entries, setEntries] = useState(null);
    const [numberOfEntries, setNumberOfEntries] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);

    //Create the welcome entry
    //Returns false if encounters an error, otherwise returns true
    const createEntry = async (question, answer) => {

        const data = { id: (numberOfEntries+1), question: question, answer: answer };

        try {
            const dbRef = collection(db, "welcome");


            addDoc(dbRef, data);


            return true;

        }

        catch (error) {
            console.log(error);
            return false;
        }

    }

    //Move the welcome entry
    //Returns false if encounters an error, otherwise returns true
    const moveEntry = async (firebaseIdSwap, idSwap, firebaseIdTarget, idTarget) => {

        const docRefSwap = doc(db, "welcome", firebaseIdSwap);

        const docRefTarget = doc(db, "welcome", firebaseIdTarget);

        updateDoc(docRefSwap, { id: idTarget }).then(() => {

        }).catch((e) => {
            console.log(e);
            return false;
        });

        updateDoc(docRefTarget, { id: idSwap }).then(() => {

        }).catch((e) => {
            console.log(e);
            return false;
        });

        return true;


    }

    //Update the welcome entry
    //Returns false if encounters an error, otherwise returns true
    const updateEntry = async (id, question, answer) => {

        const docRef = doc(db, "welcome", id);

        updateDoc(docRef, { question: question, answer: answer }).then(() => {

        }).catch((e) => {
            console.log(e);
            return false;
        });

        return true;

    }


    //Delete the welcome entry
    //Returns false if encounters an error, otherwise returns true
    const deleteEntry = async (id) => {

        const docRef = doc(db, "welcome", id);

        try {
            await deleteDoc(docRef);
            return true;
        }

        catch (error) {
            console.log(error);
            return false;
        }

    }



    //Keep track of blog data changes

    useEffect(() => {

        const colRef = collection(db, 'welcome');

        const snap = onSnapshot(colRef, (snapshot) => {


            var welcomeData = [];

            var maxId = 0;

            snapshot.docs.forEach((doc) => {

                welcomeData.push({ ...doc.data(), firebaseId: doc.id });
                maxId = Math.max(maxId, doc.data().id);

                const copy = welcomeData.slice();
                const sorter = (a, b) => {
                    return a['id'] - b['id'];
                };
                copy.sort(sorter);
                setNumberOfEntries(copy.length);
                setEntries(copy);
                setLoaded(true);

            })
        },
            error => {
                console.log(error);
                setError(true);
                setLoaded(true);
            }

        );
    }, []);


    return (
        <WelcomeContext.Provider
            value={{

                loaded: loaded,
                entries: entries,
                error: error,
                numberOfEntries: numberOfEntries,
                createEntry: createEntry,
                deleteEntry: deleteEntry,
                moveEntry: moveEntry,
                updateEntry: updateEntry
            }}
        >
            {props.children}
        </WelcomeContext.Provider>
    );
};

export default WelcomeContext;