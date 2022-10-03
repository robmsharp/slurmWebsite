
import { initializeApp } from "firebase/app";
import { getFirestore} from 'firebase/firestore';
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getAuth} from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyD6UCHmhvzzWQu16oUIwX_QxSFY3Ylpkdw",
  authDomain: "slurm16-9621b.firebaseapp.com",
  databaseURL: "https://slurm16-9621b-default-rtdb.firebaseio.com",
  projectId: "slurm16-9621b",
  storageBucket: "slurm16-9621b.appspot.com",
  messagingSenderId: "1089297162853",
  appId: "1:1089297162853:web:c6b725900c7a48af795c8c"
};



const firebase = initializeApp(firebaseConfig);

const db = getFirestore(firebase);

const storage = getStorage();

const auth = getAuth(firebase);


export {db, storage, firebase, auth};