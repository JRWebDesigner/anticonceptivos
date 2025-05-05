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

export default function PerPage(){
  const [activeTab, setActiveTab] = useState<string>("vasectomia");
  
   const methodTabs = [
    { id: "vasectomia", label: "Vasectomia" },
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
       <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">Métodos Permanentes</h1>
        <section className="w-[90%] max-w-[1300px] mx-auto scroll-mt-32">
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
                    {activeTab === "vasectomia" && (
                      <>
                        <h2 className="text-2xl md:text-4xl font-bold text-indigo-700 mb-6">VASECTOMÍA</h2>
                        <Image src="/images/vasectomia.jpg" alt="Métodos Naturales" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                             
      <section className="mb-8 bg-blue-50 p-5 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">DESCRIPCIÓN</h2>
        <p className="text-gray-700 mb-3">
          Es un método de anticoncepción masculina permanente, para aquellos hombres que no quieren más hijos. A través de una punción o una pequeña incisión en el escroto, el proveedor y/o proveedora ubica los conductos deferentes que transportan el esperma al pene y los secciona o bloquea mediante ligadura o aplicando calor o electricidad (cauterización).
        </p>
        <p className="text-gray-700">
          Es también llamada esterilización masculina y anticoncepción quirúrgica masculina. Es seguro, rápido y sólo puede ser efectuado por personal capacitado.
        </p>
      </section>

      <section className="mb-8 bg-white p-5 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">MECANISMO DE ACCIÓN</h2>
        <p className="text-gray-700">
          El bloqueo e interrupción en la continuidad de los dos conductos deferentes impide que los espermatozoides puedan ser almacenados normalmente, evitando su presencia en el semen. Por tanto, al no haber espermatozoides en el semen, se eyacula el semen pero no puede generar embarazo. No hay interferencia con las erecciones ni con la eyaculación.
        </p>
      </section>

      <section className="mb-8 bg-green-50 p-5 rounded-lg">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">CARACTERÍSTICAS</h2>
        <div className="mb-4">
          <h3 className="font-medium text-gray-800 mb-2">Es apropiado para:</h3>
          <p className="text-gray-700">
            Varones que han completado sus expectativas reproductivas y que desean un método permanente y altamente efectivo.
          </p>
        </div>
        <div>
          <h3 className="font-medium text-gray-800 mb-2">Comparada con la esterilización quirúrgica voluntaria femenina, la vasectomía es:</h3>
          <ul className="list-disc pl-6 space-y-1 text-gray-700">
            <li>Probablemente más efectiva y segura</li>
            <li>Más fácil de realizar</li>
            <li>Si tiene algún costo, éste es frecuentemente menor</li>
            <li>Se puede verificar la efectividad en cualquier momento</li>
            <li>Si la pareja llega a quedar embarazada, la probabilidad de que ese embarazo sea ectópico es menor que el embarazo ocurrido en una mujer que ha sido esterilizada</li>
          </ul>
        </div>
      </section>

      <section className="bg-yellow-50 p-5 rounded-lg border-l-4 border-yellow-400">
        <h2 className="text-2xl font-semibold mb-3 text-blue-800">RETORNO DE LA FERTILIDAD</h2>
        <p className="text-gray-700">
          El procedimiento se considera permanente y probablemente no pueda revertirse.
        </p>
      </section>
                            <div className='w-[60%] mx-auto'>
                              <VideoCard  title="" src="https://www.youtube.com/embed/JkLc27sqruM" />
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
