"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
}

const Button = ({ children, className = '', ...props }: ButtonProps) => (
  <button
    className={`bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

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

interface SectionProps {
  title: string;
  image: string;
  delay: number;
  children: React.ReactNode;
  id?: string;
  isExpanded?: boolean;
  onToggle?: () => void;
}

function Section({ title, image, delay, children, id, isExpanded = true, onToggle }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg border border-indigo-200 scroll-mt-32"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold text-indigo-700 mb-6">{title}</h2>
        {onToggle && (
          <button 
            onClick={onToggle}
            className="text-indigo-600 hover:text-indigo-800 text-lg"
          >
            {isExpanded ? 'Ocultar' : 'Mostrar'}
          </button>
        )}
      </div>
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Image src={image} alt={title} width={1000} height={500} className="rounded-xl mb-6" />
            <div className="text-lg leading-relaxed text-gray-800 space-y-4">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

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

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>("intro");
  const [activeTab, setActiveTab] = useState<string>("naturales");
  const [expandedIntro, setExpandedIntro] = useState(true);
const [showQuestionnaire, setShowQuestionnaire] = useState(true);
const [questionnaireCompleted, setQuestionnaireCompleted] = useState(false);
  const methodTabs = [
    { id: "naturales", label: "Naturales" },
    { id: "barrera", label: "Barrera" },
    { id: "hormonales", label: "Hormonales" },
    { id: "diu", label: "DIU" },
    { id: "permanentes", label: "Permanentes" },
  ];

  const videos = [
  {
    title: "Métodos Anticonceptivos Naturales",
    src: "https://www.youtube.com/embed/_5s5dN5-LPI"
  },
  {
    title: "Métodos de Barrera",
    src: "https://www.youtube.com/embed/SBXwN1RSoXE"
  },
  {
    title: "Métodos Hormonales",
    src: "https://www.youtube.com/embed/cTLhUk7BlEA"
  },
  {
    title: "Métodos Hormonales",
    src: "https://www.youtube.com/embed/SqG7j8c-7zc"
  },
  {
    title: "Métodos DIU",
    src: "https://www.youtube.com/embed/AeIa0-odX6M"
  }
];

  useEffect(() => {
    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    
    const handleClick = (e: Event) => {
      e.preventDefault();
      const targetId = (e.currentTarget as HTMLAnchorElement).getAttribute('href')?.replace('#', '') || '';
      setActiveSection(targetId);
      
      const target = document.querySelector(`#${targetId}`);
      if (target) {
        window.scrollTo({
          top: (target as HTMLElement).offsetTop - 100,
          behavior: 'smooth'
        });
      }
    };

    links.forEach(link => {
      link.addEventListener('click', handleClick as EventListener);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleClick as EventListener);
      });
    };
  }, []);

  useEffect(() => {
    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5
    };

    const handleIntersection: IntersectionObserverCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    navItems.forEach(item => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <main className="bg-fixed bg-[url('/bg-pattern.svg')] bg-cover min-h-screen py-20 px-4 md:px-12 text-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto"
      >
        <header className="text-center mb-20">
          <Image src="/logo.png" alt="Logo" width={180} height={180} className="mx-auto mb-4" />
          <h1 className="text-3xl md:text-6xl font-extrabold text-indigo-800 drop-shadow-sm leading-tight">
            Guía de Métodos Anticonceptivos
          </h1>
        </header>
        
        <nav className="block md:sticky top-0 z-50 bg-white/80 backdrop-blur-md py-4 mb-12 border-b border-indigo-200 shadow-sm">
          <div className="flex flex-wrap justify-center gap-4">
            {navItems.map(item => (
              <Link
                key={item.id}
                href={`#${item.id}`}
                className={`px-4 py-2 rounded-lg transition font-semibold ${
                  activeSection === item.id
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-indigo-100 hover:bg-indigo-200 text-indigo-800"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>      
        {/* Questionnaire Modal */}
<AnimatePresence>
  {showQuestionnaire && !questionnaireCompleted && (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white p-6 rounded-xl shadow-xl border border-indigo-300 max-w-md w-full"
    >
      <div className="mb-4">
        <h3 className="text-xl font-bold text-indigo-800">Cuestionario Inicial</h3>
      </div>
      <p className="mb-4">Debe completar este cuestionario para acceder al contenido.</p>
      <Link href="/cuestionario">
        <Button className="w-full">Ir al Cuestionario</Button>
      </Link>
    </motion.div>
  )}
</AnimatePresence>

        <div className={`space-y-32 ${!questionnaireCompleted ? 'opacity-50 pointer-events-none' : ''}`}>
          {/* Introduction Section */}
          <section id="intro" className="scroll-mt-32">
            <Section
              title="Introducción"
              image="/images/intro.jpg"
              delay={0.05}
              isExpanded={expandedIntro}
              onToggle={() => setExpandedIntro(!expandedIntro)}
            >
              <p>El conocimiento sobre anticoncepción es fundamental para tomar decisiones informadas sobre salud sexual y reproductiva. Esta guía está dirigida a profesionales de la salud, educadores y a cualquier persona interesada en conocer sus opciones de planificación familiar.</p>
              {expandedIntro && (
                <div className="mt-4 space-y-4">
                  <p className="mb-4">
      Según la Organización Mundial de la Salud, el embarazo adolescente es un fenómeno 
      que ocurre a nivel mundial, con causas que son conocidas y que traen graves consecuencias 
      para la salud, la sociedad y la economía. El embarazo adolescente es más frecuente en 
      personas con menor educación o de bajo estatus económico. Esto también puede ser causado 
      por el matrimonio infantil y el abuso sexual de niñas. Además, está acompañado de los 
      obstáculos para obtener y usar anticonceptivos que eviten embarazos no deseados.
    </p>

    <p className=" mb-4">
      De acuerdo con el Sistema Nacional de Información en Salud (SNIS), los indicadores de 
      embarazos en adolescentes de entre 10 y 19 años registraron una disminución en los 
      últimos 9 años, observándose lo siguiente:
    </p>

    <ul className="list-disc list-inside space-y-2 mb-6">
      <li><strong>2015:</strong> 82.416 embarazos</li>
      <li><strong>2016:</strong> 68.916 embarazos</li>
      <li><strong>2017:</strong> 60.850 embarazos</li>
      <li><strong>2018:</strong> 56.910 embarazos</li>
      <li><strong>2019:</strong> 49.044 embarazos</li>
      <li><strong>2020:</strong> 39.470 embarazos</li>
      <li><strong>2021:</strong> 39.747 embarazos</li>
      <li><strong>2022:</strong> 35.470 embarazos</li>
      <li><strong>2023:</strong> 32.660 embarazos</li>
    </ul>

    <p className="text-gray-700">
      Se registró una disminución del <strong>28.07%</strong> en la gestión 2018 y del <strong>14.28%</strong> hasta la gestión 2023.
    </p>
                </div>
              )}
            </Section>
          </section>

          {/* Methods Section with Tabs */}
          <section id="methods" className="scroll-mt-32">
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
                    {activeTab === "naturales" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">Métodos Naturales</h2>
                        <Image src="/images/naturales.jpg" alt="Métodos Naturales" width={1000} height={500} className="rounded-xl mb-6" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                          <p>Estos métodos se basan en la observación y comprensión del ciclo menstrual para identificar los días fértiles y evitar relaciones sexuales en esos períodos. Requieren disciplina y conocimiento del cuerpo.</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li><strong>Método de la Amenorrea por Lactancia (MELA):</strong> Utiliza la lactancia exclusiva como método anticonceptivo durante los primeros seis meses posparto. Tiene una eficacia del 98% cuando se aplica correctamente.</li>
                            <li><strong>Método del Ritmo o Calendario:</strong> Consiste en calcular los días fértiles basándose en la duración de ciclos menstruales anteriores. Tiene una eficacia aproximada del 76%.</li>
                            <li><strong>Temperatura Basal Corporal:</strong> Implica medir la temperatura corporal cada mañana antes de levantarse para detectar el aumento que indica ovulación. Es más eficaz cuando se combina con otros métodos naturales.</li>
                            <li><strong>Método del Moco Cervical (Billings):</strong> Se basa en observar los cambios en el moco cervical para identificar la ovulación.</li>
                            <li><strong>Método Sintotérmico:</strong> Combina la observación de la temperatura basal, el moco cervical y otros signos físicos para determinar los días fértiles. Es uno de los métodos naturales más fiables.</li>
                            <li><strong>Método del Retiro (Coitus Interruptus):</strong> Consiste en retirar el pene de la vagina antes de la eyaculación. Tiene una eficacia del 78% en uso típico.</li>
                          </ul>
                          <p className="text-red-600">Nota: Estos métodos no protegen contra infecciones de transmisión sexual (ITS) y requieren compromiso y educación adecuada para su efectividad.</p>
                        </div>
                      </>
                    )}
                    
                    {activeTab === "barrera" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">Métodos de Barrera</h2>
                        <Image src="/images/barrera.jpg" alt="Métodos de Barrera" width={1000} height={500} className="rounded-xl mb-6" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                          <p>Estos métodos impiden físicamente que los espermatozoides lleguen al óvulo. Algunos también ofrecen protección contra ITS.</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li><strong>Condón Masculino:</strong> Funda delgada que se coloca sobre el pene erecto. Eficacia del 85% en uso típico. Protege contra ITS.</li>
                            <li><strong>Condón Femenino:</strong> Funda que se inserta en la vagina antes del coito. Eficacia del 79%. También protege contra ITS.</li>
                            <li><strong>Diafragma:</strong> Copa flexible que se inserta en la vagina para cubrir el cuello uterino. Eficacia del 88% cuando se usa con espermicida.</li>
                            <li><strong>Capuchón Cervical:</strong> Similar al diafragma pero más pequeño. Eficacia entre 71% y 86%, dependiendo de si la mujer ha tenido partos.</li>
                            <li><strong>Esponja Anticonceptiva:</strong> Esponja suave impregnada con espermicida que se coloca en la vagina. Eficacia del 76% al 88%.</li>
                            <li><strong>Espermicidas:</strong> Sustancias químicas que inmovilizan o matan espermatozoides. Eficacia del 72% cuando se usan solos; se recomienda combinarlos con otros métodos de barrera.</li>
                          </ul>
                          <p className="text-red-600">Errores frecuentes: Muchos piensan que todos los anticonceptivos previenen ITS, pero solo los métodos de barrera ofrecen esta protección.</p>
                        </div>
                      </>
                    )}
                    
                    {activeTab === "hormonales" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">Métodos Hormonales</h2>
                        <Image src="/images/hormonales.jpg" alt="Métodos Hormonales" width={1000} height={500} className="rounded-xl mb-6" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                          <p>Los métodos anticonceptivos hormonales utilizan hormonas sintéticas para prevenir el embarazo. Estos métodos pueden contener una combinación de estrógeno y progestina o solo progestina, y actúan principalmente inhibiendo la ovulación, espesando el moco cervical y alterando el endometrio para evitar la implantación.</p>
                          <ul className="list-disc list-inside space-y-1">
                            <li><strong>Píldoras Anticonceptivas Combinadas:</strong> Contienen estrógeno y progestina. Uso diario durante 21 días, seguidos de 7 días de descanso o placebo. Más del 99% de eficacia con uso correcto.</li>
                            <li><strong>Minipíldora (Progestina sola):</strong> Solo progestina. Uso diario a la misma hora sin interrupciones. 99% de eficacia. Apta durante la lactancia.</li>
                            <li><strong>Parche Anticonceptivo:</strong> Parche transdérmico que libera hormonas. Se aplica semanalmente por tres semanas, con una semana de descanso. Aproximadamente 99% eficaz.</li>
                            <li><strong>Anillo Vaginal:</strong> Anillo flexible insertado en la vagina por tres semanas. Libera hormonas. 99% de eficacia.</li>
                            <li><strong>Inyecciones Anticonceptivas:</strong> Inyecciones de progestina aplicadas cada 8 a 12 semanas por personal médico. Más del 99% de eficacia.</li>
                            <li><strong>Implante Subdérmico:</strong> Pequeña varilla colocada bajo la piel del brazo. Libera progestina por 3 a 5 años. Eficacia cercana al 99.95%.</li>
                          </ul>
                          <p className="text-red-600">Consideraciones: No protegen contra ITS. Algunos métodos pueden causar efectos secundarios hormonales o aumento del riesgo de trombosis. Consulta médica recomendada.</p>
                        </div>
                      </>
                    )}
                    
                    {activeTab === "diu" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">Dispositivos Intrauterinos (DIU)</h2>
                        <Image src="/images/diu.jpg" alt="DIU" width={1000} height={500} className="rounded-xl mb-6" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                          <ul className="list-disc list-inside space-y-1">
                            <li><strong>DIU de Cobre:</strong> Dispositivo plástico en forma de T recubierto de cobre. Funciona como espermicida. Dura hasta 10 años. Más del 99% de eficacia.</li>
                            <li><strong>DIU Hormonal:</strong> Libera una pequeña cantidad de progestina en el útero. Espesa el moco cervical, inhibe la ovulación. Dura de 3 a 8 años. 99% de eficacia.</li>
                          </ul>
                          <p className="text-red-600">Ventajas: Alta eficacia, larga duración, reversibilidad rápida. No protegen contra ITS. El de cobre puede aumentar el sangrado los primeros meses.</p>
                        </div>
                      </>
                    )}
                    
                    {activeTab === "permanentes" && (
                      <>
                        <h2 className="text-4xl font-bold text-indigo-700 mb-6">Métodos Permanentes</h2>
                        <Image src="/images/permanentes.jpg" alt="Métodos Permanentes" width={1000} height={500} className="rounded-xl mb-6" />
                        <div className="text-lg leading-relaxed text-gray-800 space-y-4">
                          <ul className="list-disc list-inside space-y-1">
                            <li><strong>Ligadura de Trompas:</strong> Procedimiento quirúrgico para bloquear trompas de Falopio. Más del 99% de eficacia. Procedimiento ambulatorio.</li>
                            <li><strong>Vasectomía:</strong> Procedimiento quirúrgico que bloquea conductos deferentes. Casi 100% eficaz. Ambulatorio, 20 minutos de duración.</li>
                          </ul>
                          <p className="text-red-600">Ventajas: Permanentes, sin mantenimiento continuo, no afectan relaciones sexuales. Riesgos quirúrgicos y no protegen contra ITS. Reversibilidad no siempre garantizada.</p>
                        </div>
                      </>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </section>

          {/* Videos Section */}
          <section id="videos" className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg border border-indigo-200"
            >
              <h2 className="text-4xl font-bold text-indigo-700 mb-6">Videos Educativos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((video, index) => (
                  <VideoCard key={index} title={video.title} src={video.src} />
                ))}
              </div>
            </motion.div>
          </section>

          {/* Questionnaire Section */}
          <section id="questionnaire" className="scroll-mt-32">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg border border-indigo-200 text-center"
            >
              <h2 className="text-4xl font-bold text-indigo-700 mb-6">Cuestionario</h2>
              <p className="text-lg mb-8">Complete nuestro cuestionario para evaluar su conocimiento sobre métodos anticonceptivos y recibir recomendaciones personalizadas.</p>
              <Link href="/cuestionario">
                <Button className="text-lg mx-auto">Comenzar Cuestionario</Button>
              </Link>
            </motion.div>
          </section>
        </div>
      </motion.div>
    </main>
  );
                                                                                                                                                                        }
