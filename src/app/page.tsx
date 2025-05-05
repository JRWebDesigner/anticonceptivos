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

export default function HomePage() {
  const [expandedIntro, setExpandedIntro] = useState(true);
  const [showQuestionnaireModal, setShowQuestionnaireModal] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Efecto para mostrar el cuestionario si no está completado
  useEffect(() => {
    const completed = localStorage.getItem("questionnaireCompleted");
    if (!completed) setShowQuestionnaireModal(true);
  }, []);

  // Efecto para manejar el scroll suave y activar secciones
  useEffect(() => {
    const handleSmoothScroll = (e: Event) => {
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

    const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
    links.forEach(link => link.addEventListener('click', handleSmoothScroll as EventListener));

    return () => {
      links.forEach(link => link.removeEventListener('click', handleSmoothScroll as EventListener));
    };
  }, []);

  // Efecto para observar la intersección de secciones
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.5 }
    );

    navItems.forEach(item => {
      const section = document.getElementById(item.id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const renderModal = () => (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.3 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-white p-6 rounded-xl shadow-xl border border-indigo-300 max-w-md w-full"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-indigo-800">Cuestionario Inicial</h3>
        </div>
        <p className="mb-4">Por favor complete este breve cuestionario para ayudarnos a personalizar su experiencia.</p>
        <Link href="/cuestionario">
          <Button className="w-full">Ir al Cuestionario</Button>
        </Link>
      </motion.div>
    </AnimatePresence>
  );

  const renderMethodsSection = () => (
    <section id="methods" className="flex justify-center items-center gap-6 flex-wrap">
      {[
        { href: '/naturales', src: '/images/naturales.jpg', title: 'Métodos Naturales' },
        { href: '/barrera', src: '/images/barrera.jpg', title: 'Métodos de Barrera' },
        { href: '/hormonales', src: '/images/hormonales.jpg', title: 'Métodos Hormonales' },
        { href: '/diu', src: '/images/diu.jpg', title: 'Dispositivos Intrauterinos (DIU)' },
        { href: '/permanentes', src: '/images/permanentes.jpg', title: 'Métodos Permanentes' },
      ].map(({ href, src, title }, i) => (
        <Link key={href} href={href}>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="relative w-[300px] h-[300px] rounded-2xl overflow-hidden shadow-xl group cursor-pointer"
          >
            <Image
              src={src}
              alt={title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/70 via-pink-500/40 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 z-10">
              <h2 className="text-white text-3xl font-semibold tracking-tight drop-shadow-lg">
                {title}
              </h2>
            </div>
          </motion.div>
        </Link>
      ))}
    </section>
  );

  return (
    <main className="relative bg-fixed bg-[url('/bg-pattern.svg')] bg-cover min-h-screen py-20 px-4 md:px-12 text-gray-900">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="max-w-5xl mx-auto"
      >
        <header className={`text-center mb-20 ${showQuestionnaireModal ? "opacity-20" : ""}`}>
          <Image src="/logo.png" alt="Logo" width={180} height={180} className="mx-auto mb-4" />
          <h1 className="text-3xl md:text-6xl font-extrabold text-indigo-800 drop-shadow-sm leading-tight">
            Guía de Métodos Anticonceptivos
          </h1>
        </header>
        
        <nav className={`block md:sticky top-0 z-50 bg-white/80 backdrop-blur-md py-4 mb-12 border-b border-indigo-200 shadow-sm ${showQuestionnaireModal ? "opacity-20" : ""}`}>
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

        {showQuestionnaireModal && renderModal()}

        <div className={`space-y-32 ${showQuestionnaireModal ? 'opacity-0': ''}`}>
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
                  <p>Según la OMS, el embarazo adolescente es un problema global vinculado a factores como pobreza, baja educación, abuso infantil y matrimonio precoz. Estos embarazos tienen consecuencias negativas para la salud, la sociedad y la economía.</p>
                  <p>En Bolivia, datos del Sistema Nacional de Información en Salud (SNIS) muestran una disminución sostenida de embarazos en adolescentes de 10 a 19 años.</p>
                  <img src='/images/introduccion.jpg' className="w-[360px] h-[350px] mx-auto rounded-3xl" />
                  <p className="text-gray-700">Se registró una disminución del <strong>28.07%</strong> en la gestión 2018 y del <strong>14.28%</strong> hasta la gestión 2023.</p>
                </div>
              )}
            </Section>
          </section>

          {renderMethodsSection()}

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
