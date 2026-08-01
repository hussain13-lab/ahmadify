import React, { useState } from 'react';
import { formatCurrencyPrice } from '../utils/currencyAndLanguage';
import {
  X,
  Star,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RefreshCw,
  CheckCircle2,
  Package,
  Clock,
  MessageSquare,
  Sparkles,
  Plus,
  Video
} from 'lucide-react';
import { Product, CurrencyCode, ProductReview } from '../types';

interface ProductDetailsModalProps {
  product: Product | null;
  currency: CurrencyCode;
  companyInfo?: any;
  isWishlisted?: boolean;
  onClose: () => void;
  onToggleWishlist?: (p: Product) => void;
  onAddToCart: (p: Product, variantId?: string, qty?: number, color?: string, size?: string) => void;
  onAddReview?: (productId: string, review: Omit<ProductReview, 'id' | 'date'>) => void;
}

export const ProductDetailsModal: React.FC<ProductDetailsModalProps> = ({
  product,
  currency,
  companyInfo,
  isWishlisted = false,
  onClose,
  onToggleWishlist,
  onAddToCart,
  onAddReview,
}) => {
  if (!product) return null;

  const [selectedImage, setSelectedImage] = useState(product.images?.[0] || '');
  const [selectedVariant, setSelectedVariant] = useState(
    (product.variants || []).length > 0 ? product.variants[0] : null
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'reviews'>('overview');

  // Review form state
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [reviewTitle, setReviewTitle] = useState('');
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const formatPrice = (amount: number) => formatCurrencyPrice(amount, currency);

  const reviewsList = product.reviews || [];
  const totalReviews = reviewsList.length || product.reviewCount || 0;
  const avgRating = product.rating || (totalReviews > 0 ? Number((reviewsList.reduce((acc, r) => acc + r.rating, 0) / totalReviews).toFixed(1)) : 5.0);

  const ratingCounts = [5, 4, 3, 2, 1].map((stars) => {
    const count = reviewsList.filter((r) => Math.round(r.rating) === stars).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : (stars === 5 ? 100 : 0);
    return { stars, count, percentage };
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewAuthor || !reviewComment) return;

    if (onAddReview) {
      onAddReview(product.id, {
        author: reviewAuthor,
        rating: reviewRating,
        title: reviewTitle || 'Great purchase',
        comment: reviewComment,
        verifiedPurchase: true,
      });
    }

    setReviewSubmitted(true);
    setReviewAuthor('');
    setReviewTitle('');
    setReviewComment('');
  };

  const currentPrice = selectedVariant ? selectedVariant.price : product.price;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-300 font-semibold">
            <span className="text-amber-400 uppercase tracking-widest">{product.brand}</span>
            <span>•</span>
            <span>{product.category}</span>
            <span>•</span>
            <span className="text-slate-400 font-mono">SKU: {product.sku}</span>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body Content */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Gallery Column */}
            <div className="md:col-span-6 space-y-4">
              <div className="aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 relative group">
                {selectedImage === 'VIDEO' || (!selectedImage && product.videoUrl) ? (
                  <video
                    src={product.videoUrl}
                    controls
                    autoPlay
                    loop
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img
                    src={selectedImage || product.images?.[0] || ''}
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                )}

                {product.cjProductId && (
                  <span className="absolute top-3 left-3 bg-slate-900/90 text-amber-400 text-[10px] font-bold px-2.5 py-1 rounded-md border border-amber-400/30 flex items-center gap-1">
                    <RefreshCw className="w-3 h-3" /> CJdropshipping Logistics Verified
                  </span>
                )}
              </div>

              {/* Thumbnails */}
              {((product.images || []).length > 1 || product.videoUrl) && (
                <div className="flex items-center gap-3 overflow-x-auto pb-1">
                  {product.videoUrl && (
                    <button
                      onClick={() => setSelectedImage('VIDEO')}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all bg-slate-900 text-amber-400 flex flex-col items-center justify-center shrink-0 ${
                        selectedImage === 'VIDEO' ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-300 opacity-80'
                      }`}
                    >
                      <Video className="w-6 h-6" />
                      <span className="text-[9px] font-black uppercase">Video</span>
                    </button>
                  )}
                  {(product.images || []).map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(img)}
                      className={`w-16 h-16 rounded-xl overflow-hidden border-2 transition-all ${
                        selectedImage === img ? 'border-amber-500 ring-2 ring-amber-500/20' : 'border-slate-200 opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Purchase Column */}
            <div className="md:col-span-6 space-y-5">
              <div>
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug">
                  {product.title}
                </h2>

                {/* Rating */}
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-amber-400' : 'text-slate-200'}`}
                      />
                    ))}
                  </div>
                  <span className="font-extrabold text-sm text-slate-900">{product.rating}</span>
                  <span className="text-slate-500 text-xs">({product.reviewCount} customer reviews)</span>
                </div>
              </div>

              {/* Price Display */}
              <div className="flex items-baseline gap-3 bg-slate-50 p-3.5 rounded-xl border border-slate-200">
                <span className="text-2xl font-black text-slate-950">
                  {formatPrice(currentPrice)}
                </span>
                {product.originalPrice && (
                  <span className="text-slate-400 text-sm line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="ml-auto text-xs font-bold text-rose-600 bg-rose-100 px-2 py-0.5 rounded">
                    Save {Math.round((1 - currentPrice / product.originalPrice) * 100)}%
                  </span>
                )}
              </div>

              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Variants Selector */}
              {product.variants.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-900 block uppercase tracking-wider">
                    Select Option / Color:
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariant(v)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                          selectedVariant?.id === v.id
                            ? 'bg-slate-900 text-white border-slate-900 shadow-sm'
                            : 'bg-white text-slate-700 border-slate-200 hover:border-amber-400'
                        }`}
                      >
                        {v.name} ({formatPrice(v.price)})
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector & Add to Cart Action */}
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center border border-slate-300 rounded-xl bg-slate-50 overflow-hidden">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 text-xs font-extrabold text-slate-900">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-slate-600 hover:bg-slate-200 font-bold"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() =>
                    onAddToCart(
                      product,
                      selectedVariant?.id,
                      quantity,
                      selectedVariant?.color,
                      selectedVariant?.size
                    )
                  }
                  disabled={product.stock <= 0}
                  className="flex-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-3 px-6 rounded-xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add {quantity} to Cart</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`p-3 rounded-xl border transition-colors ${
                    isWishlisted ? 'bg-rose-50 border-rose-300 text-rose-600' : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-rose-500'
                  }`}
                  title="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-rose-500' : ''}`} />
                </button>
              </div>

              {/* Delivery & Security Badges */}
              <div className="grid grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">Royal Mail 24 Tracked</p>
                    <p className="text-[10px] text-slate-500">Est. 2-4 business days</p>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">AHMADIFY Guarantee</p>
                    <p className="text-[10px] text-slate-500">30 days refund guarantee</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Tabs Section */}
          <div className="border-t border-slate-200 pt-6">
            <div className="flex border-b border-slate-200 gap-6 text-sm font-bold">
              <button
                onClick={() => setActiveTab('overview')}
                className={`pb-3 transition-colors ${
                  activeTab === 'overview' ? 'border-b-2 border-amber-500 text-amber-600' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Overview & Description
              </button>
              <button
                onClick={() => setActiveTab('specs')}
                className={`pb-3 transition-colors ${
                  activeTab === 'specs' ? 'border-b-2 border-amber-500 text-amber-600' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Specifications ({(product.specifications || []).length})
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`pb-3 transition-colors ${
                  activeTab === 'reviews' ? 'border-b-2 border-amber-500 text-amber-600' : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                Reviews ({product.reviews?.length || product.reviewCount || 0})
              </button>
            </div>

            {/* Tab Contents */}
            <div className="py-6">
              {activeTab === 'overview' && (
                <div className="space-y-4 text-slate-700 text-sm leading-relaxed">
                  <p className="whitespace-pre-line">{product.description}</p>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <h4 className="font-extrabold text-slate-900 mb-2 text-xs uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-500" /> Key Features & Quality Highlights
                    </h4>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-800">
                      {(product.tags || []).map((tag, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                          <span>Certified {tag} Standard</span>
                        </li>
                      ))}
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Factory Direct Sourcing & Multi-point QA</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Official Invoice & Tax Compliance Included</span>
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="border border-slate-200 rounded-xl overflow-hidden">
                  <table className="w-full text-left text-xs text-slate-700">
                    <tbody className="divide-y divide-slate-100">
                      {(product.specifications || []).map((s, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
                          <td className="px-4 py-3 font-bold text-slate-900 w-1/3">{s.key}</td>
                          <td className="px-4 py-3 text-slate-600">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-6">
                    {/* Overall Ratings Summary Header */}
                    <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                      <div className="md:col-span-4 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-4">
                        <span className="text-4xl font-black text-slate-900 leading-none mb-1">{avgRating}</span>
                        <div className="flex items-center gap-1 text-amber-400 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${i < Math.round(Number(avgRating)) ? 'fill-amber-400' : 'text-slate-200'}`}
                            />
                          ))}
                        </div>
                        <span className="text-xs text-slate-500 font-medium">Based on {totalReviews} customer reviews</span>
                      </div>

                      <div className="md:col-span-8 space-y-1.5">
                        {ratingCounts.map(({ stars, count, percentage }) => (
                          <div key={stars} className="flex items-center gap-3 text-xs">
                            <span className="w-12 text-slate-600 font-semibold flex items-center gap-1">
                              {stars} <Star className="w-3 h-3 text-amber-400 fill-amber-400 inline" />
                            </span>
                            <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-amber-400 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="w-10 text-right text-slate-400 text-[11px] font-mono">{percentage}%</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Reviews List */}
                    <div className="space-y-4">
                      <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
                        Customer Feedback ({reviewsList.length})
                      </h4>
                      {reviewsList.length > 0 ? (
                        reviewsList.map((r) => (
                          <div key={r.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-bold text-slate-900">{r.author}</span>
                              <span className="text-slate-400 text-[10px]">{r.date}</span>
                            </div>
                            <div className="flex items-center gap-1 text-amber-400">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3.5 h-3.5 ${i < r.rating ? 'fill-amber-400' : 'text-slate-200'}`}
                                />
                              ))}
                              {r.verifiedPurchase && (
                                <span className="ml-2 text-[10px] text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-200">
                                  ✓ Verified Customer
                                </span>
                              )}
                            </div>
                            <p className="font-extrabold text-slate-900">{r.title}</p>
                            <p className="text-slate-700 leading-relaxed">{r.comment}</p>
                          </div>
                        ))
                      ) : (
                        <div className="p-6 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center">
                          <MessageSquare className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                          <p className="text-xs text-slate-600 font-medium">No customer reviews submitted yet for this item.</p>
                          <p className="text-[11px] text-slate-400">Be the first verified customer to share your thoughts!</p>
                        </div>
                      )}
                    </div>

                    {/* Add Review Form */}
                    <form onSubmit={handleReviewSubmit} className="p-5 bg-slate-900 text-white rounded-xl space-y-4 shadow-xl">
                      <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                        <h4 className="font-bold text-sm text-white flex items-center gap-2">
                          <MessageSquare className="w-4 h-4 text-amber-400" /> Share Your Product Review
                        </h4>
                        <span className="text-[10px] text-amber-400 font-mono">Store Rating Guarantee</span>
                      </div>

                      {reviewSubmitted ? (
                        <div className="p-4 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 rounded-xl text-xs font-semibold flex items-center justify-between">
                          <span>Thank you! Your rating and comment have been added to the product.</span>
                          <button
                            type="button"
                            onClick={() => setReviewSubmitted(false)}
                            className="text-[10px] underline text-emerald-200 hover:text-white"
                          >
                            Write another
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="space-y-1.5">
                            <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block">
                              Your Overall Rating
                            </label>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                  type="button"
                                  key={star}
                                  onClick={() => setReviewRating(star)}
                                  onMouseEnter={() => setHoverRating(star)}
                                  onMouseLeave={() => setHoverRating(null)}
                                  className="p-1 text-amber-400 hover:scale-110 transition-transform focus:outline-none"
                                >
                                  <Star
                                    className={`w-6 h-6 ${
                                      star <= (hoverRating ?? reviewRating)
                                        ? 'fill-amber-400 text-amber-400'
                                        : 'text-slate-700 fill-slate-800'
                                    }`}
                                  />
                                </button>
                              ))}
                              <span className="ml-2 text-xs font-bold text-amber-400">
                                {hoverRating ?? reviewRating} / 5 Stars
                              </span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] text-slate-300 font-semibold mb-1 block">Your Name *</label>
                              <input
                                type="text"
                                placeholder="e.g. Sarah Jenkins"
                                value={reviewAuthor}
                                onChange={(e) => setReviewAuthor(e.target.value)}
                                required
                                className="w-full bg-slate-800 text-white px-3 py-2 text-xs rounded-lg border border-slate-700 focus:outline-none focus:border-amber-400"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] text-slate-300 font-semibold mb-1 block">Review Headline</label>
                              <input
                                type="text"
                                placeholder="e.g. Excellent build quality & fast delivery!"
                                value={reviewTitle}
                                onChange={(e) => setReviewTitle(e.target.value)}
                                className="w-full bg-slate-800 text-white px-3 py-2 text-xs rounded-lg border border-slate-700 focus:outline-none focus:border-amber-400"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="text-[11px] text-slate-300 font-semibold mb-1 block">Your Detailed Feedback *</label>
                            <textarea
                              placeholder="Tell us about the quality, durability, comfort, or performance of this product..."
                              rows={3}
                              value={reviewComment}
                              onChange={(e) => setReviewComment(e.target.value)}
                              required
                              className="w-full bg-slate-800 text-white px-3 py-2 text-xs rounded-lg border border-slate-700 focus:outline-none focus:border-amber-400"
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full sm:w-auto bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-6 py-2.5 rounded-xl font-black text-xs shadow-md transition-all flex items-center justify-center gap-2"
                          >
                            <Star className="w-4 h-4 fill-slate-950" />
                            <span>Submit Product Review</span>
                          </button>
                        </>
                      )}
                    </form>
                  </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
