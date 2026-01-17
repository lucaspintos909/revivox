'use client';

import { Product } from '@/app/catalogo/types';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ContentLoader from 'react-content-loader';
import { HiOutlinePhotograph } from 'react-icons/hi';
import { Heart, ShieldCheck, Loader2 } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);
  const [isImageError, setIsImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    setIsLoading(true);
  };

  return (
    <div className="relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm z-50 flex items-center justify-center rounded-lg"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center gap-2"
            >
              <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
              <span className="text-sm text-zinc-600 dark:text-zinc-400">Cargando producto...</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Link 
        href={`/catalogo/${product.id}`} 
        className="block"
        onClick={handleClick}
      >
        <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 hover:border-[#FF8806] flex flex-col md:flex-row p-4 gap-4 relative group transition">
          {/* Botón de favorito */}
          <button className="absolute top-4 right-4 text-zinc-400 dark:text-zinc-500 hover:text-[#FF8806] z-10 bg-white dark:bg-zinc-800 rounded-full p-1 shadow-md">
            <Heart className="w-5 h-5" />
          </button>
          {/* Imagen */}
          <div className="flex-shrink-0 w-full md:w-48 h-40 flex items-center justify-center bg-zinc-100 dark:bg-zinc-900 rounded overflow-hidden relative">
            {isImageLoading && !isImageError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0"
              >
                <ContentLoader
                  uniqueKey={`product-skeleton-${product.id}`}
                  speed={2}
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 300"
                  backgroundColor="#f3f4f6"
                  foregroundColor="#e5e7eb"
                  className="dark:hidden"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <rect x="0" y="0" rx="8" ry="8" width="400" height="300" />
                </ContentLoader>
                <ContentLoader
                  uniqueKey={`product-skeleton-dark-${product.id}`}
                  speed={2}
                  width="100%"
                  height="100%"
                  viewBox="0 0 400 300"
                  backgroundColor="#27272a"
                  foregroundColor="#3f3f46"
                  className="hidden dark:block"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <rect x="0" y="0" rx="8" ry="8" width="400" height="300" />
                </ContentLoader>
              </motion.div>
            )}
            {!isImageError ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={`object-contain object-center transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                sizes="(max-width: 768px) 100vw, 192px"
                priority={false}
                loading="lazy"
                onLoad={() => setIsImageLoading(false)}
                onError={() => {
                  setIsImageLoading(false);
                  setIsImageError(true);
                }}
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500">
                <HiOutlinePhotograph className="w-16 h-16 mb-2" />
                <span className="text-sm">Imagen no disponible</span>
              </div>
            )}
          </div>
          {/* Detalles */}
          <div className="flex flex-col flex-1 justify-between min-w-0">
            <div>
              {Number(product.discount) > 0 && (
                <span className="inline-block mb-1 bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs font-bold px-2 py-0.5 rounded">
                  ¡Oferta!
                </span>
              )}
              {product.sold && (
                <span className="bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 px-2 py-0.5 rounded text-xs font-medium">Vendido</span>
              )}
              <h2 className="text-lg font-bold text-zinc-900 dark:text-[#CFCFCF] truncate pr-8">{product.name}</h2>
              <div className="text-sm text-zinc-600 dark:text-zinc-400 mb-2 line-clamp-2">
                {product.type === 'services' ? product.description : product.short_description}
              </div>
              {/* Etiquetas */}
              <div className="flex flex-wrap gap-2 mb-2">
                {product.type !== 'services' && (
                  <span className="bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded text-xs font-medium">Reacondicionado</span>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mt-2 gap-2">
              <div>
                {product.discount && Number(product.discount) > 0 ? (
                  <>
                    <span className="text-base text-red-600 dark:text-red-400 line-through">${product.price}</span> <br />
                    <span className="text-2xl font-bold text-[#FF8806] mr-2">${product.discount}</span>
                    <span className="text-sm text-zinc-500">USD</span>
                  </>
                ) : (
                  <>
                    <span className="text-2xl font-bold text-[#FF8806]">${product.price}</span>
                    <span className="text-sm text-zinc-500">USD</span>
                  </>
                )}
              </div>
              <div className="text-xs text-zinc-500 text-right">
                {product.type !== 'services' && (
                  <>
                    <div>Única unidad disponible</div>
                    <div>Reacondicionado certificado</div>
                  </>
                )}
                <div className="flex items-center justify-end gap-1">
                  <ShieldCheck className="w-4 h-4" color="#FF8806"/> 
                  <span>Garantía 6 meses</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );  
} 