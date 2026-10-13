import React, { useState } from 'react';
import { Header } from './components/Header';
import { GuitarsGrid } from './components/GuitarsGrid';
import { HeadphonesCatalog } from './components/HeadphonesCatalog';
import { BlogSection } from './components/BlogSection';
import { NewsletterAndFooter } from './components/NewsletterAndFooter';
import { WhatsAppWidget } from './components/WhatsAppWidget';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BlogDetailModal } from './components/BlogDetailModal';
import { SearchModal } from './components/SearchModal';
import { AccountModal } from './components/AccountModal';
import { PolicyModal } from './components/PolicyModal';
import { ActiveTab, CartItem, Product, BlogPost } from './types';
import { PRODUCTS, BLOG_POSTS } from './data/storeData';
import { Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('guitars');

  // Cart state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    // Initial 1 item so cart is ready to inspect, or empty
    {
      product: PRODUCTS[1], // JOYO JMH05 in-ear monitors
      quantity: 1
    }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Wishlist state
  const [wishlist, setWishlist] = useState<Product[]>([
    PRODUCTS[0] // Donner M100
  ]);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [policyModal, setPolicyModal] = useState<{ title: string; content: string } | null>(null);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  };

  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.name}" to cart!`);
  };

  const handleUpdateCartQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item removed from cart.');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some((p) => p.id === product.id);
    if (exists) {
      setWishlist((prev) => prev.filter((p) => p.id !== product.id));
      showToast(`Removed "${product.name}" from wishlist.`);
    } else {
      setWishlist((prev) => [...prev, product]);
      showToast(`Saved "${product.name}" to wishlist.`);
    }
  };

  const handleRemoveFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleSelectCategory = (catName: string) => {
    if (catName.toLowerCase().includes('headphone') || catName.toLowerCase().includes('in-ear') || catName.toLowerCase().includes('donner')) {
      setActiveTab('headphones');
    } else if (catName.toLowerCase().includes('blog') || catName.toLowerCase().includes('piano')) {
      setActiveTab('blog');
    } else {
      setActiveTab('guitars');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white text-zinc-900 flex flex-col font-sans">
      {/* Top Main Navigation matching Procraft India screenshots */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        wishlistCount={wishlist.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAccount={() => setIsAccountOpen(true)}
        onSelectCategory={handleSelectCategory}
      />

      {/* Main Content Area based on selected tab / view */}
      <main className="flex-1">
        {activeTab === 'guitars' && (
          <GuitarsGrid
            onSelectCategory={handleSelectCategory}
            onOpenProduct={(prod) => setSelectedProduct(prod)}
            onAddToCart={(prod) => handleAddToCart(prod, 1)}
          />
        )}

        {activeTab === 'headphones' && (
          <HeadphonesCatalog
            onOpenProduct={(prod) => setSelectedProduct(prod)}
            onAddToCart={handleAddToCart}
            onGoHome={() => setActiveTab('guitars')}
          />
        )}

        {activeTab === 'blog' && (
          <BlogSection
            onOpenBlog={(post) => setSelectedBlog(post)}
          />
        )}

        {(activeTab === 'ukulele' || activeTab === 'amplifiers' || activeTab === 'accessories') && (
          <div className="max-w-7xl mx-auto px-4 py-12 text-center">
            <h1 className="text-3xl font-bold uppercase tracking-tight text-zinc-900 mb-3">
              {activeTab}
            </h1>
            <p className="text-zinc-500 text-sm max-w-md mx-auto mb-8">
              Explore our hand-picked collection of premium {activeTab} curated for stage and studio musicians.
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setActiveTab('guitars')}
                className="px-5 py-2.5 bg-amber-400 hover:bg-amber-500 text-black text-xs font-bold rounded-sm uppercase tracking-wider"
              >
                Browse Guitars
              </button>
              <button
                onClick={() => setActiveTab('headphones')}
                className="px-5 py-2.5 bg-black hover:bg-zinc-800 text-white text-xs font-bold rounded-sm uppercase tracking-wider"
              >
                Browse Headphones
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Newsletter, Download App Banner & Footer matching screenshot 2 */}
      <NewsletterAndFooter
        onNavigate={(tab, sub) => {
          setActiveTab(tab);
          if (sub) handleSelectCategory(sub);
        }}
        onOpenPolicyModal={(title, content) => setPolicyModal({ title, content })}
      />

      {/* Floating WhatsApp "Chat with us" button matching screenshots */}
      <WhatsAppWidget />

      {/* Slide-over Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveFromCart}
        onClearCart={handleClearCart}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistItems={wishlist}
        onRemoveFromWishlist={handleRemoveFromWishlist}
        onAddToCart={(p) => handleAddToCart(p, 1)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={Boolean(
          selectedProduct && wishlist.some((p) => p.id === selectedProduct.id)
        )}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* Blog Article Reader Modal */}
      <BlogDetailModal
        post={selectedBlog}
        onClose={() => setSelectedBlog(null)}
      />

      {/* Fast Search Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onSelectProduct={(prod) => setSelectedProduct(prod)}
        onSelectBlog={(post) => setSelectedBlog(post)}
        onSelectCategory={handleSelectCategory}
      />

      {/* Account Profile Modal */}
      <AccountModal
        isOpen={isAccountOpen}
        onClose={() => setIsAccountOpen(false)}
      />

      {/* Policy and Information Modal */}
      <PolicyModal
        title={policyModal?.title || null}
        content={policyModal?.content || null}
        onClose={() => setPolicyModal(null)}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-zinc-900 text-white px-4 py-2.5 rounded-sm shadow-xl flex items-center gap-2 text-xs font-medium border border-zinc-700 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="w-4 h-4 rounded-full bg-amber-400 text-black flex items-center justify-center font-bold text-[10px]">
            <Check className="w-3 h-3 stroke-[3]" />
          </div>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
