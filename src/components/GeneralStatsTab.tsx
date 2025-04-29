export const GeneralStatsTab = ({ generalChartData, categoryChartData, generalStats, questions, COLORS }) => (
  <div className="space-y-8">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Gráfico de aciertos por pregunta */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Porcentaje de aciertos por pregunta</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={generalChartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              {/* ... (código del gráfico existente) */}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gráfico de aciertos por categoría */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-indigo-700">Aciertos por categoría</h2>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              {/* ... (código del gráfico existente) */}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>

    {/* Tabla de detalle de preguntas */}
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4 text-indigo-700">Detalle de preguntas</h2>
      {/* ... (código de la tabla existente) */}
    </div>
  </div>
);
