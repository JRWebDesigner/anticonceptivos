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

export default function NatPage(){
  const [activeTab, setActiveTab] = useState<string>("calendario");
  
   const methodTabs = [
    { id: "calendario", label: "Calendario" },
    { id: "temperatura", label: "Temperatura Basal" },
    { id: "cervical", label: "Moco Cervical" },
    { id: "retiro", label: "Retiro" },
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
       <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">Métodos Naturales</h1>
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
                    {activeTab === "calendario" && (
                      <>
                        <h2 className="text-2xl md:text-4xl font-bold text-indigo-700 mb-6">MÉTODO DEL CALENDARIO O MÉTODO DEL RITMO</h2>
                        <Image src="/images/calendario.jpg" alt="Métodos Naturales" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                          <div className="p-4 max-w-3xl mx-auto">     
      <h3 className="text-xl font-medium mb-2">Descripción</h3>
      <p className="mb-4">
        Este método se basa en el seguimiento de los ciclos menstruales de la mujer durante al menos seis meses para determinar los días fértiles. La mujer debe registrar la duración de sus ciclos menstruales y, con base en eso, calcular sus períodos fértiles.
      </p>
      
      <h3 className="text-xl font-medium mb-2">Modo de uso</h3>
      <p className="mb-2">
        Primero, se debe determinar el ciclo más corto y cuál el más largo dentro del registro de los últimos seis meses.
      </p>
      <p className="mb-2">
        Para calcular el primer día fértil, se resta 18 días a la duración del ciclo más corto. Ejemplo: Ciclo más corto – 18 días.
      </p>
      <p className="mb-2">
        Para calcular el último día fértil, se resta 11 días al ciclo más largo. Ejemplo: Ciclo más largo – 11 días.
      </p>
      <p className="mb-2">
        Una vez obtenido el rango de días fértiles, este debe trasladarse a las fechas correspondientes del calendario del mes en curso. Durante este intervalo, la pareja debe evitar el coito vaginal o, en su defecto, emplear un método de barrera para prevenir el embarazo.
      </p>
      <p className="mb-4">
        Este procedimiento debe repetirse mensualmente, siempre utilizando como referencia los últimos seis ciclos menstruales registrados, ya que la duración de los ciclos puede variar y, con ello, cambiar también los días de fertilidad.
      </p>
    </div>
    <div className='w-[60%] mx-auto'>
      <VideoCard  title="" src="https://www.youtube.com/embed/DO9d36pSqDY" />
    </div>
                        </div>
                      </>
                    )}
                    
                    {activeTab === "temperatura" && (
                      <>
                        <h2 className="text-2xl md:text-4xl font-bold text-indigo-700 mb-6">MÉTODO DE LA TEMPERATURA BASAL </h2>
                        <Image src="/images/temperatura.jpg" alt="Métodos de Barrera" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                          
      <section className="mb-6 p-4">
        <h3 className="text-xl font-semibold mb-2">Descripción</h3>
        <p>
          Este método se basa en el monitoreo de la temperatura corporal basal,
          que aumenta después de la ovulación debido a la liberación de
          progesterona. Este aumento puede ser un indicador fiable de que la
          ovulación ha ocurrido.
        </p>
      </section>

      <section className="mb-6 p-4">
        <h3 className="text-xl font-semibold mb-2">Modo de uso</h3>
        <p>La mujer deberá seguir una serie de pasos específicos:</p>
        <ul className="list-disc list-inside mt-2 space-y-2">
          <li>Utilizar una planilla o gráfico para registrar diariamente su temperatura basal.</li>
          <li>Medirse la temperatura de manera oral, rectal o vaginal todos los días a la misma hora, inmediatamente al despertar y antes de levantarse de la cama. Además, deberá saber cómo interpretar el termómetro y registrar correctamente la medición en la planilla.</li>
          <li>Observar si se produce un aumento en la temperatura de entre 0.2°C y 0.5°C, cambio que suele presentarse en torno a la mitad del ciclo menstrual, indicando la ovulación.</li>
          <li>Tomar como referencia el primer día de la menstruación como el inicio del ciclo (día uno) y plasmar cada medición diaria mediante un punto en la planilla, en el cuadro correspondiente al día del ciclo y al valor de temperatura registrado.</li>
          <li>Unir los puntos de forma secuencial, generando una línea continua que abarcará desde el primer día del ciclo hasta el último. Con cada nueva menstruación, deberá iniciarse una planilla nueva.</li>
          <li>Durante el ciclo, la mujer deberá abstenerse de tener coitos vaginales hasta que observe un aumento sostenido de su temperatura por tres días consecutivos. Esto confirmará que la ovulación ya ocurrió.</li>
          <li>Una vez que se complete el tercer día de temperatura elevada, se considera que comienza la fase infértil, y podrá mantener relaciones sexuales sin necesidad de protección adicional durante aproximadamente 10 a 12 días, hasta que se inicie el siguiente ciclo menstrual.</li>
        </ul>
      </section>
      <div className='w-[60%] mx-auto'>
      <VideoCard  title="" src="https://www.youtube.com/embed/pynVmsYmu9k" />
    </div>
                        </div>
                      </>
                    )}
                    
                    {activeTab === "cervical" && (
                      <>
                        <h2 className="text-2xl md:text-4xl font-bold text-indigo-700 mb-6">MÉTODO DEL MOCO CERVICAL</h2>
                        <Image src="/images/cervical.jpg" alt="Métodos Hormonales" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                          <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Descripción</h2>
        <p className="text-gray-700">
          Este método se basa en la observación de los cambios en el moco cervical que ocurren a lo largo del ciclo menstrual, influenciados por los niveles de estrógeno. El moco cervical se vuelve más abundante y fluido antes de la ovulación, lo que facilita el paso del esperma.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Mecanismo de acción</h2>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2 text-blue-600">Periodo infértil</h3>
          <p className="text-gray-700">
            Después de la menstruación, la mujer experimenta varios días secos, sin moco cervical visible. En este momento, el moco es espeso y pegajoso, formando un tapón en el cuello del útero que bloquea el paso del esperma.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2 text-blue-600">Periodo fértil</h3>
          <p className="text-gray-700">
            Los niveles de estrógeno aumentan, comienza a aparecer una pequeña cantidad de moco en la vagina. Inicialmente es escaso, y la mujer puede sentir algo de humedad o pegajosidad en la vulva. A medida que se acerca la ovulación, el moco se vuelve más elástico, transparente, delgado y similar a la clara de huevo. Es una señal de fertilidad, y el último día en que se observa este tipo de moco se conoce como el &quot;día pico&quot; del moco cervical.
          </p>
        </div>
        
        <div className="mb-6">
          <h3 className="text-xl font-medium mb-2 text-blue-600">Periodo infértil</h3>
          <p className="text-gray-700">
            Tras tres días la sensación de lubricación desaparece y la mujer vuelve a experimentar una sensación pegajosa en la vulva, seguida de sequedad. El moco se vuelve espeso y pegajoso, o puede no haber moco visible en absoluto, lo que indica el retorno a la fase seca post-ovulatoria.
          </p>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-3">Modo de uso</h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          <li>Durante el periodo infértil, al inicio del ciclo menstrual, la pareja puede tener relaciones sexuales sin riesgo de embarazo.</li>
          <li>Durante el periodo fértil, la pareja debe evitar tener relaciones sexuales vaginales y, si lo desean, usar un método de barrera hasta al menos cuatro días después del &quot;día pico&quot; del moco cervical.</li>
          <li>En el periodo infértil, al final del ciclo menstrual, la pareja puede tener relaciones sexuales sin precaución hasta que inicie el sangrado menstrual nuevamente.</li>
          <li>Se recomienda evitar las relaciones sexuales sin protección durante la menstruación, ya que puede ser difícil identificar claramente el moco cervical. Sin embargo, las probabilidades de embarazo durante los primeros 5-6 días del ciclo son mínimas.</li>
          <li>Una vez que termina la menstruación y la mujer no presenta flujo durante varios días, generalmente el coito vaginal se considera seguro.</li>
          <li>Entre el final de la menstruación y el comienzo del moco cervical, la pareja puede tener relaciones sexuales sin protección, pero no en días consecutivos, ya que al evitar el coito el segundo día se le da tiempo al esperma para desaparecer y observar el moco cervical.</li>
          <li>Se recomienda que las relaciones sexuales se realicen al final de la tarde, después de que la mujer haya estado de pie por varias horas y pueda revisar el moco cervical.</li>
        </ul>
      </section>
        <div className='w-[60%] mx-auto'>
      <VideoCard  title="" src="https://www.youtube.com/embed/_5s5dN5-LPI" />
    </div>
                        </div>
                      </>
                    )}
                    
                    {activeTab === "retiro" && (
                      <>
                        <h2 className="text-2xl md:text-4xl font-bold text-indigo-700 mb-6">MÉTODO DEL RETIRO</h2>
                        <Image src="/images/retiro.jpg" alt="DIU" width={500} height={500} className="rounded-xl mb-6 mx-auto" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                         <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Descripción</h2>
        <p className="text-gray-700">
          Este es uno de los métodos más antiguos, que consiste en retirar el pene de la vagina antes de la eyaculación para evitar que el semen entre en contacto con los genitales de la mujer.
        </p>
      </section>
      
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-3">Eficacia</h2>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-gray-700">
            <strong>Con uso perfecto:</strong> 96% efectivo (4 de cada 100 mujeres quedarán embarazadas en un año)
          </p>
          <p className="text-gray-700 mt-2">
            <strong>Con uso típico:</strong> 78% efectivo (22 de cada 100 mujeres quedarán embarazadas en un año)
          </p>
        </div>
      </section>
      
      <section>
        <h2 className="text-2xl font-semibold mb-3">Modo de uso</h2>
        <ul className="list-disc pl-6 space-y-3 text-gray-700">
          <li>Este método puede emplearse en cualquier momento del ciclo menstrual.</li>
          <li>El hombre debe retirar su pene de la vagina completamente antes de eyacular.</li>
          <li>Se debe evitar que el semen entre en contacto con los genitales externos de la mujer.</li>
          <li>Si el hombre ha eyaculado previamente, debe orinar y limpiar la punta del pene para eliminar posibles restos de esperma antes de la relación sexual.</li>
          <li>Requiere un alto nivel de control y comunicación entre la pareja.</li>
          <li>No protege contra infecciones de transmisión sexual (ITS).</li>
        </ul>
        
      </section>
       <div className='w-[60%] mx-auto'>
      <VideoCard  title="" src="https://www.youtube.com/embed/-11UL3hlt7M" />
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
