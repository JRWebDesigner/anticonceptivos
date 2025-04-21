"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const Button = ({ children, className = '', ...props }) => (
  <button
    className={`bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);

export default function HomePage() {
  return (
    <main className="bg-gradient-to-b from-indigo-100 to-white min-h-screen py-12 px-6">
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-indigo-700 mb-6 text-center">
          Guía de Métodos Anticonceptivos
        </h1>
        <p className="text-lg text-gray-700 mb-10 text-center">
          El conocimiento sobre anticoncepción es fundamental para tomar decisiones informadas sobre salud sexual y reproductiva. Esta guía está dirigida a profesionales de la salud, educadores y a cualquier persona interesada en conocer sus opciones de planificación familiar.
        </p>

        <div className="space-y-12 text-gray-800">
          <Section title="1. Métodos Naturales" delay={0.2}>
            <p className="mb-2">Estos métodos se basan en la observación y comprensión del ciclo menstrual para identificar los días fértiles y evitar relaciones sexuales en esos períodos. Requieren disciplina y conocimiento del cuerpo.</p>
            <ul className="list-disc list-inside ml-4">
              <li><strong>MELA:</strong> Lactancia exclusiva como anticonceptivo durante los primeros seis meses posparto. Eficacia del 98%.</li>
              <li><strong>Ritmo:</strong> Cálculo de días fértiles basado en ciclos menstruales anteriores. Eficacia del 76%.</li>
              <li><strong>Temperatura Basal:</strong> Medición diaria antes de levantarse para detectar ovulación.</li>
              <li><strong>Método del Moco Cervical (Billings):</strong> Observación de cambios en el moco cervical.</li>
              <li><strong>Sintotérmico:</strong> Combinación de temperatura, moco y otros signos físicos.</li>
              <li><strong>Coitus interruptus:</strong> Retiro del pene antes de eyacular. Eficacia del 78% en uso típico.</li>
            </ul>
            <p className="mt-2 text-sm text-red-600">Nota: No protegen contra ITS y requieren educación adecuada.</p>
          </Section>

          <Section title="2. Métodos de Barrera" delay={0.3}>
            <p className="mb-2">Impedimento físico del paso de espermatozoides al óvulo. Algunos protegen contra ITS.</p>
            <ul className="list-disc list-inside ml-4">
              <li><strong>Condón Masculino:</strong> Funda que cubre el pene. Eficacia del 85%.</li>
              <li><strong>Condón Femenino:</strong> Funda que se inserta en la vagina. Eficacia del 79%.</li>
              <li><strong>Diafragma:</strong> Copa flexible que cubre el cuello uterino. Eficacia del 88% con espermicida.</li>
              <li><strong>Capuchón Cervical:</strong> Más pequeño que el diafragma. Eficacia del 71% al 86%.</li>
              <li><strong>Esponja Anticonceptiva:</strong> Esponja impregnada con espermicida. Eficacia del 76% al 88%.</li>
              <li><strong>Espermicidas:</strong> Sustancias químicas que inmovilizan espermatozoides. Eficacia del 72% usados solos.</li>
            </ul>
            <p className="mt-2 text-sm text-red-600">Error común: No todos previenen ITS, solo los de barrera lo hacen.</p>
          </Section>

          <Section title="3. Métodos Hormonales" delay={0.4}>
            <p className="mb-2">Utilizan hormonas sintéticas que inhiben la ovulación, espesan el moco cervical y alteran el endometrio.</p>
            <ul className="list-disc list-inside ml-4">
              <li><strong>Píldoras combinadas:</strong> Estrógeno y progestina. Uso diario. >99% eficacia. Regulan ciclo, alivian dolor menstrual.</li>
              <li><strong>Minipíldora:</strong> Solo progestina. Uso diario a la misma hora. 99% eficacia. Apta en lactancia.</li>
              <li><strong>Parche:</strong> Libera hormonas vía piel. Semanal. 99% eficacia. No se ve afectado por vómitos.</li>
              <li><strong>Anillo vaginal:</strong> Flexible, se coloca por 3 semanas. 99% eficacia. Solo requiere atención mensual.</li>
              <li><strong>Inyecciones:</strong> Cada 8 a 12 semanas. Más del 99% eficaz. Aplicadas por profesional.</li>
              <li><strong>Implante subdérmico:</strong> Bajo la piel del brazo. Dura 3 a 5 años. 99.95% eficacia.</li>
            </ul>
            <p className="mt-2 text-sm text-red-600">No protegen contra ITS. Pueden causar efectos secundarios y requieren prescripción médica.</p>
          </Section>

          <Section title="4. Dispositivos Intrauterinos (DIU)" delay={0.5}>
            <ul className="list-disc list-inside ml-4">
              <li><strong>DIU de cobre:</strong> Plástico con cobre. Espermicida natural. Dura hasta 10 años. Eficacia >99%.</li>
              <li><strong>DIU hormonal:</strong> Libera progestina. Espesa moco cervical, adelgaza endometrio. 3 a 8 años. ~99% eficacia.</li>
            </ul>
            <p className="mt-2 text-sm">Ventajas: No requiere mantenimiento diario, alta eficacia, rápida reversibilidad.<br />Desventajas: Posibles cambios menstruales. No protegen contra ITS.</p>
          </Section>

          <Section title="5. Métodos Permanentes" delay={0.6}>
            <p className="mb-2">Procedimientos quirúrgicos para personas que no desean más hijos.</p>
            <ul className="list-disc list-inside ml-4">
              <li><strong>Ligadura de trompas:</strong> Bloqueo de trompas. >99% eficacia. Laparoscopia o minilaparotomía. Puede ser ambulatoria.</li>
              <li><strong>Vasectomía:</strong> Bloqueo de conductos deferentes. Anestesia local, 20 minutos. Casi 100% eficaz.</li>
            </ul>
            <p className="mt-2 text-sm">Ventajas: No afectan ciclo ni hormonas. Bajo mantenimiento. <br />Riesgos: Poca posibilidad de falla quirúrgica o reconexión. No protegen contra ITS.</p>
          </Section>
        </div>

        <div className="mt-16 text-center">
          <Link href="/">
            <Button className="text-lg">Ir al Cuestionario</Button>
          </Link>
        </div>
      </motion.section>
    </main>
  );
}

const Section = ({ title, children, delay = 0.2 }) => (
  <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay }} className="space-y-2">
    <h2 className="text-2xl font-semibold text-indigo-600 mb-2">{title}</h2>
    <div className="text-md leading-relaxed">{children}</div>
  </motion.div>
);

