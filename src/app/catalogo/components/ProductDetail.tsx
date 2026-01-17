'use client';

import { Product } from '../types';
import { 
  Instagram, 
  ExternalLink, 
  Banknote, 
  CreditCard, 
  MessageCircle,
  ArrowLeft,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Badge from './Badge';
import PriceDisplay from './PriceDisplay';
import PaymentMethod from './PaymentMethod';
import ContactButton from './ContactButton';
import SpecItem from './SpecItem';
import ExtraFeature from './ExtraFeature';
import { TECHNICAL_SPECS, EXTRA_FEATURES } from '../[id]/constants';
import { FadeIn, SlideUp } from './AnimatedContainer';

export default function ProductDetail({ product }: { product: Product }) {
  return (
    <SlideUp className="min-h-screen bg-white dark:bg-[#212121] text-zinc-900 dark:text-[#CFCFCF]">
      <div className="container mx-auto px-4 py-8 mt-16">
        <Link 
          href="/catalogo" 
          className="inline-flex items-center gap-2 text-zinc-500 dark:text-zinc-400 hover:text-[#FF8806] transition-colors mb-4"
        >
          <ArrowLeft size={20} />
          <span>Volver al catálogo</span>
        </Link>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sección de imágenes */}
          <FadeIn delay={0.2} className="space-y-4">
            <div className="relative aspect-square w-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg overflow-hidden">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain object-center"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {/* Aquí irían las miniaturas de otras imágenes si las hubiera */}
            </div>
          </FadeIn>

          {/* Sección de detalles */}
          <FadeIn delay={0.4} className="space-y-6">
            <div>
              <div className="flex flex-wrap gap-2 mb-2">
                {Number(product.discount) > 0 && (
                  <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded text-sm font-medium">
                    ¡Oferta!
                  </span>
                )}
                {product.sold && (
                  <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-1 rounded text-sm font-medium">
                    Vendido
                  </span>
                )}
              </div>
              <SlideUp className="text-3xl font-bold text-zinc-900 dark:text-[#CFCFCF] mb-2">
                {product.name}
              </SlideUp>
              <SlideUp className="text-xl text-zinc-600 dark:text-zinc-400">
                {product.short_description}
              </SlideUp>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-sm text-zinc-500">Única unidad disponible</span>
              </div>
            </div>

            <FadeIn delay={0.6} className="space-y-6">
              <div className="text-3xl font-bold text-[#FF8806]">
                ${product.price} <span className="text-sm text-zinc-500">USD</span>
              </div>

              <div className="space-y-4 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <PaymentMethod
                    icon={CreditCard}
                    title="Hasta 12 cuotas"
                    description="A través de MercadoLibre con tarjetas de crédito"
                    className="bg-white dark:bg-zinc-800"
                  />
                  <PaymentMethod
                    icon={Banknote}
                    title="Transferencia bancaria"
                    description="Pago en efectivo con 5% de descuento"
                    className="bg-white dark:bg-zinc-800"
                  />
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Contactar por</span>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <ContactButton
                        href="https://www.instagram.com/revivox.uy"
                        icon={Instagram}
                        label="Instagram"
                        className="bg-gradient-to-r from-pink-500 to-purple-500 hover:opacity-90"
                      />
                      <ContactButton
                        href="https://wa.me/59899619674"
                        icon={MessageCircle}
                        label="WhatsApp"
                        className="bg-[#25D366] hover:bg-[#1EA952]"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-zinc-600 dark:text-zinc-400">Ver en</span>
                    <ContactButton
                      href={product.sale_link || ''}
                      icon={ExternalLink}
                      label="MercadoLibre"
                      className="bg-[#2D3277] hover:bg-[#1A1D4B]"
                    />
                  </div>
                </div>
              </div>

              {product.type !== 'services' && (
                <div className="space-y-2 bg-zinc-50 dark:bg-zinc-800/50 rounded-lg p-4 border border-zinc-200 dark:border-zinc-700">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-[#CFCFCF]">Especificaciones técnicas</h3>
                  <ul className="space-y-2 text-zinc-600 dark:text-zinc-400">
                    {TECHNICAL_SPECS.map(({ key, icon: Icon, label }) => (
                      <SpecItem
                        key={key}
                        icon={Icon}
                        label={label}
                        value={product.specs?.[key] || 'No especificado'}
                      />
                    ))}
                  </ul>
                </div>
              )}

              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-[#CFCFCF] mb-2">Descripción</h3>
                <p className="text-zinc-600 dark:text-zinc-400 whitespace-pre-line">{product.description}</p>
              </div>

              {Object.values(product.specs?.extras || {}).some(value => value === true) && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold text-zinc-900 dark:text-[#CFCFCF]">Características adicionales</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {EXTRA_FEATURES.map(({ key, icon: Icon, label }) => 
                      product.specs?.extras?.[key] && (
                        <ExtraFeature key={key} icon={Icon} label={label} />
                      )
                    )}
                  </div>
                </div>
              )}
            </FadeIn>
          </FadeIn>
        </div>
      </div>
    </SlideUp>
  );
} 