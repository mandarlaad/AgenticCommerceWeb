import React from 'react';
import StatPill from '../common/StatPill';

function Field({ label, children }) {
  return (
    <label style={{ display: 'grid', gap: 6 }}>
      <span style={{ fontFamily: '"Trebuchet MS", sans-serif', fontSize: 11, textTransform: 'uppercase', letterSpacing: '0.14em', color: '#43505e' }}>
        {label}
      </span>
      {children}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      style={{
        padding: '10px 12px',
        borderRadius: 12,
        border: '1px solid rgba(24,22,26,0.12)',
        background: 'rgba(255,255,255,0.9)',
        fontSize: 14,
        boxSizing: 'border-box',
        width: '100%',
        ...(props.style || {})
      }}
    />
  );
}

export default function StageActionCard({
  bareBonesUi = false,
  stage,
  options,
  cartDraft,
  setCartDraft,
  paymentDraft,
  setPaymentDraft,
  screening,
  loading,
  onSelectProduct,
  onGrantConsent,
  onContinueToScreening,
  onContinueToPayment,
  onPreparePayment,
  onConfirmCheckout
}) {
  if (!stage || stage === 'idle' || stage === 'complete') return null;

  return (
    <div
      style={{
        justifySelf: 'start',
        width: '100%',
        maxWidth: '92%',
        background: '#ffffff',
        border: bareBonesUi ? '1px solid #d0d0d0' : '1px solid rgba(24,22,26,0.12)',
        borderRadius: bareBonesUi ? 4 : 20,
        padding: 14,
        display: 'grid',
        gap: 12
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <StatPill label={stage.replace('_', ' ')} />
      </div>

      {stage === 'options' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          {options.map((option) => (
            <button
              key={option.sku}
              onClick={() => onSelectProduct(option)}
              disabled={loading}
              style={{
                textAlign: 'left',
                padding: '12px 14px',
                borderRadius: bareBonesUi ? 4 : 16,
                border: bareBonesUi ? '1px solid #cccccc' : '1px solid rgba(24,22,26,0.12)',
                background: '#ffffff',
                cursor: 'pointer'
              }}
            >
              <div style={{ fontSize: 16, fontWeight: 600 }}>{option.name}</div>
              <div style={{ color: '#43505e' }}>SKU {option.sku} · ${option.price}</div>
            </button>
          ))}
        </div>
      ) : null}

      {stage === 'consent' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          <button
            onClick={onGrantConsent}
            disabled={loading}
            style={{ justifySelf: 'start', padding: '10px 14px', borderRadius: bareBonesUi ? 4 : 999, border: bareBonesUi ? '1px solid #bdbdbd' : 'none', background: bareBonesUi ? '#f2f2f2' : '#2c7b7f', color: bareBonesUi ? '#111111' : '#f5efe4', cursor: 'pointer' }}
          >
            Grant consent
          </button>
        </div>
      ) : null}

      {stage === 'cart' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 10 }}>
            <Field label="Quantity">
              <Input
                type="number"
                min="1"
                value={cartDraft.qty}
                onChange={(e) => setCartDraft((draft) => ({ ...draft, qty: Math.max(1, Number(e.target.value || 1)) }))}
              />
            </Field>
            <Field label="Street address">
              <Input
                value={cartDraft.shippingAddress.line1}
                onChange={(e) =>
                  setCartDraft((draft) => ({
                    ...draft,
                    shippingAddress: { ...draft.shippingAddress, line1: e.target.value }
                  }))
                }
              />
            </Field>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(160px,1.2fr) 90px 120px', gap: 10 }}>
            <Field label="City">
              <Input
                value={cartDraft.shippingAddress.city}
                onChange={(e) =>
                  setCartDraft((draft) => ({
                    ...draft,
                    shippingAddress: { ...draft.shippingAddress, city: e.target.value }
                  }))
                }
              />
            </Field>
            <Field label="State">
              <Input
                value={cartDraft.shippingAddress.region}
                onChange={(e) =>
                  setCartDraft((draft) => ({
                    ...draft,
                    shippingAddress: { ...draft.shippingAddress, region: e.target.value }
                  }))
                }
              />
            </Field>
            <Field label="Postal code">
              <Input
                value={cartDraft.shippingAddress.postalCode}
                onChange={(e) =>
                  setCartDraft((draft) => ({
                    ...draft,
                    shippingAddress: { ...draft.shippingAddress, postalCode: e.target.value }
                  }))
                }
              />
            </Field>
          </div>
          <button
            onClick={onContinueToScreening}
            disabled={loading}
            style={{ justifySelf: 'start', padding: '10px 14px', borderRadius: bareBonesUi ? 4 : 999, border: bareBonesUi ? '1px solid #bdbdbd' : 'none', background: bareBonesUi ? '#f2f2f2' : '#355c67', color: bareBonesUi ? '#111111' : '#f5efe4', cursor: 'pointer' }}
          >
            Continue to identity and fraud checks
          </button>
        </div>
      ) : null}

      {stage === 'screening' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            <StatPill label={screening?.identityStatus || 'Pending'} compact />
            <StatPill label={screening?.fraudStatus || 'Pending'} compact />
          </div>
          <div style={{ color: '#43505e', lineHeight: 1.45 }}>
            {screening?.recommendation || 'Identity and fraud signals will appear here.'}
          </div>
          <button
            onClick={onContinueToPayment}
            disabled={loading}
            style={{ justifySelf: 'start', padding: '10px 14px', borderRadius: bareBonesUi ? 4 : 999, border: bareBonesUi ? '1px solid #bdbdbd' : 'none', background: bareBonesUi ? '#f2f2f2' : '#355c67', color: bareBonesUi ? '#111111' : '#f5efe4', cursor: 'pointer' }}
          >
            Continue to payment preparation
          </button>
        </div>
      ) : null}

      {stage === 'payment' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            <Field label="Preferred rail">
              <select
                value={paymentDraft.railPreference}
                onChange={(e) => setPaymentDraft((draft) => ({ ...draft, railPreference: e.target.value }))}
                style={{ padding: '10px 12px', borderRadius: 12, border: '1px solid rgba(24,22,26,0.12)', background: 'rgba(255,255,255,0.9)', fontSize: 14 }}
              >
                <option value="bnpl">BNPL</option>
                <option value="card">Card</option>
              </select>
            </Field>
            <Field label="Order quantity">
              <Input value={String(cartDraft.qty)} disabled />
            </Field>
          </div>
          <Field label="Customer note">
            <Input
              value={paymentDraft.detailsLabel}
              onChange={(e) => setPaymentDraft((draft) => ({ ...draft, detailsLabel: e.target.value }))}
            />
          </Field>
          <button
            onClick={onPreparePayment}
            disabled={loading}
            style={{ justifySelf: 'start', padding: '10px 14px', borderRadius: bareBonesUi ? 4 : 999, border: bareBonesUi ? '1px solid #bdbdbd' : 'none', background: bareBonesUi ? '#f2f2f2' : '#2c7b7f', color: bareBonesUi ? '#111111' : '#f5efe4', cursor: 'pointer' }}
          >
            Prepare payment and checkout session
          </button>
        </div>
      ) : null}

      {stage === 'confirm' ? (
        <div style={{ display: 'grid', gap: 10 }}>
          <div style={{ color: '#43505e', lineHeight: 1.45 }}>
            The product, shipping, screening, and tokenized payment are ready. Confirm to complete checkout.
          </div>
          <button
            onClick={onConfirmCheckout}
            disabled={loading}
            style={{ justifySelf: 'start', padding: '10px 14px', borderRadius: bareBonesUi ? 4 : 999, border: bareBonesUi ? '1px solid #bdbdbd' : 'none', background: bareBonesUi ? '#f2f2f2' : '#355c67', color: bareBonesUi ? '#111111' : '#f5efe4', cursor: 'pointer' }}
          >
            Confirm order and complete checkout
          </button>
        </div>
      ) : null}
    </div>
  );
}
