import { Filter, Download, Search, Shield, Mail, MoreVertical, ChevronLeft, ChevronRight, Sparkles, Zap, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useToast } from '../components/Toast';

interface Task {
  id: string;
  name: string;
  project: string;
  assignee: string;
  avatar?: string | null;
  initials?: string;
  priority: string;
  status: string;
  dueDate: string;
  icon?: any;
  bgColor?: string;
  color?: string;
}

export default function Tasks() {
  const { showToast } = useToast();
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeFilter, setActiveFilter] = useState('All Tasks');
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 4;

  useEffect(() => {
    const loadTasksData = async () => {
      try {
        const res = await fetch('/api/tasks');
        const data = await res.json();
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTasksData();
  }, []);

  const filteredTasks = tasks.filter(task => {
    if (activeFilter === 'All Tasks') return true;
    if (activeFilter === 'My Tasks') return task.assignee === 'Alex Mercer';
    if (activeFilter === 'Urgent') return task.priority === 'Urgent';
    if (activeFilter === 'Completed') return task.status === 'Done';
    return true;
  });

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice((currentPage - 1) * tasksPerPage, currentPage * tasksPerPage);

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }
  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-extrabold tracking-tight text-on-surface mb-2 font-headline">Operational Tasks</h2>
          <p className="text-secondary font-medium">Manage and monitor team execution metrics.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => showToast('Filters panel opened', 'info')}
            className="px-5 py-2.5 bg-surface-container-lowest text-on-surface text-sm font-semibold rounded-xl flex items-center gap-2 hover:bg-surface-container-high transition-colors shadow-sm"
          >
            <Filter size={18} />
            Filters
          </button>
          <button 
            onClick={() => {
              showToast('Exporting task list...', 'info');
              setTimeout(() => showToast('Task list exported', 'success'), 1500);
            }}
            className="px-5 py-2.5 bg-surface-container-lowest text-on-surface text-sm font-semibold rounded-xl flex items-center gap-2 hover:bg-surface-container-high transition-colors shadow-sm"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="flex items-center gap-3 mb-8">
        {[
          { label: 'All Tasks' },
          { label: 'My Tasks' },
          { label: 'Urgent', icon: <Zap size={14} className="text-error" fill="currentColor" /> },
          { label: 'Completed' }
        ].map((filter) => (
          <button 
            key={filter.label}
            onClick={() => {
              setActiveFilter(filter.label);
              showToast(`Filtered by ${filter.label}`, 'info');
            }}
            className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all flex items-center gap-1 ${
              activeFilter === filter.label ? 'bg-primary text-white shadow-md shadow-primary/10' : 'bg-surface-container-low text-secondary hover:bg-surface-container-high'
            }`}
          >
            {filter.icon}
            {filter.label}
          </button>
        ))}
      </div>

      {/* Task List (Responsive) */}
      <div className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm border border-outline-variant/10">
        {/* Desktop Table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary">Task Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary">Assigned To</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary">Priority</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary">Status</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary">Due Date</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-widest text-secondary"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {paginatedTasks.map((task) => (
                <tr key={task.id} className="hover:bg-surface-container-low/50 transition-colors group">
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-lg ${task.bgColor || 'bg-primary/10'} flex items-center justify-center ${task.color || 'text-primary'}`}>
                        <Search size={20} />
                      </div>
                      <div>
                        <Link to={`/tasks/${task.id}`} className="font-semibold text-on-surface text-sm hover:text-primary transition-colors">
                          {task.name}
                        </Link>
                        <p className="text-xs text-on-surface-variant">Project: {task.project}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      {task.avatar ? (
                        <img src={task.avatar} alt={task.assignee} className="h-7 w-7 rounded-full border border-outline-variant/20" referrerPolicy="no-referrer" />
                      ) : (
                        <div className="h-7 w-7 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600 border border-outline-variant/20">
                          {task.initials || task.assignee.charAt(0)}
                        </div>
                      )}
                      <span className="text-sm font-medium text-secondary">{task.assignee}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${
                      task.priority === 'Urgent' ? 'bg-error-container text-on-error-container' :
                      task.priority === 'High' ? 'bg-tertiary-fixed text-on-tertiary-fixed' :
                      task.priority === 'Medium' ? 'bg-secondary-container text-on-secondary-container' :
                      'bg-surface-container-high text-on-surface-variant'
                    }`}>
                      {task.priority}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${
                        task.status === 'In Progress' ? 'bg-blue-500' :
                        task.status === 'Done' ? 'bg-tertiary' :
                        'bg-slate-300'
                      }`}></div>
                      <span className="text-sm font-medium text-on-surface">{task.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm font-medium text-secondary">{task.dueDate}</td>
                  <td className="px-6 py-5 text-right">
                    <button 
                      onClick={() => showToast(`Options for ${task.id} opened`, 'info')}
                      className="text-slate-300 hover:text-primary transition-colors"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card List */}
        <div className="lg:hidden divide-y divide-slate-50">
          {paginatedTasks.map((task) => (
            <div key={task.id} className="p-4 space-y-4">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg ${task.bgColor || 'bg-primary/10'} flex items-center justify-center ${task.color || 'text-primary'}`}>
                    <Search size={20} />
                  </div>
                  <div>
                    <Link to={`/tasks/${task.id}`} className="font-bold text-on-surface text-sm hover:text-primary transition-colors block">
                      {task.name}
                    </Link>
                    <p className="text-[10px] text-on-surface-variant uppercase font-bold tracking-wider">{task.project}</p>
                  </div>
                </div>
                <button 
                  onClick={() => showToast(`Options for ${task.id} opened`, 'info')}
                  className="text-slate-300"
                >
                  <MoreVertical size={18} />
                </button>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  {task.avatar ? (
                    <img src={task.avatar} alt={task.assignee} className="h-6 w-6 rounded-full" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="h-6 w-6 rounded-full bg-slate-200 flex items-center justify-center text-[8px] font-bold text-slate-600">
                      {task.initials || task.assignee.charAt(0)}
                    </div>
                  )}
                  <span className="text-xs font-medium text-secondary">{task.assignee}</span>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                  task.priority === 'Urgent' ? 'bg-error-container text-on-error-container' :
                  task.priority === 'High' ? 'bg-tertiary-fixed text-on-tertiary-fixed' :
                  'bg-surface-container-high text-on-surface-variant'
                }`}>
                  {task.priority}
                </span>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-slate-50">
                <div className="flex items-center gap-2">
                  <div className={`h-1.5 w-1.5 rounded-full ${
                    task.status === 'In Progress' ? 'bg-blue-500' :
                    task.status === 'Done' ? 'bg-tertiary' :
                    'bg-slate-300'
                  }`}></div>
                  <span className="text-[10px] font-bold text-on-surface uppercase">{task.status}</span>
                </div>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">{task.dueDate}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="px-6 py-4 bg-surface-container-low/30 border-t border-slate-100 flex justify-between items-center">
          <p className="text-xs font-semibold text-secondary">Showing {paginatedTasks.length} of {filteredTasks.length} tasks</p>
          <div className="flex items-center gap-1">
            <button 
              onClick={() => {
                if (currentPage > 1) {
                  setCurrentPage(currentPage - 1);
                  showToast('Navigating to previous page', 'info');
                }
              }}
              className="p-2 text-slate-400 hover:text-primary disabled:opacity-30" 
              disabled={currentPage === 1}
            >
              <ChevronLeft size={18} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button 
                key={i}
                onClick={() => {
                  setCurrentPage(i + 1);
                  showToast(`Navigating to page ${i + 1}`, 'info');
                }}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  currentPage === i + 1 ? 'bg-primary text-white' : 'text-secondary hover:bg-surface-container-high'
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              onClick={() => {
                if (currentPage < totalPages) {
                  setCurrentPage(currentPage + 1);
                  showToast('Navigating to next page', 'info');
                }
              }}
              className="p-2 text-slate-400 hover:text-primary disabled:opacity-30"
              disabled={currentPage === totalPages}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Insight Cards */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-primary p-6 rounded-xl text-white flex flex-col justify-between h-40 shadow-xl shadow-primary/10">
          <div className="flex justify-between items-start">
            <Sparkles size={20} className="opacity-80" />
            <span className="text-xs font-bold px-2 py-1 bg-white/20 rounded-full">AI Insight</span>
          </div>
          <div>
            <p className="text-xs opacity-80 mb-1">Estimated Completion</p>
            <h4 className="text-lg font-bold">2.4 Days Ahead</h4>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between h-40 shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-start">
            <Zap size={20} className="text-tertiary" fill="currentColor" />
          </div>
          <div>
            <p className="text-xs text-secondary mb-1">Efficiency Score</p>
            <h4 className="text-2xl font-black text-on-surface">94.8%</h4>
            <div className="w-full bg-surface-container-low h-1.5 mt-3 rounded-full overflow-hidden">
              <div className="bg-tertiary h-full w-[94%]"></div>
            </div>
          </div>
        </div>
        <div className="bg-surface-container-lowest p-6 rounded-xl flex flex-col justify-between h-40 shadow-sm border border-outline-variant/10">
          <div className="flex justify-between items-start">
            <Users size={20} className="text-secondary" />
          </div>
          <div>
            <p className="text-xs text-secondary mb-1">Staff Allocation</p>
            <div className="flex -space-x-2 mt-2">
              {[1, 2, 3].map((i) => (
                <img 
                  key={i}
                  src={`https://picsum.photos/seed/user${i}/32/32`} 
                  alt="Avatar" 
                  className="h-8 w-8 rounded-full border-2 border-white"
                  referrerPolicy="no-referrer"
                />
              ))}
              <div className="h-8 w-8 rounded-full bg-surface-container-high border-2 border-white flex items-center justify-center text-[10px] font-bold text-secondary">+12</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
