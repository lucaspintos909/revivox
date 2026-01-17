"use client";

import { useState, memo } from "react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "¿Qué es una laptop reacondicionada?",
    answer:
      "Una laptop reacondicionada es un dispositivo que ha sido restaurado a su estado óptimo de funcionamiento. En RevivoX, cada laptop pasa por un riguroso proceso de inspección, limpieza, reparación y pruebas para garantizar su calidad y rendimiento.",
  },
  {
    question: "¿Qué garantía ofrecen en las laptops?",
    answer:
    "Todas nuestras laptops reacondicionadas incluyen una garantía de 6 meses. Durante este período, cubrimos cualquier defecto de fabricación o fallo en el funcionamiento normal del dispositivo.",
  },
  {
    question: "¿Cómo es el proceso de compra?",
    answer:
      "El proceso es simple: 1) Explora nuestro catálogo de laptops disponibles, 2) Selecciona el modelo que mejor se adapte a tus necesidades, 3) Realiza el pago de forma segura, 4) Recibe tu laptop en perfecto estado y lista para usar. Si no te sentis comodo con esta modalidad, nos podes escribir Whatsapp o Instagram",
  },
  {
    question: "¿Puedo probar la laptop antes de comprarla?",
    answer:
      "Sí, ofrecemos la posibilidad de probar la laptop antes de realizar la compra, tambien la puede venir a revisar un tecnico de tu confianza! Nuestro equipo estará disponible para resolver cualquier duda y demostrar el funcionamiento del dispositivo.",
  },
  {
    question: "¿Qué métodos de pago aceptan?",
    answer:
      "Aceptamos múltiples métodos de pago: efectivo, transferencia bancaria, mercado pago.",
  },
  {
    question: "¿Hacen envíos a todo el país?",
    answer:
      "Sí, realizamos envíos a todo Uruguay. El costo del envío varía según la ubicación y se calcula al momento de la compra. Para Montevideo, ofrecemos entrega sin cargo.",
  },
];

/**
 * Componente que muestra un ícono de más/menos
 * @component
 */
const PlusIcon = memo(({ className = "" }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 4.5v15m7.5-7.5h-15"
      />
    </svg>
  );
});

PlusIcon.displayName = 'PlusIcon';

/**
 * Componente que muestra una pregunta y respuesta individual
 * @component
 */
const FAQItem = memo(({ 
  faq, 
  isOpen, 
  onToggle 
}: { 
  faq: FAQItem; 
  isOpen: boolean; 
  onToggle: () => void;
}) => {
  return (
    <div className="overflow-hidden">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between bg-zinc-900/50 px-6 py-4 text-left transition-colors hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-[#FF8806] focus:ring-offset-2 focus:ring-offset-[#0F0F0F]"
        aria-expanded={isOpen}
        aria-controls={`faq-${faq.question}`}
      >
        <span className="text-[16px] font-medium text-white">
          {faq.question}
        </span>
        <span className="ml-6 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-zinc-700">
          <PlusIcon
            className={`h-3 w-3 text-white transition-transform duration-200 ${
              isOpen ? "rotate-45" : ""
            }`}
          />
        </span>
      </button>
      <div
        id={`faq-${faq.question}`}
        className={`grid transition-all duration-200 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
        role="region"
        aria-hidden={!isOpen}
      >
        <div className="overflow-hidden">
          <div className="bg-zinc-900/30 px-6 py-4 text-base text-zinc-400">
            {faq.answer}
          </div>
        </div>
      </div>
    </div>
  );
});

FAQItem.displayName = 'FAQItem';

/**
 * Componente que muestra la sección de preguntas frecuentes
 * @component
 */
const FAQ = memo(() => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="bg-[#0F0F0F] px-4 py-16 md:px-6 lg:px-8"
      aria-labelledby="faq-title"
    >
      <div className="mx-auto max-w-3xl">
        <h2 
          id="faq-title"
          className="mb-4 text-center text-4xl md:text-5xl font-medium text-white"
        >
          Preguntas frecuentes
        </h2>
        <p className="mb-12 text-center text-base text-zinc-500">
          Resolvemos tus dudas sobre nuestras laptops reacondicionadas y el proceso de compra.
        </p>
        <p className="mb-12 text-center text-base text-zinc-500">
          ¿Tenes alguna duda? Contactanos en{" "}
          <Link
            href="https://www.instagram.com/revivox.uy/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-200 hover:text-white underline"
          >
            Instagram
          </Link>{" "}
          o por{" "}
          <Link
            href="mailto:revivox@gmail.com"
            className="text-zinc-200 hover:text-white underline"
          >
            email
          </Link>
          .
        </p>

        <div className="space-y-[2px]" role="list">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() => toggleQuestion(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

FAQ.displayName = 'FAQ';

export default FAQ;
