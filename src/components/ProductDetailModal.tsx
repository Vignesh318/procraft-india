import React, { useState } from 'react';
import { X, Star, ShoppingCart, Heart, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs'>('overview');

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-md shadow-2xl max-w-3xl w-full overflow-hidden relative animate-in fade-in zoom-in-95 duration-200 my-8">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-zinc-400 hover:text-zinc-900 bg-white/80 rounded-full hover:bg-zinc-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Product Image */}
          <div className="p-6 md:p-8 bg-zinc-50 flex flex-col items-center justify-center border-b md:border-b-0 md:border-r border-zinc-200">
            <div className="relative w-full aspect-square flex items-center justify-center">
              {!product.inStock && (
                <div className="absolute top-0 left-0 bg-red-600 text-white text-xs font-bold px-2.5 py-1 rounded-sm">
                  SOLD OUT
                </div>
              )}
              {product.isNew && (
                <div className="absolute top-0 right-0 bg-zinc-900 text-white text-xs font-bold px-2.5 py-1 rounded-sm">
                  NEW ARRIVAL
                </div>
              )}
              <img
                src={product.image}
                alt={product.name}
                referrerPolicy="no-referrer"
                className="max-h-full max-w-full object-contain drop-shadow-md"
              />
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 mt-6 w-full text-center text-[10px] text-zinc-500 border-t border-zinc-200 pt-4">
              <div className="flex flex-col items-center">
                <Truck className="w-4 h-4 text-amber-500 mb-1" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex flex-col items-center">
                <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
                <span>1 Year Warranty</span>
              </div>
              <div className="flex flex-col items-center">
                <RotateCcw className="w-4 h-4 text-blue-500 mb-1" />
                <span>7 Days Return</span>
              </div>
            </div>
          </div>

          {/* Right: Product Details & Purchase Form */}
          <div className="p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  {product.brand} · {product.category}
                </span>
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-1.5 rounded-full transition-colors ${
                    isWishlisted ? 'text-red-500 bg-red-50' : 'text-zinc-400 hover:text-zinc-600'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              <h2 className="text-lg md:text-xl font-bold text-zinc-900 mt-2 leading-tight">
                {product.name}
              </h2>

              {/* Rating */}
              {product.rating && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating || 0)
                            ? 'fill-amber-400'
                            : 'text-zinc-200'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-zinc-500 font-medium">
                    {product.rating} / 5.0 ({product.reviewsCount} customer reviews)
                  </span>
                </div>
              )}

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-4">
                <span className="text-2xl font-bold text-zinc-900 tabular-nums">
                  ₹ {product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-zinc-400 line-through tabular-nums">
                  ₹ {product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-red-600 bg-red-50 px-2 py-0.5 rounded-xs">
                  {product.discountPercentage}% Off
                </span>
              </div>

              {/* Description & Specs Tabs */}
              <div className="mt-5">
                <div className="flex border-b border-zinc-200 text-xs font-semibold">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2 mr-4 border-b-2 transition-colors ${
                      activeTab === 'overview'
                        ? 'border-amber-400 text-zinc-900'
                        : 'border-transparent text-zinc-400 hover:text-zinc-600'
                    }`}
                  >
                    Overview
                  </button>
                  {product.specs && (
                    <button
                      onClick={() => setActiveTab('specs')}
                      className={`pb-2 border-b-2 transition-colors ${
                        activeTab === 'specs'
                          ? 'border-amber-400 text-zinc-900'
                          : 'border-transparent text-zinc-400 hover:text-zinc-600'
                      }`}
                    >
                      Specifications
                    </button>
                  )}
                </div>

                <div className="pt-3 text-xs text-zinc-600 max-h-36 overflow-y-auto leading-relaxed">
                  {activeTab === 'overview' ? (
                    <div>
                      <p>{product.description}</p>
                      <ul className="mt-2 space-y-1">
                        {product.features.map((feat, i) => (
                          <li key={i} className="flex items-start gap-1.5 text-zinc-700">
                            <span className="text-amber-500 font-bold">•</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div className="space-y-1.5 divide-y divide-zinc-100">
                      {product.specs &&
                        Object.entries(product.specs).map(([key, val]) => (
                          <div key={key} className="flex justify-between pt-1">
                            <span className="text-zinc-500">{key}:</span>
                            <span className="font-semibold text-zinc-800">{val}</span>
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Add to Cart Actions */}
            <div className="mt-6 pt-4 border-t border-zinc-200">
              {product.inStock ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold text-zinc-700">Quantity:</span>
                    <div className="flex items-center border border-zinc-300 rounded-sm bg-white text-xs">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1.5 hover:bg-zinc-100 text-zinc-700 font-bold"
                      >
                        -
                      </button>
                      <span className="px-3 py-1.5 font-semibold tabular-nums text-zinc-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-3 py-1.5 hover:bg-zinc-100 text-zinc-700 font-bold"
                      >
                        +
                      </button>
                    </div>
                    <span className="text-[11px] text-emerald-600 font-medium">
                      In Stock · Ready to dispatch
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        onAddToCart(product, quantity);
                        onClose();
                      }}
                      className="flex-1 bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-black py-2.5 rounded-xs font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-zinc-100 text-zinc-500 text-center py-3 rounded-xs text-xs font-bold uppercase tracking-wider">
                  Currently Sold Out — Join Waitlist
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
