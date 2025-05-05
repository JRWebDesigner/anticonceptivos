"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from 'next/link'

interface NavItem {
  title: string;
  id: string;
}

const navItems: NavItem[] = [
  { title: "Introducción", id: "intro" },
  { title: "Métodos", id: "methods" },
  { title: "Videos", id: "videos" },
  { title: "Cuestionario", id: "questionnaire" },
];


interface TabProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const Tab = ({ label, active, onClick }: TabProps) => (
  <button
    onClick={onClick}
    className={`px-6 py-3 font-medium rounded-t-lg transition-colors ${
      active ? 'bg-white text-indigo-700 border-t-2 border-l-2 border-r-2 border-indigo-300' : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200'
    }`}
  >
    {label}
  </button>
);

interface VideoCardProps {
  title: string;
  src: string;
}

const VideoCard = ({ title, src }: VideoCardProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden border border-indigo-200">
    <div className="aspect-w-16 aspect-h-9">
      <iframe
        src={src}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-64"
      ></iframe>
    </div>
    <div className="p-4">
      <h3 className="text-lg font-semibold text-indigo-800">{title}</h3>
    </div>
  </div>
);

export default function BarreraPage(){
  const [activeTab, setActiveTab] = useState<string>("progestina");
  
   const methodTabs = [
    { id: "progestina", label: "Progestina Sola" },
    { id: "inyectables", label: "Inyectables Combinados" },
    { id: "anillo", label: "Anillo Vaginal" },
    { id: "AOC", label: "AOC" },
    { id: "AOE", label: "AOE" },
    { id: "PAE", label: "PAE" },
  ];

  return(
      <main className="relative bg-fixed bg-[url('/bg-pattern.svg')] bg-cover min-h-screen py-20 px-4 md:px-12 text-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto"
      >
        <header className={`text-center mb-20`}>
          <Image src="/logo.png" alt="Logo" width={180} height={180} className="mx-auto mb-4" />
          <h1 className="text-3xl md:text-6xl font-extrabold text-indigo-800 drop-shadow-sm leading-tight">
            Guía de Métodos Anticonceptivos
          </h1>
        </header>
        
        <nav className='block md:sticky top-0 z-50 bg-white/80 backdrop-blur-md py-4 mb-12 border-b border-indigo-200 shadow-sm'>
          <div className="flex flex-wrap justify-center gap-4">
            {navItems.map(item => (
              <Link
                key={item.id}
                href={`/#${item.id}`}
                className={`px-4 py-2 rounded-lg transition font-semibold bg-indigo-100 hover:bg-indigo-200 text-indigo-800`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav> 
       </motion.div>
       <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">Métodos Hormonales</h1>
        <section className="w-[80%] max-w-[1300px] mx-auto scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-md rounded-xl shadow-lg border border-indigo-200"
            >
              <div className="flex overflow-x-auto">
                {methodTabs.map(tab => (
                  <Tab
                    key={tab.id}
                    label={tab.label}
                    active={activeTab === tab.id}
                    onClick={() => setActiveTab(tab.id)}
                  />
                ))}
              </div>
              
              <div className="p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "progestina" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">PÍLDORAS DE PROGESTINA SOLA</h2>
                        <Image src="/images/hormonales.jpg" alt="Métodos Naturales" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                             <section className="mb-8 bg-blue-50 p-5 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">DESCRIPCIÓN</h2>
        <p className="text-gray-700 mb-3">
          Son píldoras que contienen dosis muy bajas de una progestina igual que la progesterona natural presente en la mujer.
        </p>
        <ul className="list-disc pl-6 space-y-1 text-gray-700">
          <li>No contienen estrógeno</li>
          <li>Pueden utilizarse durante la lactancia</li>
          <li>Aptas para mujeres que no pueden usar métodos con estrógeno</li>
          <li>También conocidas como "minipíldoras" o AOP (Anticonceptivos Orales de Progestina sola)</li>
        </ul>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">EFICACIA</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border-l-4 border-green-400">
            <h3 className="font-medium text-green-800 mb-1">Durante la lactancia</h3>
            <p className="text-gray-700">
              99% efectivas
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
            <h3 className="font-medium text-yellow-800 mb-1">Sin lactancia</h3>
            <p className="text-gray-700">
              90-97% efectivas
            </p>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">MÉTODO DE USO</h2>
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <div className="flex items-start mb-4">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-3 mt-0.5">1</div>
            <p className="text-gray-700">Puede comenzar en cualquier momento si hay certeza razonable de que no está embarazada</p>
          </div>
          <div className="flex items-start">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-3 mt-0.5">2</div>
            <p className="text-gray-700">Debe tomarse <strong>todos los días a la misma hora</strong> (preferiblemente en un horario fijo)</p>
          </div>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">RECOMENDACIONES</h2>
        <div className="bg-purple-50 p-5 rounded-lg">
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Fertilidad se recupera inmediatamente al suspender el método</li>
            <li>Debe tomarse <strong>todos los días sin excepción</strong>, tenga o no relaciones sexuales</li>
            <li><strong>No protege</strong> contra infecciones de transmisión sexual</li>
            <li>Menos efectivo en mujeres que no están amamantando</li>
            <li>Si se olvida una píldora por más de 3 horas, usar método de respaldo por 2 días</li>
          </ul>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">RIESGOS Y EFECTOS SECUNDARIOS</h2>
        <div className="bg-red-50 p-5 rounded-lg">
          <h3 className="font-medium text-red-700 mb-2">Efectos secundarios comunes (no peligrosos pero molestos):</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="flex items-start">
              <div className="flex-shrink-0 text-red-600 mr-2">•</div>
              <p className="text-gray-700">Sangrado irregular (manchado, sangrado entre periodos o ausencia de menstruación)</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 text-red-600 mr-2">•</div>
              <p className="text-gray-700">Dolores de cabeza</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 text-red-600 mr-2">•</div>
              <p className="text-gray-700">Sensibilidad en los senos</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 text-red-600 mr-2">•</div>
              <p className="text-gray-700">Náuseas</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 text-red-600 mr-2">•</div>
              <p className="text-gray-700">Cambios en el estado de ánimo (ansiedad, irritabilidad o depresión)</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 text-red-600 mr-2">•</div>
              <p className="text-gray-700">Aumento de peso leve o cambios en el apetito</p>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 text-red-600 mr-2">•</div>
              <p className="text-gray-700">Acné o cambios en la piel</p>
            </div>
          </div>
        </div>
      </section>
                            <div className='w-[60%] mx-auto'>
                              <VideoCard  title="" src="https://www.youtube.com/embed/9unpYdwKXOU" />
                            </div>
                        </div>
                      </>
                    )}
                    
                    {activeTab === "inyectables" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">ANTICONCEPTIVOS INYECTABLES COMBINADOS</h2>
                        <Image src="/images/inyectables.jpg" alt="Métodos de Barrera" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
        <section className="mb-8 bg-blue-50 p-5 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">DESCRIPCIÓN</h2>
        <p className="text-gray-700 mb-3">
          Métodos hormonales que se aplican por inyección mensual. Contienen estrógeno y progestina, similares a las pastillas combinadas. Actúan principalmente inhibiendo la ovulación.
        </p>
        
        <div className="grid md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-blue-700 mb-2">AMP/Cipionato de Estradiol</h3>
            <p className="text-gray-700">
              Contiene 25 mg de acetato de medroxiprogesterona de depósito + 5 mg de cipionato de estradiol
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-blue-700 mb-2">EN-NET/Valerato de Estradiol</h3>
            <p className="text-gray-700">
              Contiene 50 mg de enantato de noretisterona + 5 mg de valerato de estradiol
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">MÉTODO DE USO</h2>
        <div className="space-y-4">
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-3 mt-0.5">1</div>
            <p className="text-gray-700">Inyección intramuscular cada 30 días (preferiblemente el mismo día de cada mes)</p>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-3 mt-0.5">2</div>
            <p className="text-gray-700">Se administra en el glúteo o brazo por personal de salud</p>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-3 mt-0.5">3</div>
            <p className="text-gray-700">
              Primera inyección debe aplicarse en los primeros 5 días del ciclo menstrual (si no ha habido relaciones sin protección)
            </p>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">RECOMENDACIONES</h2>
        <div className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-400">
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li><strong>Aplicar puntualmente cada 30 días:</strong> Si se retrasa más de 3 días, usar método de respaldo (preservativo) por 7 días</li>
            <li>Realizar controles médicos regulares, especialmente con factores de riesgo cardiovascular</li>
            <li>No recomendado para mujeres lactantes en los primeros 6 meses postparto</li>
            <li><strong>No protege</strong> contra infecciones de transmisión sexual</li>
            <li>Puede causar cambios menstruales (sangrado irregular o amenorrea)</li>
            <li>Mantener registro de fechas de aplicación</li>
          </ul>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">EFICACIA</h2>
        <div className="bg-green-50 p-5 rounded-lg">
          <p className="text-gray-700 mb-3">
            <strong>99% efectivo</strong> con uso perfecto (1 embarazo por cada 100 mujeres al año)
          </p>
          <p className="text-gray-700">
            <strong>97% efectivo</strong> con uso típico (3 embarazos por cada 100 mujeres al año)
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">EFECTOS SECUNDARIOS</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-red-600 mb-2">Comunes</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Cambios en el sangrado menstrual</li>
              <li>Dolor de cabeza</li>
              <li>Náuseas</li>
              <li>Aumento de peso (2-4 kg promedio al año)</li>
              <li>Sensibilidad mamaria</li>
            </ul>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h3 className="font-medium text-red-600 mb-2">Menos comunes</h3>
            <ul className="list-disc pl-6 space-y-1 text-gray-700">
              <li>Cambios de humor</li>
              <li>Acné</li>
              <li>Disminución del deseo sexual</li>
              <li>Dolor en el sitio de inyección</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 p-4 bg-purple-50 border-l-4 border-purple-400">
          <h3 className="text-lg font-medium text-purple-800 mb-2">Ventajas</h3>
          <ul className="list-disc pl-6 space-y-1 text-purple-700">
            <li>Sólo requiere atención mensual</li>
            <li>No interfiere con la relación sexual</li>
            <li>Efectivo inmediatamente si se inicia correctamente</li>
            <li>Discreto (no requiere almacenamiento en casa)</li>
          </ul>
        </div>
      </section>
      <div className='w-[60%] mx-auto'>
      <VideoCard  title="" src="https://www.youtube.com/embed/SqG7j8c-7zc " />
    </div>
                        </div>
                      </>
                    )}
                    {activeTab === "anillo" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">ANILLO VAGINAL</h2>
                        <Image src="/images/inyectables.jpg" alt="Métodos de Barrera" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
        <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">DESCRIPCIÓN</h2>
        <div className="bg-pink-50 p-4 rounded-lg">
          <p className="text-gray-700">
            Se trata de un anillo flexible que se coloca en la vagina. Libera dos hormonas de forma continua, una progestina y un estrógeno. Funciona fundamentalmente evitando la liberación de óvulos desde los ovarios.
          </p>
        </div>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">MÉTODO DE USO</h2>
        <div className="space-y-4">
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-pink-100 text-pink-800 font-medium mr-3 mt-0.5">1</div>
            <p className="text-gray-700">No importa la posición exacta, pero si se inserta bien profundo ayuda a que quede en su lugar y tiene menos probabilidades de sentirlo.</p>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-pink-100 text-pink-800 font-medium mr-3 mt-0.5">2</div>
            <p className="text-gray-700">Los músculos de la vagina mantienen naturalmente el anillo en su lugar.</p>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-pink-100 text-pink-800 font-medium mr-3 mt-0.5">3</div>
            <p className="text-gray-700">
              Se mantiene el anillo colocado durante tres semanas, luego de lo cual se retira a la cuarta semana. Durante esta cuarta semana la mujer tendrá su menstruación.
            </p>
          </div>

          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-pink-100 text-pink-800 font-medium mr-3 mt-0.5">4</div>
            <p className="text-gray-700">Luego de la cuarta semana se tiene que volver a utilizar el anillo.</p>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">RECOMENDACIONES</h2>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>No hay demora en la recuperación de la fertilidad después de dejar de usar el anillo.</li>
            <li>No brinda ninguna protección contra infecciones de trasmisión sexual (ITS).</li>
          </ul>
        </div>
      </section>
      <div className='w-[60%] mx-auto'>
      <VideoCard  title="" src="https://www.youtube.com/embed/msX9BTPLALw" />
    </div>
                        </div>
                      </>
                    )}
                    {activeTab === "AOC" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">ANTICONCEPTIVOS ORALES COMBINADOS (AOC)</h2>
                        <Image src="/images/inyectables.jpg" alt="Métodos de Barrera" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
        <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">CÓMO SE USA</h2>
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-gray-700">
              Pueden entregarse los paquetes de píldoras en cualquier momento, indicando cuándo comenzar a usarlos.
            </p>
          </div>

          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-3 mt-0.5">1</div>
            <div>
              <p className="font-medium text-gray-800 mb-1">Presentación de 28 píldoras:</p>
              <p className="text-gray-700">
                Se ingiere una píldora con hormonas diariamente durante 21 días consecutivos, seguidos de siete días de píldoras que contienen hierro.
              </p>
            </div>
          </div>

          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-3 mt-0.5">2</div>
            <p className="text-gray-700">
              Los paquetes siguientes se inician al concluir el previo, independientemente de cuándo se presente el sangrado menstrual.
            </p>
          </div>

          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-3 mt-0.5">3</div>
            <div>
              <p className="font-medium text-gray-800 mb-1">Presentación de 21 píldoras:</p>
              <p className="text-gray-700">
                Se ingiere una píldora diariamente durante 21 días, seguidos de siete días de descanso. Los paquetes siguientes deben iniciarse al concluir los siete días de descanso del ciclo previo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3">RECOMENDACIONES</h2>
        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
          <p className="text-gray-700">
            La elegibilidad de un método anticonceptivo dependerá de la existencia de alguna condición específica de la usuaria, clasificada por la OMS en categorías que van desde "no hay restricción para el uso" hasta "existe un riesgo inaceptable para la salud cuando se asocia al uso del método".
          </p>
        </div>
      </section>
      <div className='w-[60%] mx-auto'>
      <VideoCard  title="" src="https://www.youtube.com/embed/Ihkk-qhacQc" />
    </div>
                        </div>
                      </>
                    )}
                      {activeTab === "AOE" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">ANTICONCEPCIÓN ORAL DE EMERGENCIA (AOE)
PÍLDORA ANTICONCEPTIVA DE EMERGENCIA
</h2>
                        <Image src="/images/aoe.jpg" alt="Métodos de Barrera" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
       <section className="mb-8 bg-blue-50 p-5 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">COMPOSICIÓN</h2>
        <p className="text-gray-700 mb-3">
          Las PAE contienen sólo progestina (Levonorgestrel), o una progestina y un estrógeno juntos.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">MECANISMO DE ACCIÓN DEL LEVONORGESTREL</h2>
        <div className="space-y-4">
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-3 mt-0.5">1</div>
            <p className="text-gray-700">
              El levonorgestrel es un análogo de la progesterona y tiene los mismos efectos que esta hormona, incluyendo la capacidad de mantener el embarazo.
            </p>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-3 mt-0.5">2</div>
            <p className="text-gray-700">
              La progesterona se llama así porque es progestacional (favorece la gestación).
            </p>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-3 mt-0.5">3</div>
            <p className="text-gray-700">
              Otra acción de la progesterona es convertir el endometrio proliferativo (por acción de los estrógenos) en un endometrio receptivo al embrión.
            </p>
          </div>

          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-blue-100 text-blue-800 font-medium mr-3 mt-0.5">4</div>
            <p className="text-gray-700">
              Cuando se administran antes de la ovulación, suprimen la ovulación (esto lo hacen todas las progestinas, el levonorgestrel no es excepción).
            </p>
          </div>
        </div>
      </section>
      <div className='w-[60%] mx-auto'>
      <VideoCard  title="" src="https://www.youtube.com/embed/Ihkk-qhacQc" />
    </div>
                        </div>
                      </>
                    )}
                      {activeTab === "PAE" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">PÍLDORA ANTICONCEPTIVA DE EMERGENCIA (PAE), A VECES LLAMADA PÍLDORA "DEL DÍA DESPUÉS", "DE LA MAÑANA SIGUIENTE" O ANTICONCEPTIVOS POSTCOITALES.</h2>
                        <Image src="/images/pae.jpg" alt="Métodos de Barrera" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
        <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">MODO DE USO</h1>

      <div className="space-y-4 mb-8">
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-700">
            <strong>1.</strong> Excluya la posibilidad de que la usuaria esté embarazada, determinando la fecha de su última menstruación.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-700">
            <strong>2.</strong> Determine la fecha y hora del contacto sexual sin protección, para asegurar que la usuaria está a tiempo de recibir el tratamiento dentro del margen de tiempo requerido de 72 horas.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-700">
            <strong>3.</strong> Pregunte si la usuaria está actualmente utilizando un método anticonceptivo regular; esta pregunta puede ser un buen punto de partida para una discusión sobre el uso de anticonceptivos regulares y como utilizarlos correctamente.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-700">
            <strong>4.</strong> No se necesita un examen pélvico u otro tipo de pruebas a menos que haya dudas sobre el estado de embarazo o se indique por otras razones.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-700">
            <strong>5.</strong> Provea las píldoras para la anticoncepción oral de emergencia.
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg shadow-sm">
          <p className="text-gray-700">
            <strong>6.</strong> Provea las instrucciones específicas sobre la forma de toma, efectos colaterales y su manejo, además de programar la visita de seguimiento.
          </p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm">
        <h2 className="text-xl font-semibold mb-3">Menstruación post-PAE</h2>
        <p className="text-gray-700">
          Este cuadro muestra datos sobre la llegada de la menstruación siguiente luego de usar las PAE.
        </p>
      </div>
    </div>
      <div className='w-[60%] mx-auto'>
      <VideoCard  title="" src="https://www.youtube.com/embed/mP1dgyFu8K" />
    </div>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </section> 
    </main>
  )
}
