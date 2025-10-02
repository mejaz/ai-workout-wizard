export default function handler(req, res) {
  return res.json({
    hasOpenAIKey: !!process.env.OPENAI_API_KEY,
    keyLength: process.env.OPENAI_API_KEY ? process.env.OPENAI_API_KEY.length : 0,
    nodeEnv: process.env.NODE_ENV,
    allEnvKeys: Object.keys(process.env).filter(key => key.includes('OPENAI')),
    vercelEnv: process.env.VERCEL_ENV,
  });
}