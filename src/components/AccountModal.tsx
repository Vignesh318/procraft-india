import React, { useState } from 'react';
import { X, User, Package, MapPin, LogOut } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [tab, setTab] = useState<'profile' | 'orders'>('profile');
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-md shadow-2xl max-w-md w-full overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 text-zinc-400 hover:text-zinc-900 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-lg">
              VD
            </div>
            <div>
              <h3 className="text-base font-bold text-zinc-900">Vignesh Devadiga</h3>
              <p className="text-xs text-zinc-500">devadigavigneshn@gmail.com</p>
            </div>
          </div>

          <div className="flex border-b border-zinc-200 text-xs font-semibold mb-4">
            <button
              onClick={() => setTab('profile')}
              className={`pb-2.5 mr-6 border-b-2 flex items-center gap-1.5 ${
                tab === 'profile'
                  ? 'border-amber-400 text-zinc-900'
                  : 'border-transparent text-zinc-400 hover:text-zinc-700'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              My Account
            </button>
            <button
              onClick={() => setTab('orders')}
              className={`pb-2.5 border-b-2 flex items-center gap-1.5 ${
                tab === 'orders'
                  ? 'border-amber-400 text-zinc-900'
                  : 'border-transparent text-zinc-400 hover:text-zinc-700'
              }`}
            >
              <Package className="w-3.5 h-3.5" />
              Order History (2)
            </button>
          </div>

          {tab === 'profile' ? (
            <div className="space-y-4 text-xs">
              <div className="p-3 bg-zinc-50 rounded border border-zinc-200">
                <div className="text-[10px] font-bold uppercase text-zinc-400 mb-1">
                  Default Shipping Address
                </div>
                <div className="font-semibold text-zinc-800">Vignesh Devadiga</div>
                <div className="text-zinc-600 mt-0.5">
                  Flat 402, Lotus Residency, MG Road, Bengaluru, Karnataka - 560001
                </div>
                <div className="text-zinc-500 mt-1 font-mono">+91 98765 43210</div>
              </div>

              <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-900">
                <div className="font-bold">Procraft Pro Club Member</div>
                <p className="text-[11px] text-amber-700 mt-0.5">
                  Enjoy priority technical setup, free guitar string rewiring, and extended 18-month warranty on audio hardware.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-3 text-xs max-h-72 overflow-y-auto">
              <div className="p-3 border border-zinc-200 rounded-sm">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
                  <span className="font-bold text-zinc-900">Order #PC-847291</span>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                    Delivered
                  </span>
                </div>
                <div className="mt-2 text-zinc-700">
                  JOYO JMH05 in-ear monitors (x1)
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t border-zinc-100 text-[11px] text-zinc-500">
                  <span>Delivered on Sept 14, 2026</span>
                  <span className="font-bold text-zinc-900">₹ 11,600</span>
                </div>
              </div>

              <div className="p-3 border border-zinc-200 rounded-sm">
                <div className="flex justify-between items-center pb-2 border-b border-zinc-100">
                  <span className="font-bold text-zinc-900">Order #PC-723194</span>
                  <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    In Transit
                  </span>
                </div>
                <div className="mt-2 text-zinc-700">
                  Procraft Artisan Series Dreadnought (x1)
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t border-zinc-100 text-[11px] text-zinc-500">
                  <span>Track: BLUEDART-984210</span>
                  <span className="font-bold text-zinc-900">₹ 18,990</span>
                </div>
              </div>
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-zinc-200 flex justify-end">
            <button
              onClick={onClose}
              className="text-xs font-semibold px-4 py-2 bg-zinc-900 hover:bg-black text-white rounded-xs"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
