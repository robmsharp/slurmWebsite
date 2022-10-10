import { db } from '../firebaseConfig';

import { collection, query, where, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";


import { onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

const MessageContext = React.createContext({
    unreadMessages: 0,
    loaded: false,
    denied: false,
    messages: null,
    totalPages: 1

});

export const MessageContextProvider = (props) => {

    const [messages, setMessages] = useState(null);
    const [unreadMessages, setUnreadMessages] = useState();
    const [loaded, setLoaded] = useState(false);
    const [denied, setDenied] = useState(false);
    const [totalPages, setTotalPages] = useState(1);

    //This determines how many messages shown per page
    const messagesPerPage = 5;

    //Delete the message
    //Returns false if encounters an error, otherwise returns true
    const deleteMessage = async (id) => {

        const docRef = doc(db, "messages", id);

        try {
            await deleteDoc(docRef);
            return true;
        }

        catch (error) {
            console.log(error);
            return false;
        }

    }

    //Mark the message as read
    const markAsRead = async (id) => {

        const data = { beenRead: true }

        const docRef = doc(db, "messages", id);

        try {
            await setDoc(docRef, data, { merge: true });
            return true;
        }

        catch (error) {
            console.log(error);
            return false;
        }

    }

    //Mark the message as replied
    const markAsReplied = async (id) => {

        const data = { replied: true }

        const docRef = doc(db, "messages", id);

        try {
            await setDoc(docRef, data, { merge: true });
            return true;
        }

        catch (error) {
            console.log(error);
            return false;
        }

    }

    //Keep track of message data changes

    useEffect(() => {

        
            const colRef = collection(db, 'messages');
        
            const snap = onSnapshot(colRef, (snapshot) => {

                    //Count the number of unread messages
                    var count = 0;


                    snapshot.docs.forEach((doc) => {

                        const data = doc.data();

                        if (data.beenRead === false) {
                            count += 1;
                        };

                        setUnreadMessages(count);
                    });

                    //Set color of header
                    var messageData = [];

                    snapshot.docs.forEach((doc) => {

                        const data = doc.data();

                        var color = "palette.primary.main";

                        if (data.beenRead === true) {
                            color = "palette.background.paper";
                        }

                        messageData.push({ ...data, "color": color, "id": doc.id });

                    });

                    // sort by date
                    const copy = messageData.slice();
                    const sorter = (a, b) => {
                        return (b["dateSent"] - a["dateSent"]);
                    };

                    const sorted = copy.sort(sorter);

                    var count = 1;
                    var pageIndex = 1;

                    //Paginate the data, must occur after sorting
                    const paginated = sorted.map((data) => {
                        
                        if (count > messagesPerPage) {
                            count = 1;
                            pageIndex += 1;
                        };
                        count += 1;

                        return ({ ...data, "pageIndex": pageIndex });
                    });
                    setTotalPages(pageIndex);
                    setMessages(paginated);
                    setLoaded(true);

                

            }, 
            error => {
                console.log(error);
                setUnreadMessages(0);
                setDenied(true);
                setLoaded(true);
            });
        

    }, []);

    return (
        <MessageContext.Provider
            value={{
                unreadMessages: unreadMessages,
                loaded: loaded,
                denied: denied,
                messages: messages,
                totalPages: totalPages,
                deleteMessage: deleteMessage,
                markAsReplied: markAsReplied,
                markAsRead: markAsRead

            }}
        >
            {props.children}
        </MessageContext.Provider>
    );
};

export default MessageContext;