const admin = require("firebase-admin");

const serviceAccount = requiere("./firebase-keys.json");

try {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
} catch (err) {
  console.log(err);
}

export const firestore = admin.firestore();
