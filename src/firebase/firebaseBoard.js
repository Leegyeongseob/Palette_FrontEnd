import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyDzABt3WNAvvx3VVWHg4mQgxWrTmB8vL-Q",
  authDomain: "boardimage-ff5d3.firebaseapp.com",
  projectId: "boardimage-ff5d3",
  storageBucket: "boardimage-ff5d3.appspot.com",
  messagingSenderId: "161480498928",
  appId: "1:161480498928:web:49d2108716facd817d6c35",
  measurementId: "G-53CQX7MD0L",
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { app, storage, ref, uploadBytesResumable, getDownloadURL };
