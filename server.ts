import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Mock User Store
  const users = [
    { id: '1', email: 'manager@automation.io', password: 'password123', name: 'Alex Mercer', role: 'manager' },
    { id: '2', email: 'employee@automation.io', password: 'password123', name: 'Sarah Miller', role: 'employee' }
  ];

  // API Routes
  app.post("/api/auth/login", (req, res) => {
    try {
      const { email, password } = req.body || {};
      if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
      }

      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        res.json({ user: userWithoutPassword, token: 'mock-jwt-token' });
      } else {
        res.status(401).json({ error: "Invalid email or password" });
      }
    } catch (error) {
      console.error('Login API error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.post("/api/auth/signup", (req, res) => {
    try {
      const { email, password, name, role } = req.body || {};
      if (!email || !password || !name) {
        return res.status(400).json({ error: "Email, password, and name are required" });
      }

      if (users.find(u => u.email === email)) {
        return res.status(400).json({ error: "User already exists" });
      }
      const newUser = { id: String(users.length + 1), email, password, name, role: role || 'employee' };
      users.push(newUser);
      const { password: _, ...userWithoutPassword } = newUser;
      res.json({ user: userWithoutPassword, token: 'mock-jwt-token' });
    } catch (error) {
      console.error('Signup API error:', error);
      res.status(500).json({ error: "Internal server error" });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Mock Data for Dashboard
  app.get("/api/dashboard/metrics", (req, res) => {
    res.json([
      { label: 'Total Active Processes', value: '1,284', change: '+12% vs LW', changeType: 'positive', color: 'text-primary', bgColor: 'bg-primary/5' },
      { label: 'Pending Tasks', value: '42', change: '4 Critical', changeType: 'negative', color: 'text-secondary', bgColor: 'bg-secondary/5' },
      { label: 'Completed Today', value: '8,902', change: 'Peak performance', changeType: 'positive', color: 'text-tertiary', bgColor: 'bg-tertiary/5' },
      { label: 'Automation Efficiency', value: '94.8%', change: 'Optimal Range', changeType: 'positive', color: 'text-primary', bgColor: 'bg-primary-gradient text-white', isSpecial: true }
    ]);
  });

  app.get("/api/dashboard/activities", (req, res) => {
    res.json([
      { title: 'Payroll Disbursement Complete', desc: 'Automated batch processed for 428 employees.', time: '2 minutes ago', color: 'text-tertiary', bgColor: 'bg-tertiary/10' },
      { title: 'API Connection Timeout', desc: 'Salesforce connector failed to refresh token.', time: '14 minutes ago', color: 'text-error', bgColor: 'bg-error/10' },
      { title: 'New User Provisioned', desc: 'Sarah Jenkins added to Marketing Automation.', time: '1 hour ago', color: 'text-primary', bgColor: 'bg-primary/10' },
      { title: 'Routine System Maintenance', desc: 'Database indexing completed successfully.', time: '3 hours ago', color: 'text-on-surface-variant', bgColor: 'bg-surface-container-high' }
    ]);
  });

  // Mock Data for Tasks
  app.get("/api/tasks", (req, res) => {
    res.json([
      { id: 'TSK-001', name: 'Quarterly Audit Automation', project: 'Financial Systems', assignee: 'Sarah Chen', priority: 'Urgent', status: 'In Progress', dueDate: 'Oct 24, 2023' },
      { id: 'TSK-002', name: 'Encryption Protocol Update', project: 'Core Infrastructure', assignee: 'Marcus Wright', priority: 'Medium', status: 'To Do', dueDate: 'Oct 28, 2023' },
      { id: 'TSK-003', name: 'CRM Integration Bridge', project: 'Sales Ops', assignee: 'Elena Rodriguez', priority: 'High', status: 'Done', dueDate: 'Oct 20, 2023' },
      { id: 'TSK-004', name: 'Notification Service Refactor', project: 'Core Infrastructure', assignee: 'Jordan Smith', priority: 'Low', status: 'To Do', dueDate: 'Nov 02, 2023' }
    ]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
