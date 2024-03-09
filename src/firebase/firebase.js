import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, FacebookAuthProvider } from 'firebase/auth';
import { getFirestore, collection, doc, addDoc, setDoc, query, getDocs, orderBy, deleteDoc } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAkkVy0stmZ5GPpi1AIUGoFnd1wIDHJH70",
  authDomain: "admrt-com.firebaseapp.com",
  projectId: "admrt-com",
  storageBucket: "admrt-com.appspot.com",
  messagingSenderId: "12110099340",
  appId: "1:12110099340:web:2b97eefd06159d92eadca9",
  measurementId: "G-0SXGS2RHVJ"
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
const portfolioCollection = collection(db, "portfolio");
const messageCollection = collection(db, 'messages');

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
  requestCollection,
  portfolioCollection,
  messageCollection,
};

export async function savePortfolioFirebase(userId, portfolioId, userData) {
  try {
    if (!userData.startDate) {
      throw new Error("startDate field is required");
    }

    const portfolioRef = doc(portfolioCollection, userId, 'portfolios', portfolioId);
    await setDoc(portfolioRef, userData, { merge: true });
    console.log("Portfolio data saved successfully");
  } catch (error) {
    console.error("Error saving portfolio data:", error);
    throw error;
  }
}

export async function deleteMessageFromFirebase(senderId, receiverId) {
  try {
    const documentPath = `messages/${senderId}/${receiverId}`;
    await deleteDoc(doc(db, documentPath));
  } catch (error) {
    console.error("Error deleting message:", error);
    throw error;
  }
}

export async function saveMessageToFirebase(senderId, receiverId, message) {
  try {
      const messagesCollectionRef = collection(db, `messages/${senderId}/${receiverId}`);
      await addDoc(messagesCollectionRef, { senderId, receiverId, message, timestamp: new Date(), seen: false });
  } catch (error) {
      console.error('Error sending message:', error);
      throw error;
  }
}

export async function getMessagesFromFirebase(senderId, receiverId) {
  try {
      const messagesCollectionRef = collection(db, `messages/${senderId}/${receiverId}`);
      const q = query(messagesCollectionRef, orderBy('timestamp'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
      console.error('Error getting messages:', error);
      throw error;
  }
}

export async function saveUserDataToFirebase(userId, userData) {
  try {
    const userRef = doc(db, 'users', userId);
    await setDoc(userRef, userData, { merge: true });
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
  } catch (error) {
    console.error('Error saving feedback data:', error);
    throw error;
  }
}

export async function deletePortfolioFirebase(userId, portfolioId) {
  try {
    const portfolioRef = doc(portfolioCollection, userId, 'portfolios', portfolioId);
    await deleteDoc(portfolioRef);
  } catch (error) {
    console.error("Error deleting portfolio:", error);
    throw error;
  }
}