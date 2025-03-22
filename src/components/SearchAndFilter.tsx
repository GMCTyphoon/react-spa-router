import { useEffect, useState, useCallback } from 'react';
import { Product } from '../features/products/productsTypes';

interface SearchAndFilterProps {
  products: Product[];
  onFilteredProductsChange: (filteredProducts: Product[]) => void;
}

function SearchAndFilter({
  products,
  onFilteredProductsChange,
}: SearchAndFilterProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filterProducts = useCallback(
    (query: string, category: string) => {
      const filtered = products.filter((product) => {
        const matchesSearch = product.title
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory =
          category === 'all' ||
          product.category.toLowerCase() === category.toLowerCase();
        return matchesSearch && matchesCategory;
      });

      onFilteredProductsChange(filtered);
    },
    [products, onFilteredProductsChange]
  );

  // Debouncing
  useEffect(() => {
    const timerId = setTimeout(() => {
      filterProducts(searchQuery, selectedCategory);
    }, 300);

    return () => clearTimeout(timerId);
  }, [searchQuery, selectedCategory, filterProducts]);

  const categories = [
    'all',
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <div className="mb-6">
      <input
        type="text"
        id="search"
        placeholder="Поиск товаров..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="w-full p-2 border rounded-lg mb-4"
      />

      <select
        value={selectedCategory}
        id="select"
        onChange={(e) => setSelectedCategory(e.target.value)}
        className="w-full p-2 border rounded-lg"
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SearchAndFilter;
