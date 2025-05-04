"use client";
import { useEffect, useState } from "react";
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
    { id: "progestuna", label: "Progestina Sola" },
    { id: "condon-femenino", label: "Condon Femenino" },
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
                    
                    {activeTab === "condon-femenino" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">CONDÓN FEMENINO</h2>
                        <Image src="/images/condon-femenino.jpg" alt="Métodos de Barrera" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
        <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Descripción</h2>
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-gray-700">
            Es un revestimiento fino de plástico (actualmente existen también de látex) que se adapta a la vagina de la mujer, es flexible y está hecho de una película delgada de plástico suave y transparente (poliuretano).
          </p>
          <ul className="list-disc pl-6 mt-3 space-y-1 text-gray-700">
            <li>Tiene aros flexibles en ambos extremos</li>
            <li>El aro del extremo cerrado ayuda a la inserción del condón</li>
            <li>El aro del extremo abierto ayuda a mantener parte del condón fuera de la vagina</li>
            <li>Protege contra infecciones de transmisión sexual, incluyendo VIH</li>
          </ul>
        </div>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Eficacia</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-blue-800 mb-1">Uso típico</h3>
            <p className="text-gray-700">
              79% efectivo (21 de cada 100 mujeres quedarán embarazadas en un año)
            </p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <h3 className="font-medium text-green-800 mb-1">Uso correcto y consistente</h3>
            <p className="text-gray-700">
              95% efectivo (5 de cada 100 mujeres quedarán embarazadas en un año)
            </p>
          </div>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-4">Modo de uso</h2>
        
        <div className="space-y-5">
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-medium mr-3 mt-0.5">1</div>
            <p className="text-gray-700">Practique cómo colocar y retirar el condón antes de usarlo en relaciones sexuales.</p>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-medium mr-3 mt-0.5">2</div>
            <div>
              <p className="text-gray-700">Verifique la integridad del condón:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-600">
                <li>Sienta el colchón de aire al presionar el envase</li>
                <li>Revise la fecha de vencimiento</li>
                <li>No lo use si el sobre está roto o el condón parece dañado</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-medium mr-3 mt-0.5">3</div>
            <p className="text-gray-700">Abra el sobre por la ranura. No use dientes ni objetos punzocortantes que puedan dañarlo.</p>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-medium mr-3 mt-0.5">4</div>
            <div>
              <p className="text-gray-700">Adopte una posición cómoda para la inserción:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-600">
                <li>Parada con un pie en una silla</li>
                <li>Sentada o acostada con muslos separados</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-medium mr-3 mt-0.5">5</div>
            <div>
              <p className="text-gray-700">Sostenga el condón correctamente:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-600">
                <li>Extremo abierto orientado hacia abajo</li>
                <li>Tome el anillo interno entre pulgar, índice y medio</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-medium mr-3 mt-0.5">6</div>
            <div>
              <p className="text-gray-700">Inserción:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-600">
                <li>Con una mano separe los labios vaginales</li>
                <li>Con la otra, inserte parcialmente el condón</li>
                <li>Empuje el anillo interno hacia arriba y atrás con el dedo índice</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-medium mr-3 mt-0.5">7</div>
            <p className="text-gray-700">Asegúrese que el condón no esté torcido dentro de la vagina. Parte quedará fuera de la vulva.</p>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-medium mr-3 mt-0.5">8</div>
            <p className="text-gray-700">Durante el coito, guíe el pene hacia la entrada de la vagina cubierta por el condón.</p>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-medium mr-3 mt-0.5">9</div>
            <p className="text-gray-700">Puede colocarse hasta 8 horas antes de la relación y no necesita removerse inmediatamente después.</p>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-medium mr-3 mt-0.5">10</div>
            <div>
              <p className="text-gray-700">Para retirar:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-600">
                <li>Apriete y gire el borde externo</li>
                <li>Esto mantiene el semen dentro</li>
                <li>Retire suavemente</li>
              </ul>
            </div>
          </div>
          
          <div className="flex items-start bg-white p-4 rounded-lg shadow-sm">
            <div className="flex-shrink-0 h-8 w-8 flex items-center justify-center rounded-full bg-purple-100 text-purple-800 font-medium mr-3 mt-0.5">11</div>
            <div>
              <p className="text-gray-700">Deseche adecuadamente:</p>
              <ul className="list-disc pl-6 mt-2 text-gray-600">
                <li>En un lugar seguro donde otros no lo manipulen</li>
                <li>Use uno nuevo en cada relación coital vaginal</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className='w-[60%] mx-auto'>
      <VideoCard  title="" src="https://www.youtube.com/embed/diTuNr0kQHk" />
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
