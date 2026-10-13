import React from 'react';
import { GUITAR_CATEGORIES, PRODUCTS } from '../data/storeData';
import { Product } from '../types';
import { ArrowRight, ShoppingBag, Star } from 'lucide-react';

interface GuitarsGridProps {
  onSelectCategory: (categoryName: string) => void;
  onOpenProduct: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const GuitarsGrid: React.FC<GuitarsGridProps> = ({
  onSelectCategory,
  onOpenProduct,
  onAddToCart
}) => {
  const guitarFeaturedProducts = PRODUCTS.filter((p) => p.category === 'Guitars');

  return (
    <div className="bg-white py-10 md:py-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading matching screenshot 1 */}
        <div className="text-center mb-10">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">
            Guitars
          </h1>
          <div className="w-12 h-1 bg-amber-400 mx-auto mt-2.5 rounded-full" />
        </div>

        {/* 6-Column Category Cards Grid (screenshot 1) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5 mb-16">
          {GUITAR_CATEGORIES.slice(0, 6).map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.name)}
              className="group cursor-pointer border border-zinc-200 bg-white rounded-sm p-4 flex flex-col items-center justify-between transition-all duration-200 hover:shadow-lg hover:border-amber-400/80"
            >
              {/* Image container */}
              <div className="w-full aspect-square flex items-center justify-center p-2 mb-4 overflow-hidden">
                <img
                  src={cat.image}
                  alt={cat.name}
                  referrerPolicy="no-referrer"
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    // Safe SVG fallback
                    const target = e.currentTarget;
                    target.src = '/src/assets/images/guitar_acoustic_showcase_1791430682999.jpg';
                  }}
                />
              </div>

              {/* Title matching screenshot 1 */}
              <h3 className="text-sm font-semibold text-zinc-900 text-center group-hover:text-amber-600 transition-colors">
                {cat.name}
              </h3>
            </div>
          ))}
        </div>

        {/* Row 2 additional guitar & pedal collections */}
        <div className="border-t border-zinc-100 pt-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-zinc-900">
                More Categories & Gear
              </h2>
              <p className="text-xs md:text-sm text-zinc-500 mt-0.5">
                Effects, accessories, and specialty acoustics
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-5">
            {GUITAR_CATEGORIES.slice(6).map((cat) => (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.name)}
                className="group cursor-pointer border border-zinc-200 bg-white rounded-sm p-4 flex items-center gap-4 transition-all duration-200 hover:shadow-md hover:border-amber-400"
              >
                <div className="w-20 h-20 shrink-0 aspect-square flex items-center justify-center overflow-hidden bg-zinc-50 rounded-sm">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    referrerPolicy="no-referrer"
                    className="max-h-full max-w-full object-contain transition-transform group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/src/assets/images/guitar_acoustic_showcase_1791430682999.jpg';
                    }}
                  />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-zinc-900 group-hover:text-amber-600 transition-colors">
                    {cat.name}
                  </h4>
                  <p className="text-xs text-zinc-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-medium text-amber-600 mt-2">
                    Explore collection <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Handcrafted Instruments */}
        {guitarFeaturedProducts.length > 0 && (
          <div className="mt-16 border-t border-zinc-100 pt-10">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl md:text-2xl font-bold text-zinc-900">
                  Featured Instruments
                </h2>
                <p className="text-xs md:text-sm text-zinc-500 mt-1">
                  Hand-inspected guitars with free nationwide courier shipping
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {guitarFeaturedProducts.map((product) => (
                <div
                  key={product.id}
                  className="border border-zinc-200 rounded-sm p-5 flex flex-col justify-between group hover:shadow-md transition-shadow"
                >
                  <div
                    onClick={() => onOpenProduct(product)}
                    className="cursor-pointer"
                  >
                    <div className="w-full h-56 flex items-center justify-center p-3 mb-4 bg-zinc-50 rounded-sm overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="text-xs font-semibold text-amber-600 uppercase tracking-wider mb-1">
                      {product.brand}
                    </div>
                    <h4 className="font-semibold text-zinc-900 text-base line-clamp-1 group-hover:text-amber-600 transition-colors">
                      {product.name}
                    </h4>

                    {/* Rating */}
                    {product.rating && (
                      <div className="flex items-center gap-1.5 mt-2">
                        <div className="flex text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`w-3.5 h-3.5 ${
                                i < Math.floor(product.rating || 0)
                                  ? 'fill-amber-400'
                                  : 'text-zinc-200'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-zinc-500 font-medium">
                          ({product.reviewsCount})
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-4 border-t border-zinc-100 flex items-center justify-between">
                    <div>
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-zinc-900 tabular-nums">
                          ₹ {product.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-zinc-400 line-through tabular-nums">
                          ₹ {product.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-red-600">
                        {product.discountPercentage}% Off
                      </span>
                    </div>

                    <button
                      onClick={() => onAddToCart(product)}
                      className="px-3.5 py-2 bg-amber-400 hover:bg-amber-500 text-black text-xs font-bold rounded-sm flex items-center gap-1.5 transition-colors shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
