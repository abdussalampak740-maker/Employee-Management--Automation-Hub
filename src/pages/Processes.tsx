import { ChevronRight, Rocket, Play, Bolt, MoreVertical, Trash2, Clock, UserSearch, Mail, MessageSquare, Plus, Info, Settings, X, Eye, FileText, Send, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState, useEffect } from 'react';
import { useToast } from '../components/Toast';

interface Step {
  id: string;
  number: string;
  name: string;
  type: 'Human Task' | 'Automated';
  desc: string;
  sla?: string;
  assignee?: string;
  integrations?: string[];
  bgColor: string;
  color: string;
}

export default function Processes() {
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState<'properties' | 'conditions' | 'dataMap'>('properties');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isAddStepOpen, setIsAddStepOpen] = useState(false);
  const [selectedStepId, setSelectedStepId] = useState<string | null>('1');

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsPreviewOpen(false);
        setIsAddStepOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);
  
  const [steps, setSteps] = useState<Step[]>([
    {
      id: '1',
      number: '01',
      name: 'Manager Approval',
      type: 'Human Task',
      desc: 'System routes submission to Department Head for initial budget and seat allocation approval.',
      sla: '24 Hours',
      assignee: 'Dynamic',
      bgColor: 'bg-tertiary-fixed',
      color: 'text-tertiary'
    },
    {
      id: '2',
      number: '02',
      name: 'Notification Sent',
      type: 'Automated',
      desc: 'Sends welcome email to employee and IT provisioning alert via Slack integration.',
      integrations: ['Gmail', 'Slack'],
      bgColor: 'bg-primary-fixed-dim',
      color: 'text-primary'
    }
  ]);

  const [configName, setConfigName] = useState('Manager Approval');

  const handleDeploy = () => {
    showToast('Process deployment initiated...', 'info');
    setTimeout(() => {
      showToast('Process deployed successfully to production', 'success');
    }, 2000);
  };

  const handleDeleteStep = (id: string) => {
    setSteps(steps.filter(s => s.id !== id));
    showToast(`Step removed from flow`, 'error');
    if (selectedStepId === id) setSelectedStepId(null);
  };

  const handleAddStep = (type: 'Human' | 'Auto') => {
    const newId = Math.random().toString(36).substr(2, 9);
    const newStep: Step = type === 'Human' ? {
      id: newId,
      number: `0${steps.length + 1}`,
      name: 'New Human Task',
      type: 'Human Task',
      desc: 'Assign a task to a specific user or role for manual intervention.',
      sla: '48 Hours',
      assignee: 'Unassigned',
      bgColor: 'bg-secondary-fixed',
      color: 'text-secondary'
    } : {
      id: newId,
      number: `0${steps.length + 1}`,
      name: 'New Automation',
      type: 'Automated',
      desc: 'Execute a script or trigger an external API integration.',
      integrations: ['Webhooks'],
      bgColor: 'bg-primary-fixed',
      color: 'text-primary'
    };
    setSteps([...steps, newStep]);
    setIsAddStepOpen(false);
    showToast('New step added to flow', 'success');
  };

  const handleSaveStepConfig = () => {
    if (!selectedStepId) return;
    setSteps(steps.map(s => s.id === selectedStepId ? { ...s, name: configName } : s));
    showToast('Step configuration saved', 'success');
  };

  const selectedStep = steps.find(s => s.id === selectedStepId);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Breadcrumbs & Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div>
          <nav className="flex items-center gap-2 text-xs text-on-surface-variant mb-3">
            <span>Processes</span>
            <ChevronRight size={12} />
            <span className="text-on-surface font-medium">Employee Onboarding Flow</span>
          </nav>
          <h2 className="text-3xl font-extrabold tracking-tight text-primary font-headline">Employee Onboarding Flow</h2>
          <p className="text-on-surface-variant mt-1 text-sm">Last edited 2 hours ago by Alex Sterling</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => {
              setIsPreviewOpen(true);
              showToast('Process preview mode enabled', 'info');
            }}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold text-secondary bg-surface-container-high hover:bg-surface-container-highest transition-colors flex items-center gap-2"
          >
            <Eye size={16} />
            Preview
          </button>
          <button 
            onClick={handleDeploy}
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-primary-gradient text-white shadow-lg hover:opacity-90 transition-all flex items-center gap-2"
          >
            <Rocket size={16} fill="currentColor" />
            Deploy Process
          </button>
        </div>
      </div>

      {/* Editor Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Canvas Area */}
        <div className="col-span-1 lg:col-span-8 space-y-12">
          {/* Trigger Point */}
          <div className="relative">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-md bg-surface-container-lowest p-6 rounded-xl border border-outline-variant/15 flex items-center gap-5 relative z-10 shadow-sm">
                <div className="h-12 w-12 rounded-full bg-primary-fixed flex items-center justify-center text-primary">
                  <Bolt size={24} fill="currentColor" />
                </div>
                <div>
                  <h4 className="font-bold text-on-surface">Trigger: Form Submitted</h4>
                  <p className="text-sm text-on-surface-variant">New Hire Info Form</p>
                </div>
                <button 
                  onClick={() => showToast('Opening trigger configuration...', 'info')}
                  className="ml-auto text-on-surface-variant hover:text-primary transition-colors"
                >
                  <MoreVertical size={20} />
                </button>
              </div>
              <div className="h-12 w-0.5 bg-gradient-to-b from-primary/30 to-transparent"></div>
            </div>
          </div>

          {/* Flow Steps */}
          <div className="space-y-0 relative">
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-slate-200 -translate-x-1/2 -z-0"></div>
            
            {steps.map((step, index) => (
              <div key={step.id} className="relative z-10 flex flex-col items-center mb-12">
                <motion.div 
                  whileHover={{ y: -2 }}
                  onClick={() => {
                    setSelectedStepId(step.id);
                    setConfigName(step.name);
                  }}
                  className={`w-full max-w-2xl p-1 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer ${selectedStepId === step.id ? 'bg-primary ring-2 ring-primary ring-offset-2' : 'bg-surface-container-lowest'}`}
                >
                  <div className="bg-white rounded-lg p-6 flex items-start gap-6">
                    <div className={`h-10 w-10 shrink-0 rounded-lg ${step.bgColor} ${step.color} flex items-center justify-center`}>
                      <span className="text-sm font-bold">{step.number}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="text-lg font-bold text-on-surface">{step.name}</h5>
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${step.type === 'Human Task' ? 'bg-secondary-container text-on-secondary-container' : 'bg-tertiary-container text-on-tertiary-container'}`}>
                          {step.type}
                        </span>
                      </div>
                      <p className="text-sm text-on-surface-variant leading-relaxed">{step.desc}</p>
                      
                      {step.type === 'Human Task' ? (
                        <div className="mt-4 flex items-center gap-4 text-xs text-on-surface-variant font-medium">
                          <div className="flex items-center gap-1.5">
                            <Clock size={14} />
                            SLA: {step.sla}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <UserSearch size={14} />
                            Assigned: {step.assignee}
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 flex items-center gap-3">
                          {step.integrations?.map(int => (
                            <div key={int} className="px-3 py-1 bg-surface-container-low rounded-full flex items-center gap-2 text-[11px] font-semibold text-secondary">
                              {int === 'Gmail' ? <Mail size={12} /> : <MessageSquare size={12} />} {int}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteStep(step.id);
                      }}
                      className="text-outline-variant hover:text-error transition-colors p-1"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
                <div className="h-12 w-0.5 bg-slate-200"></div>
              </div>
            ))}

            {/* Add New Step */}
            <div className="relative z-10 flex flex-col items-center">
              <button 
                onClick={() => setIsAddStepOpen(true)}
                className="group flex items-center justify-center h-12 w-12 rounded-full border-2 border-dashed border-outline-variant text-on-surface-variant hover:border-primary hover:text-primary transition-all"
              >
                <Plus size={24} />
              </button>
              <p className="mt-3 text-xs font-bold text-on-surface-variant uppercase tracking-widest">Add New Step</p>
            </div>
          </div>
        </div>

        {/* Config Panel */}
        <div className="col-span-1 lg:col-span-4 lg:sticky lg:top-24 space-y-6">
          <div className="bg-surface-container-lowest rounded-xl p-8 shadow-sm border border-outline-variant/10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-on-surface">Step Configuration</h3>
              <Settings className="text-on-surface-variant" size={20} />
            </div>
            
            <div className="flex border-b border-outline-variant/20 mb-8">
              <button 
                onClick={() => setActiveTab('properties')}
                className={`px-4 py-2 text-sm font-bold border-b-2 transition-all ${activeTab === 'properties' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
              >
                Properties
              </button>
              <button 
                onClick={() => setActiveTab('conditions')}
                className={`px-4 py-2 text-sm font-bold border-b-2 transition-all ${activeTab === 'conditions' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
              >
                Conditions
              </button>
              <button 
                onClick={() => setActiveTab('dataMap')}
                className={`px-4 py-2 text-sm font-bold border-b-2 transition-all ${activeTab === 'dataMap' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'}`}
              >
                Data Map
              </button>
            </div>

            <div className="space-y-6">
              {selectedStep ? (
                <>
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Step Name</label>
                    <input 
                      type="text" 
                      value={configName}
                      onChange={(e) => setConfigName(e.target.value)}
                      className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 font-medium"
                    />
                  </div>
                  {selectedStep.type === 'Human Task' && (
                    <div>
                      <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Assignee Logic</label>
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 rounded-xl bg-surface-container-low border border-transparent hover:border-primary/20 cursor-pointer transition-colors">
                          <input type="radio" name="assign" defaultChecked className="text-primary focus:ring-primary h-4 w-4" />
                          <div>
                            <p className="text-sm font-bold text-on-surface">Direct Manager</p>
                            <p className="text-[10px] text-on-surface-variant">Auto-fetched from HR system</p>
                          </div>
                        </label>
                        <label className="flex items-center gap-3 p-3 rounded-xl hover:bg-surface-container-low border border-transparent cursor-pointer transition-colors">
                          <input type="radio" name="assign" className="text-primary focus:ring-primary h-4 w-4" />
                          <div>
                            <p className="text-sm font-bold text-on-surface">Specific User</p>
                            <p className="text-[10px] text-on-surface-variant">Search static employee</p>
                          </div>
                        </label>
                      </div>
                    </div>
                  )}
                  <div>
                    <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-wider mb-2">Completion Action</label>
                    <select className="w-full bg-surface-container-high border-none rounded-xl px-4 py-3 text-on-surface focus:ring-2 focus:ring-primary/20 font-medium appearance-none">
                      <option>Continue to Next Step</option>
                      <option>Conditional Branch</option>
                      <option>End Process</option>
                    </select>
                  </div>
                  <div className="pt-4">
                    <button 
                      onClick={handleSaveStepConfig}
                      className="w-full py-4 rounded-xl font-bold bg-primary text-white hover:opacity-90 shadow-md transition-all"
                    >
                      Save Step Configuration
                    </button>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center">
                  <Settings size={48} className="mx-auto text-outline-variant mb-4 opacity-20" />
                  <p className="text-sm text-on-surface-variant">Select a step on the canvas to configure its properties.</p>
                </div>
              )}
            </div>
          </div>

          {/* Insights Card */}
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-secondary/5 to-primary/5 p-6 border border-white/20 backdrop-blur-sm">
            <div className="relative z-10">
              <h4 className="text-sm font-bold text-primary mb-4 flex items-center gap-2">
                <Info size={16} />
                Efficiency Projection
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-on-surface-variant font-medium">Est. Duration</span>
                  <span className="text-xs font-bold text-on-surface">~1.2 Days</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-2/3"></div>
                </div>
                <p className="text-[11px] text-on-surface-variant leading-relaxed">
                  This workflow is <span className="font-bold text-tertiary">32% faster</span> than the current manual spreadsheet method.
                </p>
              </div>
            </div>
            <div className="absolute inset-0 -z-10 opacity-30">
              <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #00346f 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Add Step Modal */}
      <AnimatePresence>
        {isAddStepOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4"
            onClick={() => setIsAddStepOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-container-lowest w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="px-8 py-6 border-b border-surface-container flex items-center justify-between">
                <h2 className="text-xl font-bold font-headline">Add New Flow Step</h2>
                <button 
                  onClick={() => setIsAddStepOpen(false)} 
                  className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface transition-all"
                  aria-label="Close modal"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-8 grid grid-cols-1 gap-4">
                <button 
                  onClick={() => handleAddStep('Human')}
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-outline-variant hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="h-12 w-12 rounded-lg bg-secondary-container text-on-secondary-container flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <UserSearch size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">Human Task</p>
                    <p className="text-xs text-on-surface-variant">Approval, review, or manual data entry</p>
                  </div>
                </button>
                <button 
                  onClick={() => handleAddStep('Auto')}
                  className="flex items-center gap-4 p-4 rounded-xl border-2 border-outline-variant hover:border-primary hover:bg-primary/5 transition-all text-left group"
                >
                  <div className="h-12 w-12 rounded-lg bg-tertiary-container text-on-tertiary-container flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                    <Rocket size={24} />
                  </div>
                  <div>
                    <p className="font-bold text-on-surface">Automated Action</p>
                    <p className="text-xs text-on-surface-variant">API call, email notification, or script</p>
                  </div>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Preview Overlay */}
      <AnimatePresence>
        {isPreviewOpen && (
          <div className="fixed inset-0 z-[200] bg-surface-container-lowest overflow-y-auto">
            <div className="max-w-4xl mx-auto p-8 sm:p-12">
              <div className="flex items-center justify-between mb-12">
                <div>
                  <h2 className="text-3xl font-black font-headline text-primary">Process Preview</h2>
                  <p className="text-on-surface-variant mt-1">Live simulation of the Employee Onboarding Flow</p>
                </div>
                <button 
                  onClick={() => setIsPreviewOpen(false)}
                  className="px-6 py-2 bg-surface-container-high text-on-surface font-bold rounded-xl hover:bg-surface-container-highest transition-colors flex items-center gap-2"
                >
                  <X size={18} />
                  Exit Preview
                </button>
              </div>

              <div className="space-y-8">
                <div className="p-8 bg-surface-container-low rounded-2xl border-2 border-primary/10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-10 w-10 rounded-full bg-primary text-white flex items-center justify-center">
                      <Play size={20} fill="currentColor" />
                    </div>
                    <h3 className="text-xl font-bold">Simulation Started</h3>
                  </div>
                  <div className="space-y-6">
                    {steps.map((step, i) => (
                      <motion.div 
                        key={step.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.5 }}
                        className="flex gap-6"
                      >
                        <div className="flex flex-col items-center">
                          <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${i === 0 ? 'bg-primary text-white' : 'bg-surface-container-high text-on-surface-variant'}`}>
                            {i + 1}
                          </div>
                          {i < steps.length - 1 && <div className="w-0.5 h-full bg-surface-container-high my-2"></div>}
                        </div>
                        <div className="pb-8">
                          <h4 className="font-bold text-on-surface">{step.name}</h4>
                          <p className="text-sm text-on-surface-variant mt-1">{step.desc}</p>
                          <div className="mt-4 p-4 bg-white rounded-xl border border-outline-variant/10 shadow-sm flex items-center justify-between">
                            <span className="text-xs font-bold text-primary uppercase tracking-widest">Status: Ready</span>
                            <button className="text-xs font-bold text-secondary hover:text-primary transition-colors">View Details</button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: steps.length * 0.5 }}
                      className="flex gap-6"
                    >
                      <div className="h-8 w-8 rounded-full bg-tertiary text-white flex items-center justify-center">
                        <Check size={18} />
                      </div>
                      <div>
                        <h4 className="font-bold text-on-surface">Process Completed</h4>
                        <p className="text-sm text-on-surface-variant mt-1">All steps executed successfully.</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
