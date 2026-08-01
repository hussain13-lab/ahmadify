import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  getDocs,
  query,
  where,
  orderBy
} from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './firebase';
import { Product, Order, Coupon, ProductReview, SupplierConfig, PricingRule, AutomationRule, ImportJob, CJSyncLog } from '../types';
import {
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_COUPONS,
  INITIAL_COMPANY_INFO,
  INITIAL_BUSINESS_HOURS,
  INITIAL_SOCIAL_LINKS,
  INITIAL_MAP_LOCATION
} from '../data/initialData';
import {
  INITIAL_SUPPLIERS,
  INITIAL_PRICING_RULES,
  INITIAL_AUTOMATION_RULES,
  INITIAL_IMPORT_JOBS
} from '../data/supplyChainData';

// Seed Suppliers if empty
export async function seedSuppliersIfEmpty() {
  const path = 'suppliers';
  try {
    const snap = await getDocs(collection(db, path));
    if (snap.empty) {
      for (const supplier of INITIAL_SUPPLIERS) {
        await setDoc(doc(db, path, supplier.id), supplier);
      }
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

// Subscribe to Suppliers
export function subscribeSuppliers(
  onData: (suppliers: SupplierConfig[]) => void,
  onError?: (err: any) => void
) {
  const path = 'suppliers';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        seedSuppliersIfEmpty();
        onData(INITIAL_SUPPLIERS);
      } else {
        const items: SupplierConfig[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as SupplierConfig);
        });
        onData(items);
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, path);
      if (onError) onError(err);
    }
  );
}

// Save Supplier Config
export async function saveSupplierToFirestore(supplier: SupplierConfig) {
  const path = `suppliers/${supplier.id}`;
  try {
    await setDoc(doc(db, 'suppliers', supplier.id), supplier, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Subscribe to Pricing Rules
export function subscribePricingRules(
  onData: (rules: PricingRule[]) => void,
  onError?: (err: any) => void
) {
  const path = 'pricing_rules';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        for (const rule of INITIAL_PRICING_RULES) {
          setDoc(doc(db, path, rule.id), rule);
        }
        onData(INITIAL_PRICING_RULES);
      } else {
        const items: PricingRule[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as PricingRule);
        });
        onData(items);
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, path);
      if (onError) onError(err);
    }
  );
}

// Save Pricing Rule
export async function savePricingRuleToFirestore(rule: PricingRule) {
  const path = `pricing_rules/${rule.id}`;
  try {
    await setDoc(doc(db, 'pricing_rules', rule.id), rule, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Delete Pricing Rule
export async function deletePricingRuleFromFirestore(ruleId: string) {
  const path = `pricing_rules/${ruleId}`;
  try {
    await deleteDoc(doc(db, 'pricing_rules', ruleId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// Subscribe to Automation Rules
export function subscribeAutomationRules(
  onData: (rules: AutomationRule[]) => void,
  onError?: (err: any) => void
) {
  const path = 'automation_rules';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        for (const rule of INITIAL_AUTOMATION_RULES) {
          setDoc(doc(db, path, rule.id), rule);
        }
        onData(INITIAL_AUTOMATION_RULES);
      } else {
        const items: AutomationRule[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as AutomationRule);
        });
        onData(items);
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, path);
      if (onError) onError(err);
    }
  );
}

// Save Automation Rule
export async function saveAutomationRuleToFirestore(rule: AutomationRule) {
  const path = `automation_rules/${rule.id}`;
  try {
    await setDoc(doc(db, 'automation_rules', rule.id), rule, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Seed Products if collection is empty
export async function seedProductsIfEmpty() {
  const path = 'products';
  try {
    const snap = await getDocs(collection(db, path));
    if (snap.empty) {
      console.log('Seeding initial products to Firestore...');
      for (const product of INITIAL_PRODUCTS) {
        await setDoc(doc(db, path, product.id), product);
      }
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

// Subscribe to Products collection
export function subscribeProducts(
  onData: (products: Product[]) => void,
  onError?: (err: any) => void
) {
  const path = 'products';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        seedProductsIfEmpty();
        onData(INITIAL_PRODUCTS);
      } else {
        const items: Product[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as Product);
        });
        onData(items);
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, path);
      if (onError) onError(err);
    }
  );
}

// Save or Update Product
export async function saveProductToFirestore(product: Product) {
  const path = `products/${product.id}`;
  try {
    await setDoc(doc(db, 'products', product.id), product, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Delete Product
export async function deleteProductFromFirestore(productId: string) {
  const path = `products/${productId}`;
  try {
    await deleteDoc(doc(db, 'products', productId));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// Seed Orders if collection is empty
export async function seedOrdersIfEmpty() {
  const path = 'orders';
  try {
    const snap = await getDocs(collection(db, path));
    if (snap.empty) {
      console.log('Seeding initial orders to Firestore...');
      for (const order of INITIAL_ORDERS) {
        await setDoc(doc(db, path, order.id), order);
      }
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

// Subscribe to Orders collection
export function subscribeOrders(
  onData: (orders: Order[]) => void,
  onError?: (err: any) => void
) {
  const path = 'orders';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        seedOrdersIfEmpty();
        onData(INITIAL_ORDERS);
      } else {
        const items: Order[] = [];
        snapshot.forEach((docSnap) => {
          items.push({ id: docSnap.id, ...docSnap.data() } as Order);
        });
        onData(items);
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, path);
      if (onError) onError(err);
    }
  );
}

// Save or Update Order
export async function saveOrderToFirestore(order: Order) {
  const path = `orders/${order.id}`;
  try {
    await setDoc(doc(db, 'orders', order.id), order, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Seed Coupons if empty
export async function seedCouponsIfEmpty() {
  const path = 'coupons';
  try {
    const snap = await getDocs(collection(db, path));
    if (snap.empty) {
      for (const coupon of INITIAL_COUPONS) {
        await setDoc(doc(db, path, coupon.code), coupon);
      }
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, path);
  }
}

// Subscribe to Coupons collection
export function subscribeCoupons(
  onData: (coupons: Coupon[]) => void,
  onError?: (err: any) => void
) {
  const path = 'coupons';
  return onSnapshot(
    collection(db, path),
    (snapshot) => {
      if (snapshot.empty) {
        seedCouponsIfEmpty();
        onData(INITIAL_COUPONS);
      } else {
        const items: Coupon[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as Coupon);
        });
        onData(items);
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, path);
      if (onError) onError(err);
    }
  );
}

// Save or Update Coupon
export async function saveCouponToFirestore(coupon: Coupon) {
  const path = `coupons/${coupon.code}`;
  try {
    await setDoc(doc(db, 'coupons', coupon.code), coupon, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Delete Coupon
export async function deleteCouponFromFirestore(couponCode: string) {
  const path = `coupons/${couponCode}`;
  try {
    await deleteDoc(doc(db, 'coupons', couponCode));
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, path);
  }
}

// Save Review
export async function saveReviewToFirestore(review: ProductReview) {
  const path = `reviews/${review.id}`;
  try {
    await setDoc(doc(db, 'reviews', review.id), review, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Subscribe to Reviews for a product
export function subscribeProductReviews(
  productId: string,
  onData: (reviews: ProductReview[]) => void,
  onError?: (err: any) => void
) {
  const path = 'reviews';
  const q = query(collection(db, path), where('productId', '==', productId));
  return onSnapshot(
    q,
    (snapshot) => {
      const items: ProductReview[] = [];
      snapshot.forEach((docSnap) => {
        items.push({ id: docSnap.id, ...docSnap.data() } as ProductReview);
      });
      onData(items);
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, path);
      if (onError) onError(err);
    }
  );
}

// Save Store Settings
export async function saveSettingsToFirestore(settings: {
  companyInfo?: any;
  businessHours?: any;
  socialLinks?: any;
  mapLocation?: any;
}) {
  const path = 'settings/store';
  try {
    await setDoc(doc(db, 'settings', 'store'), settings, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, path);
  }
}

// Subscribe to Store Settings
export function subscribeStoreSettings(
  onData: (settings: any) => void,
  onError?: (err: any) => void
) {
  const path = 'settings/store';
  return onSnapshot(
    doc(db, 'settings', 'store'),
    (snapshot) => {
      if (snapshot.exists()) {
        onData(snapshot.data());
      } else {
        const defaultSettings = {
          companyInfo: INITIAL_COMPANY_INFO,
          businessHours: INITIAL_BUSINESS_HOURS,
          socialLinks: INITIAL_SOCIAL_LINKS,
          mapLocation: INITIAL_MAP_LOCATION
        };
        saveSettingsToFirestore(defaultSettings);
        onData(defaultSettings);
      }
    },
    (err) => {
      handleFirestoreError(err, OperationType.GET, path);
      if (onError) onError(err);
    }
  );
}
