'use client';

import { Product, ProductType } from '../types';
import ProductCard from './ProductCard';
import { AnimatePresence } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FadeIn, SlideUp } from './AnimatedContainer';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ProductListProps {
  products: Product[];
  type: ProductType;
  page: number;
  totalProducts: number;
  itemsPerPage: number;
}

export default function ProductList({ products, type, page, totalProducts, itemsPerPage }: ProductListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const totalPages = Math.max(1, Math.ceil(totalProducts / itemsPerPage));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, [products]);

  const handlePageChange = (newPage: number) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage - 1)); // query param es base 0
    router.push(`/catalogo?${params.toString()}`);
  };

  const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setIsLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    params.set('itemsPerPage', event.target.value);
    params.set('page', '0'); // reset page
    router.push(`/catalogo?${params.toString()}`);
  };

  const showPagination = totalPages > 1;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {showPagination && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-700">
          <div className="flex items-center gap-2 text-[#CFCFCF]">
            <span>Items por página:</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-2 py-1 text-[#CFCFCF] focus:outline-none focus:border-[#FF8806] transition-colors"
            >
              <option value="12">12</option>
              <option value="24">24</option>
              <option value="36">36</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 0}
              className="p-2 text-[#CFCFCF] hover:text-[#FF8806] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Página anterior"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-1">
              <span className="text-[#CFCFCF]">
                Página {page + 1} de {totalPages}
              </span>
            </div>

            <button
              onClick={() => handlePageChange(page + 1)}
              disabled={page >= totalPages - 1}
              className="p-2 text-[#CFCFCF] hover:text-[#FF8806] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              aria-label="Página siguiente"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
} 