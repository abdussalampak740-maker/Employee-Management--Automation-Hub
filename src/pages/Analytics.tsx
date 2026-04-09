import { Search, Bell, HelpCircle, FileDown, ArrowDown, ArrowUp, Check, Info, Users, X, FileText, Table, Download as DownloadIcon, Sparkles, TrendingUp, Zap, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useToast } from '../components/Toast';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  BarChart,
  Bar,
  Cell,
  PieChart,
  Pie
} from 'recharts';

const kpis = [
  { label: 'Average Cycle Time', value: '4m 12s', change: '14%', trend: 'down', trendColor: 'text-tertiary', bgColor: 'bg-tertiary-fixed/30' },
  { label: 'Throughput Rate', value: '1,284/hr', change: '8%', trend: 'up', trendColor: 'text-tertiary', bgColor: 'bg-tertiary-fixed/30' },
  { label: 'Staff Utilization', value: '82.4%', change: '5%', trend: 'up', trendColor: 'text-error', bgColor: 'bg-error-container/30' },
  { label: 'Success Rate', value: '99.98%', change: 'Stable', trend: 'stable', trendColor: 'text-tertiary', bgColor: 'bg-tertiary-fixed/30' }
];

const efficiencyData = [
  { day: 'Mon', actual: 65, target: 70 },
  { day: 'Tue', actual: 72, target: 70 },
  { day: 'Wed', actual: 85, target: 75 },
  { day: 'Thu', actual: 78, target: 75 },
  { day: 'Fri', actual: 90, target: 80 },
  { day: 'Sat', actual: 82, target: 80 },
  { day: 'Sun', actual: 88, target: 80 },
];

const departmentData = [
  { name: 'Operations', value: 45, color: '#00346f' },
  { name: 'Finance', value: 25, color: '#0061a4' },
  { name: 'Legal', value: 15, color: '#00a3ff' },
  { name: 'IT', value: 15, color: '#00d1ff' },
];

const aiInsights = [
  { 
    title: 'Efficiency Peak Detected', 
    desc: 'Automation efficiency reached a 30-day high on Friday, correlated with the new Payroll workflow deployment.',
    type: 'positive',
    icon: Zap
  },
  { 
    title: 'Resource Bottleneck', 
    desc: 'IT Infrastructure team is consistently at 95% capacity. Consider redistributing non-critical tasks.',
    type: 'warning',
    icon: AlertTriangle
  },
  { 
    title: 'Success Rate Stability', 
    desc: 'Error rates have dropped by 0.02% since the last system update. Validation protocols are performing optimally.',
    type: 'positive',
    icon: Check
  }
];

export default function Analytics() {
  const { showToast } = useToast();
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | 'custom'>('30d');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleExport = () => {
    showToast('Generating report export...', 'info');
    setTimeout(() => {
      showToast('Report exported successfully', 'success');
      setIsExportModalOpen(false);
    }, 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto p-6 lg:p-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl lg:text-4xl font-extrabold font-headline tracking-tight text-on-surface mb-2">Advanced Analytics</h1>
          <p className="text-on-surface-variant max-w-2xl text-base lg:text-lg leading-relaxed">Deep dive into operational efficiency, team performance, and AI-driven insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="bg-surface-container flex p-1 rounded-xl">
            {(['7d', '30d', 'custom'] as const).map((range) => (
              <button 
                key={range}
                onClick={() => {
                  setTimeRange(range);
                  showToast(`View updated to ${range === 'custom' ? 'Custom Range' : `Last ${range}`}`, 'info');
                }}
                className={`px-4 py-2 text-sm font-medium transition-all rounded-lg ${
                  timeRange === range ? 'bg-surface-container-lowest text-primary shadow-sm' : 'text-on-surface-variant hover:text-on-surface'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : 'Custom'}
              </button>
            ))}
          </div>
          <button 
            onClick={() => setIsExportModalOpen(true)}
            className="bg-primary text-on-primary px-4 py-2 rounded-xl flex items-center gap-2 font-bold text-sm hover:opacity-90 transition-opacity shadow-lg shadow-primary/20"
          >
            <FileDown size={18} />
            Export
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpis.map((kpi, i) => (
          <motion.div 
            key={kpi.label} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-surface-container-lowest p-6 rounded-2xl border border-outline shadow-sm hover:shadow-md transition-shadow"
          >
            <p className="text-xs font-bold text-on-surface-variant uppercase tracking-widest mb-2">{kpi.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-3xl font-black font-headline text-on-surface">{kpi.value}</h3>
              <span className={`${kpi.trendColor} font-bold text-[10px] flex items-center ${kpi.bgColor} px-2.5 py-1 rounded-full border border-current/10`}>
                {kpi.trend === 'down' && <ArrowDown size={12} className="mr-1" />}
                {kpi.trend === 'up' && <ArrowUp size={12} className="mr-1" />}
                {kpi.trend === 'stable' && <Check size={12} className="mr-1" />}
                {kpi.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Efficiency Chart */}
        <div className="lg:col-span-2 bg-surface-container-lowest p-6 lg:p-8 rounded-2xl border border-outline shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-lg font-bold font-headline text-on-surface">Efficiency Trends</h4>
              <p className="text-xs text-on-surface-variant">System processing speeds vs operational targets</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Actual</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-tertiary"></div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant">Target</span>
              </div>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={efficiencyData}>
                <defs>
                  <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00346f" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#00346f" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="day" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
                  dy={10}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
                />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="actual" 
                  stroke="#00346f" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorActual)" 
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#00a3ff" 
                  strokeWidth={2} 
                  strokeDasharray="5 5" 
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insights Panel */}
        <div className="bg-primary-gradient p-1 rounded-2xl shadow-xl shadow-primary/20">
          <div className="bg-surface-container-lowest h-full rounded-[calc(1rem-4px)] p-6 lg:p-8">
            <div className="flex items-center gap-2 mb-8">
              <Sparkles className="text-primary w-5 h-5" />
              <h4 className="text-lg font-bold font-headline text-on-surface">AI Insights</h4>
            </div>
            <div className="space-y-6">
              {aiInsights.map((insight, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.2 }}
                  className="flex gap-4"
                >
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                    insight.type === 'positive' ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'
                  }`}>
                    <insight.icon size={20} />
                  </div>
                  <div>
                    <h5 className="text-sm font-bold text-on-surface mb-1">{insight.title}</h5>
                    <p className="text-xs text-on-surface-variant leading-relaxed">{insight.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button className="w-full mt-10 py-3 bg-primary/5 hover:bg-primary/10 text-primary rounded-xl text-xs font-bold transition-all border border-primary/20">
              Generate Detailed AI Audit
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Departmental Breakdown */}
        <div className="bg-surface-container-lowest p-6 lg:p-8 rounded-2xl border border-outline shadow-sm">
          <h4 className="text-lg font-bold font-headline text-on-surface mb-8">Departmental Automation Load</h4>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-full md:w-1/2 h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={departmentData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {departmentData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="w-full md:w-1/2 space-y-4">
              {departmentData.map((dept) => (
                <div key={dept.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: dept.color }}></div>
                    <span className="text-sm font-medium text-on-surface">{dept.name}</span>
                  </div>
                  <span className="text-sm font-bold text-on-surface-variant">{dept.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Success Rates Bar Chart */}
        <div className="bg-surface-container-lowest p-6 lg:p-8 rounded-2xl border border-outline shadow-sm">
          <h4 className="text-lg font-bold font-headline text-on-surface mb-8">Process Success Rates</h4>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={[
                { name: 'Invoice', rate: 98 },
                { name: 'Provision', rate: 84 },
                { name: 'Audit', rate: 72 },
                { name: 'Recovery', rate: 61 },
                { name: 'Payroll', rate: 95 },
              ]}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 700, fill: '#64748b' }} 
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="rate" radius={[4, 4, 0, 0]}>
                  {[98, 84, 72, 61, 95].map((rate, index) => (
                    <Cell key={`cell-${index}`} fill={rate > 90 ? '#00346f' : rate > 70 ? '#0061a4' : '#00a3ff'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-6 flex justify-between text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
            <span>Critical Threshold: 75%</span>
            <span className="text-error">2 Processes Below Target</span>
          </div>
        </div>
      </div>

      {/* Export Modal (Keep existing) */}
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
    </div>
  );
}
