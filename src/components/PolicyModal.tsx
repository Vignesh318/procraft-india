import React from 'react';
import { X } from 'lucide-react';

interface PolicyModalProps {
  title: string | null;
  content: string | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ title, content, onClose }) => {
  if (!title) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-md shadow-2xl max-w-lg w-full overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-1.5 text-zinc-400 hover:text-zinc-900 rounded-full"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <h3 className="text-lg font-bold text-zinc-900 mb-3 border-b border-zinc-200 pb-2">
            {title}
          </h3>

          <div className="text-xs text-zinc-600 leading-relaxed space-y-3">
            <p>{content}</p>

            {title === "FAQ's" && (
              <div className="space-y-2.5 pt-2">
                <div>
                  <h5 className="font-bold text-zinc-800">Q: Are instruments set up before shipping?</h5>
                  <p className="text-zinc-600">Yes! Every guitar undergoes a 12-point inspection, action check, and neck relief tuning by our in-house luthier.</p>
                </div>
                <div>
                  <h5 className="font-bold text-zinc-800">Q: Do you offer Cash on Delivery (COD)?</h5>
                  <p className="text-zinc-600">Yes, COD is available for eligible pin codes across India up to ₹ 25,000.</p>
                </div>
                <div>
                  <h5 className="font-bold text-zinc-800">Q: What is the warranty coverage?</h5>
                  <p className="text-zinc-600">All electronics, amplifiers, headphones, and pickups carry 1-year manufacturer replacement warranty.</p>
                </div>
              </div>
            )}

            {title === 'Contact' && (
              <div className="bg-zinc-50 p-3 rounded text-zinc-700 space-y-1 font-mono text-[11px]">
                <div>Email: support@procraftindia.com</div>
                <div>Phone: +91 98200 12345 (10 AM - 7 PM IST)</div>
                <div>Location: Procraft Experience Center, Bengaluru, Karnataka</div>
              </div>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-100 flex justify-end">
            <button
              onClick={onClose}
              className="text-xs font-semibold px-4 py-2 bg-amber-400 hover:bg-amber-500 text-black rounded-xs"
            >
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
