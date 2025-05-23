"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { saveResponses } from "../../lib/saveResponses"; 

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
  category?: string;
}

const questions: Question[] = [
  {
    id: 1,
    text: "Los métodos anticonceptivos son:",
    options: [
      "Elementos que impiden el nacimiento del bebé",
      "Métodos y/o procedimientos que previenen el embarazo",
      "Elementos que afectan negativamente la salud de la mujer",
      "Ninguna de las anteriores"
    ],
    correctAnswer: 1
  },
  {
    id: 2,
    text: "Los métodos anticonceptivos pueden ser usados por:",
    options: [
      "Solo el hombre",
      "La pareja",
      "Solo la mujer",
      "Ninguna de las anteriores"
    ],
    correctAnswer: 1
  },
  {
    id: 3,
    text: "¿Cuáles son métodos anticonceptivos reversibles para mujeres?",
    options: [
      "Métodos hormonales: píldoras, inyecciones mensuales o trimestrales, parche.",
      "Métodos de barrera: condón femenino, diafragma.",
      "Dispositivos intrauterinos: T de cobre, SIU (sistema intrauterino hormonal).",
      "Todas las anteriores"
    ],
    correctAnswer: 3  
  },
  {
    id: 4,
    text: "¿Cuáles son los métodos anticonceptivos disponibles para hombres?",
    options: [
      "Método reversible: condón masculino.",
      "Método irreversible: vasectomía.",
      "Ambos: condón y vasectomía.",
      "Ninguno"
    ],
    correctAnswer: 2
  },
  {
    id: 5,
    text: "¿Cuál es la función principal del diafragma como método anticonceptivo?",
    options: [
      "Liberar hormonas para evitar la ovulación",
      "Crear una barrera física en el cuello uterino",
      "Cambiar el pH vaginal para destruir espermatozoides",
      "Regular el ciclo menstrual"
    ],
    correctAnswer: 1
  },
  {
    id: 6,
    text: "¿Qué método anticonceptivo debe mantenerse en la vagina horas después de la relación sexual?",
    options: [
       "Condón femenino",
      "Diafragma",
"Píldora anticonceptiva",
"Dispositivo intrauterino"
    ],
    correctAnswer: 1
  },
  {
    id: 7,
    text: "¿En qué momento se debe colocar el condón (preservativo)?",
    options: [
      "Antes de la penetración",
      "Durante la penetración",
      "Antes de la eyaculación",
      "A y B",
      "Ninguna de las anteriores"
    ],
    correctAnswer: 0
  },
  {
    id: 8,
    text: "¿Qué método es recomendado para mujeres que desean evitar el embarazo a corto plazo sin usar hormonas?",
    options: [
      "Píldora anticonceptiva",
"Dispositivo intrauterino de cobre",
"Inyección anticonceptiva",
"Parche anticonceptivo"
    ],
    correctAnswer: 1
  },
  {
    id: 9,
    text: "¿Cuál es un paso correcto al utilizar el condón masculino?",
    options: [
      "Guardarlo en la billetera por mucho tiempo para tenerlo siempre disponible",
      "Usarlo solo después de que haya eyaculación",
      "Revisar la fecha de vencimiento y abrir el paquete con cuidado",
      "Guardarlo al sol para mantenerlo seco"
    ],
    correctAnswer: 2
  },
  {
    id: 10,
    text: "¿Quiénes pueden utilizar el método del ritmo?",
    options: [
      "Todas las mujeres sexualmente activas",
      "Mujeres con ciclo menstrual irregular",
      "Mujeres con ciclo menstrual regular",
      "Todas las anteriores",
      "Ninguna de las anteriores"
    ],
    correctAnswer: 2
  },
  {
    id: 11,
    text: "¿La presencia del moco cervical son los días?",
    options: [
      "Inicio del ciclo menstrual",
      "Mediados del ciclo menstrual",
      "Inicio de la menstruación",
      "Término de la menstruación",
      "Ninguna de las anteriores"
    ],
    correctAnswer: 1
  },
  {
    id: 12,
    text: "¿Qué característica distingue al condón femenino del masculino?",
    options: [
      "El condón femenino se ajusta dentro de la vagina y cubre parte de la vulva.",
      "El condón femenino se coloca directamente sobre el pene erecto.",
      "El condón femenino no requiere lubricación para su uso.",
      "El condón femenino está hecho del mismo material que las píldoras anticonceptivas."
    ],
    correctAnswer: 0
  },
  {
    id: 13,
    text: "¿Cuáles son los métodos hormonales?",
    options: [
      "Condón y diafragma",
      "Píldoras y diafragma",
      "Diafragma e inyectable",
      "Inyectables y píldoras",
      "Ninguna de las anteriores"
    ],
    correctAnswer: 3
  },
  {
    id: 14,
    text: "¿Los efectos secundarios más conocidos de los métodos hormonales son?",
    options: [
      "Dolor de cabeza y suspensión del ciclo menstrual",
      "Subida de peso y dolor de cabeza",
      "Cambios en el ánimo",
      "B y C",
      "Todas las anteriores"
    ],
    correctAnswer: 4
  },
  {
    id: 15,
    text: "¿Los métodos hormonales evitan?",
    options: [
      "Infección de transmisión sexual",
      "La menstruación",
      "La fecundación",
      "La ovulación",
      "Ninguna de las anteriores"
    ],
    correctAnswer: 3
  },
  {
    id: 16,
    text: "¿Los inyectables se usan?",
    options: [
      "Cada mes",
      "Cada 6 meses",
      "Cada 3 meses",
      "A y B",
      "A y C"
    ],
    correctAnswer: 4
  },
  {
    id: 17,
    text: "¿Los métodos quirúrgicos son?",
    options: [
      "Métodos de Billings",
      "Ligadura de trompas",
      "Vasectomía",
      "A y B",
      "B y C"
    ],
    correctAnswer: 4
  },
  {
    id: 18,
    text: "¿La vasectomía es?",
    options: [
      "Método quirúrgico parcial",
      "Método quirúrgico definitivo",
      "Eliminación de los espermatozoides",
      "Cierre de los conductos seminales",
      "Ninguna de las anteriores"
    ],
    correctAnswer: 1
  },
  {
    id: 19,
    text: "¿La intervención quirúrgica de ligadura de trompas consiste en?",
    options: [
      "En la extirpación del útero para evitar el embarazo",
      "En la colocación de un dispositivo dentro del útero",
      "En el corte o bloqueo de las trompas de Falopio para impedir que el óvulo se una con el espermatozoide",
      "En el uso de hormonas para evitar la ovulación"
    ],
    correctAnswer: 2
  },
  {
    id: 20,
    text: "¿La vasectomía es efectiva a partir de los:",
    options: [
      "Inmediatamente después de la cirugía",
"7 días después de la intervención",
"Cuando se confirma la ausencia de espermatozoides en el semen mediante un espermiograma",
"Al mes de la intervención, sin necesidad de control"
    ],
    correctAnswer: 2
  }
];

export default function Questionnaire() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [isComplete, setIsComplete] = useState(false);
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    gender:''
  });
  const [showQuestions, setShowQuestions] = useState(false);

  const handleOptionSelect = (optionIndex: number) => {
    setSelectedOption(optionIndex);
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(answers[currentQuestion + 1]);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedOption(answers[currentQuestion - 1]);
    }
  };

  const handleComplete = () => {
  setIsComplete(true);
  saveResponses(
    answers,           // Respuestas del cuestionario
    userData.name,     // Nombre del usuario
    parseInt(userData.age), // Edad (convertida a número)
    userData.gender    // Género del usuario (nuevo parámetro)
  );
};

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setAnswers(Array(questions.length).fill(null));
    setIsComplete(false);
    setShowQuestions(false);
    setUserData({ name: '', age: '', gender:'' });
  };
  
  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const startQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (userData.name && userData.age) {
      setShowQuestions(true);
    }
  };
  const handleFinish = () => {
  localStorage.setItem("questionnaireCompleted", "true");
};
  if (!showQuestions) {
    return (
      <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md w-full bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 p-8"
        >
          <h1 className="text-3xl font-bold text-indigo-800 mb-6 text-center">Antes de comenzar...</h1>
          
          <form onSubmit={startQuiz} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Codigo de estudiante
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={userData.name}
                onChange={handleUserDataChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ingresa tu nombre"
              />
            </div>
            
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-1">
                Edad
              </label>
              <input 
                type="number"
                id="age"
                name="age"
                value={userData.age}
                onChange={handleUserDataChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Ingresa tu edad"
              />
            </div>
            <div>
              <label htmlFor="gender" className="block text-sm font-medium text-gray-700 mb-1">
                Sexo
              </label>
              <select
                id="gender"
                name="gender"
                value={userData.gender}
                onChange={handleUserDataChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">Selecciona tu sexo</option>
                <option value="masculino">Masculino</option>
                <option value="femenino">Femenino</option>
              </select>
            </div>
            <div className="pt-4">
              <button
                type="submit"
                disabled={!userData.name || !userData.age}
                className={`w-full px-6 py-3 rounded-lg font-medium text-white ${
                  !userData.name || !userData.age
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700'
                }`}
              >
                Comenzar cuestionario
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
     <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-bold text-indigo-800 mb-2">Cuestionario sobre Métodos Anticonceptivos</h1>
          <p className="text-gray-600">Usuario: {userData.name} - Edad: {userData.age} años</p>
        </motion.div>

        {!isComplete ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100"
          >
            {questions[currentQuestion].category && (
              <div className="bg-indigo-600 px-6 py-3">
                <h2 className="text-white font-semibold text-lg">
                  {questions[currentQuestion].category}
                </h2>
              </div>
            )}
            
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <span className="text-indigo-600 font-medium">
                  Pregunta {currentQuestion + 1} de {questions.length}
                </span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 ml-4">
                  <div
                    className="bg-indigo-600 h-2.5 rounded-full"
                    style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-8">
                {questions[currentQuestion].text}
              </h3>

              <div className="space-y-4 mb-10">
                {questions[currentQuestion].options.map((option, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedOption === index
                        ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                    onClick={() => handleOptionSelect(index)}
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-5 h-5 rounded-full border flex items-center justify-center mr-3 ${
                          selectedOption === index
                            ? 'border-indigo-500 bg-indigo-500'
                            : 'border-gray-400'
                        }`}
                      >
                        {selectedOption === index && (
                          <div className="w-2 h-2 rounded-full bg-white"></div>
                        )}
                      </div>
                      <span>{option}</span>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestion === 0}
                  className={`px-6 py-2 rounded-lg font-medium ${
                    currentQuestion === 0
                      ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                      : 'bg-indigo-100 text-indigo-700 hover:bg-indigo-200'
                  }`}
                >
                  Anterior
                </button>
                
                {currentQuestion < questions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    disabled={selectedOption === null}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      selectedOption === null
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-indigo-600 text-white hover:bg-indigo-700'
                    }`}
                  >
                    Siguiente
                  </button>
                ) : (
                  <button
                    onClick={handleComplete}
                    disabled={selectedOption === null}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      selectedOption === null
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                  >
                    Finalizar
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-indigo-100 p-8 text-center"
          >
            <div className="mb-8">
              <div className="w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-indigo-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">¡Gracias por completar el cuestionario!</h2>
              <p className="text-gray-600 mb-6">
                Tu participación es valiosa para nosotros. Esperamos que esta experiencia haya sido informativa y útil.
              </p>
              <p className="text-indigo-600 font-medium">
                Recuerda consultar siempre con un profesional de la salud para asesoramiento personalizado.
              </p>
            </div>

            <div className="flex justify-center gap-4 mt-6">
  <button
    onClick={resetQuiz}
    className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 transition-colors"
  >
    Reiniciar cuestionario
  </button>
  <Link
    onClick={handleFinish}
    href="/"
    className="px-6 py-3 bg-gray-300 text-gray-800 rounded-lg font-medium hover:bg-gray-400 transition-colors"
  >
    Siguiente
  </Link>
</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
