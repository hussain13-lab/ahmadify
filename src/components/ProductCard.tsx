import React from 'react';
import { Heart, Star, ShoppingBag, Eye, RefreshCw, Zap } from 'lucide-react';
import { Product, CurrencyCode } from '../types';
import { formatCurrencyPrice } from '../utils/currencyAndLanguage';

interface ProductCardProps {
  product: Product;
  currency: CurrencyCode;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  currency,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart,
}) => {
  // Currency Symbol & Rate helper
  const formatPrice = (amount: number) => formatCurrencyPrice(amount, currency);

  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock <= 0;

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-amber-400/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden relative">
      {/* Top Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1">
        {product.isFlashDeal && (
          <span className="bg-rose-600 text-white text-[10px] font-black px-2 py-0.5 rounded shadow flex items-center gap-1 uppercase tracking-wider">
            <Zap className="w-3 h-3 fill-white" /> Flash Deal
          </span>
        )}
        {product.cjProductId && (
          <span className="bg-slate-900 text-amber-400 border border-amber-400/30 text-[9px] font-bold px-1.5 py-0.5 rounded shadow flex items-center gap-1">
            <RefreshCw className="w-2.5 h-2.5" /> CJ Verified
          </span>
        )}
      </div>

      {/* Wishlist Button */}
      <button
        onClick={() => onToggleWishlist(product)}
        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 backdrop-blur-md shadow-md flex items-center justify-center text-slate-600 hover:text-rose-500 hover:bg-white transition-all transform hover:scale-110"
        title={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
      </button>

      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-slate-50 cursor-pointer" onClick={() => onQuickView(product)}>
        <img
          src={product.images?.[0] || ''}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
        />

        {/* Quick View Overlay Button */}
        <div className="absolute inset-0 bg-slate-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white/90 text-slate-900 px-4 py-2 rounded-xl text-xs font-bold shadow-lg flex items-center gap-1.5 hover:bg-amber-400 hover:text-slate-950 transition-colors transform translate-y-2 group-hover:translate-y-0"
          >
            <Eye className="w-4 h-4" /> Quick View
          </button>
        </div>
      </div>

      {/* Product Info Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-slate-500 mb-1">
            <span className="font-semibold text-amber-600 uppercase tracking-wider">{product.brand}</span>
            <span className="text-slate-400">{product.category}</span>
          </div>

          <h3
            onClick={() => onQuickView(product)}
            className="font-bold text-slate-900 text-sm line-clamp-2 hover:text-amber-600 cursor-pointer transition-colors leading-snug mb-2"
          >
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2 text-xs">
            <div className="flex text-amber-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3.5 h-3.5 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-200'}`}
                />
              ))}
            </div>
            <span className="font-bold text-slate-800 text-[11px]">{product.rating}</span>
            <span className="text-slate-400 text-[10px]">({product.reviewCount})</span>
          </div>
        </div>

        {/* Pricing & Cart Action */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
          <div>
            {product.originalPrice && (
              <span className="text-slate-400 text-xs line-through block">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-slate-950 font-extrabold text-base">
              {formatPrice(product.price)}
            </span>
          </div>

          <button
            onClick={() => onAddToCart(product)}
            disabled={isOutOfStock}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm ${
              isOutOfStock
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                : 'bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white shadow-slate-900/10'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>{isOutOfStock ? 'Sold Out' : 'Add'}</span>
          </button>
        </div>

        {/* Stock Status Indicator */}
        {isLowStock && (
          <div className="mt-2 text-[10px] text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200 text-center font-bold">
            ⚠️ Low Stock: Only {product.stock} left in store!
          </div>
        )}
      </div>
    </div>
  );
};
