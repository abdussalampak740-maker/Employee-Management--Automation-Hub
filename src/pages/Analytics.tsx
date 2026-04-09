import { Search, Bell, HelpCircle, FileDown, ArrowDown, ArrowUp, Check, Info, Users, X, FileText, Table, Download as DownloadIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useToast } from '../components/Toast';

const kpis = [
  { label: 'Average Cycle Time', value: '4m 12s', change: '14%', trend: 'down', trendColor: 'text-tertiary', bgColor: 'bg-tertiary-fixed/30' },
  { label: 'Throughput Rate', value: '1,284/hr', change: '8%', trend: 'up', trendColor: 'text-tertiary', bgColor: 'bg-tertiary-fixed/30' },
  { label: 'Staff Utilization', value: '82.4%', change: '5%', trend: 'up', trendColor: 'text-error', bgColor: 'bg-error-container/30' },
  { label: 'Success Rate', value: '99.98%', change: 'Stable', trend: 'stable', trendColor: 'text-tertiary', bgColor: 'bg-tertiary-fixed/30' }
];

const topProcesses = [
  { name: 'Invoice Validation', value: 98 },
  { name: 'User Provisioning', value: 84 },
  { name: 'Compliance Audit', value: 72 },
  { name: 'Asset Recovery', value: 61 }
];

const teamWorkload = [
  { name: 'Sarah Jenkins', role: 'Senior Analyst', tasks: 7, capacity: 12, status: 'Healthy', statusColor: 'text-tertiary' },
  { name: 'Marcus Thorne', role: 'Process Specialist', tasks: 9, capacity: 10, status: 'At Capacity', statusColor: 'text-error' },
  { name: 'Elena Rodriguez', role: 'Workflow Lead', tasks: 3, capacity: 15, status: 'Available', statusColor: 'text-tertiary' }
];

export default function Analytics() {
  const { showToast } = useToast();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'custom'>('30d');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsExportModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleExport = () => {
    showToast('Generating report export...', 'info');
    setTimeout(() => {
      showToast('Report exported successfully', 'success');
      setIsExportModalOpen(false);
    }, 2000);
  };

  return (
    <div className="max-w-[1400px] mx-auto p-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Performance Analytics & Reports</h1>
          <p className="text-on-surface-variant max-w-2xl text-lg leading-relaxed">System-wide operational overview and efficiency metrics for current automation workflows.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-surface-container flex p-1 rounded-xl">
            <button 
              onClick={() => {
                setTimeRange('7d');
                showToast('View updated to Last 7 Days', 'info');
              }}
              className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                timeRange === '7d' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Last 7 Days
            </button>
            <button 
              onClick={() => {
                setTimeRange('30d');
                showToast('View updated to Last 30 Days', 'info');
              }}
              className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                timeRange === '30d' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Last 30 Days
            </button>
            <button 
              onClick={() => {
                setTimeRange('custom');
                showToast('Custom date range selected', 'info');
              }}
              className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                timeRange === 'custom' ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Custom
            </button>
          </div>
          <button 
            onClick={() => setIsExportModalOpen(true)}
            className="bg-surface-container-high hover:bg-surface-container-highest text-on-surface-variant p-2 rounded-xl transition-colors"
          >
            <FileDown size={20} />
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {kpis.map((kpi, i) => (
          <div key={kpi.label} className={`bg-surface-container-lowest p-6 rounded-xl border-l-4 ${i === 0 ? 'border-primary' : 'border-transparent'} shadow-sm`}>
            <p className="text-sm font-medium text-on-surface-variant mb-1">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-bold font-headline text-on-surface">{kpi.value}</h3>
              <span className={`${kpi.trendColor} font-bold text-xs flex items-center ${kpi.bgColor} px-2 py-1 rounded-full`}>
                {kpi.trend === 'down' && <ArrowDown size={12} className="mr-1" />}
                {kpi.trend === 'up' && <ArrowUp size={12} className="mr-1" />}
                {kpi.trend === 'stable' && <Check size={12} className="mr-1" />}
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Export Modal */}
      <AnimatePresence>
        {isExportModalOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setIsExportModalOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-container-lowest w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-surface-container flex items-center justify-between">
                <h2 className="text-xl font-bold font-headline text-on-surface">Export Report Configuration</h2>
                <button 
                  onClick={() => setIsExportModalOpen(false)} 
                  className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-8 space-y-8">
                <div>
                  <label className="block text-sm font-bold text-on-surface mb-4">Format Selection</label>
                  <div className="grid grid-cols-3 gap-4">
                    <label className="relative flex flex-col items-center justify-center p-4 border-2 border-primary rounded-xl bg-primary-fixed/10 cursor-pointer">
                      <input type="radio" name="format" defaultChecked className="hidden" />
                      <FileText className="text-primary mb-1" size={24} />
                      <span className="text-sm font-semibold text-primary">PDF</span>
                    </label>
                    <label className="relative flex flex-col items-center justify-center p-4 border-2 border-outline-variant/30 rounded-xl hover:bg-surface-container transition-colors cursor-pointer">
                      <input type="radio" name="format" className="hidden" />
                      <FileText className="text-on-surface-variant mb-1" size={24} />
                      <span className="text-sm font-semibold text-on-surface-variant">CSV</span>
                    </label>
                    <label className="relative flex flex-col items-center justify-center p-4 border-2 border-outline-variant/30 rounded-xl hover:bg-surface-container transition-colors cursor-pointer">
                      <input type="radio" name="format" className="hidden" />
                      <Table className="text-on-surface-variant mb-1" size={24} />
                      <span className="text-sm font-semibold text-on-surface-variant">Excel</span>
                    </label>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1">Start Date</p>
                    <input type="date" defaultValue="2023-10-01" className="w-full bg-surface-container-low border-outline-variant/30 rounded-lg text-sm focus:ring-primary focus:border-primary" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider font-bold text-on-surface-variant mb-1">End Date</p>
                    <input type="date" defaultValue="2023-10-31" className="w-full bg-surface-container-low border-outline-variant/30 rounded-lg text-sm focus:ring-primary focus:border-primary" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-on-surface mb-4">Data Selection</label>
                  <div className="grid grid-cols-2 gap-y-3">
                    {['Efficiency Metrics', 'Team Workload', 'Process Success Rates', 'Raw Logs'].map(item => (
                      <label key={item} className="flex items-center gap-3 cursor-pointer group">
                        <input type="checkbox" defaultChecked={item !== 'Raw Logs'} className="w-5 h-5 rounded border-outline-variant text-primary focus:ring-primary/20" />
                        <span className="text-sm text-on-surface-variant group-hover:text-on-surface transition-colors">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-on-surface mb-4">Destination</label>
                  <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-surface-container transition-colors">
                      <input type="radio" name="dest" defaultChecked className="w-4 h-4 text-primary focus:ring-primary/20 border-outline-variant" />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">Download to Device</span>
                        <span className="text-[10px] text-on-surface-variant">Save report directly to your downloads folder</span>
                      </div>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-surface-container transition-colors">
                      <input type="radio" name="dest" className="w-4 h-4 text-primary focus:ring-primary/20 border-outline-variant" />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold">Email to Manager</span>
                        <span className="text-[10px] text-on-surface-variant">Send encrypted file to alex.mercer@enterprise.com</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="px-8 py-6 bg-surface-container-low flex justify-end gap-4">
                <button onClick={() => setIsExportModalOpen(false)} className="px-6 py-2.5 text-sm font-bold text-on-surface-variant hover:text-on-surface transition-colors">Cancel</button>
                <button 
                  onClick={handleExport}
                  className="px-6 py-2.5 text-sm font-bold bg-primary-gradient text-white rounded-xl shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-95 transition-all"
                >
                  Generate Export
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-12">
        {kpis.map((kpi, i) => (
          <div key={kpi.label} className={`bg-surface-container-lowest p-5 sm:p-6 rounded-xl border-l-4 ${i === 0 ? 'border-primary' : 'border-transparent'} shadow-sm`}>
            <p className="text-xs sm:text-sm font-medium text-on-surface-variant mb-1">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl sm:text-3xl font-bold font-headline text-on-surface">{kpi.value}</h3>
              <span className={`${kpi.trendColor} font-bold text-[10px] sm:text-xs flex items-center ${kpi.bgColor} px-2 py-1 rounded-full`}>
                {kpi.trend === 'down' && <ArrowDown size={12} className="mr-1" />}
                {kpi.trend === 'up' && <ArrowUp size={12} className="mr-1" />}
                {kpi.trend === 'stable' && <Check size={12} className="mr-1" />}
                {kpi.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mb-12">
        <div className="col-span-1 lg:col-span-8 bg-surface-container-lowest p-5 sm:p-8 rounded-xl shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div>
              <h4 className="text-lg font-bold font-headline text-on-surface">Efficiency Trends</h4>
              <p className="text-xs text-on-surface-variant">System processing speeds vs operational targets</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-xs font-medium">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-outline-variant"></div>
                <span className="text-xs font-medium">Target</span>
              </div>
            </div>
          </div>
          
          {/* Chart Mockup */}
          <div className="relative h-[200px] sm:h-[300px] w-full flex items-end justify-between px-2">
            <div className="absolute inset-0 flex flex-col justify-between py-2 border-b border-surface-container">
              {[1, 2, 3, 4].map(i => <div key={i} className="w-full border-t border-surface-container-low"></div>)}
            </div>
            <svg className="absolute bottom-0 left-0 w-full h-[150px] sm:h-[200px]" preserveAspectRatio="none" viewBox="0 0 100 100">
              <defs>
                <linearGradient id="chartGradient" x1="0%" x2="0%" y1="0%" y2="100%">
                  <stop offset="0%" style={{ stopColor: 'rgba(0, 52, 111, 0.2)', stopOpacity: 1 }} />
                  <stop offset="100%" style={{ stopColor: 'rgba(0, 52, 111, 0)', stopOpacity: 0 }} />
                </linearGradient>
              </defs>
              <path d="M0,80 Q10,70 20,75 T40,60 T60,65 T80,45 T100,50 L100,100 L0,100 Z" fill="url(#chartGradient)" />
              <path d="M0,80 Q10,70 20,75 T40,60 T60,65 T80,45 T100,50" fill="none" stroke="#00346f" strokeWidth="2" vectorEffect="non-scaling-stroke" />
            </svg>
            <div className="absolute bottom-[-24px] left-0 w-full flex justify-between px-2">
              <span className="text-[9px] sm:text-[10px] text-on-surface-variant">Day 1</span>
              <span className="text-[9px] sm:text-[10px] text-on-surface-variant">Day 10</span>
              <span className="text-[9px] sm:text-[10px] text-on-surface-variant">Day 20</span>
              <span className="text-[9px] sm:text-[10px] text-on-surface-variant">Today</span>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-4 bg-surface-container-lowest p-5 sm:p-8 rounded-xl shadow-sm">
          <h4 className="text-lg font-bold font-headline text-on-surface mb-6">Top Performing Processes</h4>
          <div className="space-y-6">
            {topProcesses.map(proc => (
              <div key={proc.name}>
                <div className="flex justify-between text-xs mb-2">
                  <span className="font-semibold">{proc.name}</span>
                  <span className="text-on-surface-variant">{proc.value}%</span>
                </div>
                <div className="h-2 bg-surface-container rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full" style={{ width: `${proc.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Team Workload */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
        <div className="px-8 py-6 border-b border-surface-container-low flex items-center justify-between">
          <div>
            <h4 className="text-lg font-bold font-headline text-on-surface">Team Workload Distribution</h4>
            <p className="text-xs text-on-surface-variant">Real-time task allocation and bandwidth</p>
          </div>
          <button 
            onClick={() => {
              showToast('Analyzing workload distribution...', 'info');
              setTimeout(() => showToast('Workload rebalanced across team members', 'success'), 2000);
            }}
            className="text-primary text-sm font-semibold hover:underline"
          >
            Rebalance Workload
          </button>
        </div>
        <div className="divide-y divide-surface-container-low">
          {teamWorkload.map((staff, i) => (
            <div key={i} className="px-8 py-5 flex items-center justify-between hover:bg-surface-container-low transition-colors group">
              <div className="flex items-center gap-4">
                <img src={`https://picsum.photos/seed/staff${i}/40/40`} alt={staff.name} className="w-10 h-10 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div>
                  <p className="text-sm font-bold text-on-surface">{staff.name}</p>
                  <p className="text-xs text-on-surface-variant">{staff.role}</p>
                </div>
              </div>
              <div className="flex-1 max-w-md mx-12">
                <div className="flex justify-between text-[10px] mb-1 uppercase tracking-wider text-on-surface-variant">
                  <span>Tasks</span>
                  <span>Capacity ({staff.capacity})</span>
                </div>
                <div className="flex gap-1 h-1.5">
                  {Array.from({ length: staff.capacity }).map((_, idx) => (
                    <div 
                      key={idx} 
                      className={`flex-1 rounded-full ${idx < staff.tasks ? (staff.status === 'At Capacity' ? 'bg-error' : 'bg-primary') : 'bg-surface-container'}`}
                    ></div>
                  ))}
                </div>
              </div>
              <div className="text-right">
                <span className="text-sm font-bold">{staff.tasks} / {staff.capacity}</span>
                <p className={`text-[10px] font-bold ${staff.statusColor}`}>{staff.status}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
