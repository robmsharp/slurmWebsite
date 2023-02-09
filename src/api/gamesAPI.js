
import { collection, query, where, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";


import { onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';




import {db, storage} from '../firebaseConfig';
  
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const GameContext = React.createContext({
    games: null,
    loaded: false,
    denied: false,
    maxId: 0,

});

export const GameContextProvider = (props) => {

    const [games, setGames] = useState(null);
    const [maxId, setMaxId] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const [denied, setDenied] = useState(false);

    var gamesData = [];
    var newGamesData = [];

    var promises=[];



    //Returns false if encounters an error, otherwise returns true
    const deleteGame = async (id) => {

        const docRef = doc(db, "games", id);

        try {
            await deleteDoc(docRef);
            return true;
        }

        catch (error) {
            console.log(error);
            return false;
        }

    }

    //Publish the game
    const publishGame = async (id) => {

        const data = { beenRead: true }

        const docRef = doc(db, "games", id);

        try {
            await setDoc(docRef, data, { merge: true });
            return true;
        }

        catch (error) {
            console.log(error);
            return false;
        }

    }

    //Unpublish game
    const unpublishGame = async (id) => {

        const data = { replied: true }

        const docRef = doc(db, "games", id);

        try {
            await setDoc(docRef, data, { merge: true });
            return true;
        }

        catch (error) {
            console.log(error);
            return false;
        }

    }

     //Update the game
     const editGame = async (data, id) => {


        const docRef = doc(db, "games", id);

        try {
            await setDoc(docRef, data, { merge: true });
            return true;
        }

        catch (error) {
            console.log(error);
            return false;
        }

    }

    //Keep track of game data changes

    useEffect(() => {


        const colRef = collection(db, 'games');

        const snap = onSnapshot(colRef, (snapshot) => {


            //Find the max id
            var max = 0;

            //For promises
            var promiseIndex = 0;

            snapshot.docs.forEach((doc) => {

                const data = doc.data();

                let promiseIndices = []

                //Cover images
                const imageRef = ref(storage, 'covers/' + data.coverImage);

                const url = getDownloadURL(imageRef);
                //Insert into array
                promises.splice(promiseIndex, 0, url);

                promiseIndices.push(promiseIndex);

                promiseIndex += 1;

                //Screenshots
                const screenshots = data.screenshots;

                screenshots.forEach((screenshotMap) => {

                    const screenshot = screenshotMap.name;

                    const screenshotRef = ref(storage, 'screenshots/' + screenshot);

                    const screenshotUrl = getDownloadURL(screenshotRef);
                    //Insert into array
                    promises.splice(promiseIndex, 0, screenshotUrl);

                    promiseIndices.push(promiseIndex);

                    promiseIndex += 1;

                })

                const romRef = ref(storage, 'roms/' + data.rom + '.bin');

                const newData = { ...data, "firebaseId": doc.id, "romRef": romRef, "promises": promiseIndices };

                gamesData.push(newData);

            });

            Promise.all(promises)
                .then(resolvedPromises => {
                    gamesData.map((game) => {

                        let screenshots = []
                        let imageUrl = null;

                        game.promises.map((promise, index) => {

                            if (index == 0) {

                                imageUrl = resolvedPromises[promise]

                            }

                            else {

                                screenshots.push({"id": index, "name": resolvedPromises[promise]});

                            }

                        })

                        newGamesData.push({ ...game, "imageUrl": imageUrl, "screenshots": screenshots })
                    });
                    console.log("the data:");
                    console.log(newGamesData);
                    setGames(newGamesData);
                    setLoaded(true);
                    console.log("loaded games");

                })},
                    error => {
                        console.log(error);
                        setDenied(true);
                        setLoaded(true);
                    });


        }, []);

        return (
            <GameContext.Provider
                value={{
                    games: games,
                    loaded: loaded,
                    denied: denied,
                    maxId: maxId

                }}
            >
                {props.children}
            </GameContext.Provider>
        );
    };

    export default GameContext;