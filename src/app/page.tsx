"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
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
  { title: "Introducción", id: "" },
  { title: "1. Métodos Naturales", id: "naturales" },
  { title: "2. Métodos de Barrera", id: "barrera" },
  { title: "3. Métodos Hormonales", id: "hormonales" },
  { title: "4. Dispositivos Intrauterinos", id: "diu" },
  { title: "5. Métodos Permanentes", id: "permanentes" },
];

interface SectionProps {
  title: string;
  image: string;
  delay: number;
  children: React.ReactNode;
  id?: string;
}

function Section({ title, image, delay, children, id }: SectionProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6 }}
      viewport={{ once: true }}
      className="bg-white/90 backdrop-blur-md p-8 rounded-xl shadow-lg border border-indigo-200 scroll-mt-32"
    >
      <h2 className="text-4xl font-bold text-indigo-700 mb-6">{title}</h2>
      <Image src={image} alt={title} width={1000} height={500} className="rounded-xl mb-6" />
      <div className="text-lg leading-relaxed text-gray-800 space-y-4">{children}</div>
    </motion.section>
  );
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState<string>("");


useEffect(() => {
  const links = document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]');
  
  const handleClick = (e: Event) => {
    e.preventDefault();
    const target = document.querySelector((e.currentTarget as HTMLAnchorElement).getAttribute('href') || '');
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
      if (item.id) {
        const section = document.getElementById(item.id);
        if (section) observer.observe(section);
      } else {
        const introSection = document.querySelector('section:first-of-type');
        if (introSection) observer.observe(introSection);
      }
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
          <Image src="/logo.png" alt="Logo" width={100} height={100} className="mx-auto mb-4" />
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
                  activeSection === item.id || 
                  (item.id === "" && activeSection === "")
                    ? "bg-indigo-600 text-white shadow-md"
                    : "bg-indigo-100 hover:bg-indigo-200 text-indigo-800"
                }`}
              >
                {item.title}
              </Link>
            ))}
          </div>
        </nav>
        
       <section className="space-y-32">
          <Section
            title="Introducción"
            image="/images/intro.jpg"
            delay={0.05}
          >
            <p>El conocimiento sobre anticoncepción es fundamental para tomar decisiones informadas sobre salud sexual y reproductiva. Esta guía está dirigida a profesionales de la salud, educadores y a cualquier persona interesada en conocer sus opciones de planificación familiar.</p>
          </Section>

          <Section id='naturales' title="1. Métodos Naturales" image="/images/naturales.jpg" delay={0.1}>
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
          </Section>

          <Section id='barrera' title="2. Métodos de Barrera" image="/images/barrera.jpg" delay={0.15}>
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
          </Section>

          <Section id='hormonales' title="3. Métodos Hormonales" image="/images/hormonales.jpg" delay={0.2}>
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
          </Section>

          <Section id='diu' title="4. Dispositivos Intrauterinos (DIU)" image="/images/diu.jpg" delay={0.25}>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>DIU de Cobre:</strong> Dispositivo plástico en forma de &quot;T&quot; recubierto de cobre. Funciona como espermicida. Dura hasta 10 años. Más del 99% de eficacia.</li>
              <li><strong>DIU Hormonal:</strong> Libera una pequeña cantidad de progestina en el útero. Espesa el moco cervical, inhibe la ovulación. Dura de 3 a 8 años. 99% de eficacia.</li>
            </ul>
            <p className="text-red-600">Ventajas: Alta eficacia, larga duración, reversibilidad rápida. No protegen contra ITS. El de cobre puede aumentar el sangrado los primeros meses.</p>
          </Section>

          <Section id='permanentes' title="5. Métodos Permanentes" image="/images/permanentes.jpg" delay={0.3}>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Ligadura de Trompas:</strong> Procedimiento quirúrgico para bloquear trompas de Falopio. Más del 99% de eficacia. Procedimiento ambulatorio.</li>
              <li><strong>Vasectomía:</strong> Procedimiento quirúrgico que bloquea conductos deferentes. Casi 100% eficaz. Ambulatorio, 20 minutos de duración.</li>
            </ul>
            <p className="text-red-600">Ventajas: Permanentes, sin mantenimiento continuo, no afectan relaciones sexuales. Riesgos quirúrgicos y no protegen contra ITS. Reversibilidad no siempre garantizada.</p>
          </Section>
        </section>

        <div className="mt-24 text-center">
          <Link href="/cuestionario">
            <Button className="text-lg">Ir al Cuestionario</Button>
          </Link>
        </div>
      </motion.div>
    </main>
  );
}
