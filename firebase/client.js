import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG);
!firebase.apps.length && firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const signInWithGoogle = () => {
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(googleProvider);
};

export const signInWithEmailAndPassword = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const signUpWithEmailAndPassword = (email, password, username) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(() => {
      firebase.auth().currentUser.updateProfile({ username });
    })
    .then(() => {
      firebase.db
        .collection("users")
        .doc(firebase.auth.currentUser.uid)
        .set({ username, role: "admin" });
    })
    .catch((error) => console.error("Error: ", error));
};

export const signOut = () => {
  return firebase.auth().signOut();
};

export const currentUser = () => {
  return firebase.auth().currentUser;
};

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user;

  return {
    avatar: photoURL,
    username: displayName || "Guest",
    email,
    uid,
    isSuccess: true,
    message: null,
  };
};

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null;

    onChange(normalizedUser);
  });
};

export default firebase;
