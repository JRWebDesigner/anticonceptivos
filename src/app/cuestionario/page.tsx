"use client";
import { useState } from "react";
import { collection, addDoc, db } from "../firebase";

interface Answer {
  questionId: number;
  answer: string;
}

interface QuestionnaireData {
  age: string;
  gender: string;
  answers: Answer[];
  timestamp: Date;
}

export default function Questionnaire() {
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [completed, setCompleted] = useState(false);

  const questions = [
    {
      id: 1,
      text: "Los métodos anticonceptivos son:",
      options: [
        "a) Sustancias que impiden que nazca el bebé",
        "b) Sustancias y/o procedimientos que impiden el embarazo",
        "c) Sustancias que causan daño a la mujer",
        "d) Ninguna de las anteriores"
      ]
    },
    // Agrega todas las preguntas aquí...
    {
      id: 20,
      text: "La vasectomía es efectiva a partir de los:",
      options: [
        "a) 7 días",
        "b) 1 semana",
        "c) 2 semanas",
        "d) 3 meses",
        "e) 6 meses"
      ]
    }
  ];

  const handleAnswer = (option: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = {
      questionId: questions[currentQuestion].id,
      answer: option
    };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      submitQuestionnaire();
    }
  };

  const submitQuestionnaire = async () => {
    const data: QuestionnaireData = {
      age,
      gender,
      answers,
      timestamp: new Date()
    };

    try {
      await addDoc(collection(db, "responses"), data);
      setCompleted(true);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  if (completed) {
    return (
      <div className="text-center p-8 bg-green-100 rounded-lg">
        <h2 className="text-2xl font-bold mb-4">¡Gracias por completar el cuestionario!</h2>
        <p>Tus respuestas han sido registradas.</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Cuestionario sobre Métodos Anticonceptivos</h1>
      
      {currentQuestion === 0 ? (
        <div className="space-y-4">
          <div>
            <label className="block mb-2">EDAD:</label>
            <input
              type="text"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block mb-2">SEXO:</label>
            <div className="space-y-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Femenino"
                  checked={gender === "Femenino"}
                  onChange={() => setGender("Femenino")}
                  className="mr-2"
                />
                Femenino
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="Masculino"
                  checked={gender === "Masculino"}
                  onChange={() => setGender("Masculino")}
                  className="mr-2"
                />
                Masculino
              </label>
            </div>
          </div>
          <button
            onClick={() => setCurrentQuestion(1)}
            disabled={!age || !gender}
            className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
          >
            Comenzar cuestionario
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-indigo-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold">
              Pregunta {currentQuestion} de {questions.length}
            </h2>
            <p className="text-xl mt-2">{questions[currentQuestion - 1].text}</p>
          </div>
          
          <div className="space-y-3">
            {questions[currentQuestion - 1].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full text-left p-3 border rounded-lg hover:bg-indigo-50 transition"
              >
                {option}
              </button>
            ))}
          </div>
          
          <div className="flex justify-between">
            {currentQuestion > 1 && (
              <button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="bg-gray-200 px-4 py-2 rounded"
              >
                Anterior
              </button>
            )}
            <div className="flex-grow"></div>
            <span className="text-gray-600">
              {currentQuestion}/{questions.length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
