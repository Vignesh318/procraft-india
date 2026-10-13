import React, { useState, useMemo } from 'react';
import { ChevronDown, Star, ShoppingCart, Filter, X } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/storeData';

interface HeadphonesCatalogProps {
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity?: number) => void;
  onGoHome: () => void;
}

export const HeadphonesCatalog: React.FC<HeadphonesCatalogProps> = ({
  onOpenProduct,
  onAddToCart,
  onGoHome
}) => {
  // Sidebar accordion states
  const [openBrand, setOpenBrand] = useState(true);
  const [openType, setOpenType] = useState(true);
  const [openPrice, setOpenPrice] = useState(true);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Filter selections
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Local quantity stepper state per product ID
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleQuantityChange = (productId: string, delta: number) => {
    setQuantities((prev) => {
      const current = prev[productId] || 1;
      const next = Math.max(1, current + delta);
      return { ...prev, [productId]: next };
    });
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setSelectedTypes([]);
    setSelectedPriceRange(null);
  };

  // Base list of headphones & in-ear monitors
  const headphoneProducts = useMemo(() => {
    return PRODUCTS.filter((p) => p.category === 'Headphones');
  }, []);

  // Filter and sort items
  const filteredProducts = useMemo(() => {
    let result = [...headphoneProducts];

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedTypes.length > 0) {
      result = result.filter((p) => selectedTypes.includes(p.type));
    }

    if (selectedPriceRange) {
      if (selectedPriceRange === 'under-3000') {
        result = result.filter((p) => p.price < 3000);
      } else if (selectedPriceRange === '3000-5000') {
        result = result.filter((p) => p.price >= 3000 && p.price <= 5000);
      } else if (selectedPriceRange === '5000-15000') {
        result = result.filter((p) => p.price > 5000 && p.price <= 15000);
      } else if (selectedPriceRange === 'above-15000') {
        result = result.filter((p) => p.price > 15000);
      }
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return result;
  }, [headphoneProducts, selectedBrands, selectedTypes, selectedPriceRange, sortBy]);

  const allBrands = ['Donner', 'JOYO', 'KZ Acoustics', 'Procraft'];
  const allTypes = ['In-Ear Monitors', 'Studio Monitors'];

  return (
    <div className="bg-white min-h-[70vh] py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb matching screenshot 3 */}
        <nav className="text-xs text-zinc-500 mb-6 flex items-center gap-1.5">
          <button
            onClick={onGoHome}
            className="hover:text-zinc-900 transition-colors cursor-pointer"
          >
            Home
          </button>
          <span>/</span>
          <span className="text-zinc-900 font-medium">Headphones</span>
        </nav>

        {/* Page Title matching screenshot 3 */}
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-zinc-900 mb-8">
          Headphones
        </h1>

        {/* Top Controls: Mobile filter toggle + Sort By dropdown */}
        <div className="flex items-center justify-between pb-6 border-b border-zinc-100">
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 text-xs font-semibold text-zinc-800 border border-zinc-200 px-3 py-1.5 rounded-sm"
          >
            <Filter className="w-3.5 h-3.5" />
            Filters ({(selectedBrands.length + selectedTypes.length + (selectedPriceRange ? 1 : 0))})
          </button>

          <div className="hidden lg:block text-xs text-zinc-500 font-medium">
            Showing {filteredProducts.length} results
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <label htmlFor="sortBy" className="text-xs text-zinc-500 hidden sm:inline">
              Sort By:
            </label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs font-medium border border-zinc-300 rounded-sm px-3 py-1.5 bg-white text-zinc-800 focus:outline-none focus:border-amber-400 cursor-pointer"
            >
              <option value="featured">Sort By: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Customer Rating</option>
            </select>
          </div>
        </div>

        {/* Main Layout: Left Filters + Right Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 pt-6">
          {/* Desktop Left Sidebar: Filters */}
          <aside className="hidden lg:block space-y-6 select-none">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-zinc-900">Filters</h2>
              {(selectedBrands.length > 0 || selectedTypes.length > 0 || selectedPriceRange) && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-amber-600 hover:text-amber-700 underline font-medium"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Brand Accordion */}
            <div className="border-b border-zinc-200 pb-4">
              <button
                onClick={() => setOpenBrand(!openBrand)}
                className="w-full flex items-center justify-between py-2 text-sm font-semibold text-zinc-800 hover:text-black"
              >
                <span>Brand</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform ${
                    openBrand ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openBrand && (
                <div className="mt-2 space-y-2.5">
                  {allBrands.map((brand) => (
                    <label
                      key={brand}
                      className="flex items-center gap-2.5 text-xs text-zinc-600 hover:text-zinc-900 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(brand)}
                        onChange={() => toggleBrand(brand)}
                        className="rounded border-zinc-300 text-amber-500 focus:ring-amber-400 h-3.5 w-3.5"
                      />
                      <span>{brand}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Type Accordion */}
            <div className="border-b border-zinc-200 pb-4">
              <button
                onClick={() => setOpenType(!openType)}
                className="w-full flex items-center justify-between py-2 text-sm font-semibold text-zinc-800 hover:text-black"
              >
                <span>Type</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform ${
                    openType ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openType && (
                <div className="mt-2 space-y-2.5">
                  {allTypes.map((type) => (
                    <label
                      key={type}
                      className="flex items-center gap-2.5 text-xs text-zinc-600 hover:text-zinc-900 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(type)}
                        onChange={() => toggleType(type)}
                        className="rounded border-zinc-300 text-amber-500 focus:ring-amber-400 h-3.5 w-3.5"
                      />
                      <span>{type}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Price Range Accordion */}
            <div className="border-b border-zinc-200 pb-4">
              <button
                onClick={() => setOpenPrice(!openPrice)}
                className="w-full flex items-center justify-between py-2 text-sm font-semibold text-zinc-800 hover:text-black"
              >
                <span>Price Range</span>
                <ChevronDown
                  className={`w-4 h-4 text-zinc-400 transition-transform ${
                    openPrice ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openPrice && (
                <div className="mt-2 space-y-2.5">
                  {[
                    { id: 'under-3000', label: 'Under ₹ 3,000' },
                    { id: '3000-5000', label: '₹ 3,000 - ₹ 5,000' },
                    { id: '5000-15000', label: '₹ 5,000 - ₹ 15,000' }
                  ].map((range) => (
                    <label
                      key={range.id}
                      className="flex items-center gap-2.5 text-xs text-zinc-600 hover:text-zinc-900 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="priceRange"
                        checked={selectedPriceRange === range.id}
                        onChange={() =>
                          setSelectedPriceRange(
                            selectedPriceRange === range.id ? null : range.id
                          )
                        }
                        onClick={() => {
                          if (selectedPriceRange === range.id) {
                            setSelectedPriceRange(null);
                          }
                        }}
                        className="border-zinc-300 text-amber-500 focus:ring-amber-400 h-3.5 w-3.5"
                      />
                      <span>{range.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </aside>

          {/* Right Product Grid matching screenshot 3 */}
          <main className="lg:col-span-3">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-16 border border-dashed border-zinc-200 rounded-sm">
                <p className="text-zinc-500 text-sm">No products match the selected filters.</p>
                <button
                  onClick={clearFilters}
                  className="mt-3 text-xs font-semibold text-amber-600 hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const qty = quantities[product.id] || 1;

                  return (
                    <div
                      key={product.id}
                      className="group flex flex-col justify-between bg-white transition-all duration-200"
                    >
                      {/* Product Image Area with Badges */}
                      <div
                        onClick={() => onOpenProduct(product)}
                        className="relative w-full aspect-square flex items-center justify-center bg-white p-3 cursor-pointer overflow-hidden border border-zinc-100 hover:border-zinc-200"
                      >
                        {/* Top-Right Badge: Sold Out (screenshot 3) or New */}
                        {!product.inStock && (
                          <div className="absolute top-2 right-2 bg-zinc-900 text-white text-[11px] font-semibold px-2 py-0.5 rounded-sm z-10">
                            Sold Out
                          </div>
                        )}
                        {product.inStock && product.isNew && (
                          <div className="absolute top-2 right-2 bg-zinc-900 text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-sm z-10">
                            New
                          </div>
                        )}

                        <img
                          src={product.image}
                          alt={product.name}
                          referrerPolicy="no-referrer"
                          className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                          onError={(e) => {
                            e.currentTarget.src = '/src/assets/images/studio_monitor_headphones_1791430700306.jpg';
                          }}
                        />
                      </div>

                      {/* Product Details */}
                      <div className="pt-3 flex flex-col flex-1">
                        {/* Title */}
                        <h3
                          onClick={() => onOpenProduct(product)}
                          className="text-sm font-semibold text-zinc-900 line-clamp-2 hover:text-amber-600 transition-colors cursor-pointer min-h-[40px]"
                        >
                          {product.name}
                        </h3>

                        {/* Rating if present (e.g. Donner M100 has rating in screenshot 3) */}
                        {product.rating && (
                          <div className="flex items-center gap-1 mt-1 mb-1">
                            <div className="flex text-amber-500">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${
                                    i < Math.floor(product.rating || 0)
                                      ? 'fill-amber-400 text-amber-400'
                                      : 'text-zinc-200'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs text-zinc-500">
                              ({product.reviewsCount})
                            </span>
                          </div>
                        )}

                        {/* Pricing row with discount badge */}
                        <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                          <span className="text-xs text-zinc-400 line-through tabular-nums">
                            ₹ {product.originalPrice.toLocaleString('en-IN')}
                          </span>
                          <span className="text-sm font-bold text-red-600 tabular-nums">
                            ₹ {product.price.toLocaleString('en-IN')}
                          </span>
                          <span className="text-[10px] font-semibold text-red-600 border border-red-300 px-1 py-0.2 rounded-xs">
                            {product.discountPercentage}% Off
                          </span>
                        </div>

                        {/* FREE Shipping label matching screenshot */}
                        {product.freeShipping && (
                          <div className="text-xs text-zinc-500 font-medium mt-1">
                            FREE Shipping
                          </div>
                        )}

                        {/* Bottom Actions matching screenshot 3:
                            - Sold Out state: Red text "SOLD OUT"
                            - In Stock state: Quantity Stepper [- 1 +] and yellow shopping cart button
                        */}
                        <div className="mt-3 pt-2">
                          {!product.inStock ? (
                            <div className="text-xs font-bold text-red-600 tracking-wider">
                              SOLD OUT
                            </div>
                          ) : (
                            <div className="flex items-center gap-2">
                              {/* Quantity Stepper [- 1 +] */}
                              <div className="flex items-center border border-zinc-300 rounded-xs bg-white text-xs">
                                <button
                                  onClick={() => handleQuantityChange(product.id, -1)}
                                  className="px-2.5 py-1.5 hover:bg-zinc-100 text-zinc-600 font-bold transition-colors"
                                  aria-label="Decrease quantity"
                                >
                                  -
                                </button>
                                <span className="px-2.5 py-1.5 font-medium tabular-nums text-zinc-800">
                                  {qty}
                                </span>
                                <button
                                  onClick={() => handleQuantityChange(product.id, 1)}
                                  className="px-2.5 py-1.5 hover:bg-zinc-100 text-zinc-600 font-bold transition-colors"
                                  aria-label="Increase quantity"
                                >
                                  +
                                </button>
                              </div>

                              {/* Yellow Cart Button matching screenshot 3 */}
                              <button
                                onClick={() => onAddToCart(product, qty)}
                                className="flex-1 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-black py-1.5 px-3 rounded-xs flex items-center justify-center transition-colors shadow-xs"
                                aria-label="Add to cart"
                              >
                                <ShoppingCart className="w-4 h-4 stroke-[2.2]" />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="relative ml-auto w-4/5 max-w-sm bg-white h-full p-6 overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-zinc-200">
              <h3 className="text-base font-bold text-zinc-900">Filters</h3>
              <button onClick={() => setMobileFilterOpen(false)}>
                <X className="w-5 h-5 text-zinc-500" />
              </button>
            </div>

            <div className="mt-4 space-y-6">
              {/* Brand */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Brand
                </h4>
                <div className="space-y-2">
                  {allBrands.map((b) => (
                    <label key={b} className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={selectedBrands.includes(b)}
                        onChange={() => toggleBrand(b)}
                        className="rounded text-amber-500"
                      />
                      <span>{b}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-500 mb-2">
                  Type
                </h4>
                <div className="space-y-2">
                  {allTypes.map((t) => (
                    <label key={t} className="flex items-center gap-2 text-xs">
                      <input
                        type="checkbox"
                        checked={selectedTypes.includes(t)}
                        onChange={() => toggleType(t)}
                        className="rounded text-amber-500"
                      />
                      <span>{t}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="pt-4 flex gap-2">
                <button
                  onClick={clearFilters}
                  className="flex-1 py-2 border border-zinc-300 text-xs font-semibold rounded"
                >
                  Clear
                </button>
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="flex-1 py-2 bg-amber-400 text-black text-xs font-semibold rounded"
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
