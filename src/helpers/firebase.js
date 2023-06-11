// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB9mSUywItU9RFsZWDO_WhmdQI2AfWeebE",
    authDomain: "nova-app-32272.firebaseapp.com",
    projectId: "nova-app-32272",
    storageBucket: "nova-app-32272.appspot.com",
    messagingSenderId: "1033469953878",
    appId: "1:1033469953878:web:7210b5c1ce060fd34938f7",
    measurementId: "G-DEMV76N7L4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const perf = getPerformance(app);