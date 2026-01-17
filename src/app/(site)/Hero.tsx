'use client';

import { useEffect, useState } from 'react';
import Link from "next/link";
import Typewriter from 'typewriter-effect';
import { ShieldCheck } from 'lucide-react';
import { Feature } from '@/components/Feature';
import InstagramIcon from '@/components/icons/InstagramIcon';
import { motion } from 'framer-motion';

const TYPEWRITER_STRINGS = [
  'Garantía de calidad.',
  'Tecnología accesible para todos al mejor precio.',
  'Listas para arrancar con tu próximo proyecto.',
  'Elegí renovar, no desechar.'
] as const;

const FEATURES = [
  {
    title: 'Ahorro Inteligente',
    description: 'Laptops de calidad a precio justo.'
  },
  {
    title: '6 meses de garantía',
    description: 'Compra con tranquilidad.'
  },
  {
    title: 'Calidad Certificada',
    description: 'Control de calidad riguroso.'
  },
  {
    title: 'Eco-Friendly',
    description: 'Reduces el impacto ambiental.'
  },
  {
    title: 'Soporte',
    description: 'Estamos para ayudarte con tus dudas.'
  }
] as const;

const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);
    
  return (
    <section 
      className="bg-[#212121] mt-6 min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12"
      aria-label="Sección principal"
    >
      <div className="max-w-7xl w-full mx-auto py-16 flex flex-col lg:flex-row justify-between items-center">
        <div className="w-full lg:w-1/2 mb-12 lg:mb-0 text-center lg:text-left">
          <h1 
            className={`text-4xl sm:text-5xl md:text-6xl font-extrabold mb-4 text-[#CFCFCF] leading-tight transition-all duration-1000 ease-out transform ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            } min-h-[135px] sm:min-h-[150px] md:min-h-[180px] lg:min-h-[200px] w-full max-w-3xl`}
          >
            <Typewriter
              onInit={(typewriter) => {
                typewriter
                  .typeString(TYPEWRITER_STRINGS[0])
                  .pauseFor(2000)
                  .deleteAll(20)
                  .typeString(TYPEWRITER_STRINGS[1])
                  .pauseFor(2000)
                  .deleteAll(20)
                  .typeString(TYPEWRITER_STRINGS[2])
                  .pauseFor(2000)
                  .deleteAll(20)
                  .typeString(TYPEWRITER_STRINGS[3])
                  .pauseFor(2000)
                  .deleteAll(20)
                  .start();
              }}
              options={{
                autoStart: true,
                loop: true,
                delay: 30,
              }}
            />
          </h1>

          <p className="text-base text-[#CFCFCF] mb-8 max-w-2xl mx-auto lg:mx-0">
            En <strong>RevivoX</strong> damos nueva vida a laptops reacondicionadas.
            <br />
            Con garantía, sustentables, <span className='underline underline-offset-4 decoration-[#FF8806]'>ideales para estudiantes</span> y listas para usar desde el primer día.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 sm:justify-center">
            <Link
              href="/catalogo?type=laptops"
              className="inline-flex w-10/12 mx-auto sm:w-auto items-center justify-center gap-2 bg-[#FF8806] hover:bg-[#ffa039] text-black px-8 py-2 rounded-xl font-medium text-lg transition-colors duration-300"
              aria-label="Ver laptops disponibles"
            >
              Ver laptops disponibles
            </Link>
            <Link
              href="https://ig.me/m/revivox.uy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-8/12 mx-auto sm:w-auto items-center justify-center gap-2 bg-transparent border border-[#FF8806] hover:border-[#321B01] hover:bg-[#321B01] text-white px-8 py-2 rounded-xl font-medium text-lg transition-colors duration-300"
              aria-label="Contactar con RevivoX"
            >
              Seguinos &nbsp;
              <InstagramIcon />
            </Link>
          </div>
        </div>

        <div className="w-full lg:w-2/5 flex justify-center lg:justify-end">
          <motion.div 
            className="max-w-md mx-auto"
            animate={{
              boxShadow: [
                "0 0 0 0 #FF8806",
                "0 0 0 10px rgba(255,160,57, 0)",
                "0 0 0 0 #FF8806"
              ],
              borderRadius: [
                "12px",
                "12px",
                "12px"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="rounded-xl bg-zinc-800 p-6 border border-[#FF8806]/50 relative">
              <div className="inline-flex items-center gap-1 absolute -top-3 right-6 bg-[#FF8806] text-black text-sm font-semibold px-3 py-1 rounded-full">
                RevivoX 
                <ShieldCheck 
                  className="w-4 h-4" 
                  aria-hidden="true"
                />
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-zinc-300">
                Beneficios de Comprar Reacondicionado
              </h2>

              <div className="space-y-4 mb-8">
                {FEATURES.map((feature, index) => (
                  <Feature key={index}>
                    <span className='font-bold'>{feature.title}</span> <br /> {feature.description}
                  </Feature>
                ))}
              </div>

              <p className="text-center text-zinc-300 mb-1">
                ¿No te convence?
              </p>
              <Link
                href="https://wa.me/59899619674"
                className="w-full bg-[#FF8806] hover:bg-[#ffa039] transition-colors text-black font-semibold py-3 px-4 rounded-lg flex items-center justify-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Contactar por WhatsApp"
              >
                <span aria-hidden="true">Contactar por WhatsApp</span> 💬
              </Link>
              <p className="text-center text-zinc-500 text-sm mt-4">
                Compra con la tranquilidad que mereces.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
