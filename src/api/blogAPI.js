
import { collection, query, where, getDocs, doc, setDoc, deleteDoc } from "firebase/firestore";


import { onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';


import { db, storage } from '../firebaseConfig';

import { getStorage, ref, getDownloadURL } from "firebase/storage";

const BlogContext = React.createContext({
    loaded: false,
    error: false,
    entries: null,
    totalPages: 1

});

export const BlogContextProvider = (props) => {

    const [entries, setEntries] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [totalPages, setTotalPages] = useState(1);


    //This determines how many blog entries shown per page
    const entriesPerPage = 1;

    //Create the blog entry
    //Returns false if encounters an error, otherwise returns true
    const createEntry = async (id) => {

        const docRef = doc(db, "blog", id);

        try {
            await deleteDoc(docRef);
            return true;
        }

        catch (error) {
            console.log(error);
            return false;
        }

    }


    //Delete the blog entry
    //Returns false if encounters an error, otherwise returns true
    const deleteEntry = async (id) => {

        const docRef = doc(db, "blog", id);

        try {
            await deleteDoc(docRef);
            return true;
        }

        catch (error) {
            console.log(error);
            return false;
        }

    }


    const publish = async (id) => {

        const data = { published: true }


        try {

            const docRef = doc(db, "blog", id);
            await setDoc(docRef, data, { merge: true });
            return true;
        }

        catch (error) {
            console.log(error);
            return false;
        }

    }


    const unpublish = async (id) => {

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

    //Keep track of blog data changes

    useEffect(() => {

        console.log("start");

        const colRef = collection(db, 'blog');

        const snap = onSnapshot(colRef, (snapshot) => {

            //Count the number of unread messages
            var count = 0;

            var blogData = [];
            var newBlogData = [];

            var promises = [];


            snapshot.docs.forEach((doc) => {

                console.log("snapping");

                const data = doc.data();


                console.log(data.title);

                let promiseIndices = []

                //Blog images
                const imageRef = ref(storage, 'blogImages/' + data.image);

                const url = getDownloadURL(imageRef);

                //Insert into promise array
                promises.push(url);

                blogData.push({...data, "id": doc.id});

            });

            Promise.all(promises)
                .then(resolvedPromises => {
                    blogData.map((blog, index) => {

                        let imageUrl = null;

                        imageUrl = resolvedPromises[index];

                        newBlogData.push({ ...blog, "imageUrl": imageUrl, "key": blog.datePosted.toDate() });

                    });


                    console.log("sorting");

                    // sort by date
                    const copy = newBlogData.slice();
                    const sorter = (a, b) => {
                        return (b["key"] - a["key"]);
                    };
                    const sorted = copy.sort(sorter);

                    var count = 1;
                    var pageIndex = 1;

                    //Paginate the data, must occur after sorting
                    const paginated = sorted.map((data) => {

                        if (count > entriesPerPage) {
                            count = 1;
                            pageIndex += 1;
                        };

                        count += 1;

                        return ({ ...data, "pageIndex": pageIndex });
                    });


                    console.log("snapping done");

                    setTotalPages(pageIndex);
                    setEntries(paginated);
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
        <BlogContext.Provider
            value={{

                loaded: loaded,
                entries: entries,
                totalPages: totalPages,
                error: error,
                createEntry: createEntry,
                deleteEntry: deleteEntry,
                publish: publish,
                unpublish: unpublish

            }}
        >
            {props.children}
        </BlogContext.Provider>
    );
};

export default BlogContext;