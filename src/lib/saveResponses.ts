import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase"; // ajusta la ruta si está en otro lugar

export const saveResponses = async (answers: (number | null)[]) => {
  try {
    await addDoc(collection(db, "responses"), {
      answers,
      timestamp: new Date()
    });
    console.log("Respuestas guardadas en Firestore");
  } catch (error) {
    console.error("Error al guardar respuestas:", error);
  }
};

