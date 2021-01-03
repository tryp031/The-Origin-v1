const environment = process.env.NODE_ENV || "development";
let firebaseConfig = {};

if (environment === "production") {
  firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
  };
} else {
  firebaseConfig = {
    apiKey: "AIzaSyAyqRN5I7ECMxcnBNQX6neekmABStX2uns",
    authDomain: "the-origin-737fb.firebaseapp.com",
    projectId: "the-origin-737fb",
    storageBucket: "the-origin-737fb.appspot.com",
    messagingSenderId: "437552148405",
    appId: "1:437552148405:web:9427a898746cacced8b3fc",
    measurementId: "G-XP8QXRBXB7",
  };
}

export default firebaseConfig;
