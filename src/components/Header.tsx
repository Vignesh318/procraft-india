import React, { useState } from 'react';
import { Search, Heart, User, ShoppingCart, ChevronDown, Menu, X } from 'lucide-react';
import { ActiveTab } from '../types';
import { NAV_DROPDOWNS } from '../data/storeData';

interface HeaderProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  onSelectCategory?: (category: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  onSelectCategory
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleNavClick = (tab: ActiveTab, categoryName?: string) => {
    setActiveTab(tab);
    if (categoryName && onSelectCategory) {
      onSelectCategory(categoryName);
    }
    setActiveDropdown(null);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-black text-white sticky top-0 z-40 select-none shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Left: Brand Hexagon Logo */}
        <button
          onClick={() => handleNavClick('guitars')}
          className="flex items-center gap-2 group focus:outline-none"
          aria-label="Procraft India Home"
        >
          {/* Authentic Hexagon P Logo matching screenshot */}
          <div className="w-10 h-11 relative flex items-center justify-center transition-transform group-hover:scale-105">
            <svg viewBox="0 0 100 115" className="w-full h-full drop-shadow-sm fill-amber-400">
              {/* Outer hexagon */}
              <polygon points="50 0, 100 28.8, 100 86.6, 50 115.4, 0 86.6, 0 28.8" />
              {/* Inner cutout P */}
              <path
                d="M34 26 L66 26 C76 26 82 32 82 42 C82 52 76 58 66 58 L50 58 L50 88 L34 88 Z M50 44 L64 44 C67 44 69 42 69 42 C69 42 67 40 64 40 L50 40 Z"
                fill="#000000"
              />
            </svg>
          </div>
        </button>

        {/* Center: Desktop Two-Row Navigation matching screenshots */}
        <div className="hidden lg:flex flex-col items-center gap-1.5 flex-1 px-4">
          {/* Row 1 */}
          <nav className="flex items-center gap-6 xl:gap-8 text-xs font-semibold tracking-wider text-zinc-100 uppercase">
            {/* GUITARS with Dropdown */}
            <div
              className="relative group py-1"
              onMouseEnter={() => setActiveDropdown('guitars')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('guitars')}
                className={`flex items-center gap-1 hover:text-amber-400 transition-colors ${
                  activeTab === 'guitars' ? 'text-amber-400' : ''
                }`}
              >
                <span>GUITARS</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-amber-400 transition-transform group-hover:rotate-180" />
              </button>

              {/* Dropdown Menu */}
              {activeDropdown === 'guitars' && (
                <div className="absolute top-full left-0 w-60 bg-zinc-950 border border-zinc-800 rounded-b shadow-2xl py-2 z-50">
                  {NAV_DROPDOWNS.guitars.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavClick('guitars', item)}
                      className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:text-amber-400 hover:bg-zinc-900 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* UKULELE with Dropdown */}
            <div
              className="relative group py-1"
              onMouseEnter={() => setActiveDropdown('ukulele')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('ukulele')}
                className={`flex items-center gap-1 hover:text-amber-400 transition-colors ${
                  activeTab === 'ukulele' ? 'text-amber-400' : ''
                }`}
              >
                <span>UKULELE</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-amber-400 transition-transform group-hover:rotate-180" />
              </button>
              {activeDropdown === 'ukulele' && (
                <div className="absolute top-full left-0 w-60 bg-zinc-950 border border-zinc-800 rounded-b shadow-2xl py-2 z-50">
                  {NAV_DROPDOWNS.ukulele.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavClick('ukulele', item)}
                      className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:text-amber-400 hover:bg-zinc-900 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* DONNER */}
            <button
              onClick={() => handleNavClick('headphones', 'Donner')}
              className="hover:text-amber-400 transition-colors"
            >
              DONNER
            </button>

            {/* AMPLIFIERS */}
            <button
              onClick={() => handleNavClick('amplifiers')}
              className={`hover:text-amber-400 transition-colors ${
                activeTab === 'amplifiers' ? 'text-amber-400' : ''
              }`}
            >
              AMPLIFIERS
            </button>

            {/* VIOLINS with Dropdown */}
            <div
              className="relative group py-1"
              onMouseEnter={() => setActiveDropdown('violins')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('accessories', 'Violins')}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors"
              >
                <span>VIOLINS</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-amber-400 transition-transform group-hover:rotate-180" />
              </button>
              {activeDropdown === 'violins' && (
                <div className="absolute top-full left-0 w-56 bg-zinc-950 border border-zinc-800 rounded-b shadow-2xl py-2 z-50">
                  {NAV_DROPDOWNS.violins.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavClick('accessories', item)}
                      className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:text-amber-400 hover:bg-zinc-900 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* WIND AND PERCUSSION with Dropdown */}
            <div
              className="relative group py-1"
              onMouseEnter={() => setActiveDropdown('windPercussion')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('accessories', 'Percussion')}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors"
              >
                <span>WIND AND PERCUSSION</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-amber-400 transition-transform group-hover:rotate-180" />
              </button>
              {activeDropdown === 'windPercussion' && (
                <div className="absolute top-full left-0 w-64 bg-zinc-950 border border-zinc-800 rounded-b shadow-2xl py-2 z-50">
                  {NAV_DROPDOWNS.windPercussion.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavClick('accessories', item)}
                      className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:text-amber-400 hover:bg-zinc-900 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* HEADPHONES */}
            <button
              onClick={() => handleNavClick('headphones')}
              className={`hover:text-amber-400 transition-colors ${
                activeTab === 'headphones' ? 'text-amber-400 font-bold' : ''
              }`}
            >
              HEADPHONES
            </button>
          </nav>

          {/* Row 2 */}
          <nav className="flex items-center gap-6 xl:gap-8 text-xs font-semibold tracking-wider text-zinc-300 uppercase">
            {/* KEYBOARDS with Dropdown */}
            <div
              className="relative group py-1"
              onMouseEnter={() => setActiveDropdown('keyboards')}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                onClick={() => handleNavClick('blog')}
                className="flex items-center gap-1 hover:text-amber-400 transition-colors"
              >
                <span>KEYBOARDS</span>
                <ChevronDown className="w-3 h-3 text-zinc-400 group-hover:text-amber-400 transition-transform group-hover:rotate-180" />
              </button>
              {activeDropdown === 'keyboards' && (
                <div className="absolute top-full left-0 w-64 bg-zinc-950 border border-zinc-800 rounded-b shadow-2xl py-2 z-50">
                  {NAV_DROPDOWNS.keyboards.map((item) => (
                    <button
                      key={item}
                      onClick={() => handleNavClick('blog', item)}
                      className="w-full text-left px-4 py-2 text-xs text-zinc-300 hover:text-amber-400 hover:bg-zinc-900 transition-colors"
                    >
                      {item}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => handleNavClick('guitars', 'Pickups')}
              className="hover:text-amber-400 transition-colors"
            >
              PICKUPS
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className="hover:text-amber-400 transition-colors"
            >
              VIDEOS
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className="hover:text-amber-400 transition-colors"
            >
              ARTISTS
            </button>

            <button
              onClick={() => handleNavClick('blog')}
              className={`hover:text-amber-400 transition-colors ${
                activeTab === 'blog' ? 'text-amber-400 font-bold' : ''
              }`}
            >
              BLOG
            </button>

            <button
              onClick={() => handleNavClick('guitars')}
              className="hover:text-amber-400 transition-colors"
            >
              ARCHIVE
            </button>
          </nav>
        </div>

        {/* Right: Actions (Search, Heart, User, Cart) */}
        <div className="flex items-center gap-4 sm:gap-5 text-zinc-200">
          <button
            onClick={onOpenSearch}
            className="p-1 hover:text-amber-400 transition-colors focus:outline-none"
            aria-label="Search store"
          >
            <Search className="w-5 h-5 stroke-[2.2]" />
          </button>

          <button
            onClick={onOpenWishlist}
            className="p-1 hover:text-amber-400 transition-colors relative focus:outline-none"
            aria-label="View Wishlist"
          >
            <Heart className="w-5 h-5 stroke-[2.2]" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-2 bg-amber-400 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          <button
            onClick={onOpenAccount}
            className="p-1 hover:text-amber-400 transition-colors focus:outline-none"
            aria-label="Account Login"
          >
            <User className="w-5 h-5 stroke-[2.2]" />
          </button>

          <button
            onClick={onOpenCart}
            className="p-1 hover:text-amber-400 transition-colors relative focus:outline-none"
            aria-label="Cart"
          >
            <ShoppingCart className="w-5 h-5 stroke-[2.2]" />
            {/* Cart count badge */}
            <span className="absolute -top-1.5 -right-2 bg-amber-400 text-black text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1 text-zinc-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-zinc-950 border-t border-zinc-800 px-6 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-xs font-semibold uppercase tracking-wider text-zinc-200">
            <button
              onClick={() => handleNavClick('guitars')}
              className="text-left py-2 hover:text-amber-400"
            >
              Guitars
            </button>
            <button
              onClick={() => handleNavClick('headphones')}
              className="text-left py-2 hover:text-amber-400 text-amber-400"
            >
              Headphones
            </button>
            <button
              onClick={() => handleNavClick('ukulele')}
              className="text-left py-2 hover:text-amber-400"
            >
              Ukulele
            </button>
            <button
              onClick={() => handleNavClick('amplifiers')}
              className="text-left py-2 hover:text-amber-400"
            >
              Amplifiers
            </button>
            <button
              onClick={() => handleNavClick('accessories', 'Violins')}
              className="text-left py-2 hover:text-amber-400"
            >
              Violins
            </button>
            <button
              onClick={() => handleNavClick('accessories', 'Percussion')}
              className="text-left py-2 hover:text-amber-400"
            >
              Percussion
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="text-left py-2 hover:text-amber-400"
            >
              Blog
            </button>
            <button
              onClick={() => handleNavClick('blog')}
              className="text-left py-2 hover:text-amber-400"
            >
              Artists & Videos
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
