"use client"
import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function EstadisticasPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      const snapshot = await getDocs(collection(db, 'quiz_responses'));
      const all = snapshot.docs.map(doc => doc.data());
      const byQuestion = all.reduce((acc, curr) => {
        acc[curr.question] = acc[curr.question] || { correct: 0, incorrect: 0 };
        if (curr.correct) acc[curr.question].correct++;
        else acc[curr.question].incorrect++;
        return acc;
      }, {});
      const chartData = Object.entries(byQuestion).map(([question, { correct, incorrect }]) => ({
        question: question.slice(0, 30) + '...',
        correct,
        incorrect
      }));
      setData(chartData);
    };
    fetchStats();
  }, []);

  return (
    <main className="min-h-screen bg-white flex flex-col items-center p-4">
      <h1 className="text-3xl font-bold text-indigo-700 mb-4">Estadísticas del Cuestionario</h1>
      <Card className="w-full max-w-4xl p-6 shadow-xl rounded-2xl">
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={data} layout="vertical">
              <XAxis type="number" allowDecimals={false} />
              <YAxis dataKey="question" type="category" width={150} />
              <Tooltip />
              <Bar dataKey="correct" fill="#34d399" name="Correctas" />
              <Bar dataKey="incorrect" fill="#f87171" name="Incorrectas" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </main>
  );
}

