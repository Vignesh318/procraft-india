import React, { useState } from 'react';
import { ActiveTab } from '../types';

interface NewsletterAndFooterProps {
  onNavigate: (tab: ActiveTab, subcategory?: string) => void;
  onOpenPolicyModal?: (title: string, content: string) => void;
}

export const NewsletterAndFooter: React.FC<NewsletterAndFooterProps> = ({
  onNavigate,
  onOpenPolicyModal
}) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 4000);
    }
  };

  const handleFooterLink = (label: string) => {
    if (label === 'Blog') {
      onNavigate('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (label === 'Videos' || label === 'Our Artists') {
      onNavigate('blog');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (onOpenPolicyModal) {
      onOpenPolicyModal(
        label,
        `Welcome to Procraft India's ${label} center. We are committed to providing world-class musical gear, 100% genuine factory warranty, prompt 24-48 hour dispatch, and dedicated musician support across all states in India.`
      );
    }
  };

  return (
    <div>
      {/* 1. Newsletter Section matching screenshot 2 */}
      <section className="bg-[#FAF6EC] py-12 px-4 sm:px-6 relative overflow-hidden border-t border-zinc-200/50">
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <h2 className="text-xl sm:text-2xl font-bold text-zinc-900 tracking-tight mb-5">
            Subscribe to our Newsletter
          </h2>

          {subscribed ? (
            <div className="bg-amber-100 border border-amber-300 text-amber-900 px-4 py-2.5 rounded-xs text-xs font-semibold animate-fade-in">
              ✓ Thank you for subscribing! Check your inbox for exclusive gear drops & offers.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-center gap-0 max-w-lg mx-auto shadow-xs">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
                className="w-full bg-white text-zinc-900 placeholder-zinc-400 text-xs sm:text-sm px-4 py-3 border border-zinc-300 focus:outline-none focus:border-amber-500 rounded-none"
              />
              <button
                type="submit"
                className="w-full sm:w-auto bg-[#EAA400] hover:bg-[#d89600] active:bg-[#c68900] text-black text-xs sm:text-sm font-semibold px-8 py-3 transition-colors uppercase tracking-wider shrink-0"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* 2. Download Our App Banner matching screenshot 2 */}
      <section className="bg-black text-white py-10 px-4 text-center border-b border-zinc-900">
        <h3 className="text-base font-semibold text-zinc-100 tracking-wide mb-5">
          Download Our App
        </h3>
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* App Store button */}
          <a
            href="#app-store"
            onClick={(e) => {
              e.preventDefault();
              alert('Procraft iOS App is available on the Apple App Store for India.');
            }}
            className="flex items-center gap-3 bg-black border border-zinc-700 hover:border-zinc-400 px-4 py-2 rounded-lg transition-colors group"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white group-hover:scale-105 transition-transform">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.42c.62-.75 1.04-1.8 0.93-2.85-.9.04-2 .6-2.65 1.35-.58.67-1.09 1.74-.95 2.77 1 .08 2.05-.52 2.67-1.27z" />
            </svg>
            <div className="text-left leading-tight">
              <div className="text-[10px] text-zinc-400">Download on the</div>
              <div className="text-xs font-bold text-white">App Store</div>
            </div>
          </a>

          {/* Google Play button */}
          <a
            href="#google-play"
            onClick={(e) => {
              e.preventDefault();
              alert('Procraft Android App is available on Google Play Store.');
            }}
            className="flex items-center gap-3 bg-black border border-zinc-700 hover:border-zinc-400 px-4 py-2 rounded-lg transition-colors group"
          >
            <svg viewBox="0 0 24 24" className="w-6 h-6 fill-white group-hover:scale-105 transition-transform">
              <path d="M3.609 1.814L13.792 12 3.61 22.186c-.347-.367-.549-.893-.549-1.503V3.317c0-.61.202-1.136.548-1.503zm11.238 11.241l2.383-2.383-11.834-6.84 9.451 9.223zm0 1.89L5.396 24.168l11.834-6.84-2.383-2.383zm1.464-1.465l3.18-1.84c.895-.518.895-1.365 0-1.884l-3.18-1.84-1.81 1.782 1.81 1.782z" />
            </svg>
            <div className="text-left leading-tight">
              <div className="text-[10px] text-zinc-400 uppercase">GET IT ON</div>
              <div className="text-xs font-bold text-white">Google Play</div>
            </div>
          </a>
        </div>
      </section>

      {/* 3. Footer Columns matching screenshot 2 */}
      <footer className="bg-black text-white pt-14 pb-12 px-4 sm:px-6 lg:px-8 border-t border-zinc-900">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Logo & Social Icons */}
          <div className="space-y-6">
            <div className="w-14 h-16">
              <svg viewBox="0 0 100 115" className="w-full h-full fill-amber-400">
                <polygon points="50 0, 100 28.8, 100 86.6, 50 115.4, 0 86.6, 0 28.8" />
                <path
                  d="M34 26 L66 26 C76 26 82 32 82 42 C82 52 76 58 66 58 L50 58 L50 88 L34 88 Z M50 44 L64 44 C67 44 69 42 69 42 C69 42 67 40 64 40 L50 40 Z"
                  fill="#000000"
                />
              </svg>
            </div>

            {/* Social media icons matching screenshot 2: Facebook, LinkedIn, Pinterest, YouTube, Instagram */}
            <div className="flex items-center gap-3 text-zinc-300">
              {/* Facebook */}
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full border border-zinc-600 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center text-xs transition-colors"
                aria-label="Facebook"
              >
                f
              </a>
              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full border border-zinc-600 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center text-xs font-bold transition-colors"
                aria-label="LinkedIn"
              >
                in
              </a>
              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full border border-zinc-600 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center text-xs font-bold transition-colors"
                aria-label="Pinterest"
              >
                P
              </a>
              {/* YouTube */}
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full border border-zinc-600 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center text-xs transition-colors"
                aria-label="YouTube"
              >
                ▶
              </a>
              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-7 h-7 rounded-full border border-zinc-600 hover:border-amber-400 hover:text-amber-400 flex items-center justify-center text-xs transition-colors"
                aria-label="Instagram"
              >
                📷
              </a>
            </div>
          </div>

          {/* Information Column matching screenshot 2 */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-100 tracking-wider mb-4">
              Information
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {['About Us', 'Videos', 'Our Artists', 'Store Locator'].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleFooterLink(item)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Company Column matching screenshot 2 */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-100 tracking-wider mb-4">
              Our Company
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {['Photo Gallery', 'Testimonials', 'Procraft Live sessions', 'Blog'].map(
                (item) => (
                  <li key={item}>
                    <button
                      onClick={() => handleFooterLink(item)}
                      className="hover:text-amber-400 transition-colors text-left"
                    >
                      {item}
                    </button>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Customer Service Column matching screenshot 2 */}
          <div>
            <h4 className="text-sm font-semibold text-zinc-100 tracking-wider mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2.5 text-xs text-zinc-400">
              {[
                'Contact',
                "FAQ's",
                'Shipping Policy',
                'Refund & Return Policy',
                'Cancellation Policy',
                'Track Order'
              ].map((item) => (
                <li key={item}>
                  <button
                    onClick={() => handleFooterLink(item)}
                    className="hover:text-amber-400 transition-colors text-left"
                  >
                    {item}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom copyright notice */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-600">
          <p>© 2026 Procraft India. All Rights Reserved. Crafted for musicians.</p>
          <div className="flex gap-4 mt-2 sm:mt-0">
            <span>GST Registered Store</span>
            <span>·</span>
            <span>100% Genuine Certified</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
