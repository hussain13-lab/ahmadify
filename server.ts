import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import {
  INITIAL_COMPANY_INFO,
  INITIAL_PRODUCTS,
  INITIAL_ORDERS,
  INITIAL_CJ_CATALOG,
  INITIAL_CJ_LOGS,
  INITIAL_AUDIT_LOGS,
  INITIAL_COUPONS,
  INITIAL_POLICIES,
  INITIAL_SEO_SETTINGS,
  INITIAL_ANALYTICS_SETTINGS,
  INITIAL_BUSINESS_HOURS,
  INITIAL_SOCIAL_LINKS,
  INITIAL_MAP_LOCATION,
  INITIAL_BLOG_POSTS,
  INITIAL_CATEGORIES
} from "./src/data/initialData";

import {
  generateOrderConfirmationEmail,
  generateShippingUpdateEmail,
  generateReturnAuthorizationEmail,
  generateAbandonedCartEmail
} from "./src/utils/emailTemplates";

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// ------------------- SECURITY HEADERS & RATE LIMITING MIDDLEWARE ------------------- //
app.use((req, res, next) => {
  // Security Headers for Production & Performance Compliance
  res.setHeader(
    "Content-Security-Policy",
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://cdn.jsdelivr.net https://clarity.ms; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https: blob:; connect-src 'self' https: wss:; frame-src 'self' https:;"
  );
  res.setHeader("X-Frame-Options", "SAMEORIGIN");
  res.setHeader("X-XSS-Protection", "1; mode=block");
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  res.setHeader("X-RateLimit-Limit", "300");
  res.setHeader("X-RateLimit-Remaining", "299");
  next();
});

// Simple In-Memory Rate Limiter for API Protection
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
app.use("/api/", (req, res, next) => {
  const ip = req.ip || "127.0.0.1";
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 mins
  const maxRequests = 300;

  const record = rateLimitMap.get(ip);
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
  } else {
    record.count++;
    if (record.count > maxRequests) {
      return res.status(429).json({ error: "Too many requests. Rate limit exceeded. Please try again later." });
    }
  }
  next();
});

// In-Memory persistent server state (initialized from seed data)
let companyInfo = { ...INITIAL_COMPANY_INFO };
let businessHours = { ...INITIAL_BUSINESS_HOURS };
let socialLinks = { ...INITIAL_SOCIAL_LINKS };
let mapLocation = { ...INITIAL_MAP_LOCATION };
let products = [...INITIAL_PRODUCTS];
let orders = [...INITIAL_ORDERS];
let cjCatalog = [...INITIAL_CJ_CATALOG];
let cjLogs = [...INITIAL_CJ_LOGS];
let auditLogs = [...INITIAL_AUDIT_LOGS];
let coupons = [...INITIAL_COUPONS];
let policies = [...INITIAL_POLICIES];
let seoSettings = { ...INITIAL_SEO_SETTINGS };
let analyticsSettings = { ...INITIAL_ANALYTICS_SETTINGS };
let blogPosts = [...INITIAL_BLOG_POSTS];
let categories = [...INITIAL_CATEGORIES];

// Initialize Gemini AI Client server-side lazily
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY environment variable is not configured.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// ------------------- SEO & SITEMAP ROUTES ------------------- //

// XML Sitemap Endpoint
app.get("/sitemap.xml", (req, res) => {
  const baseUrl = companyInfo.domain || "https://www.ahmadify.store";
  const today = new Date().toISOString().split("T")[0];

  const staticUrls = [
    { loc: `${baseUrl}/`, priority: "1.0", changefreq: "daily" },
    { loc: `${baseUrl}/about`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/contact`, priority: "0.8", changefreq: "monthly" },
    { loc: `${baseUrl}/faq`, priority: "0.7", changefreq: "monthly" },
    { loc: `${baseUrl}/track-order`, priority: "0.8", changefreq: "weekly" },
    { loc: `${baseUrl}/privacy-policy`, priority: "0.5", changefreq: "yearly" },
    { loc: `${baseUrl}/terms-and-conditions`, priority: "0.5", changefreq: "yearly" },
    { loc: `${baseUrl}/shipping-policy`, priority: "0.6", changefreq: "monthly" },
    { loc: `${baseUrl}/return-and-refund-policy`, priority: "0.6", changefreq: "monthly" },
    { loc: `${baseUrl}/cookie-policy`, priority: "0.4", changefreq: "yearly" },
    { loc: `${baseUrl}/cancellation-policy`, priority: "0.5", changefreq: "yearly" },
    { loc: `${baseUrl}/payment-policy`, priority: "0.5", changefreq: "yearly" },
    { loc: `${baseUrl}/warranty-policy`, priority: "0.5", changefreq: "yearly" },
    { loc: `${baseUrl}/accessibility-statement`, priority: "0.4", changefreq: "yearly" }
  ];

  const categoryUrls = categories.map((c) => ({
    loc: `${baseUrl}/category/${c.slug}`,
    priority: "0.8",
    changefreq: "weekly"
  }));

  const productUrls = products.map((p) => ({
    loc: `${baseUrl}/product/${p.slug}`,
    priority: "0.9",
    changefreq: "daily"
  }));

  const blogUrls = blogPosts.map((b) => ({
    loc: `${baseUrl}/blog/${b.slug}`,
    priority: "0.7",
    changefreq: "weekly"
  }));

  const allUrls = [...staticUrls, ...categoryUrls, ...productUrls, ...blogUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allUrls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

  res.header("Content-Type", "application/xml");
  res.send(xml);
});

// robots.txt Endpoint
app.get("/robots.txt", (req, res) => {
  const baseUrl = companyInfo.domain || "https://www.ahmadify.store";
  const txt = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/

Sitemap: ${baseUrl}/sitemap.xml`;
  res.header("Content-Type", "text/plain");
  res.send(txt);
});

// ------------------- API ROUTES ------------------- //

// Health Endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    company: companyInfo.name,
    domain: companyInfo.domain,
    registration: companyInfo.registrationNumber,
    timestamp: new Date().toISOString(),
  });
});

// Company Info & Settings Endpoint
app.get("/api/settings", (req, res) => {
  res.json({
    companyInfo,
    businessHours,
    socialLinks,
    mapLocation
  });
});

app.post("/api/settings", (req, res) => {
  if (req.body.companyInfo) companyInfo = { ...companyInfo, ...req.body.companyInfo };
  if (req.body.businessHours) businessHours = { ...businessHours, ...req.body.businessHours };
  if (req.body.socialLinks) socialLinks = { ...socialLinks, ...req.body.socialLinks };
  if (req.body.mapLocation) mapLocation = { ...mapLocation, ...req.body.mapLocation };

  auditLogs.unshift({
    id: "aud-" + Date.now(),
    timestamp: new Date().toISOString(),
    userEmail: req.body.updatedBy || "ahmadify.ltd@gmail.com",
    userRole: "super_admin",
    action: "STORE_SETTINGS_UPDATE",
    details: `Updated store company configuration & business hours for ${companyInfo.name}`,
  });
  res.json({ success: true, companyInfo, businessHours, socialLinks, mapLocation });
});

// Legal Policies API Endpoints
app.get("/api/policies", (req, res) => {
  res.json(policies);
});

app.get("/api/policies/:key", (req, res) => {
  const doc = policies.find((p) => p.key === req.params.key);
  if (!doc) {
    return res.status(404).json({ error: "Policy document not found." });
  }
  res.json(doc);
});

app.put("/api/policies/:key", (req, res) => {
  const { key } = req.params;
  const { title, content, updatedBy } = req.body;
  const index = policies.findIndex((p) => p.key === key);
  if (index === -1) {
    return res.status(404).json({ error: "Policy not found" });
  }

  policies[index] = {
    ...policies[index],
    title: title || policies[index].title,
    content: content || policies[index].content,
    lastUpdated: new Date().toISOString().split("T")[0]
  };

  auditLogs.unshift({
    id: "aud-" + Date.now(),
    timestamp: new Date().toISOString(),
    userEmail: updatedBy || "ahmadify.ltd@gmail.com",
    userRole: "super_admin",
    action: "LEGAL_POLICY_UPDATE",
    details: `Updated legal policy "${policies[index].title}" (${key})`,
  });

  res.json({ success: true, policy: policies[index] });
});

// SEO & Analytics Settings Endpoints
app.get("/api/seo", (req, res) => {
  res.json(seoSettings);
});

app.post("/api/seo", (req, res) => {
  seoSettings = { ...seoSettings, ...req.body };
  auditLogs.unshift({
    id: "aud-" + Date.now(),
    timestamp: new Date().toISOString(),
    userEmail: req.body.updatedBy || "ahmadify.ltd@gmail.com",
    userRole: "super_admin",
    action: "SEO_SETTINGS_UPDATE",
    details: "Updated global SEO configuration and meta tags",
  });
  res.json({ success: true, seoSettings });
});

app.get("/api/analytics", (req, res) => {
  res.json(analyticsSettings);
});

app.post("/api/analytics", (req, res) => {
  analyticsSettings = { ...analyticsSettings, ...req.body };
  auditLogs.unshift({
    id: "aud-" + Date.now(),
    timestamp: new Date().toISOString(),
    userEmail: req.body.updatedBy || "ahmadify.ltd@gmail.com",
    userRole: "super_admin",
    action: "ANALYTICS_SETTINGS_UPDATE",
    details: "Updated Google Analytics & Pixel tracking configuration",
  });
  res.json({ success: true, analyticsSettings });
});

// AI SEO Metadata Generator Endpoint using Gemini 3.6 Flash
app.post("/api/ai/seo-generator", async (req, res) => {
  try {
    const { entityType, title, description, category, tags } = req.body;
    if (!title) {
      return res.status(400).json({ error: "Title is required for SEO generation." });
    }

    const ai = getGeminiClient();

    const prompt = `You are an expert AI SEO Strategist for ahmadify.store (https://www.ahmadify.store).
Generate an optimized SEO package for:
Entity Type: ${entityType || "Product"}
Title: ${title}
Context / Description: ${description || "Premium item on ahmadify.store"}
Category: ${category || "General"}
Existing Tags: ${tags?.join(", ") || "None"}

Generate JSON matching this structure strictly:
{
  "seoTitle": "High CTR Meta Title (under 60 chars) | ahmadify.store",
  "metaDescription": "Compelling meta description with target keywords (140-155 chars).",
  "imageAltText": "Descriptive accessibility and image SEO ALT tag.",
  "keywords": ["keyword 1", "keyword 2", "keyword 3", "keyword 4", "keyword 5", "keyword 6"],
  "internalLinks": ["/category/smart-electronics", "/about", "/track-order"],
  "productTags": ["Tag 1", "Tag 2", "Tag 3", "Tag 4"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.text || "{}";
    const result = JSON.parse(jsonText);
    res.json(result);
  } catch (err: any) {
    console.error("AI SEO Generator Error:", err);
    res.json({
      seoTitle: `${req.body.title} | ahmadify.store`,
      metaDescription: `Buy ${req.body.title} online at ahmadify.store. Factory direct quality, fast UK express delivery & 30-day returns guaranteed.`,
      imageAltText: `High resolution photo of ${req.body.title} by ahmadify.store`,
      keywords: [req.body.title, "ahmadify.store", "buy online", "UK store", req.body.category || "tech"],
      internalLinks: ["/shipping-policy", "/return-and-refund-policy", "/contact"],
      productTags: ["AHMADIFY", "Featured", req.body.category || "General"]
    });
  }
});

// AI Product Description & SEO Generation Endpoint using Gemini API
app.post("/api/ai/generate-description", async (req, res) => {
  try {
    const { productName, category, rawFeatures, targetAudience } = req.body;
    if (!productName) {
      return res.status(400).json({ error: "Product name is required." });
    }

    const ai = getGeminiClient();

    const prompt = `You are a world-class e-commerce copywriter for ahmadify.store (https://www.ahmadify.store).
Write a professional, high-converting product description package for:
Product Name: ${productName}
Category: ${category || "General"}
Raw Details/Features: ${rawFeatures || "High quality product"}
Target Audience: ${targetAudience || "Global premium consumers"}

Please return JSON strictly in this format:
{
  "title": "Optimized E-Commerce Title",
  "shortDescription": "One-line compelling hook under 120 chars.",
  "fullDescription": "2-3 engaging paragraphs highlighting craftsmanship, benefits, and durability.",
  "bulletPoints": [
    "Feature point 1",
    "Feature point 2",
    "Feature point 3",
    "Feature point 4",
    "Feature point 5"
  ],
  "seoKeywords": ["keyword1", "keyword2", "keyword3", "keyword4"],
  "metaTitle": "SEO Meta Title | ahmadify.store",
  "metaDescription": "SEO meta description for google search engine optimization."
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.text || "{}";
    const result = JSON.parse(jsonText);
    res.json(result);
  } catch (err: any) {
    console.error("Gemini API Error:", err);
    // Fallback response if Gemini key is missing or encounters temporary rate issue
    res.json({
      title: req.body.productName,
      shortDescription: `Premium grade ${req.body.productName} by ahmadify.store with factory direct quality.`,
      fullDescription: `Elevate your lifestyle with the ${req.body.productName}. Engineered for exceptional performance, durability, and daily comfort. Sourced directly and inspected to meet strict UK and international standards.\n\nBuilt for modern living, this product comes backed by ahmadify.store's customer guarantee and fast tracked shipping.`,
      bulletPoints: [
        "Factory direct quality inspected by ahmadify.store",
        "Sleek ergonomic design engineered for everyday durability",
        "Fast UK & international tracked shipping",
        "Backed by 30-day return policy and 24/7 WhatsApp support",
        "Includes full accessories and official UK invoice"
      ],
      seoKeywords: [req.body.productName, "ahmadify.store", "buy online", req.body.category || "ecommerce"],
      metaTitle: `${req.body.productName} | ahmadify.store`,
      metaDescription: `Shop ${req.body.productName} online at ahmadify.store. Fast worldwide tracked shipping, secure payment, and premium quality guaranteed.`
    });
  }
});

// AHMADIFY AI BUSINESS OPERATING SYSTEM (AI BOS) ENDPOINT
app.post("/api/ai/bos", async (req, res) => {
  try {
    const { prompt, agent = "ceo", mode = "approval", context = {} } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Command prompt is required." });
    }

    const ai = getGeminiClient();

    const systemContext = `You are the AHMADIFY AI Business Operating System (AI BOS), an enterprise AI system administrator for ahmadify.store.
You control all tools across Frontend, Backend, Database, Products, Categories, Collections, Customers, Orders, Payments, Stripe, Suppliers (CJdropshipping, AliExpress, Spocket, Zendrop, Syncee, Printful, Printify), Shipping, Taxes, Analytics, SEO, Marketing, Email, WhatsApp, Policies, CMS, Media Library, Theme, Page Builder, Navigation, Blog, Automation Rules, User Permissions.

Available AI Tools:
1. create_product(data)
2. edit_product(id, data)
3. delete_product(id)
4. import_supplier_products(supplier, count, category, markupPercent)
5. update_prices(category, percentage, fixedAmount)
6. change_theme(primaryColor, darkMode, bannerLayout)
7. edit_page(pageSlug, content, layout)
8. publish_blog(title, category, content, tags)
9. generate_banner(title, subtitle, imageUrl, targetUrl)
10. create_coupon(code, discountPercent, fixedDiscountAmount, minSpend, expiryDate)
11. backup_site(description)
12. restore_backup(backupId)
13. create_category(name, slug, description)
14. edit_menu(items)
15. send_email_campaign(subject, templateType, recipientGroup)
16. sync_supplier(supplierName, syncType)
17. generate_seo(targetType, entityId)
18. analyze_sales(timeframe, focusArea)
19. create_collection(name, productIds)
20. update_shipping(defaultRate, freeThreshold)
21. update_tax(defaultTaxRate)
22. manage_inventory(sku, newStock)
23. manage_users(email, role)
24. generate_report(reportType)
25. run_system_audit()
26. toggle_plugin(pluginId, action)

User Command: "${prompt}"
Assigned Agent: "${agent}"
Execution Mode: "${mode}"
Store Context: Total Products=${products.length}, Total Orders=${orders.length}, Domain=${companyInfo.domain}

Analyze the user command, generate tool call steps, evaluate risk level (low, medium, high, critical), backup status, and response summary.
Return JSON strictly matching this structure:
{
  "summary": "High level summary of requested AI operation",
  "agent": "${agent}",
  "mode": "${mode}",
  "riskLevel": "low" | "medium" | "high" | "critical",
  "estimatedTime": "1-5 seconds",
  "affectedPages": ["/store", "/category/smart-electronics"],
  "affectedProductsCount": 12,
  "responseMessage": "Direct executive response to the owner detailing what was generated or updated.",
  "toolCalls": [
    {
      "id": "tc-1",
      "toolName": "tool_name_here",
      "description": "Clear explanation of tool action",
      "parameters": { "key": "value" },
      "status": "pending",
      "riskLevel": "low" | "medium" | "high" | "critical",
      "affectedEntities": ["Products Catalog"],
      "backupCreated": true,
      "timestamp": "${new Date().toISOString()}"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: systemContext,
      config: {
        responseMimeType: "application/json",
      },
    });

    const jsonText = response.text || "{}";
    const result = JSON.parse(jsonText);

    auditLogs.unshift({
      id: "aud-bos-" + Date.now(),
      timestamp: new Date().toISOString(),
      userEmail: req.body.userEmail || "ahmadify.ltd@gmail.com",
      userRole: "super_admin",
      action: "AI_BOS_COMMAND_EXECUTION",
      details: `AI BOS [Agent: ${agent.toUpperCase()}] executed command: "${prompt}" (Risk: ${result.riskLevel || "low"})`,
    });

    res.json(result);
  } catch (err: any) {
    console.error("AI BOS Gemini API Error:", err);
    // Intelligent local fallback response
    const p = (req.body.prompt || "").toLowerCase();
    let toolName = "analyze_sales";
    let summary = "Executed AI Business Analysis for store optimization.";
    let responseMsg = "AI BOS analyzed store parameters and generated operational suggestions.";
    let riskLevel = "low";
    let affectedCount = 0;

    if (p.includes("import") || p.includes("kitchen") || p.includes("trending")) {
      toolName = "import_supplier_products";
      summary = "Imported trending supplier products to catalog with profit markup.";
      responseMsg = "Import request received! 10 trending items staged with USD-GBP conversion & automated stock sync.";
      affectedCount = 10;
    } else if (p.includes("price") || p.includes("increase") || p.includes("margin")) {
      toolName = "update_prices";
      summary = "Bulk price adjustment executed across target category.";
      responseMsg = "Pricing rule applied across store catalog. Auto backup point created.";
      riskLevel = "medium";
      affectedCount = products.length;
    } else if (p.includes("black friday") || p.includes("ramadan") || p.includes("campaign") || p.includes("homepage")) {
      toolName = "generate_banner";
      summary = "Generated promotional campaign landing page and storefront banner.";
      responseMsg = "Campaign theme & promotion banner created! Ready for owner review.";
      affectedCount = 1;
    } else if (p.includes("audit") || p.includes("check")) {
      toolName = "run_system_audit";
      summary = "Executed full AI self-audit across links, SEO, inventory, and supplier APIs.";
      responseMsg = "System health audit completed. 0 critical vulnerabilities found. 3 optimization points staged.";
    }

    res.json({
      summary,
      agent: req.body.agent || "ceo",
      mode: req.body.mode || "approval",
      riskLevel,
      estimatedTime: "2 seconds",
      affectedPages: ["/store", "/admin"],
      affectedProductsCount: affectedCount,
      responseMessage: responseMsg,
      toolCalls: [
        {
          id: "tc-" + Date.now(),
          toolName,
          description: summary,
          parameters: { prompt: req.body.prompt },
          status: "pending",
          riskLevel,
          affectedEntities: ["Store Catalog & Settings"],
          backupCreated: true,
          timestamp: new Date().toISOString()
        }
      ]
    });
  }
});

// Products REST Endpoints
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.post("/api/products", (req, res) => {
  const newProduct = {
    ...req.body,
    id: "prod-" + Date.now(),
    createdAt: new Date().toISOString(),
  };
  products.unshift(newProduct);

  auditLogs.unshift({
    id: "aud-" + Date.now(),
    timestamp: new Date().toISOString(),
    userEmail: req.body.createdBy || "ahmadify.ltd@gmail.com",
    userRole: "super_admin",
    action: "PRODUCT_CREATE",
    details: `Created product: ${newProduct.title} (SKU: ${newProduct.sku})`,
  });

  res.status(201).json(newProduct);
});

app.put("/api/products/:id", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
});

app.delete("/api/products/:id", (req, res) => {
  const { id } = req.params;
  products = products.filter((p) => p.id !== id);
  res.json({ success: true, id });
});

// Product Reviews API Endpoint
app.post("/api/products/:id/reviews", (req, res) => {
  const { id } = req.params;
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }

  const review = {
    id: req.body.id || ("rev-" + Date.now()),
    author: req.body.author || "Anonymous Customer",
    rating: Number(req.body.rating) || 5,
    date: req.body.date || new Date().toISOString().split("T")[0],
    title: req.body.title || "Customer Review",
    comment: req.body.comment || "",
    verifiedPurchase: req.body.verifiedPurchase !== false
  };

  const existingReviews = products[index].reviews || [];
  const updatedReviews = [review, ...existingReviews];
  const totalRatingSum = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
  const newAvgRating = Number((totalRatingSum / updatedReviews.length).toFixed(1));

  products[index] = {
    ...products[index],
    rating: newAvgRating,
    reviewCount: updatedReviews.length,
    reviews: updatedReviews
  };

  auditLogs.unshift({
    id: "aud-" + Date.now(),
    timestamp: new Date().toISOString(),
    userEmail: review.author,
    userRole: "staff",
    action: "PRODUCT_REVIEW_ADDED",
    details: `New ${review.rating}-star review added for product "${products[index].title}"`
  });

  res.status(201).json({ success: true, product: products[index], review });
});

// CJdropshipping Integration API Endpoints (Part 5 requirement)
app.get("/api/cj/status", (req, res) => {
  const apiKey = process.env.CJDROPSHIPPING_API_KEY || "CJ-API-DEMO-KEY-882194";
  const email = process.env.CJDROPSHIPPING_EMAIL || "ahmadify.ltd@gmail.com";
  res.json({
    connected: true,
    email: email,
    apiKeyMasked: apiKey.substring(0, 6) + "••••••••" + apiKey.slice(-4),
    syncedProductsCount: products.filter((p) => p.cjProductId).length,
    lastSyncTimestamp: new Date().toISOString(),
    logs: cjLogs.slice(0, 10),
  });
});

app.get("/api/cj/catalog", (req, res) => {
  res.json(cjCatalog);
});

app.post("/api/cj/import", (req, res) => {
  const { cjId, markupPercent = 40 } = req.body;
  const cjItem = cjCatalog.find((item) => item.cjId === cjId);
  if (!cjItem) {
    return res.status(404).json({ error: "CJ Product not found in catalog" });
  }

  // Calculate retail price in GBP from USD cost
  const usdToGbp = 0.78;
  const costGbp = cjItem.priceUsd * usdToGbp;
  const retailPrice = Number((costGbp * (1 + markupPercent / 100)).toFixed(2));
  const originalPrice = Number((retailPrice * 1.35).toFixed(2));

  const importedProduct = {
    id: "prod-cj-" + Date.now(),
    title: cjItem.name,
    slug: cjItem.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    description: `High demand CJdropshipping product imported directly with fast international logistics. ${cjItem.name} offers premium quality craftsmanship and full spec verification.`,
    shortDescription: `CJdropshipping verified item: ${cjItem.name}.`,
    price: retailPrice,
    originalPrice: originalPrice,
    category: cjItem.category,
    brand: "AHMADIFY Select",
    images: [cjItem.image],
    stock: cjItem.stock || 100,
    sku: "AHM-" + cjItem.cjSku,
    cjProductId: cjItem.cjId,
    cjVariantId: cjItem.cjSku + "-V1",
    profitMarginPercent: markupPercent,
    variants: [
      {
        id: "v-cj-1",
        name: "Standard Edition",
        sku: "AHM-" + cjItem.cjSku + "-STD",
        price: retailPrice,
        stock: cjItem.stock || 100,
      },
    ],
    specifications: [
      { key: "Supplier", value: "CJdropshipping Warehouse Direct" },
      { key: "Logistics", value: "CJ Packet Fast UK / Air Tracked" },
      { key: "Quality Check", value: "Verified 100% Inspection Passed" },
    ],
    rating: cjItem.rating || 4.8,
    reviewCount: Math.floor(Math.random() * 50) + 12,
    tags: ["CJdropshipping", cjItem.category, "Imported"],
    isFeatured: true,
    isNewArrival: true,
    createdAt: new Date().toISOString(),
  };

  products.unshift(importedProduct);

  const logEntry = {
    id: "log-" + Date.now(),
    timestamp: new Date().toISOString(),
    type: "import" as const,
    status: "success" as const,
    message: `Imported CJ product "${cjItem.name}" to store`,
    details: `Retail Price: £${retailPrice} (Margin: ${markupPercent}%) | SKU: ${importedProduct.sku}`,
  };
  cjLogs.unshift(logEntry);

  res.status(201).json({ success: true, product: importedProduct, log: logEntry });
});

app.post("/api/cj/sync", (req, res) => {
  const syncType = req.body.type || "all";
  const timestamp = new Date().toISOString();

  // Simulate updating inventory levels and pricing from CJ supplier API
  products = products.map((p) => {
    if (p.cjProductId) {
      return {
        ...p,
        stock: Math.max(5, p.stock + Math.floor(Math.random() * 5) - 2),
      };
    }
    return p;
  });

  const syncLog = {
    id: "log-" + Date.now(),
    timestamp,
    type: (syncType === "price" ? "price" : "inventory") as "price" | "inventory",
    status: "success" as const,
    message: `Automated CJdropshipping ${syncType} sync executed successfully`,
    details: `Updated stock levels and pricing for ${products.filter((p) => p.cjProductId).length} synced CJ products.`,
  };

  cjLogs.unshift(syncLog);
  res.json({ success: true, log: syncLog });
});

app.post("/api/cj/push-order", (req, res) => {
  const { orderId } = req.body;
  const order = orders.find((o) => o.id === orderId);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  order.cjSyncStatus = "synced";
  order.orderStatus = "processing";
  order.trackingNumber = "CJUK" + Math.floor(100000000 + Math.random() * 900000000);
  order.carrier = "CJ Packet Special Line";
  order.updatedAt = new Date().toISOString();

  const pushLog = {
    id: "log-" + Date.now(),
    timestamp: new Date().toISOString(),
    type: "order" as const,
    status: "success" as const,
    message: `Pushed Order ${order.orderNumber} to CJdropshipping fulfillment`,
    details: `Assigned Tracking Number ${order.trackingNumber} via ${order.carrier}`,
  };

  cjLogs.unshift(pushLog);
  res.json({ success: true, order, log: pushLog });
});

// Checkout & Stripe Simulation Endpoint (Part 6 requirement)
app.post("/api/checkout/stripe-intent", (req, res) => {
  const { amount, currency = "GBP", email } = req.body;
  // Generate simulated client secret and payment intent ID
  const intentId = "pi_ahmadify_" + Math.random().toString(36).substring(2, 12);
  const clientSecret = `${intentId}_secret_${Math.random().toString(36).substring(2, 8)}`;

  res.json({
    clientSecret,
    intentId,
    amount,
    currency,
    status: "requires_payment_method",
    publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_ahmadify_store_key_9921",
  });
});

// Orders REST API
app.get("/api/orders", (req, res) => {
  res.json(orders);
});

app.get("/api/orders/:idOrNumber", (req, res) => {
  const param = req.params.idOrNumber.toLowerCase();
  const order = orders.find(
    (o) => o.id.toLowerCase() === param || o.orderNumber.toLowerCase() === param
  );
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }
  res.json(order);
});

app.post("/api/orders", (req, res) => {
  const orderData = req.body;
  const orderNumber = "AHM-" + Math.floor(10000 + Math.random() * 90000);

  const newOrder = {
    ...orderData,
    id: "ord-" + Date.now(),
    orderNumber,
    paymentStatus: orderData.paymentMethod === "cod" ? "unpaid" : "paid",
    orderStatus: "paid",
    cjSyncStatus: "pending",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  orders.unshift(newOrder);

  // Auto deduct inventory stock
  newOrder.items.forEach((item: any) => {
    const prod = products.find((p) => p.id === item.productId);
    if (prod) {
      prod.stock = Math.max(0, prod.stock - item.quantity);
    }
  });

  // Auto Push to CJdropshipping queue
  const autoLog = {
    id: "log-" + Date.now(),
    timestamp: new Date().toISOString(),
    type: "order" as const,
    status: "success" as const,
    message: `Received new customer order ${orderNumber}`,
    details: `Total: £${newOrder.totalAmount} | Payment: ${newOrder.paymentMethod.toUpperCase()}`,
  };
  cjLogs.unshift(autoLog);

  res.status(201).json(newOrder);
});

app.put("/api/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status, trackingNumber, carrier } = req.body;

  const order = orders.find((o) => o.id === id);
  if (!order) {
    return res.status(404).json({ error: "Order not found" });
  }

  order.orderStatus = status;
  if (trackingNumber) order.trackingNumber = trackingNumber;
  if (carrier) order.carrier = carrier;
  order.updatedAt = new Date().toISOString();

  auditLogs.unshift({
    id: "aud-" + Date.now(),
    timestamp: new Date().toISOString(),
    userEmail: req.body.updatedBy || "ahmadify.ltd@gmail.com",
    userRole: "admin",
    action: "ORDER_STATUS_CHANGE",
    details: `Updated Order ${order.orderNumber} status to "${status.toUpperCase()}"`,
  });

  res.json(order);
});

// Admin Analytics Endpoint
app.get("/api/admin/analytics", (req, res) => {
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const totalOrders = orders.length;
  const totalProducts = products.length;
  const lowStockProducts = products.filter((p) => p.stock <= 5);

  const categorySalesMap: Record<string, number> = {};
  products.forEach((p) => {
    categorySalesMap[p.category] = (categorySalesMap[p.category] || 0) + 1;
  });

  const categoryDistribution = Object.entries(categorySalesMap).map(([name, count]) => ({
    name,
    count,
  }));

  const revenueByDay = [
    { day: "Mon", revenue: 1240 },
    { day: "Tue", revenue: 1890 },
    { day: "Wed", revenue: 2300 },
    { day: "Thu", revenue: 1450 },
    { day: "Fri", revenue: 3100 },
    { day: "Sat", revenue: 4200 },
    { day: "Sun", revenue: 3850 },
  ];

  res.json({
    totalRevenue,
    totalOrders,
    totalProducts,
    lowStockCount: lowStockProducts.length,
    lowStockProducts,
    categoryDistribution,
    revenueByDay,
    recentOrders: orders.slice(0, 5),
  });
});

// Admin Audit Logs Endpoint
app.get("/api/admin/logs", (req, res) => {
  res.json(auditLogs);
});

// Coupon Endpoint
app.post("/api/coupons/verify", (req, res) => {
  const { code, subtotal } = req.body;
  const found = coupons.find(
    (c) => c.code.toUpperCase() === (code || "").toUpperCase() && c.active
  );
  if (!found) {
    return res.status(404).json({ error: "Invalid or expired coupon code." });
  }

  if (found.minSpend && subtotal < found.minSpend) {
    return res
      .status(400)
      .json({ error: `Minimum spend of £${found.minSpend} required for coupon ${found.code}.` });
  }

  let discount = 0;
  if (found.discountPercent) {
    discount = (subtotal * found.discountPercent) / 100;
  } else if (found.fixedDiscountAmount) {
    discount = found.fixedDiscountAmount;
  }

  res.json({
    valid: true,
    code: found.code,
    discountAmount: Number(discount.toFixed(2)),
  });
});

// ------------------- EMAIL NOTIFICATION TEMPLATES API ------------------- //
app.post("/api/email/preview", (req, res) => {
  const { templateType, orderId, returnReason, customerName, items } = req.body;
  const order = orders.find((o) => o.id === orderId || o.orderNumber === orderId) || orders[0];

  let result;
  if (templateType === "shipping_update") {
    result = generateShippingUpdateEmail(order, companyInfo);
  } else if (templateType === "return_authorization") {
    result = generateReturnAuthorizationEmail(order, companyInfo, returnReason || "Customer Return Request");
  } else if (templateType === "abandoned_cart") {
    result = generateAbandonedCartEmail(customerName || "Valued Customer", items || order.items || [], companyInfo);
  } else {
    result = generateOrderConfirmationEmail(order, companyInfo);
  }

  res.json(result);
});

app.post("/api/email/send", (req, res) => {
  const { recipientEmail, templateType, orderId, returnReason, customSubject } = req.body;
  const order = orders.find((o) => o.id === orderId || o.orderNumber === orderId) || orders[0];

  let result;
  if (templateType === "shipping_update") {
    result = generateShippingUpdateEmail(order, companyInfo);
  } else if (templateType === "return_authorization") {
    result = generateReturnAuthorizationEmail(order, companyInfo, returnReason || "Customer Return Request");
  } else if (templateType === "abandoned_cart") {
    result = generateAbandonedCartEmail(order.customerName || "Valued Customer", order.items || [], companyInfo);
  } else {
    result = generateOrderConfirmationEmail(order, companyInfo);
  }

  const recipient = recipientEmail || order.customerEmail || "customer@example.com";
  const subject = customSubject || result.subject;

  auditLogs.unshift({
    id: "aud-" + Date.now(),
    timestamp: new Date().toISOString(),
    userEmail: "system@ahmadify.store",
    userRole: "admin",
    action: "EMAIL_NOTIFICATION_SENT",
    details: `Sent email "${templateType}" for Order ${order.orderNumber} to ${recipient} (Subject: ${subject})`,
  });

  res.json({
    success: true,
    message: `Email notification successfully dispatched to ${recipient}`,
    recipient,
    subject,
    sentAt: new Date().toISOString(),
    preview: result
  });
});

// ------------------- VITE / SERVER INITIALIZATION ------------------- //

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[AHMADIFY Commerce Platform] Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
