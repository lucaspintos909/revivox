"use client";

import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { memo } from "react";
import { motion } from "framer-motion";

interface Testimonial {
  name: string;
  rating: number;
  text: string;
  role: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  // {
  //   name: "María G.",
  //   rating: 5,
  //   text: "Excelente servicio y atención. La laptop que compré funciona perfectamente y el proceso de compra fue muy sencillo. ¡Recomiendo totalmente!",
  //   role: "Estudiante",
  //   avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  // },
  // {
  //   name: "Carlos R.",
  //   rating: 5,
  //   text: "Increíble la calidad de las laptops reacondicionadas. Compré una Lenovo y parece nueva. El soporte post-venta es excelente.",
  //   role: "Desarrollador",
  //   avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  // },
  // {
  //   name: "Laura M.",
  //   rating: 5,
  //   text: "La mejor decisión que pude tomar. La laptop que compré superó mis expectativas y el precio fue muy accesible. ¡Gracias RevivoX!",
  //   role: "Diseñadora",
  //   avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80",
  // },
];

/**
 * Componente que muestra un testimonio individual
 * @component
 */
const TestimonialCard = memo(({ testimonial }: { testimonial: Testimonial }) => {
  return (
    <Card className="bg-zinc-900 border-[1.4px] border-zinc-800 p-6 flex flex-col h-full">
      <div className="flex-grow">
        <div className="flex gap-1 mb-4" aria-label={`${testimonial.rating} estrellas`}>
          {[...Array(testimonial.rating)].map((_, i) => (
            <motion.div
              key={i}
              animate={{
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1
                }
              }}
              whileHover={{
                rotate: 15,
                scale: 1.2,
                transition: { duration: 0.2 }
              }}
            >
              <Star
                className="w-4 h-4 fill-yellow-400 text-yellow-400"
                aria-hidden="true"
              />
            </motion.div>
          ))}
        </div>

        <p className="text-gray-300 mb-6">{testimonial.text}</p>
      </div>

      <div className="flex items-center gap-3 pt-4 border-t border-zinc-700 mt-auto">
        <Avatar>
          <AvatarImage
            src={testimonial.avatar}
            alt={`Foto de ${testimonial.name}`}
          />
          <AvatarFallback>
            {testimonial.name.slice(0, 2)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold text-base text-zinc-300">
            {testimonial.name}
          </h3>
          <p className="text-gray-400 text-sm">{testimonial.role}</p>
        </div>
      </div>
    </Card>
  );
});

TestimonialCard.displayName = 'TestimonialCard';

/**
 * Componente que muestra la sección de testimonios
 * @component
 */
const TestimonialsPage = memo(() => {
  return (
    <section
      id="wall-of-love"
      className=" bg-[#0F0F0F] text-white px-4 py-16"
      aria-labelledby="testimonios-title"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 
            id="testimonios-title"
            className="text-4xl md:text-5xl font-medium mb-4"
          >
            Lo que dicen nuestros clientes
          </h2>
          <p className="text-gray-400 text-lg">
            Descubre las experiencias de quienes ya confiaron en RevivoX
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
});

TestimonialsPage.displayName = 'TestimonialsPage';

export default TestimonialsPage;