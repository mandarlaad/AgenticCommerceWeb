require('dotenv').config({ path: '.env.local' });
const path = require('path');
const fs = require('fs');
const os = require('os');
const { spawn } = require('child_process');
const webpack = require('webpack');

const proxyTarget = process.env.API_PROXY_TARGET || 'https://qcb5ft7lt6.execute-api.us-east-2.amazonaws.com';

function parseJsonBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

function invokeAgentCoreRuntime({ agentRuntimeArn, qualifier, region, profile, payload }) {
  return new Promise((resolve, reject) => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'agentcore-ui-'));
    const payloadFile = path.join(tmpDir, 'payload.json');
    const outputFile = path.join(tmpDir, 'response.json');
    fs.writeFileSync(payloadFile, JSON.stringify(payload), 'utf8');

    const args = [
      'bedrock-agentcore',
      'invoke-agent-runtime',
      '--agent-runtime-arn',
      agentRuntimeArn,
      '--qualifier',
      qualifier || 'prod',
      '--content-type',
      'application/json',
      '--accept',
      'application/json',
      '--payload',
      `fileb://${payloadFile}`,
      '--region',
      region || process.env.RUNTIME_REGION || 'us-east-2'
    ];

    const effectiveProfile = profile || process.env.RUNTIME_PROFILE;
    if (effectiveProfile) {
      args.push('--profile', effectiveProfile);
    }
    args.push(outputFile);

    const child = spawn('aws', args, { shell: false });
    let stdout = '';
    let stderr = '';

    child.stdout.on('data', (chunk) => {
      stdout += chunk.toString();
    });
    child.stderr.on('data', (chunk) => {
      stderr += chunk.toString();
    });
    child.on('error', (err) => {
      reject(err);
    });
    child.on('close', (code) => {
      try {
        const outputRaw = fs.existsSync(outputFile) ? fs.readFileSync(outputFile, 'utf8') : '';
        let outputJson = {};
        if (outputRaw) {
          outputJson = JSON.parse(outputRaw);
        }
        if (code !== 0) {
          return reject(new Error(stderr || stdout || `aws exited with code ${code}`));
        }
        resolve({ meta: stdout ? JSON.parse(stdout) : {}, output: outputJson });
      } catch (err) {
        reject(err);
      } finally {
        fs.rmSync(tmpDir, { recursive: true, force: true });
      }
    });
  });
}

module.exports = {
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.REACT_MINIMAL_UI': JSON.stringify(process.env.REACT_MINIMAL_UI || ''),
      'process.env.REACT_BARE_BONES_UI': JSON.stringify(process.env.REACT_BARE_BONES_UI || ''),
      'process.env.AGENTCORE_RUNTIME_ARN': JSON.stringify(process.env.AGENTCORE_RUNTIME_ARN || ''),
      'process.env.AGENTCORE_RUNTIME_REGION': JSON.stringify(process.env.AGENTCORE_RUNTIME_REGION || ''),
      'process.env.AGENTCORE_RUNTIME_QUALIFIER': JSON.stringify(process.env.AGENTCORE_RUNTIME_QUALIFIER || ''),
      'process.env.LOCK_DEMO_CONFIG': JSON.stringify(process.env.LOCK_DEMO_CONFIG || '')
    })
  ],
  devServer: {
    static: './public',
    port: 3000,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) return middlewares;
      devServer.app.post('/runtime-proxy/checkout', async (req, res) => {
        try {
          const body = await parseJsonBody(req);
          const payload = body.payload || {};
          if (!body.agentRuntimeArn) {
            return res.status(400).json({ error: 'Missing agentRuntimeArn' });
          }
          const result = await invokeAgentCoreRuntime({
            agentRuntimeArn: body.agentRuntimeArn,
            qualifier: body.qualifier,
            region: body.region,
            profile: body.profile,
            payload
          });
          return res.json({
            ok: true,
            runtimeSessionId: result.meta.runtimeSessionId,
            contentType: result.meta.contentType,
            statusCode: result.meta.statusCode,
            body: result.output
          });
        } catch (err) {
          return res.status(500).json({ error: err.message || String(err) });
        }
      });
      return middlewares;
    },
    proxy: [
      {
        context: ['/api'],
        target: proxyTarget,
        changeOrigin: true,
        secure: true,
        pathRewrite: { '^/api': '/dev' }
      }
    ]
  },
 module: {
  rules: [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: { presets: ['@babel/preset-react'] }
      }
    },
    {
      test: /\.(png|jpe?g|gif|svg|webp)$/i,
      type: 'asset/resource'
    }
  ]
},
  resolve: {
    extensions: ['.js', '.jsx']
  }
};
