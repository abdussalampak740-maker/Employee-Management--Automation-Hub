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

  // Mock Data for Employees
  app.get("/api/employees", (req, res) => {
    res.json([
      { id: 'EMP-001', name: 'Alex Mercer', email: 'manager@automation.io', role: 'Manager', department: 'Operations', status: 'Active', joinedDate: 'Jan 12, 2021', avatar: 'https://picsum.photos/seed/alex/100/100' },
      { id: 'EMP-002', name: 'Sarah Miller', email: 'employee@automation.io', role: 'Senior Analyst', department: 'Finance', status: 'Active', joinedDate: 'Mar 05, 2022', avatar: 'https://picsum.photos/seed/sarah/100/100' },
      { id: 'EMP-003', name: 'Marcus Wright', email: 'marcus.w@automation.io', role: 'DevOps Engineer', department: 'IT Infrastructure', status: 'Active', joinedDate: 'Jun 15, 2021', avatar: 'https://picsum.photos/seed/marcus/100/100' },
      { id: 'EMP-004', name: 'Elena Rodriguez', email: 'elena.r@automation.io', role: 'Workflow Lead', department: 'Operations', status: 'Active', joinedDate: 'Sep 20, 2020', avatar: 'https://picsum.photos/seed/elena/100/100' },
      { id: 'EMP-005', name: 'Jordan Smith', email: 'jordan.s@automation.io', role: 'Junior Developer', department: 'IT Infrastructure', status: 'On Leave', joinedDate: 'Jan 10, 2023', avatar: 'https://picsum.photos/seed/jordan/100/100' },
      { id: 'EMP-006', name: 'Sarah Chen', email: 'sarah.c@automation.io', role: 'Compliance Officer', department: 'Legal', status: 'Active', joinedDate: 'Nov 30, 2021', avatar: 'https://picsum.photos/seed/chen/100/100' }
    ]);
  });

  // Mock Data for Performance
  app.get("/api/performance", (req, res) => {
    const { employeeId } = req.query;
    const performanceData = [
      {
        employeeId: 'EMP-002',
        goals: [
          { id: 'G-001', title: 'Automate Q4 Financial Reporting', status: 'In Progress', progress: 65 },
          { id: 'G-002', title: 'Reduce Manual Data Entry by 40%', status: 'Completed', progress: 100 },
          { id: 'G-003', title: 'Learn Advanced SQL', status: 'Not Started', progress: 0 }
        ],
        reviews: [
          { id: 'R-001', date: 'Dec 15, 2023', reviewer: 'Alex Mercer', rating: 4.5, comment: 'Excellent progress on automation initiatives. Sarah has shown great initiative.' },
          { id: 'R-002', date: 'Jun 10, 2023', reviewer: 'Alex Mercer', rating: 4.2, comment: 'Solid performance. Needs to focus more on documentation.' }
        ]
      },
      {
        employeeId: 'EMP-003',
        goals: [
          { id: 'G-004', title: 'Optimize CI/CD Pipeline', status: 'In Progress', progress: 80 },
          { id: 'G-005', title: 'Implement Zero Trust Security', status: 'In Progress', progress: 30 }
        ],
        reviews: [
          { id: 'R-003', date: 'Nov 20, 2023', reviewer: 'Alex Mercer', rating: 4.8, comment: 'Marcus is a key asset. His work on the infrastructure has been transformative.' }
        ]
      }
    ];

    if (employeeId) {
      const data = performanceData.find(p => p.employeeId === employeeId);
      if (!data) return res.status(404).json({ error: 'Performance data not found' });
      return res.json(data);
    }
    res.json(performanceData);
  });

  // Mock Data for Attendance
  app.get("/api/attendance", (req, res) => {
    res.json({
      attendance: [
        { id: 'ATT-001', employeeId: 'EMP-001', date: '2023-10-23', clockIn: '08:55 AM', clockOut: '05:30 PM', status: 'Present' },
        { id: 'ATT-002', employeeId: 'EMP-002', date: '2023-10-23', clockIn: '09:02 AM', clockOut: '06:15 PM', status: 'Present' },
        { id: 'ATT-003', employeeId: 'EMP-003', date: '2023-10-23', clockIn: '08:45 AM', clockOut: '05:00 PM', status: 'Present' },
        { id: 'ATT-004', employeeId: 'EMP-004', date: '2023-10-23', clockIn: '09:15 AM', clockOut: '05:45 PM', status: 'Present' },
        { id: 'ATT-005', employeeId: 'EMP-005', date: '2023-10-23', clockIn: '-', clockOut: '-', status: 'On Leave' }
      ],
      leaveRequests: [
        { id: 'LR-001', employeeId: 'EMP-005', type: 'Sick Leave', startDate: '2023-10-23', endDate: '2023-10-25', status: 'Approved', reason: 'Flu symptoms' },
        { id: 'LR-002', employeeId: 'EMP-002', type: 'Vacation', startDate: '2023-11-10', endDate: '2023-11-17', status: 'Pending', reason: 'Family trip' },
        { id: 'LR-003', employeeId: 'EMP-004', type: 'Personal', startDate: '2023-10-27', endDate: '2023-10-27', status: 'Approved', reason: 'Doctor appointment' }
      ]
    });
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
