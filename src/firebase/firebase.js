import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore, collection, doc, updateDoc, addDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyCVv3O4-gNnJQUApuNmQdc2bFF7-7yLlsU",
  authDomain: "admrt-416eb.firebaseapp.com",
  projectId: "admrt-416eb",
  storageBucket: "admrt-416eb.appspot.com",
  messagingSenderId: "495262239981",
  appId: "1:495262239981:web:21dd31d74bf9d1bad950e4",
  measurementId: "G-VDDNVTN6SM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();
const db = getFirestore(app);
const storage = getStorage(app);
const database = getDatabase(app);
const usersCollection = collection(db, 'users');
const usernameCollection = collection(db, 'username');
const requestCollection = collection(db, 'request');

export {
  auth,
  googleProvider,
  facebookProvider,
  usersCollection,
  usernameCollection,
  storage,
  db,
  app,
  database,
  requestCollection
};

export async function saveUserDataToFirebase(userId, userData) {
  try {
    const userRef = doc(db, 'users', userId);
    await updateDoc(userRef, userData, { merge: true });
    console.log('User data saved successfully!');
  } catch (error) {
    console.error('Error saving user data:', error);
    throw error;
  }
}

export async function saveFeedbackToFirebase(userId, feedbackData) {
  try {
    const feedbackCollectionRef = collection(db, 'feedback', userId);

    const docRef = await addDoc(feedbackCollectionRef, feedbackData);
    console.log('Feedback added with ID: ', docRef.id);

    console.log('Feedback data saved successfully!');
  } catch (error) {
    console.error('Error saving feedback data:', error);
    throw error;
  }
}