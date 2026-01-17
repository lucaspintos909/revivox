'use client';

import { ProductType, SortOptions } from '../types';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

interface ProductFiltersProps {
  currentType: ProductType;
  sortOptions: SortOptions;
}

const PRODUCT_TYPES: { value: ProductType; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'laptops', label: 'Laptops' },
  { value: 'accessories', label: 'Accesorios' },
  { value: 'services', label: 'Servicios' },
  { value: 'vendidos', label: 'Vendidos' },
];

export default function ProductFilters({ currentType, sortOptions }: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleTypeChange = (type: ProductType) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('type', type);
    router.push(`/catalogo?${params.toString()}`);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [field, order] = event.target.value.split('-') as [SortOptions['field'], SortOptions['order']];
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortField', field);
    params.set('sortOrder', order);
    router.push(`/catalogo?${params.toString()}`);
  };

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const search = formData.get('search') as string;
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set('search', search);
    } else {
      params.delete('search');
    }
    router.push(`/catalogo?${params.toString()}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4">
        <form onSubmit={handleSearch} className="flex-1">
          <div className="relative">
            <input
              type="text"
              name="search"
              placeholder="Buscar productos..."
              defaultValue={searchParams.get('search') || ''}
              className="w-full px-4 py-2 pl-10 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-[#CFCFCF] placeholder-zinc-500 focus:outline-none focus:border-[#FF8806] transition-colors"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 dark:text-zinc-500 w-4 h-4" />
          </div>
        </form>
        <div className="flex-shrink-0">
          <select
            value={`${sortOptions.field}-${sortOptions.order}`}
            onChange={handleSortChange}
            className="w-full sm:w-auto px-4 py-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg text-zinc-900 dark:text-[#CFCFCF] focus:outline-none focus:border-[#FF8806] transition-colors"
          >
            <option value="price-desc">Mayor Precio</option>
            <option value="price-asc">Menor Precio</option>
            <option value="created_at-desc">Más recientes</option>
            <option value="created_at-asc">Más antiguos</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap gap-2">
        {PRODUCT_TYPES.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => handleTypeChange(value)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              currentType === value
                ? 'bg-[#FF8806] text-black'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-[#CFCFCF] hover:bg-zinc-200 dark:hover:bg-zinc-700'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
} 