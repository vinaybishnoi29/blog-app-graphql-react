const firebase  = require('firebase/app');
const database = require('firebase/database');

// Your web app's Firebase configuration
const config = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

let firebaseCache: any;

const getFirebase = () => {
  if (firebaseCache) {
    return firebaseCache;
  }

  firebase.initializeApp(config);
  firebaseCache = firebase;
  return firebase;
};

export default getFirebase;

/**
 * <!-- The core Firebase JS SDK is always required and must be listed first -->
<script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js"></script>

<!-- TODO: Add SDKs for Firebase products that you want to use
     https://firebase.google.com/docs/web/setup#available-libraries -->

<script>
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyDfFuocL6loat_GtaKLvkyg0h02MBZ6k04",
    authDomain: "myblogapp-a665f.firebaseapp.com",
    databaseURL: "https://myblogapp-a665f.firebaseio.com",
    projectId: "myblogapp-a665f",
    storageBucket: "myblogapp-a665f.appspot.com",
    messagingSenderId: "984869668691",
    appId: "1:984869668691:web:62daf0672f19d2af06c3a6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
</script>
 */