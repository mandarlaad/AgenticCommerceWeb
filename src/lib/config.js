export const defaultMinimalUi = String(process.env.REACT_MINIMAL_UI || '').toLowerCase() === 'true';
export const defaultBareBonesUi = String(process.env.REACT_BARE_BONES_UI || '').toLowerCase() === 'true';
export const defaultRuntimeArn = process.env.AGENTCORE_RUNTIME_ARN || '';
export const defaultRuntimeRegion = process.env.AGENTCORE_RUNTIME_REGION || 'us-east-2';
export const defaultRuntimeQualifier = process.env.AGENTCORE_RUNTIME_QUALIFIER || 'prod';
export const lockDemoConfig = String(process.env.LOCK_DEMO_CONFIG || '').toLowerCase() === 'true';
