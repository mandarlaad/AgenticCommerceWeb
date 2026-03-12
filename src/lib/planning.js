import { palette } from './theme';

// export function parseIntent(userText) {
//   const text = (userText || '').toLowerCase();
//   const below = /(under|below|less than|lower than)\s+(\d+)/i.exec(text);
//   if (below) return { mode: 'below', amount: Number(below[2]) };
//   const above = /(above|more than|higher than|greater than)\s+(\d+)/i.exec(text);
//   if (above) return { mode: 'above', amount: Number(above[2]) };
//   return { mode: 'below', amount: 1200 };
// }

export function parseIntent(userText) {
  const text = (userText || '').toLowerCase();

  const below = /(under|below|less than|lower than)\s+\$?\s*(\d+)/i.exec(text);
  if (below) return { mode: 'below', amount: Number(below[2]) };

  const budget = /(budget|around|upto|up to|max|maximum)\s+\$?\s*(\d+)/i.exec(text);
  if (budget) return { mode: 'below', amount: Number(budget[2]) };

  const pricedFor = /\bfor\s+\$?\s*(\d+)\s*\$?\b/i.exec(text);
  if (pricedFor) return { mode: 'below', amount: Number(pricedFor[1]) };

  const dollarAnywhere = /\$?\s*(\d+)\s*\$/i.exec(text);
  if (dollarAnywhere) return { mode: 'below', amount: Number(dollarAnywhere[1]) };

  const above = /(above|more than|higher than|greater than)\s+\$?\s*(\d+)/i.exec(text);
  if (above) return { mode: 'above', amount: Number(above[2]) };

  return { mode: 'below', amount: 1200 };
}

// export function extractQuery(userText) {
//   const text = (userText || '').toLowerCase();
//   if (/treadmill|fitness|workout/.test(text)) return 'treadmill';
//   if (/ring|jewelry|diamond/.test(text)) return 'ring';
//   if (/shoe|sneaker/.test(text)) return 'shoe';
//   if (/laptop|notebook/.test(text)) return 'laptop';
//   return '';
// }

export function extractQuery(userText) {
  const text = (userText || '').toLowerCase();

  if (/treadmill|fitness|workout/.test(text)) return 'treadmill';
  if (/ring|jewelry|diamond/.test(text)) return 'ring';
  if (/shoe|sneaker/.test(text)) return 'shoe';
  if (/jeans|denim/.test(text)) return 'jeans';
  if (/camera|canon/.test(text)) return 'camera';
  if (/laptop|notebook/.test(text)) return 'laptop';
  if (/necklace/.test(text)) return 'necklace';
  if (/watch|smartwatch/.test(text)) return 'watch';
  if (/bracelet/.test(text)) return 'bracelet';

  return (userText || '').trim();
}
export function describePlan(mode, amount) {
  if (mode === 'below' && amount) return `Budget cap under $${amount}`;
  if (mode === 'above' && amount) return `Looking above $${amount}`;
  return 'No explicit budget constraint';
}

export function pickProduct(items, mode, amount) {
  const priced = Array.isArray(items) ? items.filter((item) => item && typeof item.price === 'number') : [];
  if (!priced.length) return null;
  if (mode === 'below') {
    return priced.filter((item) => item.price <= amount).sort((a, b) => b.price - a.price)[0] || null;
  }
  return priced.filter((item) => item.price >= amount).sort((a, b) => a.price - b.price)[0] || null;
}

export function friendlyDeclineReason(reason) {
  switch (reason) {
    case 'AMOUNT_GT_THRESHOLD':
      return 'the purchase amount exceeds the approved threshold';
    case 'TOKEN_INVALID':
      return 'the payment token could not be validated';
    case 'MISSING_SESSION':
      return 'the checkout session could not be found';
    case 'MISSING_PAYMENT_TOKEN':
      return 'a valid payment token was not provided';
    default:
      return 'the financing provider did not approve the payment';
  }
}

export function completionMessage(body, selected, rail) {
  if (!body) return 'Checkout completion failed.';
  if (body.status === 'CONFIRMED') {
    return `I found ${selected.name} at $${selected.price}, secured ${rail || 'card'} financing, and completed checkout successfully.`;
  }
  if (body.status === 'DECLINED') {
    return `I found ${selected.name} at $${selected.price}, but the payment step was declined because ${friendlyDeclineReason(body.reason || body.declineReason)}.`;
  }
  if (body.status === 'PENDING_3DS') {
    return `I found ${selected.name} at $${selected.price}, and the checkout now requires step-up verification before completion.`;
  }
  return 'Checkout completion finished with a non-terminal business outcome.';
}

export function screeningFromDraft(product, cartDraft) {
  const qty = Math.max(1, Number(cartDraft?.qty || 1));
  const total = Number(product?.price || 0) * qty;
  const postalCode = String(cartDraft?.shippingAddress?.postalCode || '');
  const riskScore = total >= 1400 ? 82 : total >= 1000 ? 56 : 24;
  const identityStatus = postalCode.length >= 5 ? 'VERIFIED' : 'REVIEW';
  const fraudStatus = riskScore >= 80 ? 'REVIEW' : 'CLEAR';
  const recommendation = fraudStatus === 'REVIEW'
    ? 'Proceed with caution; elevated amount triggered manual review.'
    : 'Identity and fraud checks cleared for checkout.';
  return { total, riskScore, identityStatus, fraudStatus, recommendation };
}

export function stageLabel(stage) {
  switch (stage) {
    case 'requirements':
      return 'Gathering requirements';
    case 'options':
      return 'Showing options';
    case 'consent':
      return 'Awaiting consent';
    case 'cart':
      return 'Cart and shipping';
    case 'screening':
      return 'Identity and fraud';
    case 'payment':
      return 'Payment details';
    case 'confirm':
      return 'Confirm order';
    case 'complete':
      return 'Checkout complete';
    default:
      return 'Idle';
  }
}

export function productArtwork(product) {
  const title = product?.name || 'Agentic Commerce';
  const accent = product?.category === 'fitness' ? palette.ember : product?.category === 'jewelry' ? palette.teal : palette.moss;
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="640" height="420" viewBox="0 0 640 420">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}" />
          <stop offset="100%" stop-color="${palette.ink}" />
        </linearGradient>
      </defs>
      <rect width="640" height="420" rx="36" fill="url(#bg)"/>
      <circle cx="120" cy="96" r="74" fill="rgba(255,255,255,0.14)"/>
      <circle cx="518" cy="308" r="108" fill="rgba(255,255,255,0.08)"/>
      <path d="M150 280 C220 180 350 150 470 210" stroke="rgba(255,255,255,0.24)" stroke-width="18" fill="none" stroke-linecap="round"/>
      <rect x="74" y="72" width="492" height="276" rx="26" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.24)"/>
      <text x="74" y="356" fill="#f5efe4" font-size="36" font-family="Georgia, serif">${title}</text>
      <text x="74" y="388" fill="rgba(245,239,228,0.85)" font-size="18" font-family="Trebuchet MS, sans-serif">${(product?.category || 'commerce').toUpperCase()}</text>
    </svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}
