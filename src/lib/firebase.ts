import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrX1G5gL90Kb5dOFvpqS0SmhTp1Pqa1Ds",
  authDomain: "datos-cuestionario.firebaseapp.com",
  projectId: "datos-cuestionario",
  storageBucket: "datos-cuestionario.firebasestorage.app",
  messagingSenderId: "504898457030",
  appId: "1:504898457030:web:e75b8dc73ecedb58b1f6c7"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

