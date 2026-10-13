import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'shipping' | 'success'>('cart');
  const [shippingForm, setShippingForm] = useState({
    name: 'Vignesh Devadiga',
    phone: '+91 98765 43210',
    address: 'Flat 402, Lotus Residency, MG Road',
    city: 'Bengaluru',
    pincode: '560001',
    paymentMethod: 'upi'
  });

  if (!isOpen) return null;

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const totalOriginal = cartItems.reduce(
    (sum, item) => sum + item.product.originalPrice * item.quantity,
    0
  );
  const totalSavings = totalOriginal - subtotal;
  const freeShippingThreshold = 999;
  const isFreeShipping = subtotal >= freeShippingThreshold;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('success');
  };

  const handleFinish = () => {
    onClearCart();
    setCheckoutStep('cart');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="p-4 sm:p-5 border-b border-zinc-200 flex items-center justify-between bg-zinc-50">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-500" />
              <h2 className="text-base font-bold text-zinc-900">
                Your Shopping Cart ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})
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
            {checkoutStep === 'cart' && (
              <>
                {/* Free Shipping Alert */}
                <div className="mb-4 bg-amber-50 border border-amber-200 rounded p-3 text-xs text-amber-900">
                  {isFreeShipping ? (
                    <div className="flex items-center gap-1.5 font-semibold text-emerald-700">
                      <span>✓</span>
                      <span>You qualify for FREE Nationwide Courier Shipping!</span>
                    </div>
                  ) : (
                    <div>
                      Add ₹ {(freeShippingThreshold - subtotal).toLocaleString('en-IN')} more to unlock FREE Shipping!
                    </div>
                  )}
                </div>

                {cartItems.length === 0 ? (
                  <div className="text-center py-16">
                    <ShoppingBag className="w-12 h-12 text-zinc-300 mx-auto mb-3" />
                    <p className="text-sm font-semibold text-zinc-700">Your cart is currently empty</p>
                    <p className="text-xs text-zinc-400 mt-1">Explore our guitars and in-ear monitors!</p>
                    <button
                      onClick={onClose}
                      className="mt-5 px-4 py-2 bg-amber-400 hover:bg-amber-500 text-black text-xs font-bold rounded-sm uppercase tracking-wider"
                    >
                      Start Shopping
                    </button>
                  </div>
                ) : (
                  <div className="divide-y divide-zinc-100 space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.product.id} className="pt-3 flex gap-3">
                        <div className="w-18 h-18 aspect-square bg-zinc-50 border border-zinc-200 rounded-sm p-1.5 shrink-0 flex items-center justify-center">
                          <img
                            src={item.product.image}
                            alt={item.product.name}
                            referrerPolicy="no-referrer"
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>

                        <div className="flex-1 min-w-0 flex flex-col justify-between">
                          <div>
                            <div className="text-[10px] uppercase font-bold text-amber-600">
                              {item.product.brand}
                            </div>
                            <h4 className="text-xs font-semibold text-zinc-900 line-clamp-1">
                              {item.product.name}
                            </h4>
                            <div className="text-xs font-bold text-zinc-900 mt-1 tabular-nums">
                              ₹ {(item.product.price * item.quantity).toLocaleString('en-IN')}
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            {/* Quantity buttons */}
                            <div className="flex items-center border border-zinc-300 rounded text-xs bg-white">
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                                }
                                className="px-2 py-0.5 text-zinc-600 hover:bg-zinc-100"
                              >
                                -
                              </button>
                              <span className="px-2 py-0.5 font-medium tabular-nums text-zinc-800">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() =>
                                  onUpdateQuantity(item.product.id, item.quantity + 1)
                                }
                                className="px-2 py-0.5 text-zinc-600 hover:bg-zinc-100"
                              >
                                +
                              </button>
                            </div>

                            <button
                              onClick={() => onRemoveItem(item.product.id)}
                              className="text-zinc-400 hover:text-red-500 p-1"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}

            {checkoutStep === 'shipping' && (
              <form onSubmit={handleCheckoutSubmit} className="space-y-4 text-xs">
                <h3 className="text-sm font-bold text-zinc-900 pb-2 border-b border-zinc-200">
                  Shipping & Dispatch Address
                </h3>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={shippingForm.name}
                    onChange={(e) => setShippingForm({ ...shippingForm, name: e.target.value })}
                    className="w-full border border-zinc-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Mobile Number (For dispatch SMS)</label>
                  <input
                    type="tel"
                    required
                    value={shippingForm.phone}
                    onChange={(e) => setShippingForm({ ...shippingForm, phone: e.target.value })}
                    className="w-full border border-zinc-300 rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Street Address</label>
                  <textarea
                    required
                    rows={2}
                    value={shippingForm.address}
                    onChange={(e) => setShippingForm({ ...shippingForm, address: e.target.value })}
                    className="w-full border border-zinc-300 rounded px-3 py-2"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.city}
                      onChange={(e) => setShippingForm({ ...shippingForm, city: e.target.value })}
                      className="w-full border border-zinc-300 rounded px-3 py-2"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-600 font-medium mb-1">PIN Code</label>
                    <input
                      type="text"
                      required
                      value={shippingForm.pincode}
                      onChange={(e) => setShippingForm({ ...shippingForm, pincode: e.target.value })}
                      className="w-full border border-zinc-300 rounded px-3 py-2"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-600 font-medium mb-1">Payment Method</label>
                  <div className="space-y-1.5 mt-1">
                    <label className="flex items-center gap-2 p-2 border border-zinc-200 rounded cursor-pointer hover:bg-zinc-50">
                      <input
                        type="radio"
                        name="pay"
                        checked={shippingForm.paymentMethod === 'upi'}
                        onChange={() => setShippingForm({ ...shippingForm, paymentMethod: 'upi' })}
                      />
                      <span className="font-semibold text-zinc-800">UPI / QR (Google Pay, PhonePe, Paytm)</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 border border-zinc-200 rounded cursor-pointer hover:bg-zinc-50">
                      <input
                        type="radio"
                        name="pay"
                        checked={shippingForm.paymentMethod === 'card'}
                        onChange={() => setShippingForm({ ...shippingForm, paymentMethod: 'card' })}
                      />
                      <span className="font-semibold text-zinc-800">Credit / Debit Card / Net Banking</span>
                    </label>
                    <label className="flex items-center gap-2 p-2 border border-zinc-200 rounded cursor-pointer hover:bg-zinc-50">
                      <input
                        type="radio"
                        name="pay"
                        checked={shippingForm.paymentMethod === 'cod'}
                        onChange={() => setShippingForm({ ...shippingForm, paymentMethod: 'cod' })}
                      />
                      <span className="font-semibold text-zinc-800">Cash on Delivery (COD)</span>
                    </label>
                  </div>
                </div>

                <div className="pt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setCheckoutStep('cart')}
                    className="flex-1 py-2.5 border border-zinc-300 rounded text-xs font-semibold"
                  >
                    Back to Cart
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-500 text-black rounded text-xs font-bold uppercase tracking-wider"
                  >
                    Place Order (₹ {subtotal.toLocaleString('en-IN')})
                  </button>
                </div>
              </form>
            )}

            {checkoutStep === 'success' && (
              <div className="text-center py-12 space-y-4">
                <CheckCircle2 className="w-14 h-14 text-emerald-500 mx-auto" />
                <h3 className="text-lg font-bold text-zinc-900">
                  Order Confirmed! 🎉
                </h3>
                <p className="text-xs text-zinc-600 leading-relaxed max-w-xs mx-auto">
                  Order #PC-{Math.floor(100000 + Math.random() * 900000)} has been received and scheduled for inspection and packing.
                </p>
                <div className="bg-zinc-50 p-4 rounded text-left text-xs space-y-1.5 border border-zinc-200">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Recipient:</span>
                    <span className="font-semibold">{shippingForm.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Destination:</span>
                    <span className="font-semibold">{shippingForm.city} ({shippingForm.pincode})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Total Paid:</span>
                    <span className="font-bold text-zinc-900">₹ {subtotal.toLocaleString('en-IN')}</span>
                  </div>
                </div>
                <button
                  onClick={handleFinish}
                  className="w-full py-2.5 bg-black hover:bg-zinc-800 text-white rounded text-xs font-bold uppercase tracking-wider"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </div>

          {/* Footer Summary (Cart Step) */}
          {checkoutStep === 'cart' && cartItems.length > 0 && (
            <div className="p-4 sm:p-5 border-t border-zinc-200 bg-zinc-50 space-y-3">
              <div className="space-y-1 text-xs">
                {totalSavings > 0 && (
                  <div className="flex justify-between text-emerald-600 font-semibold">
                    <span>Discount Savings:</span>
                    <span>- ₹ {totalSavings.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-500">
                  <span>Shipping:</span>
                  <span className="text-emerald-600 font-medium">
                    {isFreeShipping ? 'FREE' : '₹ 150'}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-zinc-900 pt-2 border-t border-zinc-200">
                  <span>Subtotal:</span>
                  <span className="tabular-nums">₹ {subtotal.toLocaleString('en-IN')}</span>
                </div>
              </div>

              <button
                onClick={() => setCheckoutStep('shipping')}
                className="w-full bg-amber-400 hover:bg-amber-500 active:bg-amber-600 text-black py-3 rounded-xs font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
