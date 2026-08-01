import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ProductCard } from './components/ProductCard';
import { ProductDetailsModal } from './components/ProductDetailsModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { AdminDashboard } from './components/AdminDashboard';
import { LegalPolicyModal } from './components/LegalPolicyModal';
import { LegalPolicyPage } from './components/LegalPolicyPage';
import { ContactPage } from './components/ContactPage';
import { InvoiceView } from './components/InvoiceView';
import { Footer } from './components/Footer';
import { SEOHead } from './components/SEOHead';

import {
  INITIAL_COMPANY_INFO,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_POLICIES,
  INITIAL_SEO_SETTINGS,
  INITIAL_ANALYTICS_SETTINGS,
  INITIAL_BUSINESS_HOURS,
  INITIAL_SOCIAL_LINKS,
  INITIAL_MAP_LOCATION,
  INITIAL_COUPONS
} from './data/initialData';
import {
  Product,
  CartItem,
  Order,
  CurrencyCode,
  LanguageCode,
  CompanyInfo,
  LegalPolicyDoc,
  SEOSettings,
  AnalyticsSettings,
  BusinessHours,
  SocialLinks,
  MapLocation,
  Coupon,
  ProductReview
} from './types';
import { Sparkles, SlidersHorizontal, Tag, RefreshCw } from 'lucide-react';

export default function App() {
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(INITIAL_COMPANY_INFO);
  const [businessHours, setBusinessHours] = useState<BusinessHours>(INITIAL_BUSINESS_HOURS);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>(INITIAL_SOCIAL_LINKS);
  const [mapLocation, setMapLocation] = useState<MapLocation>(INITIAL_MAP_LOCATION);
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [policies, setPolicies] = useState<LegalPolicyDoc[]>(INITIAL_POLICIES);
  const [seoSettings, setSeoSettings] = useState<SEOSettings>(INITIAL_SEO_SETTINGS);
  const [analyticsSettings, setAnalyticsSettings] = useState<AnalyticsSettings>(INITIAL_ANALYTICS_SETTINGS);
  const [coupons, setCoupons] = useState<Coupon[]>(INITIAL_COUPONS);

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);
  const [currency, setCurrency] = useState<CurrencyCode>('GBP');
  const [language, setLanguage] = useState<LanguageCode>('en');

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');
  const [flashDealsOnly, setFlashDealsOnly] = useState(false);

  // View / Page Mode State
  const [currentView, setCurrentView] = useState<'store' | 'contact' | 'policy_page'>('store');

  // Coupon State
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Modal Visibility Controls
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isPolicyOpen, setIsPolicyOpen] = useState(false);
  const [activePolicyKey, setActivePolicyKey] = useState('about');
  const [viewingInvoiceOrder, setViewingInvoiceOrder] = useState<Order | null>(null);

  // Sync state with server backend API on mount
  useEffect(() => {
    fetch('/api/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data.companyInfo) {
          setCompanyInfo(data.companyInfo);
          if (data.businessHours) setBusinessHours(data.businessHours);
          if (data.socialLinks) setSocialLinks(data.socialLinks);
          if (data.mapLocation) setMapLocation(data.mapLocation);
        } else if (data.name) {
          setCompanyInfo(data);
        }
      })
      .catch((err) => console.log('Using default local settings'));

    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProducts(data);
      })
      .catch((err) => console.log('Using default local products'));

    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setOrders(data);
      })
      .catch((err) => console.log('Using default local orders'));

    fetch('/api/policies')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setPolicies(data);
      })
      .catch((err) => console.log('Using default local policies'));

    fetch('/api/seo')
      .then((res) => res.json())
      .then((data) => {
        if (data.defaultTitle) setSeoSettings(data);
      })
      .catch((err) => console.log('Using default local SEO settings'));

    fetch('/api/analytics')
      .then((res) => res.json())
      .then((data) => {
        if (data.googleAnalyticsId) setAnalyticsSettings(data);
      })
      .catch((err) => console.log('Using default local analytics settings'));
  }, []);

  // Cart Operations
  const handleAddToCart = (
    product: Product,
    variantId?: string,
    qty: number = 1,
    color?: string,
    size?: string
  ) => {
    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex(
        (item) => item.productId === product.id && item.variantId === (variantId || undefined)
      );

      const variant = product.variants.find((v) => v.id === variantId);
      const price = variant ? variant.price : product.price;

      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex].quantity += qty;
        return updated;
      }

      return [
        ...prevCart,
        {
          productId: product.id,
          variantId,
          title: product.title,
          image: product.images[0],
          sku: variant ? variant.sku : product.sku,
          price,
          quantity: qty,
          selectedColor: color || (variant?.color),
          selectedSize: size || (variant?.size),
        },
      ];
    });

    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, variantId: string | undefined, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveFromCart(productId, variantId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, quantity: newQty }
          : item
      )
    );
  };

  const handleRemoveFromCart = (productId: string, variantId: string | undefined) => {
    setCart((prev) =>
      prev.filter((item) => !(item.productId === productId && item.variantId === variantId))
    );
  };

  // Wishlist Toggle
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        return prev.filter((p) => p.id !== product.id);
      }
      return [...prev, product];
    });
  };

  // Add Product Review Handler
  const handleAddReview = (productId: string, newReviewData: Omit<ProductReview, 'id' | 'date'>) => {
    const newReview: ProductReview = {
      id: 'rev-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      author: newReviewData.author,
      rating: newReviewData.rating,
      date: new Date().toISOString().split('T')[0],
      title: newReviewData.title,
      comment: newReviewData.comment,
      verifiedPurchase: newReviewData.verifiedPurchase ?? true,
    };

    setProducts((prevProducts) => {
      return prevProducts.map((p) => {
        if (p.id === productId) {
          const existingReviews = p.reviews || [];
          const updatedReviews = [newReview, ...existingReviews];
          const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
          const newAvgRating = Number((totalRating / updatedReviews.length).toFixed(1));

          const updatedProd: Product = {
            ...p,
            rating: newAvgRating,
            reviewCount: updatedReviews.length,
            reviews: updatedReviews,
          };

          if (quickViewProduct?.id === productId) {
            setQuickViewProduct(updatedProd);
          }

          fetch(`/api/products/${productId}/reviews`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newReview),
          }).catch((err) => console.error('Error posting review:', err));

          return updatedProd;
        }
        return p;
      });
    });
  };

  // Coupon Application Handler
  const handleApplyCoupon = async (code: string): Promise<boolean> => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      const response = await fetch('/api/coupons/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ couponCode: code, cartTotal: subtotal }),
      });
      const data = await response.json();

      if (data.valid) {
        setAppliedCoupon(data.couponCode);
        setDiscountAmount(data.discountAmount);
        return true;
      }
    } catch (err) {
      console.warn('Backend coupon endpoint fallback to local verification');
    }

    // Local validation fallback
    const matched = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase() && c.active);
    if (matched) {
      if (matched.minSpend && subtotal < matched.minSpend) {
        return false;
      }
      let disc = 0;
      if (matched.discountPercent) {
        disc = (subtotal * matched.discountPercent) / 100;
      } else if (matched.fixedDiscountAmount) {
        disc = matched.fixedDiscountAmount;
      }
      setAppliedCoupon(matched.code);
      setDiscountAmount(disc);
      return true;
    }
    return false;
  };

  const handleAddCoupon = (newCoupon: Coupon) => {
    setCoupons(prev => [newCoupon, ...prev]);
  };

  const handleDeleteCoupon = (code: string) => {
    setCoupons(prev => prev.filter(c => c.code !== code));
  };

  const handleToggleCoupon = (code: string) => {
    setCoupons(prev => prev.map(c => c.code === code ? { ...c, active: !c.active } : c));
  };

  // Order Placement Handler
  const handlePlaceOrder = async (orderData: Partial<Order>): Promise<Order> => {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal >= companyInfo.freeShippingThreshold ? 0 : companyInfo.standardShippingCost;
    const finalTotal = subtotal - discountAmount + shipping;

    const newOrderPayload: Partial<Order> = {
      ...orderData,
      items: cart,
      subtotal,
      discountAmount: discountAmount,
      shippingCost: shipping,
      totalAmount: finalTotal,
      notes: appliedCoupon ? `Coupon applied: ${appliedCoupon}` : undefined,
    };

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newOrderPayload),
      });
      const createdOrder: Order = await response.json();
      setOrders((prev) => [createdOrder, ...prev]);
      setCart([]);
      setAppliedCoupon(null);
      setDiscountAmount(0);
      return createdOrder;
    } catch (err) {
      const fallbackOrder: Order = {
        id: 'AHM-' + Math.floor(100000 + Math.random() * 900000),
        orderNumber: 'AHM-' + Math.floor(100000 + Math.random() * 900000),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        customerName: orderData.customerName || 'Valued Customer',
        customerEmail: orderData.customerEmail || 'customer@example.com',
        customerPhone: orderData.customerPhone || '+44 7700 900000',
        shippingAddress: orderData.shippingAddress || {
          fullName: orderData.customerName || 'Valued Customer',
          street: '123 Regent Street',
          city: 'London',
          postcode: 'W1B 4HQ',
          country: 'United Kingdom',
          phone: orderData.customerPhone || '+44 7700 900000',
        },
        items: cart,
        subtotal,
        discountAmount: discountAmount,
        shippingCost: shipping,
        taxAmount: (finalTotal * companyInfo.taxRate) / (1 + companyInfo.taxRate),
        totalAmount: finalTotal,
        currency: currency,
        paymentMethod: orderData.paymentMethod || 'stripe',
        paymentStatus: 'paid',
        orderStatus: 'processing',
        trackingNumber: 'GB-CJ-' + Math.floor(10000000 + Math.random() * 90000000),
        carrier: 'Royal Mail 24 Tracked',
        cjSyncStatus: 'synced',
      };
      setOrders((prev) => [fallbackOrder, ...prev]);
      setCart([]);
      setAppliedCoupon(null);
      setDiscountAmount(0);
      return fallbackOrder;
    }
  };

  // Filter & Sort Products
  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    const matchesFlash = !flashDealsOnly || p.isFlashDeal;
    return matchesCategory && matchesSearch && matchesFlash;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  const openPolicyPageOrModal = (key: string) => {
    setActivePolicyKey(key);
    if (key === 'contact') {
      setCurrentView('contact');
    } else {
      setCurrentView('policy_page');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col antialiased text-slate-900">
      {/* Dynamic SEO Meta Tags Manager */}
      <SEOHead
        title={currentView === 'contact' ? 'Contact Us & Registered Office' : currentView === 'policy_page' ? policies.find(p=>p.key===activePolicyKey)?.title : undefined}
        companyInfo={companyInfo}
        seoSettings={seoSettings}
        type={currentView === 'contact' ? 'website' : 'website'}
      />

      {/* Top Main Navigation Bar */}
      <Navbar
        companyInfo={companyInfo}
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        currentCurrency={currency}
        onCurrencyChange={setCurrency}
        currentLanguage={language}
        onLanguageChange={setLanguage}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {}}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenPolicy={(key) => openPolicyPageOrModal(key)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categories={INITIAL_CATEGORIES.map((c) => c.name)}
      />

      {/* VIEW ROUTER */}
      {currentView === 'contact' ? (
        <ContactPage
          companyInfo={companyInfo}
          businessHours={businessHours}
          socialLinks={socialLinks}
          mapLocation={mapLocation}
        />
      ) : currentView === 'policy_page' ? (
        <LegalPolicyPage
          policyKey={activePolicyKey}
          policies={policies}
          companyInfo={companyInfo}
          onBack={() => setCurrentView('store')}
          onSelectPolicy={(k) => setActivePolicyKey(k)}
        />
      ) : (
        <>
          {/* Main Hero Showcase */}
          <HeroBanner
            companyInfo={companyInfo}
            currency={currency}
            onShopNow={() => {
              const el = document.getElementById('catalog-section');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          />

          {/* Main Product Catalog Section */}
          <main id="catalog-section" className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
            {/* Category Selector Tabs */}
            <div className="flex items-center justify-between flex-wrap gap-4 border-b border-slate-200 pb-4">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-extrabold">
                <button
                  onClick={() => setSelectedCategory('All')}
                  className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                    selectedCategory === 'All'
                      ? 'bg-slate-900 text-amber-400 shadow-md'
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  All Categories ({products.length})
                </button>
                {INITIAL_CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                      selectedCategory === cat.name
                        ? 'bg-slate-900 text-amber-400 shadow-md'
                        : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    <span>{cat.name}</span>
                  </button>
                ))}
              </div>

              {/* Sort & Flash Deal Filter */}
              <div className="flex items-center gap-3 text-xs font-bold">
                <button
                  onClick={() => setFlashDealsOnly(!flashDealsOnly)}
                  className={`px-3 py-1.5 rounded-xl border transition-colors flex items-center gap-1.5 ${
                    flashDealsOnly
                      ? 'bg-red-50 text-red-600 border-red-200 font-black'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <Tag className="w-3.5 h-3.5" />
                  <span>Flash Deals Only</span>
                </button>

                <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-3 py-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-slate-400" />
                  <select
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}
                    className="bg-transparent text-slate-800 focus:outline-none cursor-pointer font-bold"
                  >
                    <option value="featured">Sort by Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Product Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 space-y-4">
                <Sparkles className="w-12 h-12 text-slate-300 mx-auto" />
                <h3 className="text-xl font-extrabold text-slate-800">No Products Matched Your Criteria</h3>
                <p className="text-slate-500 text-xs max-w-sm mx-auto">
                  Try clearing your search query or selecting a different category to view available stock.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSearchQuery('');
                    setFlashDealsOnly(false);
                  }}
                  className="px-4 py-2 bg-slate-900 text-amber-400 font-extrabold text-xs rounded-xl hover:bg-slate-800"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {sortedProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    currency={currency}
                    companyInfo={companyInfo}
                    isInWishlist={wishlist.some((p) => p.id === product.id)}
                    onQuickView={(p) => setQuickViewProduct(p)}
                    onAddToCart={(p) => handleAddToCart(p)}
                    onToggleWishlist={(p) => handleToggleWishlist(p)}
                  />
                ))}
              </div>
            )}
          </main>
        </>
      )}

      {/* Quick View / Product Details Modal */}
      {quickViewProduct && (
        <ProductDetailsModal
          product={quickViewProduct}
          currency={currency}
          companyInfo={companyInfo}
          isWishlisted={wishlist.some((p) => p.id === quickViewProduct.id)}
          onClose={() => setQuickViewProduct(null)}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          onAddReview={handleAddReview}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        currency={currency}
        companyInfo={companyInfo}
        appliedCoupon={appliedCoupon}
        discountAmount={discountAmount}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
        onApplyCoupon={handleApplyCoupon}
        onCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Checkout Modal with Official Invoice Data & CJdropshipping Fulfillment */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cart={cart}
        currency={currency}
        companyInfo={companyInfo}
        discountAmount={discountAmount}
        appliedCoupon={appliedCoupon}
        onPlaceOrder={handlePlaceOrder}
        onViewInvoice={(order) => {
          setIsCheckoutOpen(false);
          setViewingInvoiceOrder(order);
        }}
      />

      {/* Order Tracking Modal */}
      <OrderTrackingModal
        isOpen={isTrackOrderOpen}
        onClose={() => setIsTrackOrderOpen(false)}
        companyInfo={companyInfo}
        orders={orders}
      />

      {/* Admin Operations Dashboard */}
      <AdminDashboard
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        products={products}
        orders={orders}
        companyInfo={companyInfo}
        businessHours={businessHours}
        socialLinks={socialLinks}
        policies={policies}
        seoSettings={seoSettings}
        analyticsSettings={analyticsSettings}
        coupons={coupons}
        onAddCoupon={handleAddCoupon}
        onDeleteCoupon={handleDeleteCoupon}
        onToggleCoupon={handleToggleCoupon}
        onUpdateCompanyInfo={(info) => {
          setCompanyInfo(info);
          fetch('/api/settings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ companyInfo: info }),
          });
        }}
        onUpdatePolicy={(key, title, content) => {
          setPolicies((prev) =>
            prev.map((p) => (p.key === key ? { ...p, title, content, lastUpdated: new Date().toISOString().split('T')[0] } : p))
          );
          fetch(`/api/policies/${key}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, content }),
          });
        }}
        onUpdateSeoSettings={(seo) => {
          setSeoSettings(seo);
          fetch('/api/seo', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(seo),
          });
        }}
        onUpdateAnalyticsSettings={(an) => {
          setAnalyticsSettings(an);
          fetch('/api/analytics', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(an),
          });
        }}
        onAddProduct={(newP) => {
          fetch('/api/products', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newP),
          })
            .then((res) => res.json())
            .then((created) => setProducts((prev) => [created, ...prev]))
            .catch(() => {
              const localCreated: Product = {
                ...newP,
                id: 'prod-' + Date.now(),
                createdAt: new Date().toISOString(),
              };
              setProducts((prev) => [localCreated, ...prev]);
            });
        }}
        onUpdateProduct={(upP) => {
          setProducts((prev) => prev.map((p) => (p.id === upP.id ? upP : p)));
          fetch(`/api/products/${upP.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(upP),
          });
        }}
        onDeleteProduct={(id) => {
          setProducts((prev) => prev.filter((p) => p.id !== id));
          fetch(`/api/products/${id}`, { method: 'DELETE' });
        }}
        onUpdateOrderStatus={(id, status, tracking, carrier) => {
          setOrders((prev) =>
            prev.map((o) =>
              o.id === id
                ? {
                    ...o,
                    orderStatus: status,
                    trackingNumber: tracking || o.trackingNumber,
                    carrier: carrier || o.carrier,
                  }
                : o
            )
          );
        }}
        onViewInvoice={(order) => {
          setIsAdminOpen(false);
          setViewingInvoiceOrder(order);
        }}
      />

      {/* Legal Policies Modal */}
      <LegalPolicyModal
        isOpen={isPolicyOpen}
        initialPolicyKey={activePolicyKey}
        onClose={() => setIsPolicyOpen(false)}
        companyInfo={companyInfo}
        policies={policies}
      />

      {/* Invoice View Modal */}
      <InvoiceView
        order={viewingInvoiceOrder}
        companyInfo={companyInfo}
        onClose={() => setViewingInvoiceOrder(null)}
      />

      {/* Site Footer */}
      <Footer
        companyInfo={companyInfo}
        socialLinks={socialLinks}
        onOpenPolicy={(key) => openPolicyPageOrModal(key)}
        onOpenTrackOrder={() => setIsTrackOrderOpen(true)}
      />
    </div>
  );
}
