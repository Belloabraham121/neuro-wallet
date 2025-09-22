import app from '../src/index';
import { VercelRequest, VercelResponse } from '@vercel/node';

// Export handler function for Vercel serverless
export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}