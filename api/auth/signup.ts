// api/auth/signup.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { users } from '../_lib/db';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password, name, role } = req.body;
  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: "User already exists" });
  }

  const newUser = { id: String(users.length + 1), email, password, name, role: role || 'employee' };
  // Note: In serverless, this push only lasts for the current execution context
  const { password: _, ...userWithoutPassword } = newUser;
  return res.status(200).json({ user: userWithoutPassword, token: 'mock-jwt-token' });
}
