import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { db } from '@/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function HomePage() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);

  const steps = [
    { title: "Bienvenido", content: "Explora y aprende sobre los diferentes métodos anticonceptivos de forma interactiva." },
    { title: "Métodos Naturales", content: "Observación del ciclo, moco cervical, temperatura basal y más." },
    { title: "Métodos de Barrera", content: "Condones, diafragmas, capuchones, esponjas anticonceptivas." },
    { title: "Métodos Hormonales", content: "Píldoras, inyecciones, parches, anillos, implantes." },
    { title: "Dispositivos Intrauterinos", content: "DIU de cobre y hormonal, alta eficacia por años." },
    { title: "Métodos Quirúrgicos", content: "Ligadura de trompas y vasectomía, soluciones permanentes." },

    // Cuestionario completo
    { title: "Pregunta 1", content: "¿Los métodos anticonceptivos son...?", options: ["Sustancias que impiden que nazca él bebe", "Sustancias y/o procedimientos que impiden el embarazo", "Sustancias que causan daño a la mujer", "Ninguna de las anteriores"], correct: 1 },
    { title: "Pregunta 2", content: "¿Los métodos anticonceptivos pueden ser usados por...?", options: ["Solo el hombre", "La pareja", "Solo la mujer", "Ninguna de las anteriores"], correct: 1 },
    { title: "Pregunta 3", content: "¿Cuáles son métodos anticonceptivos para mujeres?", options: ["Condón, coito interrumpido, vasectomía", "Píldora, método del ritmo, T de cobre", "Condón, píldora, T de cobre", "Ninguna de las anteriores"], correct: 2 },
    { title: "Pregunta 4", content: "¿Cuáles son métodos anticonceptivos para hombres?", options: ["Condón, coito interrumpido, vasectomía", "Píldora, métodos del ritmo, T de cobre", "Condón, píldora, T de cobre", "Ninguna de las anteriores"], correct: 0 },
    { title: "Pregunta 5", content: "¿Qué métodos requieren supervisión médica?", options: ["Píldora, inyecciones, T de cobre", "Método del ritmo, coito interrumpido", "Diafragma", "Todas las anteriores", "Ninguna de las anteriores"], correct: 0 },
    { title: "Pregunta 6", content: "¿Cuáles son los métodos de barrera?", options: ["Método de calendario (ritmo)", "T de cobre (dispositivo intrauterino)", "Píldoras o inyecciones", "Ligadura de trompas – vasectomía", "Condón (preservativo) – Diafragma"], correct: 4 },
    { title: "Pregunta 7", content: "¿En qué momento se debe colocar el condón (preservativo)?", options: ["Antes de la penetración", "Durante la penetración", "Antes de la eyaculación", "A y B", "Ninguna de las anteriores"], correct: 0 },
    { title: "Pregunta 8", content: "¿Tiene efectos secundarios los Métodos de Barrera?", options: ["Sí", "No", "A veces", "Ninguna de las anteriores"], correct: 2 },
    { title: "Pregunta 9", content: "¿Cuáles son los métodos naturales?", options: ["Ritmo", "Diafragma", "Método Billings o Moco cervical", "Condón", "A y C"], correct: 4 },
    { title: "Pregunta 10", content: "¿Quiénes pueden utilizar el método del ritmo?", options: ["Todas las mujeres sexualmente activas", "Mujeres con ciclo menstrual irregular", "Mujeres con ciclo menstrual regular", "Todas las anteriores", "Ninguna de las anteriores"], correct: 2 },
    { title: "Pregunta 11", content: "¿La presencia del moco cervical son los días...?", options: ["Inicio del ciclo menstrual", "Mediados del ciclo menstrual", "Inicio de la menstruación", "Término de la menstruación", "Ninguna de las anteriores"], correct: 1 },
    { title: "Pregunta 12", content: "¿El método del ritmo consiste en tener relaciones los días...?", options: ["Los días fértiles", "Los días infértiles", "Todos los días", "Ninguna de las anteriores"], correct: 1 },
    { title: "Pregunta 13", content: "¿Cuáles son los métodos hormonales?", options: ["Condón y diafragma", "Píldoras y diafragma", "Diafragma e inyectable", "Inyectables y píldoras", "Ninguna de las anteriores"], correct: 3 },
    { title: "Pregunta 14", content: "¿Los efectos secundarios más conocidos son...?", options: ["Dolor de cabeza y suspensión del ciclo menstrual", "Subida de peso y dolor de cabeza", "Cambios en el ánimo", "B y C", "Todas las anteriores"], correct: 4 },
    { title: "Pregunta 15", content: "¿Los métodos hormonales evitan...?", options: ["Infección de transmisión sexual", "La menstruación", "La fecundación", "La ovulación", "Ninguna de las anteriores"], correct: 3 },
    { title: "Pregunta 16", content: "¿Los inyectables se usan...?", options: ["Cada mes", "Cada 6 meses", "Cada 3 meses", "A y B", "A y C"], correct: 4 },
    { title: "Pregunta 17", content: "¿Los métodos quirúrgicos son...?", options: ["Métodos de Billings", "Ligadura de trompas", "Vasectomía", "A y B", "B y C"], correct: 4 },
    { title: "Pregunta 18", content: "¿La vasectomía es...?", options: ["Método quirúrgico parcial", "Método quirúrgico definitivo", "Eliminación de los espermatozoides", "Cierre de los conductos seminales", "Ninguna de las anteriores"], correct: 1 },
    { title: "Pregunta 19", content: "¿La intervención quirúrgica de ligadura de trompas consiste en...?", options: ["Atar las trompas de Falopio", "Cortar las trompas de Falopio", "Obstruir las trompas de Falopio", "A y C", "B y C"], correct: 4 },
    { title: "Pregunta 20", content: "La vasectomía es efectiva a partir de los...?", options: ["7 días", "1 semana", "2 semanas", "3 meses", "6 meses"], correct: 3 },

    { title: "Fin del cuestionario", content: "Gracias por participar. Puedes ver las estadísticas pronto." }
  ];

  const handleAnswer = async (index: number) => {
    setAnswers([...answers, index]);
    const currentStep = steps[step];
    if ('correct' in currentStep) {
      await addDoc(collection(db, 'quiz_responses'), {
        question: currentStep.content,
        selected: currentStep.options?.[index],
        correct: currentStep.correct === index,
        timestamp: new Date()
      });
    }
    setStep(Math.min(steps.length - 1, step + 1));
  };

  const current = steps[step];
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-100 to-white flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-xl w-full">
        <Card className="rounded-2xl shadow-xl p-6">
          <CardContent>
            <h1 className="text-2xl font-bold mb-2 text-indigo-700">{current.title}</h1>
            <p className="mb-4 text-gray-700 text-lg">{current.content}</p>
            {current.options && (
              <div className="space-y-2">
                {current.options.map((opt, idx) => (
                  <Button key={idx} onClick={() => handleAnswer(idx)} className="w-full">
                    {opt}
                  </Button>
                ))}
              </div>
            )}
            {!current.options && (
              <div className="flex justify-between mt-4">
                <Button onClick={() => setStep(Math.max(0, step - 1))} disabled={step === 0}>Anterior</Button>
                <Button onClick={() => setStep(Math.min(steps.length - 1, step + 1))}>Siguiente</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </main>
  );
}

