import firebase from "firebase/compat"

// const firebaseConfig = {
//   apiKey: "AIzaSyBYU1eGzy5sycUaORgco62imxlXzzMlNwI",
//   authDomain: "netflix-5b946.firebaseapp.com",
//   projectId: "netflix-5b946",
//   storageBucket: "netflix-5b946.appspot.com",
//   messagingSenderId: "649515410380",
//   appId: "1:649515410380:web:135ee8455a13f47374b369",
//   measurementId: "G-HEJ98QETR9"
// };

//   firebase.initializeApp(firebaseConfig);
//   const storage = firebase.storage();

//   export default storage;
const firebaseConfig = {
    apiKey: "AIzaSyBdnQBEqEdUErM51b3jZNg2OUZYu9lCTxs",
    authDomain: "netflix-59bfe.firebaseapp.com",
    projectId: "netflix-59bfe",
    storageBucket: "netflix-59bfe.appspot.com",
    messagingSenderId: "1058791407893",
    appId: "1:1058791407893:web:37a8dd796e0b00878e691c",
    measurementId: "G-CETDBNQFRJ"
};

  firebase.initializeApp(firebaseConfig);
  const storage = firebase.storage();

  export default storage;