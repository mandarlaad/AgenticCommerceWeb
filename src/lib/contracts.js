export const toolContractMap = {
  'planner.intent': {
    targetName: 'runtime-planner',
    operationId: 'planShopperIntent',
    contractPath: 'prompt -> structured plan',
    surfaceMode: 'local_ui'
  },
  'catalog.search': {
    targetName: 'bfh-catalog',
    operationId: 'searchCatalog',
    contractPath: '/catalog/search'
  },
  'fsp.financing.eligibility': {
    targetName: 'bfh-payments',
    operationId: 'getFinancingEligibility',
    contractPath: '/fsp/financing/eligibility'
  },
  'fsp.payments.tokenize': {
    targetName: 'bfh-payments',
    operationId: 'tokenizePaymentInstrument',
    contractPath: '/fsp/payments/tokenize'
  },
  'checkout_sessions.create': {
    targetName: 'bfh-checkout',
    operationId: 'createCheckoutSessionAcp',
    contractPath: '/checkout_sessions'
  },
  'checkout_sessions.update': {
    targetName: 'bfh-checkout',
    operationId: 'updateCheckoutSessionAcp',
    contractPath: '/checkout_sessions/{checkout_session_id}'
  },
  'checkout_sessions.complete': {
    targetName: 'bfh-checkout',
    operationId: 'completeCheckoutSessionAcp',
    contractPath: '/checkout_sessions/{checkout_session_id}/complete'
  },
  'consents.create': {
    targetName: 'bfh-consents',
    operationId: 'createConsent',
    contractPath: '/consents',
    surfaceMode: 'direct_http'
  },
  'identity.screen': {
    targetName: 'client-screening',
    operationId: 'verifyIdentity',
    contractPath: 'identity verification',
    surfaceMode: 'ui_simulated'
  },
  'fraud.screen': {
    targetName: 'client-screening',
    operationId: 'scoreFraudRisk',
    contractPath: 'fraud screening',
    surfaceMode: 'ui_simulated'
  },
  'fulfillment.simulate': {
    targetName: 'bfh-checkout',
    operationId: 'simulateFulfillment',
    contractPath: '/fulfillment/simulate'
  }
};
