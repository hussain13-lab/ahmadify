import { Order, CompanyInfo, CartItem } from '../types';

export interface EmailTemplateResult {
  subject: string;
  html: string;
  text: string;
}

/**
 * Utility to format currency nicely
 */
const formatPrice = (amount: number, currencySymbol: string = '£') => {
  return `${currencySymbol}${amount.toFixed(2)}`;
};

/**
 * Base HTML Layout Wrapper for AHMADIFY LTD Branded Emails
 */
const wrapEmailLayout = (title: string, contentHtml: string, companyInfo: CompanyInfo): string => {
  const year = new Date().getFullYear();
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1e293b; }
    .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05); }
    .header { background-color: #0f172a; padding: 24px 32px; text-align: center; border-bottom: 4px solid #f59e0b; }
    .logo-text { color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: 1px; margin: 0; text-transform: uppercase; }
    .logo-sub { color: #f59e0b; font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; margin-top: 4px; }
    .content { padding: 32px; }
    .footer { background-color: #f1f5f9; padding: 24px 32px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; }
    .btn { display: inline-block; background-color: #0f172a; color: #f59e0b; font-weight: 700; font-size: 14px; text-decoration: none; padding: 12px 28px; border-radius: 8px; margin-top: 16px; text-align: center; }
    .btn:hover { background-color: #1e293b; }
    .badge { display: inline-block; padding: 4px 10px; border-radius: 20px; font-size: 11px; font-weight: 700; text-transform: uppercase; }
    .badge-success { background-color: #dcfce7; color: #166534; }
    .badge-info { background-color: #dbeafe; color: #1e40af; }
    .badge-warning { background-color: #fef3c7; color: #92400e; }
    .table { width: 100%; border-collapse: collapse; margin-top: 16px; margin-bottom: 16px; }
    .table th { background-color: #f8fafc; text-align: left; padding: 10px 12px; font-size: 12px; text-transform: uppercase; color: #475569; border-bottom: 2px solid #e2e8f0; }
    .table td { padding: 12px; font-size: 13px; border-bottom: 1px solid #f1f5f9; vertical-align: middle; }
    .text-right { text-align: right; }
    .font-bold { font-weight: 700; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <img src="https://www.ahmadify.store/logo.png" alt="ahmadify.store logo" style="height: 52px; width: auto; max-width: 180px; margin-bottom: 8px; border-radius: 8px; display: inline-block;" />
      <h1 class="logo-text">AHMADIFY</h1>
      <div class="logo-sub">ahmadify.store • Official Storefront</div>
    </div>
    <div class="content">
      ${contentHtml}
    </div>
    <div class="footer">
      <p style="margin: 0 0 8px 0; font-weight: 700; color: #334155;">
        ${companyInfo.name || 'ahmadify.store'} • ${companyInfo.registeredOffice ? `${companyInfo.registeredOffice.line1}, ${companyInfo.registeredOffice.city}, ${companyInfo.registeredOffice.postcode}, ${companyInfo.registeredOffice.country}` : 'London, United Kingdom'}
      </p>
      <p style="margin: 0 0 12px 0;">
        Email: <a href="mailto:${companyInfo.email}" style="color: #2563eb; text-decoration: none;">${companyInfo.email}</a> | 
        WhatsApp: <a href="https://wa.me/${(companyInfo.whatsapp || '+923178031001').replace(/[^0-9]/g, '')}" style="color: #2563eb; text-decoration: none;">${companyInfo.whatsapp || '+92 317 8031001'}</a> | 
        Web: <a href="${companyInfo.domain || 'https://www.ahmadify.store'}" style="color: #2563eb; text-decoration: none;">${companyInfo.domain || 'https://www.ahmadify.store'}</a>
      </p>
      <p style="margin: 0; font-size: 11px; color: #94a3b8;">
        © ${year} ${companyInfo.name || 'ahmadify.store'}. All rights reserved.
      </p>
    </div>
  </div>
</body>
</html>`;
};

/**
 * 1. Order Confirmation Email Notification Template
 */
export const generateOrderConfirmationEmail = (
  order: Order,
  companyInfo: CompanyInfo
): EmailTemplateResult => {
  const currencySym = order.currency === 'USD' ? '$' : order.currency === 'EUR' ? '€' : '£';
  const orderDate = order.createdAt ? new Date(order.createdAt).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }) : new Date().toLocaleDateString('en-GB');

  const itemsHtml = (order.items || []).map((item) => `
    <tr>
      <td>
        <div style="font-weight: 700; color: #0f172a;">${item.title}</div>
        <div style="font-size: 11px; color: #64748b;">SKU: ${item.sku || 'N/A'} ${item.selectedColor ? `• ${item.selectedColor}` : ''} ${item.selectedSize ? `• ${item.selectedSize}` : ''}</div>
      </td>
      <td style="text-align: center;">${item.quantity}</td>
      <td style="text-align: right;">${formatPrice(item.price, currencySym)}</td>
      <td style="text-align: right; font-weight: 700;">${formatPrice(item.price * item.quantity, currencySym)}</td>
    </tr>
  `).join('');

  const contentHtml = `
    <div style="margin-bottom: 24px;">
      <span class="badge badge-success">Order Confirmed & Paid</span>
      <h2 style="margin: 12px 0 4px 0; font-size: 20px; color: #0f172a;">Thank you for your order, ${order.customerName}!</h2>
      <p style="margin: 0; color: #64748b; font-size: 14px;">We've received your order and our UK warehouse team is preparing it for tracked dispatch.</p>
    </div>

    <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 24px; border: 1px solid #e2e8f0; font-size: 13px;">
      <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
        <div><strong>Order Reference:</strong> <span style="color: #2563eb; font-weight: 700;">${order.orderNumber}</span></div>
        <div><strong>Date:</strong> ${orderDate}</div>
      </div>
      <div style="display: flex; justify-content: space-between;">
        <div><strong>Payment Method:</strong> ${(order.paymentMethod || 'Credit Card').toUpperCase()}</div>
        <div><strong>Status:</strong> ${(order.paymentStatus || 'Paid').toUpperCase()}</div>
      </div>
    </div>

    <h3 style="font-size: 15px; margin: 16px 0 8px 0; color: #0f172a; text-transform: uppercase; letter-spacing: 0.5px;">Order Items</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Item Description</th>
          <th style="text-align: center;">Qty</th>
          <th style="text-align: right;">Price</th>
          <th style="text-align: right;">Total</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <div style="width: 260px; margin-left: auto; font-size: 13px; line-height: 1.8; margin-bottom: 24px;">
      <div style="display: flex; justify-content: space-between;">
        <span>Subtotal:</span>
        <span>${formatPrice(order.subtotal || 0, currencySym)}</span>
      </div>
      ${order.discountAmount ? `
      <div style="display: flex; justify-content: space-between; color: #166534;">
        <span>Discount:</span>
        <span>-${formatPrice(order.discountAmount, currencySym)}</span>
      </div>` : ''}
      <div style="display: flex; justify-content: space-between;">
        <span>Shipping (Royal Mail Tracked):</span>
        <span>${order.shippingCost === 0 ? 'FREE' : formatPrice(order.shippingCost || 0, currencySym)}</span>
      </div>
      ${order.taxAmount ? `
      <div style="display: flex; justify-content: space-between; color: #64748b; font-size: 11px;">
        <span>Includes 20% UK VAT:</span>
        <span>${formatPrice(order.taxAmount, currencySym)}</span>
      </div>` : ''}
      <div style="display: flex; justify-content: space-between; font-weight: 800; font-size: 16px; border-top: 2px solid #0f172a; padding-top: 6px; margin-top: 6px; color: #0f172a;">
        <span>Total Paid:</span>
        <span>${formatPrice(order.totalAmount || 0, currencySym)}</span>
      </div>
    </div>

    <div style="background-color: #f1f5f9; border-radius: 8px; padding: 16px; margin-bottom: 24px; border-left: 4px solid #0f172a;">
      <h4 style="margin: 0 0 6px 0; font-size: 14px; color: #0f172a;">Shipping Address</h4>
      <p style="margin: 0; font-size: 13px; color: #334155; line-height: 1.5;">
        <strong>${order.shippingAddress?.fullName || order.customerName}</strong><br>
        ${order.shippingAddress?.street || ''}<br>
        ${order.shippingAddress?.city || ''}, ${order.shippingAddress?.postcode || ''}<br>
        ${order.shippingAddress?.country || 'United Kingdom'}<br>
        Phone: ${order.customerPhone || order.shippingAddress?.phone || 'N/A'}
      </p>
    </div>

    <div style="text-align: center; margin-top: 24px;">
      <a href="https://${companyInfo.domain || 'www.ahmadify.store'}?track=${order.orderNumber}" class="btn">
        Track Your Order Status
      </a>
    </div>
  `;

  const text = `
ahmadify.store - ORDER CONFIRMATION
===================================
Thank you for your order, ${order.customerName}!

Order Reference: ${order.orderNumber}
Date: ${orderDate}
Total Paid: ${formatPrice(order.totalAmount || 0, currencySym)}
Payment Status: ${(order.paymentStatus || 'Paid').toUpperCase()}

Items Ordered:
${(order.items || []).map(i => `- ${i.title} (Qty: ${i.quantity}) - ${formatPrice(i.price * i.quantity, currencySym)}`).join('\n')}

Shipping Address:
${order.shippingAddress?.fullName || order.customerName}
${order.shippingAddress?.street || ''}
${order.shippingAddress?.city}, ${order.shippingAddress?.postcode}
${order.shippingAddress?.country}

Track your order anytime at: ${companyInfo.domain || 'https://www.ahmadify.store'}?track=${order.orderNumber}

ahmadify.store Official Online Storefront
Email: ${companyInfo.email} | WhatsApp: ${companyInfo.whatsapp}
`;

  return {
    subject: `Order Confirmation: ${order.orderNumber} - ahmadify.store`,
    html: wrapEmailLayout(`Order Confirmation ${order.orderNumber}`, contentHtml, companyInfo),
    text
  };
};

/**
 * 2. Shipping Dispatch & Tracking Update Email Template
 */
export const generateShippingUpdateEmail = (
  order: Order,
  companyInfo: CompanyInfo
): EmailTemplateResult => {
  const currencySym = order.currency === 'USD' ? '$' : order.currency === 'EUR' ? '€' : '£';
  const trackingNo = order.trackingNumber || `GB-CJ-${Math.floor(10000000 + Math.random() * 90000000)}`;
  const carrierName = order.carrier || 'Royal Mail 24 Tracked';

  const itemsList = (order.items || []).map(i => `
    <li style="margin-bottom: 6px; font-size: 13px;">
      <strong>${i.title}</strong> (Qty: ${i.quantity})
    </li>
  `).join('');

  const contentHtml = `
    <div style="margin-bottom: 24px;">
      <span class="badge badge-info">Package Dispatched 🚀</span>
      <h2 style="margin: 12px 0 4px 0; font-size: 20px; color: #0f172a;">Your Order is On Its Way!</h2>
      <p style="margin: 0; color: #64748b; font-size: 14px;">Great news ${order.customerName}! Order <strong>${order.orderNumber}</strong> has been handed to our trusted carrier and is heading to your delivery address.</p>
    </div>

    <div style="background-color: #eff6ff; border-radius: 12px; padding: 20px; margin-bottom: 24px; border: 1px solid #bfdbfe; text-align: center;">
      <div style="font-size: 12px; text-transform: uppercase; font-weight: 700; color: #1d4ed8; letter-spacing: 1px; margin-bottom: 4px;">Tracking Information</div>
      <div style="font-size: 22px; font-weight: 800; color: #0f172a; letter-spacing: 1px; margin-bottom: 8px;">${trackingNo}</div>
      <div style="font-size: 13px; color: #3b82f6; font-weight: 700; margin-bottom: 12px;">Carrier: ${carrierName}</div>
      <a href="https://${companyInfo.domain || 'www.ahmadify.store'}?track=${order.orderNumber}" class="btn" style="margin-top: 0; background-color: #2563eb; color: #ffffff;">
        Track Package Live
      </a>
    </div>

    <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin-bottom: 24px; border: 1px solid #e2e8f0;">
      <h4 style="margin: 0 0 8px 0; font-size: 14px; color: #0f172a;">Estimated Arrival Window</h4>
      <p style="margin: 0; font-size: 13px; color: #334155;">
        ⏰ <strong>1 - 3 Business Days</strong> (Royal Mail UK Tracked Service)<br>
        <span style="font-size: 11px; color: #64748b;">A signature may be required upon delivery.</span>
      </p>
    </div>

    <h3 style="font-size: 14px; margin: 16px 0 8px 0; color: #0f172a;">Package Contents:</h3>
    <ul style="padding-left: 20px; margin: 0 0 24px 0; color: #334155;">
      ${itemsList}
    </ul>

    <div style="border-top: 1px solid #e2e8f0; padding-top: 16px; font-size: 12px; color: #64748b;">
      Need to change delivery preferences or have a question? Contact our 24/7 UK support team via WhatsApp <strong>${companyInfo.whatsapp || '+92 317 8031001'}</strong> or email <strong>${companyInfo.email}</strong>.
    </div>
  `;

  const text = `
ahmadify.store - SHIPPING DISPATCH NOTICE
========================================
Your package is on its way, ${order.customerName}!

Order Reference: ${order.orderNumber}
Carrier: ${carrierName}
Tracking Number: ${trackingNo}

Track Parcel: ${companyInfo.domain || 'https://www.ahmadify.store'}?track=${order.orderNumber}

Estimated Delivery: 1 - 3 Business Days

Package Contents:
${(order.items || []).map(i => `- ${i.title} (Qty: ${i.quantity})`).join('\n')}

ahmadify.store Official Online Storefront
`;

  return {
    subject: `Shipping Dispatch Notice: Order ${order.orderNumber} (${carrierName}) - ahmadify.store`,
    html: wrapEmailLayout(`Shipping Update ${order.orderNumber}`, contentHtml, companyInfo),
    text
  };
};

/**
 * 3. Return & Refund Authorization Email Template
 */
export const generateReturnAuthorizationEmail = (
  order: Order,
  companyInfo: CompanyInfo,
  returnReason: string = 'Customer Return Request'
): EmailTemplateResult => {
  const rmaNumber = `RMA-AHM-${order.orderNumber.replace('AHM-', '')}`;

  const contentHtml = `
    <div style="margin-bottom: 24px;">
      <span class="badge badge-warning">Return Authorization Approved</span>
      <h2 style="margin: 12px 0 4px 0; font-size: 20px; color: #0f172a;">Return Instructions & RMA Authorization</h2>
      <p style="margin: 0; color: #64748b; font-size: 14px;">We've approved your return request for Order <strong>${order.orderNumber}</strong>. Please follow the instructions below to send your item back to our UK Return Hub.</p>
    </div>

    <div style="background-color: #fefce8; border-radius: 8px; padding: 16px; margin-bottom: 24px; border: 1px dashed #f59e0b;">
      <div style="font-size: 11px; text-transform: uppercase; font-weight: 700; color: #b45309; letter-spacing: 1px;">Return Authorization Number (RMA)</div>
      <div style="font-size: 20px; font-weight: 800; color: #78350f; margin-top: 2px;">${rmaNumber}</div>
      <div style="font-size: 12px; color: #92400e; margin-top: 4px;">Reason: ${returnReason}</div>
    </div>

    <h3 style="font-size: 15px; margin: 16px 0 12px 0; color: #0f172a;">Step-by-Step Return Instructions</h3>
    <ol style="padding-left: 20px; margin: 0 0 24px 0; font-size: 13px; color: #334155; line-height: 1.6;">
      <li style="margin-bottom: 8px;">
        <strong>Pack Items Securely:</strong> Place items in original packaging with all included accessories, tags, and manuals. Include a slip with your RMA <strong>${rmaNumber}</strong> inside the box.
      </li>
      <li style="margin-bottom: 8px;">
        <strong>Address Your Parcel To:</strong><br>
        <div style="background-color: #f8fafc; padding: 10px 14px; border-radius: 6px; margin: 6px 0; border: 1px solid #e2e8f0; font-family: monospace;">
          ahmadify.store - Returns Department<br>
          Ref: ${rmaNumber}<br>
          United Kingdom
        </div>
      </li>
      <li style="margin-bottom: 8px;">
        <strong>Dispatch & Track:</strong> Hand parcel to any Royal Mail Post Office or tracked courier service. Retain receipt & tracking number.
      </li>
      <li>
        <strong>Refund Processing:</strong> Once inspected by our quality control team (typically 1-2 business days upon arrival), your refund will be automatically credited to your original payment method.
      </li>
    </ol>

    <div style="background-color: #f1f5f9; border-radius: 8px; padding: 14px; font-size: 12px; color: #475569;">
      <strong>30-Day Money-Back Guarantee:</strong> You have 30 days to return unused merchandise in original condition.
    </div>
  `;

  const text = `
ahmadify.store - RETURN AUTHORIZATION & INSTRUCTIONS
===================================================
RMA Number: ${rmaNumber}
Order Reference: ${order.orderNumber}
Reason: ${returnReason}

Return Address:
ahmadify.store - Returns Department
Ref: ${rmaNumber}
United Kingdom

Instructions:
1. Pack items securely with original box and tags. Include RMA ${rmaNumber} inside parcel.
2. Ship parcel using tracked service to the address above.
3. Refund will be credited within 1-2 business days of receipt.

Questions? Contact ${companyInfo.email} or WhatsApp ${companyInfo.whatsapp}.
`;

  return {
    subject: `Return Authorization & Label Instructions (${rmaNumber}) - ahmadify.store`,
    html: wrapEmailLayout(`Return Authorization ${rmaNumber}`, contentHtml, companyInfo),
    text
  };
};

/**
 * 4. Abandoned Cart Recovery Email Template
 */
export const generateAbandonedCartEmail = (
  customerName: string,
  items: CartItem[],
  companyInfo: CompanyInfo
): EmailTemplateResult => {
  const currencySym = '£';
  const subtotal = (items || []).reduce((sum, item) => sum + item.price * item.quantity, 0);

  const itemsHtml = (items || []).map(item => `
    <tr>
      <td>
        <div style="font-weight: 700; color: #0f172a;">${item.title}</div>
        <div style="font-size: 11px; color: #64748b;">Qty: ${item.quantity}</div>
      </td>
      <td style="text-align: right; font-weight: 700;">${formatPrice(item.price * item.quantity, currencySym)}</td>
    </tr>
  `).join('');

  const contentHtml = `
    <div style="margin-bottom: 24px; text-align: center;">
      <span class="badge badge-warning">Special 10% Discount Inside 🎁</span>
      <h2 style="margin: 12px 0 4px 0; font-size: 22px; color: #0f172a;">Did You Leave Something Behind?</h2>
      <p style="margin: 0; color: #64748b; font-size: 14px;">Hi ${customerName || 'there'}, your chosen items are still saved in your shopping cart at ahmadify.store!</p>
    </div>

    <div style="background-color: #fef3c7; border-radius: 12px; padding: 16px; margin-bottom: 24px; border: 1px dashed #d97706; text-align: center;">
      <div style="font-size: 11px; text-transform: uppercase; font-weight: 800; color: #92400e; letter-spacing: 1px;">Exclusive VIP Promo Code</div>
      <div style="font-size: 24px; font-weight: 900; color: #78350f; margin: 4px 0;">AHMADIFY10</div>
      <div style="font-size: 12px; color: #b45309;">Use code at checkout to claim 10% OFF your entire order + Free UK Delivery!</div>
    </div>

    <h3 style="font-size: 14px; margin: 16px 0 8px 0; color: #0f172a;">Your Saved Cart Items:</h3>
    <table class="table">
      <thead>
        <tr>
          <th>Item</th>
          <th style="text-align: right;">Price</th>
        </tr>
      </thead>
      <tbody>
        ${itemsHtml}
      </tbody>
    </table>

    <div style="text-align: right; font-size: 15px; font-weight: 800; color: #0f172a; margin-bottom: 24px;">
      Cart Subtotal: ${formatPrice(subtotal, currencySym)}
    </div>

    <div style="text-align: center; margin-top: 24px;">
      <a href="${companyInfo.domain || 'https://www.ahmadify.store'}" class="btn">
        Complete Checkout Now & Save 10%
      </a>
    </div>
  `;

  const text = `
ahmadify.store - YOUR CART IS WAITING
====================================
Hi ${customerName || 'Valued Customer'},

You left items in your shopping cart! Use promo code AHMADIFY10 at checkout to receive 10% OFF your purchase + Free Tracked Shipping.

Saved Items:
${(items || []).map(i => `- ${i.title} (Qty: ${i.quantity}) - £${(i.price * i.quantity).toFixed(2)}`).join('\n')}

Complete your order at: ${companyInfo.domain || 'https://www.ahmadify.store'}

ahmadify.store Official Online Storefront
`;

  return {
    subject: `Did you leave something behind? Take 10% OFF with code AHMADIFY10! 🎁 - ahmadify.store`,
    html: wrapEmailLayout('Complete Your Order - ahmadify.store', contentHtml, companyInfo),
    text
  };
};
