// api/auth/login.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { users } from '../_lib/db.js';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return res.status(200).json({ user: userWithoutPassword, token: 'mock-jwt-token' });
  } else {
    return res.status(401).json({ error: "Invalid email or password" });
  }
}
