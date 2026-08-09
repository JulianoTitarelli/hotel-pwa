import { initializeApp }
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp
}
from "https://www.gstatic.com/firebasejs/12.11.0/firebase-firestore.js";


const firebaseConfig = {

    apiKey: "SUA_API_KEY",

    authDomain: "hotel-do-bau.firebaseapp.com",

    projectId: "hotel-do-bau",

    storageBucket: "hotel-do-bau.firebasestorage.app",

    messagingSenderId: "139452222353",

    appId: "SEU_APP_ID"

};


const app =
    initializeApp(firebaseConfig);


const db =
    getFirestore(app);


// Disponibiliza para os outros scripts

window.firebaseHotel = {

    db,
    collection,
    addDoc,
    deleteDoc,
    doc,
    onSnapshot,
    query,
    orderBy,
    serverTimestamp

};
