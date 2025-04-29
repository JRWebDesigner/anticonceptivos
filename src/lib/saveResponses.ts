import { collection, addDoc } from "firebase/firestore";
import { db } from "./firebase";

export const saveResponses = async (answers: (number | null)[], userName: string, userAge: number) => {
  try {
    await addDoc(collection(db, "responses"), {
      answers,
      userName,
      userAge,
      timestamp: new Date()
    });
    console.log("Respuestas guardadas correctamente");
  } catch (error) {
    console.error("Error al guardar respuestas:", error);
  }
};
