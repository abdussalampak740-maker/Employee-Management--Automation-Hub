import type { VercelRequest, VercelResponse } from '@vercel/node';
import { attendanceData, leaveRequests } from './_lib/db.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    res.status(200).json({
      attendance: attendanceData,
      leaveRequests: leaveRequests
    });
  } catch (error) {
    console.error('Error fetching attendance data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}
