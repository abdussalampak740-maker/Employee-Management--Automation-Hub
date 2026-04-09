import { ChevronRight, UserPlus, CheckCircle2, FileText, MessageSquare, Paperclip, AtSign, Database, Lock, Verified, Mail } from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { useToast } from '../components/Toast';

const logs = [
  {
    title: 'Task Created',
    desc: 'System triggered by Invoice Ingest Workflow',
    time: 'Oct 12, 09:00 AM',
    status: 'completed'
  },
  {
    title: 'Auto-assigned to Sarah Miller',
    desc: 'Based on "Logistics Dispute" expertise tag',
    time: 'Oct 12, 09:05 AM',
    status: 'completed'
  },
  {
    title: 'Email Notification Sent',
    desc: 'Vendor informed of active investigation',
    time: 'Oct 12, 09:06 AM',
    status: 'completed'
  },
  {
    title: 'External Doc Ingested',
    desc: 'Carrier manifest #88921-A received via SFTP',
    time: 'Oct 12, 11:20 AM',
    status: 'active'
  }
];

export default function TaskDetail() {
  const { id } = useParams();
  const { showToast } = useToast();

  const handleComplete = () => {
    showToast(`Task ${id || 'TSK-882'} marked as complete`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Context Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-sm font-medium text-secondary mb-2">
            <Link to="/processes" className="hover:text-primary">Processes</Link>
            <ChevronRight size={14} />
            <Link to="/tasks" className="hover:text-primary">Invoice Automation</Link>
            <ChevronRight size={14} />
            <span className="text-primary">{id || 'TSK-882'}</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-on-surface font-headline">Review Disputed Invoice: #INV-2024-001</h1>
          <p className="text-on-surface-variant max-w-2xl text-lg">Validate vendor claim for shipping discrepancies in the Q3 logistics report.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => showToast('Reassignment panel opened', 'info')}
            className="px-6 py-2.5 font-semibold text-secondary hover:bg-surface-container-high rounded-xl transition-colors flex items-center gap-2"
          >
            <UserPlus size={18} />
            Reassign
          </button>
          <button 
            onClick={handleComplete}
            className="px-8 py-2.5 bg-primary-gradient text-white rounded-xl font-bold shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-2"
          >
            <CheckCircle2 size={18} />
            Mark as Complete
          </button>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-8">
        {/* Primary Column */}
        <div className="col-span-12 lg:col-span-8 space-y-8">
          <section className="bg-surface-container-lowest p-8 rounded-xl ring-1 ring-outline-variant/15 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-on-surface flex items-center gap-2">
                <FileText className="text-primary" size={20} />
                Detailed Specification
              </h2>
              <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed text-xs font-bold rounded-full uppercase tracking-tighter">Priority: High</span>
            </div>
            <div className="prose prose-slate max-w-none text-on-surface-variant leading-relaxed">
              <p>The vendor, <strong>Global Logistics Partners</strong>, has flagged a discrepancy of $1,240.00 in the final shipping statement. According to the internal manifest (attached below), the weight was logged at 450kg, whereas the invoice states 520kg.</p>
              <ul className="list-disc pl-5 space-y-2 mt-4">
                <li>Verify weight from warehouse scan logs</li>
                <li>Cross-reference with carrier API documentation</li>
                <li>Approve or reject the delta payment</li>
              </ul>
            </div>
          </section>

          {/* Discussion */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-on-surface px-2">Discussion & History</h2>
            <div className="space-y-6">
              <div className="flex gap-4 group">
                <img src="https://picsum.photos/seed/user1/40/40" alt="John Doe" className="w-10 h-10 rounded-full border-2 border-surface shadow-sm" referrerPolicy="no-referrer" />
                <div className="flex-1 bg-surface-container-low p-5 rounded-xl group-hover:bg-surface-container-highest transition-colors">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-on-surface">John Doe <span className="text-sm font-normal text-on-surface-variant ml-2">Audit Lead</span></span>
                    <span className="text-xs text-on-surface-variant">2 hours ago</span>
                  </div>
                  <p className="text-on-surface-variant text-sm">I checked the warehouse logs, and they match the 450kg manifest. This looks like a vendor entry error. Sarah, can you reconfirm the carrier API data?</p>
                </div>
              </div>
              <div className="flex gap-4 group">
                <img src="https://picsum.photos/seed/user2/40/40" alt="Sarah Miller" className="w-10 h-10 rounded-full border-2 border-surface shadow-sm" referrerPolicy="no-referrer" />
                <div className="flex-1 bg-surface-container-lowest p-5 rounded-xl border border-outline-variant/15 shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-on-surface">Sarah Miller <span className="text-sm font-normal text-on-surface-variant ml-2">Automation Specialist</span></span>
                    <span className="text-xs text-on-surface-variant">45 mins ago</span>
                  </div>
                  <p className="text-on-surface-variant text-sm">Querying the API now. I'll post the raw JSON as soon as it returns. Preliminary look suggests a rounding difference at the regional hub.</p>
                </div>
              </div>
            </div>

            {/* Comment Input */}
            <div className="mt-8 bg-surface-container-highest p-4 rounded-xl">
              <textarea className="w-full bg-surface-container-lowest border-none rounded-xl p-4 text-sm focus:ring-2 focus:ring-primary/20 min-h-[100px] resize-none" placeholder="Write a comment..."></textarea>
              <div className="flex justify-between items-center mt-3">
                <div className="flex gap-2">
                  <button 
                    onClick={() => showToast('File attachment dialog opened', 'info')}
                    className="p-2 text-secondary hover:bg-surface-container-low rounded-lg transition-colors"
                  >
                    <Paperclip size={20} />
                  </button>
                  <button 
                    onClick={() => showToast('Mention user list opened', 'info')}
                    className="p-2 text-secondary hover:bg-surface-container-low rounded-lg transition-colors"
                  >
                    <AtSign size={20} />
                  </button>
                </div>
                <button 
                  onClick={() => showToast('Comment posted successfully', 'success')}
                  className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold shadow-sm hover:opacity-90"
                >
                  Post Comment
                </button>
              </div>
            </div>
          </section>
        </div>

        {/* Sidebar Column */}
        <div className="col-span-12 lg:col-span-4 space-y-8">
          <section className="bg-primary text-white rounded-xl overflow-hidden shadow-2xl relative p-6">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <MessageSquare className="text-primary-container" size={20} />
                <h2 className="text-lg font-bold tracking-tight">Automation Log</h2>
              </div>
              <div className="space-y-6">
                {logs.map((log, i) => (
                  <div key={i} className="relative pl-8">
                    <div className={`absolute left-0 top-1 w-2 h-2 rounded-full ${log.status === 'active' ? 'bg-tertiary-fixed shadow-[0_0_8px_#9ef3d6]' : 'bg-primary-container shadow-[0_0_8px_#9bbdff]'}`}></div>
                    {i < logs.length - 1 && <div className="absolute left-[3px] top-4 w-[2px] h-10 bg-white/10"></div>}
                    <p className="text-sm font-semibold">{log.title}</p>
                    <p className="text-xs text-primary-container/80 mt-1">{log.desc}</p>
                    <span className="text-[10px] opacity-50 uppercase block mt-1">{log.time}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => showToast('Full trace logs are being retrieved...', 'info')}
                className="w-full mt-8 py-2 border border-white/20 rounded-lg text-xs font-bold hover:bg-white/10 transition-colors uppercase tracking-widest"
              >
                View Full Trace Log
              </button>
            </div>
          </section>

          <section className="bg-surface-container-low p-6 rounded-xl space-y-6">
            <h3 className="text-sm font-black uppercase tracking-widest text-secondary/60">Task Properties</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/10">
                <span className="text-sm text-on-surface-variant font-medium">Due Date</span>
                <span className="text-sm font-bold text-on-surface">Oct 15, 2024</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/10">
                <span className="text-sm text-on-surface-variant font-medium">Time Logged</span>
                <span className="text-sm font-bold text-on-surface">4h 22m</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-outline-variant/10">
                <span className="text-sm text-on-surface-variant font-medium">Data Origin</span>
                <span className="text-sm font-bold text-primary flex items-center gap-1">
                  <Database size={14} />
                  SAP Instance A
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-on-surface-variant font-medium">Security Tier</span>
                <span className="flex items-center gap-1 px-2 py-0.5 bg-on-secondary-fixed text-on-secondary-fixed-variant rounded text-[10px] font-bold">
                  <Lock size={10} fill="currentColor" />
                  RESTRICTED
                </span>
              </div>
            </div>
          </section>

          <div className="p-6 bg-surface-container-high rounded-xl text-center">
            <p className="text-sm text-on-surface-variant mb-4 font-medium">Need more information from the vendor?</p>
            <button 
              onClick={() => showToast('Clarification request sent to vendor', 'success')}
              className="w-full py-3 bg-surface-container-lowest text-primary border border-primary/20 rounded-xl font-bold shadow-sm hover:bg-primary hover:text-white transition-all flex items-center justify-center gap-2"
            >
              <Mail size={18} />
              Request Clarification
            </button>
          </div>
        </div>
      </div>

      {/* Footer Ribbon */}
      <div className="mt-12 w-full bg-surface-container-low rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 border border-outline-variant/10">
        <div className="flex items-center gap-6">
          <div className="text-center px-4">
            <p className="text-[10px] font-bold uppercase text-on-surface-variant mb-1">Status</p>
            <div className="flex items-center gap-2 text-primary font-bold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              In Progress
            </div>
          </div>
          <div className="w-px h-10 bg-outline-variant/20 hidden md:block"></div>
          <div className="text-center px-4">
            <p className="text-[10px] font-bold uppercase text-on-surface-variant mb-1">SLA Health</p>
            <div className="flex items-center gap-2 text-tertiary font-bold">
              <Verified size={14} />
              On Track
            </div>
          </div>
        </div>
        <div className="flex -space-x-3 overflow-hidden">
          {[1, 2, 3].map((i) => (
            <img key={i} src={`https://picsum.photos/seed/watcher${i}/40/40`} alt="Watcher" className="inline-block h-10 w-10 rounded-full ring-4 ring-surface-container-low" referrerPolicy="no-referrer" />
          ))}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-container-highest text-[10px] font-bold ring-4 ring-surface-container-low">+12</div>
        </div>
      </div>
    </div>
  );
}
