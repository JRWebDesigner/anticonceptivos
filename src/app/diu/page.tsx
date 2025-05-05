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

export default function DiuPage(){
  const [activeTab, setActiveTab] = useState<string>("diu");
  
   const methodTabs = [
    { id: "diu", label: "DISPOSITIVOS INTRAUTERINOS(DIU)" },
    { id: "diu-hormonal", label: "Diu Hormonal" },
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
       <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">Dispositivos Intrauterinos (DIU)</h1>
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
                    {activeTab === "diu" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">DISPOSITIVOS INTRAUTERINOS(DIU)</h2>
                        <Image src="/images/diu.jpg" alt="Métodos Naturales" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                             <section className="mb-8 bg-blue-50 p-5 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">DESCRIPCIÓN</h2>
        <p className="text-gray-700 mb-3">
          La T de cobre es un pequeño dispositivo intrauterino (DIU) de plástico flexible, rodeado de hilos de cobre. Un proveedor o proveedora con entrenamiento específico lo inserta en el útero de la mujer por vía vaginal, atravesando el cuello uterino o cérvix.
        </p>
        <p className="text-gray-700">
          Los DIU llevan dos hilos guía, estos hilos salen por el cérvix y quedan en la parte superior de la vagina para su localización, control y/o extracción. Funcionan fundamentalmente provocando una modificación química que daña al espermatozoide antes de la unión con el óvulo.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">MECANISMO DE ACCIÓN</h2>
        <div className="bg-white p-5 rounded-lg shadow-sm">
          <p className="text-gray-700">
            Impide la fecundación al interferir con la capacidad de sobrevivencia de los espermatozoides (inmovilizándolos y destruyéndolos) y al obstaculizar su ascenso por las trompas de Falopio, donde ocurre la concepción.
          </p>
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">CARACTERÍSTICAS</h2>
        <div className="bg-green-50 p-5 rounded-lg">
          <p className="text-gray-700 font-medium mb-2">Es apropiado, seguro y adecuado para:</p>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Casi todas las mujeres, incluyendo mujeres que hayan tenido hijos o no, estén o no estén casadas</li>
            <li>Mujeres de cualquier edad, incluyendo adolescentes y mujeres de más de 40 años</li>
            <li>Mujeres que desean un método anticonceptivo de fácil uso, reversible, seguro, generalmente inocuo y de larga duración</li>
            <li>Mujeres que hayan tenido recientemente un aborto (si no hay evidencia de infección)</li>
          </ul>
        </div>
      </section>
                            <div className='w-[60%] mx-auto'>
                              <VideoCard  title="" src="https://www.youtube.com/embed/B8H3DIXsAPo" />
                            </div>
                        </div>
                      </>
                    )}
                    
                    {activeTab === "diu-hormonal" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">DIU HORMONAL</h2>
                        <Image src="/images/diu-hormonal.jpg" alt="Métodos de Barrera" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
              <section className="mb-8 bg-pink-50 p-5 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3 text-pink-800">DESCRIPCIÓN</h2>
        <p className="text-gray-700 mb-3">
          El dispositivo intrauterino de levonorgestrel (DIU-LNG) es un dispositivo plástico en forma de "T" que libera constantemente pequeñas cantidades de levonorgestrel cada día (levonorgestrel es una progestina ampliamente utilizada en implantes y anticonceptivos orales).
        </p>
        <p className="text-gray-700">
          Funciona fundamentalmente evitando la proliferación del revestimiento del útero (endometrio).
        </p>
      </section>

      <section className="mb-8 bg-white p-5 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-pink-800">QUIÉN PUEDE UTILIZARLO</h2>
        <p className="text-gray-700">
          Casi todas las mujeres pueden utilizar DIU-LNG de manera segura y efectiva.
        </p>
      </section>

      <section className="bg-purple-50 p-5 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3 text-pink-800">EFECTOS COLATERALES MÁS COMUNES</h2>
        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-2">Cambios en los patrones de sangrado:</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Ausencia de menstruación</li>
            <li>Sangrado más leve</li>
            <li>Menos días de sangrado</li>
            <li>Sangrado infrecuente o irregular</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Otros efectos:</h3>
          <p className="text-gray-700">
            Acné, cefaleas, tensión y dolor mamario, y posiblemente otros efectos colaterales.
          </p>
        </div>
      </section>

      <div className='w-[60%] mx-auto'>
      <VideoCard  title="" src="https://www.youtube.com/embed/RGrs9Cuual4" />
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
