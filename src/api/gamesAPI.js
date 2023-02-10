
import { collection, query, where, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";


import { onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';




import { db, storage } from '../firebaseConfig';

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

    var promises = [];



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

            let promises = [];



            snapshot.docs.forEach((doc) => {

                const data = doc.data();


                //To find the max game id
                //This will be calculated and stored in maxId state for when adding a new game slot (id will be max+1)
                let max = 0;

                //Cover images
                const imageRef = ref(storage, 'covers/' + data.coverImage);

                const url = getDownloadURL(imageRef);

                //Create object
                const coverObj = { key: "cover image", name: data.coverImage, urlPromise: Promise.resolve(url), position: 1 };

                promises.push(Promise.resolve(url));

                //Screenshots
                const screenshots = data.screenshots;

                var arrayObjects = [coverObj];

                screenshots.forEach((screenshotMap) => {

                    const screenshot = screenshotMap.name;

                    const screenshotRef = ref(storage, 'screenshots/' + screenshot);

                    const screenshotUrl = getDownloadURL(screenshotRef);


                    promises.push(Promise.resolve(screenshotUrl));

                    const screenshotObj = { key: "screenshot" + screenshotMap.id, name: screenshotMap.name, urlPromise: Promise.resolve(screenshotUrl), position: screenshotMap.position };

                    arrayObjects.push(screenshotObj);


                });

                //Rom reference (note downloaded later)
                const romRef = ref(storage, 'roms/' + data.rom + '.bin');


                const screenshotMap = new Map();

                Promise.all(arrayObjects.map(obj => obj.urlPromise))
                    .then(resolvedPromises => {
                        arrayObjects.forEach((obj, index) => {
                            //Format of data:
                            //key, [fileName, imageURL, include, percent, position, mandatory]
                            screenshotMap.set(obj.key, [obj.name, resolvedPromises[index], true, 100, obj.position, obj.key === "cover image"]);
                        });
                    });

                   
                const newData = { ...data, "firebaseId": doc.id, "romRef": romRef, "images": screenshotMap };
 

                gamesData.push(newData);

            });
            Promise.all(promises)
  .then(() => {

    const finalData = gamesData.map((item) => {

        return {
            ...item, "imagesArray": Array.from(item.images).slice(1) 
        }

    } )

    console.log(finalData);
    setGames(finalData);
    setLoaded(true);
    console.log("loaded games");
  });

    },
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