import Link from 'next/link';
import { memo } from 'react';
import { cn } from '@/lib/utils';

/**
 * Componente de llamada a la acción (Call to Action)
 * @component
 * @returns {JSX.Element} Componente CTA
 */
const CTA = memo(() => {
  return (
    <section 
      className="relative bg-[#0F0F0F] px-4 py-24 md:py-32"
      aria-labelledby="cta-title"
    >
      <div className="mx-auto max-w-3xl text-center">
        <h2 
          id="cta-title"
          className="mb-4 text-4xl font-medium tracking-tight text-white md:text-5xl lg:text-6xl"
        >
          Dale una segunda vida a tu tecnología
        </h2>
        <p className="mb-8 text-lg text-zinc-400 md:text-xl">
          Únete a la revolución de la tecnología sostenible y encuentra la laptop perfecta para ti.
        </p>
        <Link
          href="/catalogo?type=laptops"
          className={cn(
            "inline-flex items-center gap-2 rounded-lg bg-[#FF8806] px-6 py-3 text-base font-medium text-black",
            "transition-colors hover:bg-[#FF8806]/90 focus:outline-none focus:ring-2 focus:ring-[#FFB800] focus:ring-offset-2 focus:ring-offset-[#0F0F0F]"
          )}
          aria-label="Ver laptops disponibles"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            role="img"
          >
            <path
              d="M13 10V3L4 14H11V21L20 10H13Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Ver laptops disponibles
        </Link>
      </div>
    </section>
  );
});

CTA.displayName = 'CTA';

export default CTA;
