import { createClient } from '@/lib/supabase/server';
import { Product, ProductType, SortOptions } from './types';
import ProductFilters from './components/ProductFilters';
import CatalogSkeleton from './components/CatalogSkeleton';
import { Suspense } from 'react';
import ProductList from './components/ProductList';
import Navigation from '@/components/Navigation';

async function getProducts(
  page: number = 0, 
  itemsPerPage: number = 12,
  type: ProductType = 'todos',
  sortOptions: SortOptions = { field: 'price', order: 'desc' },
  searchQuery?: string
): Promise<{
  products: Product[];
  hasMore: boolean;
  totalProducts: number;
}> {
  const supabase = await createClient();
  
  const from = page * itemsPerPage;
  const to = from + itemsPerPage - 1;

  let query = supabase
    .from('products')
    .select('*', { count: 'exact' })
    .order(sortOptions.field, { ascending: sortOptions.order === 'asc' });

  if (searchQuery) {
    query = query.ilike('name', `%${searchQuery}%`);
  }

  if (type === 'vendidos') {
    query = query.eq('sold', true);
  } else if (type !== 'todos') {
    const productType = type === 'laptops' ? 'laptop' : 
                       type === 'services' ? 'services' : 
                       type === 'accessories' ? 'accessory' : 'other';
    query = query.eq('type', productType).eq('sold', false);
  } else {
    query = query.eq('sold', false);
  }

  const { data, error, count } = await query.range(from, to);

  if (error) {
    console.error('Error fetching products:', error);
    throw new Error('Error al obtener los productos');
  }

  return {
    products: data as Product[],
    hasMore: count ? from + itemsPerPage < count : false,
    totalProducts: count || 0,
  };
}

export default async function CatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const type = (params.type as ProductType) || 'todos';
  const page = parseInt(params.page as string) || 0;
  const sortField = (params.sortField as SortOptions['field']) || 'price';
  const sortOrder = (params.sortOrder as SortOptions['order']) || 'desc';
  const search = params.search as string;
  const itemsPerPage = parseInt(params.itemsPerPage as string) || 12;

  return (
    <>
      <Navigation variant="catalog" />
      <div className="min-h-screen bg-white dark:bg-[#212121] text-zinc-900 dark:text-[#CFCFCF]">
        <div className="container mx-auto px-4 py-8 mt-16">
          <h1 className="text-4xl font-bold mb-8 text-zinc-900 dark:text-[#CFCFCF]">Nuestros productos y servicios</h1>
          <div className="mb-8">
            <ProductFilters 
              currentType={type}
              sortOptions={{ field: sortField, order: sortOrder }}
            />
          </div>
          
          <Suspense fallback={<CatalogSkeleton />}>
            <CatalogProducts 
              type={type} 
              page={page} 
              sortOptions={{ field: sortField, order: sortOrder }}
              searchQuery={search}
              itemsPerPage={itemsPerPage}
            />
          </Suspense>
        </div>
      </div>
    </>
  );
}

async function CatalogProducts({ 
  type, 
  page,
  sortOptions,
  searchQuery,
  itemsPerPage
}: { 
  type: ProductType; 
  page: number;
  sortOptions: SortOptions;
  searchQuery?: string;
  itemsPerPage: number;
}) {
  const { products, totalProducts } = await getProducts(page, itemsPerPage, type, sortOptions, searchQuery);

  return (
    <ProductList 
      products={products} 
      type={type} 
      page={page} 
      totalProducts={totalProducts}
      itemsPerPage={itemsPerPage}
    />
  );
}