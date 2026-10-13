import React from 'react';
import { X, Heart, Trash2, ShoppingBag } from 'lucide-react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistItems: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistItems,
  onRemoveFromWishlist,
  onAddToCart
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black/60 transition-opacity" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="text-base font-bold text-zinc-900">
                Your Wishlist ({wishlistItems.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-zinc-900 rounded-full hover:bg-zinc-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5">
            {wishlistItems.length === 0 ? (
              <div className="text-center py-16">
                <Heart className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                <p className="text-sm font-semibold text-zinc-700">Your wishlist is empty</p>
                <p className="text-xs text-zinc-400 mt-1">Tap the heart icon on any gear to save it for later.</p>
              </div>
            ) : (
              <div className="divide-y divide-zinc-100 space-y-3">
                {wishlistItems.map((product) => (
                  <div key={product.id} className="pt-3 flex gap-3">
                    <div className="w-16 h-16 aspect-square bg-zinc-50 border border-zinc-200 rounded-sm p-1 shrink-0 flex items-center justify-center">
                      <img
                        src={product.image}
                        alt={product.name}
                        referrerPolicy="no-referrer"
                        className="max-h-full max-w-full object-contain"
                      />
                    </div>

                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <div className="text-[10px] uppercase font-bold text-amber-600">
                          {product.brand}
                        </div>
                        <h4 className="text-xs font-semibold text-zinc-900 truncate">
                          {product.name}
                        </h4>
                        <div className="text-xs font-bold text-zinc-900 mt-1 tabular-nums">
                          ₹ {product.price.toLocaleString('en-IN')}
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <button
                          onClick={() => {
                            onAddToCart(product);
                            onRemoveFromWishlist(product.id);
                          }}
                          className="text-[11px] font-bold bg-amber-400 hover:bg-amber-500 text-black px-2.5 py-1 rounded-xs flex items-center gap-1"
                        >
                          <ShoppingBag className="w-3 h-3" />
                          Move to Cart
                        </button>

                        <button
                          onClick={() => onRemoveFromWishlist(product.id)}
                          className="text-zinc-400 hover:text-red-500 p-1"
                          title="Remove from wishlist"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
