// api/tasks.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { tasks } from './_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  return res.status(200).json(tasks);
}
