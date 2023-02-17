
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};



const firebase = initializeApp(firebaseConfig);

const db = getFirestore(firebase);

const storage = getStorage();

const auth = getAuth(firebase);


export {db, storage, firebase, auth};
