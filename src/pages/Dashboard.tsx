import { LayoutDashboard, Activity, CheckCircle2, Zap, ArrowUp, ArrowDown, Check, X, FileText, Terminal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';
import { useToast } from '../components/Toast';

interface Metric {
  icon: any;
  label: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative';
  color: string;
  bgColor: string;
  isSpecial?: boolean;
}

interface ActivityItem {
  icon: any;
  title: string;
  desc: string;
  time: string;
  color: string;
  bgColor: string;
}

const iconMap: Record<string, any> = {
  LayoutDashboard,
  Activity,
  CheckCircle2,
  Zap
};

interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: string;
}

export default function Dashboard() {
  const { showToast } = useToast();
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [activities, setActivities] = useState<ActivityItem[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'daily' | 'weekly'>('weekly');
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isLogsModalOpen, setIsLogsModalOpen] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsDetailsModalOpen(false);
        setIsLogsModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const chartData = {
    daily: [
      { label: 'Inv', fullLabel: 'Inventory', value: 15 },
      { label: 'Fin', fullLabel: 'Finance', value: 30 },
      { label: 'HR', fullLabel: 'HR Sync', value: 45, active: true },
      { label: 'Log', fullLabel: 'Logistics', value: 20 },
      { label: 'Leg', fullLabel: 'Legal', value: 35 },
      { label: 'IT', fullLabel: 'IT Support', value: 10 }
    ],
    weekly: [
      { label: 'Inv', fullLabel: 'Inventory', value: 60 },
      { label: 'Fin', fullLabel: 'Finance', value: 85 },
      { label: 'HR', fullLabel: 'HR Sync', value: 95, active: true },
      { label: 'Log', fullLabel: 'Logistics', value: 70 },
      { label: 'Leg', fullLabel: 'Legal', value: 80 },
      { label: 'IT', fullLabel: 'IT Support', value: 50 }
    ]
  };

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const [metricsRes, activitiesRes, employeesRes] = await Promise.all([
          fetch('/api/dashboard/metrics'),
          fetch('/api/dashboard/activities'),
          fetch('/api/employees')
        ]);
        
        const metricsData = await metricsRes.json();
        const activitiesData = await activitiesRes.json();
        const employeesData = await employeesRes.json();

        setMetrics(metricsData.map((m: any) => ({ ...m, icon: iconMap[m.icon] || LayoutDashboard })));
        setActivities(activitiesData.map((a: any) => ({ ...a, icon: iconMap[a.icon] || Activity })));
        setEmployees(employeesData.slice(0, 5));
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  return (
    <div className="p-8 max-w-[1400px] mx-auto">
      {/* Header */}
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface font-headline">Operational Overview</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Global automation performance for the current fiscal period.</p>
        </div>
        <div className="flex gap-3">
          <div className="bg-surface-container-lowest px-4 py-2 rounded-xl flex items-center gap-2 border border-outline-variant/10">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">System Healthy</span>
          </div>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
        {metrics.map((metric, i) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className={`bg-surface-container-lowest p-5 sm:p-6 rounded-xl transition-all hover:scale-[1.02] ${metric.isSpecial ? 'border-2 border-primary/5' : ''}`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                <metric.icon size={20} className={metric.isSpecial ? 'text-white' : metric.color} />
              </div>
              <span className={`text-[10px] sm:text-xs font-bold ${metric.changeType === 'positive' ? 'text-tertiary' : 'text-error'}`}>
                {metric.change}
              </span>
            </div>
            <h3 className="text-on-surface-variant text-[9px] sm:text-[10px] font-bold uppercase tracking-widest mb-1">{metric.label}</h3>
            <p className={`text-2xl sm:text-3xl font-headline font-extrabold ${metric.isSpecial ? 'text-primary' : 'text-on-surface'}`}>
              {metric.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-lowest p-5 sm:p-8 rounded-xl overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 sm:mb-10">
              <div>
                <h3 className="text-lg font-bold text-on-surface">Process Distribution</h3>
                <p className="text-on-surface-variant text-sm">Real-time status of all orchestrated workflows</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => {
                    setTimeRange('daily');
                    showToast('Switched to Daily view', 'info');
                  }}
                  className={`text-xs font-bold py-1 px-3 rounded-full transition-all ${
                    timeRange === 'daily' ? 'bg-primary text-white shadow-sm' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                  }`}
                >
                  Daily
                </button>
                <button 
                  onClick={() => {
                    setTimeRange('weekly');
                    showToast('Switched to Weekly view', 'info');
                  }}
                  className={`text-xs font-bold py-1 px-3 rounded-full transition-all ${
                    timeRange === 'weekly' ? 'bg-primary text-white shadow-sm' : 'bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest'
                  }`}
                >
                  Weekly
                </button>
              </div>
            </div>

            {/* Chart Mockup */}
            <div className="flex items-end justify-between h-48 sm:h-64 gap-2 sm:gap-4 px-1 sm:px-2">
              {chartData[timeRange].map((item) => (
                <div key={item.fullLabel} className="flex flex-col items-center flex-1 group">
                  <motion.div 
                    initial={{ height: 0 }}
                    animate={{ height: `${item.value}%` }}
                    transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                    className={`w-full rounded-t-lg transition-all relative ${item.active ? 'bg-primary-gradient' : 'bg-primary/10 group-hover:bg-primary/20'}`}
                  >
                    <div className={`absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-bold text-primary transition-opacity ${item.active ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                      {item.value}%
                    </div>
                  </motion.div>
                  <span className={`mt-3 sm:mt-4 text-[8px] sm:text-[10px] font-bold uppercase tracking-tighter ${item.active ? 'text-primary' : 'text-on-surface-variant'}`}>
                    <span className="hidden sm:inline">{item.fullLabel}</span>
                    <span className="sm:hidden">{item.label}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Featured Card */}
          <div className="bg-primary p-1 rounded-xl">
            <div className="bg-surface-container-lowest p-6 rounded-[calc(0.75rem-3px)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <div className="relative w-16 h-16 rounded-full border-4 border-tertiary-fixed flex items-center justify-center">
                  <span className="text-xs font-bold text-primary">88%</span>
                </div>
                <div>
                  <h4 className="text-lg font-bold text-on-surface">Legacy System Migration</h4>
                  <p className="text-sm text-on-surface-variant">Step 4 of 6: Data Integrity Validation in progress...</p>
                </div>
              </div>
              <button 
                onClick={() => {
                  setIsDetailsModalOpen(true);
                  showToast('Legacy System Migration details loaded', 'info');
                }}
                className="bg-surface-container-high hover:bg-surface-container-highest px-6 py-2 rounded-lg text-sm font-bold transition-colors w-full sm:w-auto"
              >
                View Details
              </button>
            </div>
          </div>

          {/* Team Overview */}
          <div className="bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/10">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-on-surface">Team Overview</h3>
                <p className="text-on-surface-variant text-sm">Active members and their status</p>
              </div>
              <button className="text-primary text-xs font-bold hover:underline">View All</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {employees.map((emp) => (
                <div key={emp.id} className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-outline-variant/5 hover:border-primary/20 transition-all">
                  <img src={emp.avatar} alt={emp.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-on-surface truncate">{emp.name}</p>
                    <p className="text-[10px] text-on-surface-variant truncate">{emp.role}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${emp.status === 'Active' ? 'bg-tertiary' : 'bg-error'}`} title={emp.status}></div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="bg-surface-container-lowest rounded-xl flex flex-col overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-surface-container-low">
            <h3 className="text-lg font-bold text-on-surface">Recent Activity</h3>
            <p className="text-on-surface-variant text-sm">System events and audit logs</p>
          </div>
          <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 sm:space-y-8">
            {activities.map((activity, i) => (
              <div key={i} className="flex gap-3 sm:gap-4">
                <div className={`flex-shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full ${activity.bgColor} flex items-center justify-center`}>
                  <activity.icon className={`${activity.color} text-lg sm:text-xl`} size={window.innerWidth < 640 ? 16 : 20} />
                </div>
                <div>
                  <p className="text-sm font-bold text-on-surface leading-tight">{activity.title}</p>
                  <p className="text-xs text-on-surface-variant mt-0.5">{activity.desc}</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase mt-2 tracking-wide">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="p-5 sm:p-6 mt-auto">
            <button 
              onClick={() => {
                setIsLogsModalOpen(true);
                showToast('Full system logs are being retrieved...', 'info');
              }}
              className="w-full text-center py-3 border border-outline-variant/30 rounded-xl text-xs font-bold text-on-surface-variant hover:bg-surface-container-low transition-colors"
            >
              View Full System Log
            </button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      <AnimatePresence>
        {isDetailsModalOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setIsDetailsModalOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-container-lowest w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-surface-container flex items-center justify-between bg-primary text-white">
                <div className="flex items-center gap-3">
                  <FileText size={24} />
                  <h2 className="text-xl font-bold font-headline">Legacy System Migration Details</h2>
                </div>
                <button 
                  onClick={() => setIsDetailsModalOpen(false)} 
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="p-4 bg-surface-container-low rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Current Progress</p>
                    <p className="text-2xl font-bold text-primary">Step 4 of 6</p>
                  </div>
                  <div className="p-4 bg-surface-container-low rounded-xl">
                    <p className="text-[10px] uppercase font-bold text-on-surface-variant mb-1">Data Integrity</p>
                    <p className="text-2xl font-bold text-tertiary">99.98%</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold text-on-surface">Migration Roadmap</h4>
                  {[
                    { step: 'Schema Mapping', status: 'Completed', color: 'text-tertiary' },
                    { step: 'Initial Extraction', status: 'Completed', color: 'text-tertiary' },
                    { step: 'Transformation Layer', status: 'Completed', color: 'text-tertiary' },
                    { step: 'Data Integrity Validation', status: 'In Progress', color: 'text-primary' },
                    { step: 'Final Load', status: 'Pending', color: 'text-on-surface-variant' },
                    { step: 'System Cutover', status: 'Pending', color: 'text-on-surface-variant' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-outline-variant/10 last:border-0">
                      <span className="text-sm font-medium text-on-surface">{s.step}</span>
                      <span className={`text-xs font-bold ${s.color}`}>{s.status}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-8 py-6 bg-surface-container-low flex justify-end">
                <button 
                  onClick={() => setIsDetailsModalOpen(false)}
                  className="px-8 py-2.5 bg-primary text-white rounded-xl font-bold shadow-lg hover:opacity-90 transition-all"
                >
                  Close Details
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Logs Modal */}
      <AnimatePresence>
        {isLogsModalOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setIsLogsModalOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-container-lowest w-full max-w-3xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-surface-container flex items-center justify-between bg-slate-900 text-white">
                <div className="flex items-center gap-3">
                  <Terminal size={24} />
                  <h2 className="text-xl font-bold font-headline">System Audit Logs</h2>
                </div>
                <button 
                  onClick={() => setIsLogsModalOpen(false)} 
                  className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-0 bg-slate-950 font-mono text-xs text-slate-300 h-[400px] overflow-y-auto">
                <div className="p-6 space-y-2">
                  {[
                    '[08:30:12] INFO: Initializing workflow engine...',
                    '[08:30:15] SUCCESS: Connection established to SAP Instance A',
                    '[08:31:02] DEBUG: Fetching pending invoices for Q3 logistics',
                    '[08:31:45] WARN: High latency detected in regional hub API',
                    '[08:32:10] INFO: Triggering auto-assignment for task TSK-882',
                    '[08:32:12] SUCCESS: Task TSK-882 assigned to Sarah Miller',
                    '[08:35:00] INFO: Starting scheduled data sync for HR systems',
                    '[08:40:22] INFO: Legacy migration Step 4: Data Integrity Validation started',
                    '[08:45:10] DEBUG: Validating checksums for batch #4492-B',
                    '[08:50:00] INFO: System health check: All services operational',
                    '[09:00:05] INFO: New form submission detected: Hire Info Form',
                    '[09:00:10] INFO: Initializing Employee Onboarding Flow',
                    '[09:05:22] SUCCESS: Manager approval request sent to Alex Sterling',
                  ].map((log, i) => (
                    <div key={i} className="flex gap-4">
                      <span className="text-slate-600 shrink-0">{i + 1}</span>
                      <span className={log.includes('SUCCESS') ? 'text-emerald-400' : log.includes('WARN') ? 'text-amber-400' : log.includes('DEBUG') ? 'text-sky-400' : ''}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="px-8 py-6 bg-surface-container-low flex justify-between items-center">
                <p className="text-xs text-on-surface-variant">Showing latest 13 events</p>
                <div className="flex gap-3">
                  <button className="px-6 py-2 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors">Download Logs</button>
                  <button 
                    onClick={() => setIsLogsModalOpen(false)}
                    className="px-8 py-2.5 bg-slate-900 text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all"
                  >
                    Close Console
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
