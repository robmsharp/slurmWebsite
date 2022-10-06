import { db } from '../firebaseConfig';

import { collection, query, where, getDocs } from "firebase/firestore";


import { onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

const MessageContext = React.createContext({
    unreadMessages: 0,

});

export const MessageContextProvider = (props) => {
    const [unreadMessages, setUnreadMessages] = useState();

    useEffect(() => {
        const colRef = collection(db, 'messages');
        const snap = onSnapshot(colRef, (snapshot) => {
            //setUnreadMessages(snapshot.docs.length);
            //const q = query(collection(db, "messages"), where("beenRead", "==", false));

            //const querySnapshot = await getDocs(q);

            //setUnreadMessages(querySnapshot.length);

            var count =0;

            snapshot.docs.forEach((doc) => {

                const data = doc.data();

                if (data.beenRead === false) {
                    count+=1;
                };

                setUnreadMessages(count);
            });
        });

        }, []);

        return (
            <MessageContext.Provider
                value={{
                    unreadMessages: unreadMessages

                }}
            >
                {props.children}
            </MessageContext.Provider>
        );
    };

    export default MessageContext;