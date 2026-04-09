// api/_lib/db.ts
export const users = [
  { id: '1', email: 'manager@automation.io', password: 'password123', name: 'Alex Mercer', role: 'manager' },
  { id: '2', email: 'employee@automation.io', password: 'password123', name: 'Sarah Miller', role: 'employee' }
];

export const metrics = [
  { label: 'Total Active Processes', value: '1,284', change: '+12% vs LW', changeType: 'positive', color: 'text-primary', bgColor: 'bg-primary/5' },
  { label: 'Pending Tasks', value: '42', change: '4 Critical', changeType: 'negative', color: 'text-secondary', bgColor: 'bg-secondary/5' },
  { label: 'Completed Today', value: '8,902', change: 'Peak performance', changeType: 'positive', color: 'text-tertiary', bgColor: 'bg-tertiary/5' },
  { label: 'Automation Efficiency', value: '94.8%', change: 'Optimal Range', changeType: 'positive', color: 'text-primary', bgColor: 'bg-primary-gradient text-white', isSpecial: true }
];

export const activities = [
  { title: 'Payroll Disbursement Complete', desc: 'Automated batch processed for 428 employees.', time: '2 minutes ago', color: 'text-tertiary', bgColor: 'bg-tertiary/10' },
  { title: 'API Connection Timeout', desc: 'Salesforce connector failed to refresh token.', time: '14 minutes ago', color: 'text-error', bgColor: 'bg-error/10' },
  { title: 'New User Provisioned', desc: 'Sarah Jenkins added to Marketing Automation.', time: '1 hour ago', color: 'text-primary', bgColor: 'bg-primary/10' },
  { title: 'Routine System Maintenance', desc: 'Database indexing completed successfully.', time: '3 hours ago', color: 'text-on-surface-variant', bgColor: 'bg-surface-container-high' }
];

export const tasks = [
  { id: 'TSK-001', name: 'Quarterly Audit Automation', project: 'Financial Systems', assignee: 'Sarah Chen', priority: 'Urgent', status: 'In Progress', dueDate: 'Oct 24, 2023' },
  { id: 'TSK-002', name: 'Encryption Protocol Update', project: 'Core Infrastructure', assignee: 'Marcus Wright', priority: 'Medium', status: 'To Do', dueDate: 'Oct 28, 2023' },
  { id: 'TSK-003', name: 'CRM Integration Bridge', project: 'Sales Ops', assignee: 'Elena Rodriguez', priority: 'High', status: 'Done', dueDate: 'Oct 20, 2023' },
  { id: 'TSK-004', name: 'Notification Service Refactor', project: 'Core Infrastructure', assignee: 'Jordan Smith', priority: 'Low', status: 'To Do', dueDate: 'Nov 02, 2023' }
];
