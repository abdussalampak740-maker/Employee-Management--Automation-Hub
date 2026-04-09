import type { VercelRequest, VercelResponse } from '@vercel/node';
import { performanceData } from './_lib/db.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { employeeId } = req.query;

  try {
    if (employeeId) {
      const data = performanceData.find(p => p.employeeId === employeeId);
      if (!data) {
        return res.status(404).json({ error: 'Performance data not found' });
      }
      return res.status(200).json(data);
    }
    res.status(200).json(performanceData);
  } catch (error) {
    console.error('Error fetching performance data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
