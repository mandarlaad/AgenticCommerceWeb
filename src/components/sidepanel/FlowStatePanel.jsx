import React from 'react';
import { Box, Typography } from '@mui/material';
import StateCard from './StateCard';
import { describePlan, friendlyDeclineReason } from '../../lib/planning';

export default function FlowStatePanel({
  planState,
  product,
  consentRecord,
  screening,
  session,
  eligibility,
  paymentDraft,
  token,
  order,
  shippingStatus,
  cartDraft,
  orderId,
  bareBonesUi = false
}) {
  const cards = [
    {
      key: 'planner',
      title: 'Planner',
      status: planState?.source || 'Pending',
      lines: [
        planState ? `Query ${planState.query}` : 'No intent parsed yet',
        planState ? describePlan(planState.mode, planState.amount) : 'Awaiting shopper prompt',
        planState?.railPreference ? `Actual rail ${String(planState.railPreference).toUpperCase()}` : 'No rail chosen yet',
        planState?.requestedRailPreference ? `Requested rail ${String(planState.requestedRailPreference).toUpperCase()}` : null,
        planState?.plannerModelId ? `Model ${planState.plannerModelId.split('/').slice(-1)[0]}` : null
      ],
      emphasis: Boolean(planState)
    },
    {
      key: 'search',
      title: 'Search',
      status: product ? 'Matched' : 'Pending',
      lines: [
        product ? `${product.name} / $${product.price}` : 'No product selected',
        product ? `SKU ${product.sku}` : 'Awaiting shopper prompt'
      ],
      emphasis: Boolean(product)
    },
    {
      key: 'consent',
      title: 'Consent',
      status: consentRecord ? 'Granted' : 'Pending',
      lines: [
        consentRecord ? `Consent ${consentRecord.consentId}` : 'No consent recorded',
        consentRecord ? (consentRecord.scopes || []).join(', ') : 'Payments, financing, shipping'
      ],
      emphasis: Boolean(consentRecord)
    },
    {
      key: 'screening',
      title: 'Screening',
      status: screening ? `${screening.identityStatus}/${screening.fraudStatus}` : 'Pending',
      lines: [
        screening ? `Risk score ${screening.riskScore}` : 'Identity and fraud not run',
        screening ? screening.recommendation : 'Awaiting shipping details'
      ],
      emphasis: Boolean(screening)
    },
    {
      key: 'session',
      title: 'Checkout session',
      status: session?.status || 'Pending',
      lines: [
        session?.checkoutSessionId || session?.sessionId || 'No session',
        cartDraft?.shippingAddress?.line1 || 'No shipping address'
      ],
      emphasis: Boolean(session)
    },
    {
      key: 'payment',
      title: 'Payment',
      status: order?.paymentStatus || order?.status || eligibility?.preferredRail || 'Pending',
      lines: [
        eligibility ? `${eligibility.preferredRail || paymentDraft.railPreference || 'card'} / APR ${eligibility.apr}` : 'No eligibility response yet',
        paymentDraft?.detailsLabel || 'No payment details captured',
        token?.instrument?.token || token?.token || 'No token',
        order?.status === 'DECLINED' ? `Reason: ${friendlyDeclineReason(order?.reason || order?.declineReason)}` : null
      ],
      emphasis: Boolean(token || order)
    },
    {
      key: 'shipping',
      title: 'Shipping',
      status: shippingStatus || order?.status || 'Idle',
      lines: [
        orderId || 'No order',
        cartDraft?.shippingAddress?.line1 || 'No shipping address',
        shippingStatus || 'Awaiting shipment simulation'
      ],
      emphasis: Boolean(order || shippingStatus)
    }
  ];

  return (
    <Box sx={{ display: 'grid', gap: 1 }}>
      <Typography sx={{ color: 'text.secondary', fontSize: 13, lineHeight: 1.5, mb: 0.5 }}>
        This view tracks the shopper journey from intent parsing through checkout, payment, and fulfillment state.
      </Typography>

      {cards.map((card) => (
        <StateCard
          key={card.key}
          title={card.title}
          status={card.status}
          lines={card.lines}
          emphasis={card.emphasis}
          bareBonesUi={bareBonesUi}
        />
      ))}
    </Box>
  );
}