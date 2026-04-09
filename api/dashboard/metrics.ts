// api/dashboard/metrics.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { metrics } from '../_lib/db.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json(metrics);
}
