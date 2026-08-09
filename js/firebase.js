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

    apiKey: "AIzaSyBFh1CIN7upch4eXlglUaC_F9rvhpD87gg",

    authDomain: "hotel-do-bau.firebaseapp.com",

    projectId: "hotel-do-bau",

    storageBucket: "hotel-do-bau.firebasestorage.app",

    messagingSenderId: "139452222353",

    appId: "1:139452222353:web:28c69b7a802ec4aa4c2830"

};


const app =
    initializeApp(firebaseConfig);


const db =
    getFirestore(app);


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
console.log("✅ Firebase Hotel carregado com sucesso");

window.firebasePronto = true;
