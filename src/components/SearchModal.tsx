import React, { useState, useMemo } from 'react';
import { Search, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { PRODUCTS, BLOG_POSTS, GUITAR_CATEGORIES } from '../data/storeData';
import { Product, BlogPost } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
  onSelectBlog: (post: BlogPost) => void;
  onSelectCategory: (categoryName: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
  onSelectBlog,
  onSelectCategory
}) => {
  const [query, setQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!query.trim()) return { products: [], blogs: [], categories: [] };
    const q = query.toLowerCase();

    const products = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
    );

    const blogs = BLOG_POSTS.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        b.category.toLowerCase().includes(q) ||
        b.summary.toLowerCase().includes(q)
    );

    const categories = GUITAR_CATEGORIES.filter((c) =>
      c.name.toLowerCase().includes(q)
    );

    return { products, blogs, categories };
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-start justify-center pt-16 px-4">
      <div className="bg-white rounded-md shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in slide-in-from-top-4 duration-200">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-zinc-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-zinc-400" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search guitars, headphones, accessories, or articles..."
            className="flex-1 text-sm font-medium focus:outline-none placeholder-zinc-400 text-zinc-900"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-xs text-zinc-400 hover:text-zinc-600 px-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-zinc-400 hover:text-zinc-800 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[70vh] overflow-y-auto p-4 sm:p-6 space-y-6">
          {!query.trim() ? (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                Popular Searches
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Donner Studio Headphones',
                  'JOYO in-ear monitors',
                  'Acoustic Guitars',
                  'KZ ZST X',
                  'Guitar Strings',
                  'Piano beginners guide'
                ].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="text-xs bg-zinc-100 hover:bg-amber-100 text-zinc-700 hover:text-amber-900 px-3 py-1.5 rounded-sm transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Products Match */}
              {searchResults.products.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                    Products ({searchResults.products.length})
                  </h4>
                  <div className="space-y-2">
                    {searchResults.products.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="flex items-center gap-3 p-2 rounded hover:bg-zinc-50 cursor-pointer border border-transparent hover:border-zinc-200"
                      >
                        <div className="w-12 h-12 aspect-square p-1 bg-zinc-50 rounded shrink-0 flex items-center justify-center">
                          <img
                            src={product.image}
                            alt={product.name}
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[10px] uppercase font-bold text-amber-600">
                            {product.brand}
                          </div>
                          <h5 className="text-xs font-semibold text-zinc-900 truncate">
                            {product.name}
                          </h5>
                          <span className="text-xs font-bold text-zinc-900 tabular-nums">
                            ₹ {product.price.toLocaleString('en-IN')}
                          </span>
                        </div>
                        <span className="text-xs text-amber-600 font-medium shrink-0">
                          View →
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories Match */}
              {searchResults.categories.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                    Categories ({searchResults.categories.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {searchResults.categories.map((c) => (
                      <button
                        key={c.id}
                        onClick={() => {
                          onSelectCategory(c.name);
                          onClose();
                        }}
                        className="text-xs bg-zinc-100 hover:bg-amber-400 hover:text-black font-semibold text-zinc-800 px-3 py-1.5 rounded-sm transition-colors"
                      >
                        {c.name}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Articles Match */}
              {searchResults.blogs.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                    Blog Articles ({searchResults.blogs.length})
                  </h4>
                  <div className="space-y-2">
                    {searchResults.blogs.map((b) => (
                      <div
                        key={b.id}
                        onClick={() => {
                          onSelectBlog(b);
                          onClose();
                        }}
                        className="p-2.5 rounded hover:bg-zinc-50 cursor-pointer border border-zinc-100"
                      >
                        <span className="text-[10px] text-amber-600 font-bold uppercase">
                          {b.category}
                        </span>
                        <h5 className="text-xs font-semibold text-zinc-900 line-clamp-1">
                          {b.title}
                        </h5>
                        <p className="text-[11px] text-zinc-500 line-clamp-1 mt-0.5">
                          {b.summary}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {searchResults.products.length === 0 &&
                searchResults.blogs.length === 0 &&
                searchResults.categories.length === 0 && (
                  <div className="text-center py-8 text-zinc-500 text-xs">
                    No results found for &ldquo;{query}&rdquo;. Try another term.
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
