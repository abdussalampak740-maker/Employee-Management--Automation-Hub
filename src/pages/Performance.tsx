import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useToast } from '../components/Toast';
import { 
  TrendingUp, 
  Target, 
  Award, 
  MessageSquare, 
  ChevronRight, 
  Star, 
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Search
} from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  status: string;
  progress: number;
}

interface Review {
  id: string;
  date: string;
  reviewer: string;
  rating: number;
  comment: string;
}

interface PerformanceRecord {
  employeeId: string;
  goals: Goal[];
  reviews: Review[];
}

interface Employee {
  id: string;
  name: string;
  role: string;
  avatar: string;
  department: string;
}

const Performance: React.FC = () => {
  const { showToast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [performance, setPerformance] = useState<PerformanceRecord | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        setEmployees(data);
        if (data.length > 0) {
          setSelectedEmployee(data[1]); // Default to Sarah Miller for demo
        }
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    if (selectedEmployee) {
      const fetchPerformance = async () => {
        try {
          const response = await fetch(`/api/performance?employeeId=${selectedEmployee.id}`);
          if (response.ok) {
            const data = await response.json();
            setPerformance(data);
          } else {
            setPerformance(null);
          }
        } catch (error) {
          console.error('Error fetching performance:', error);
          setPerformance(null);
        }
      };

      fetchPerformance();
    }
  }, [selectedEmployee]);

  const filteredEmployees = employees.filter(emp => 
    emp.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
      {/* Sidebar: Employee List */}
      <div className="lg:col-span-1 space-y-4">
        <div className="bg-surface-container-low border border-outline rounded-2xl p-4">
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
            <input
              type="text"
              placeholder="Search team..."
              className="w-full pl-9 pr-4 py-2 bg-surface-container border border-outline rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="space-y-1 max-h-[calc(100vh-300px)] overflow-y-auto pr-1">
            {filteredEmployees.map((emp) => (
              <button
                key={emp.id}
                onClick={() => setSelectedEmployee(emp)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all text-left ${
                  selectedEmployee?.id === emp.id 
                    ? 'bg-primary text-on-primary shadow-md' 
                    : 'hover:bg-surface-container text-on-surface'
                }`}
              >
                <img src={emp.avatar} alt={emp.name} className="w-8 h-8 rounded-full object-cover" referrerPolicy="no-referrer" />
                <div className="min-w-0">
                  <p className="text-sm font-bold truncate">{emp.name}</p>
                  <p className={`text-[10px] truncate ${selectedEmployee?.id === emp.id ? 'text-on-primary/80' : 'text-on-surface-variant'}`}>
                    {emp.role}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="bg-primary-gradient p-6 rounded-2xl text-white shadow-lg shadow-primary/20">
          <Award className="w-8 h-8 mb-4 text-tertiary-fixed" />
          <h3 className="font-bold text-lg leading-tight">Quarterly Performance Review</h3>
          <p className="text-white/80 text-xs mt-2">Next review cycle starts in 12 days. Ensure all goals are updated.</p>
          <button 
            onClick={() => showToast('Review scheduling opened', 'info')}
            className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition-all"
          >
            Schedule Reviews
          </button>
        </div>
      </div>

      {/* Main Content: Performance Details */}
      <div className="lg:col-span-3 space-y-6">
        {selectedEmployee ? (
          <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img 
                  src={selectedEmployee.avatar} 
                  alt={selectedEmployee.name} 
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-primary/20"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h1 className="text-2xl font-bold text-on-surface tracking-tight">{selectedEmployee.name}</h1>
                  <p className="text-on-surface-variant font-medium">{selectedEmployee.role} • {selectedEmployee.department}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => showToast(`Feedback form for ${selectedEmployee.name} opened`, 'info')}
                  className="flex items-center gap-2 px-4 py-2 border border-outline rounded-xl hover:bg-surface-container transition-colors text-sm font-medium"
                >
                  <MessageSquare className="w-4 h-4" />
                  Send Feedback
                </button>
                <button 
                  onClick={() => showToast(`Add goal for ${selectedEmployee.name}`, 'info')}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl hover:opacity-90 transition-opacity shadow-sm text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  Add Goal
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface-container-low border border-outline rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-on-surface">Overall Rating</h3>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-on-surface">4.5</span>
                  <span className="text-on-surface-variant font-bold mb-1">/ 5.0</span>
                </div>
                <div className="flex gap-1 mt-2">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= 4 ? 'fill-tertiary text-tertiary' : 'text-outline'}`} />
                  ))}
                </div>
                <p className="text-xs text-on-surface-variant mt-4 font-medium">Top 15% of the department</p>
              </div>

              <div className="bg-surface-container-low border border-outline rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-tertiary/10 rounded-lg text-tertiary">
                    <Target className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-on-surface">Goal Completion</h3>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-on-surface">82%</span>
                </div>
                <div className="w-full bg-surface-container h-2 rounded-full mt-3 overflow-hidden">
                  <div className="bg-tertiary h-full rounded-full" style={{ width: '82%' }} />
                </div>
                <p className="text-xs text-on-surface-variant mt-4 font-medium">4 of 5 goals on track</p>
              </div>

              <div className="bg-surface-container-low border border-outline rounded-2xl p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-secondary/10 rounded-lg text-secondary">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-on-surface">Review Cycle</h3>
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-4xl font-black text-on-surface">Q4</span>
                </div>
                <p className="text-sm font-bold text-on-surface mt-2">Annual Review</p>
                <p className="text-xs text-on-surface-variant mt-1 font-medium">Due in 45 days</p>
              </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              {/* Goals Section */}
              <div className="bg-surface-container-low border border-outline rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-outline flex items-center justify-between">
                  <h3 className="font-bold text-on-surface flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    Strategic Goals
                  </h3>
                  <button 
                    onClick={() => showToast('Viewing all goals...', 'info')}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    View All
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  {performance?.goals.map((goal) => (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-on-surface">{goal.title}</h4>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                          goal.status === 'Completed' ? 'bg-tertiary/10 text-tertiary' : 
                          goal.status === 'In Progress' ? 'bg-primary/10 text-primary' : 
                          'bg-surface-container text-on-surface-variant'
                        }`}>
                          {goal.status}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-surface-container h-1.5 rounded-full overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${goal.progress}%` }}
                            className={`h-full rounded-full ${goal.status === 'Completed' ? 'bg-tertiary' : 'bg-primary'}`}
                          />
                        </div>
                        <span className="text-xs font-bold text-on-surface-variant">{goal.progress}%</span>
                      </div>
                    </div>
                  ))}
                  {!performance?.goals && (
                    <div className="text-center py-10">
                      <AlertCircle className="w-10 h-10 text-on-surface-variant mx-auto mb-2 opacity-20" />
                      <p className="text-sm text-on-surface-variant">No goals set for this period.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Reviews Section */}
              <div className="bg-surface-container-low border border-outline rounded-2xl overflow-hidden">
                <div className="p-6 border-b border-outline flex items-center justify-between">
                  <h3 className="font-bold text-on-surface flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-secondary" />
                    Recent Reviews
                  </h3>
                  <button 
                    onClick={() => showToast('Viewing review history...', 'info')}
                    className="text-xs font-bold text-primary hover:underline"
                  >
                    History
                  </button>
                </div>
                <div className="p-6 space-y-6">
                  {performance?.reviews.map((review) => (
                    <div key={review.id} className="p-4 bg-surface-container rounded-xl border border-outline-variant/10">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{review.date}</p>
                          <p className="text-sm font-bold text-on-surface">Review by {review.reviewer}</p>
                        </div>
                        <div className="flex items-center gap-1 bg-tertiary/10 px-2 py-1 rounded-lg">
                          <Star className="w-3 h-3 fill-tertiary text-tertiary" />
                          <span className="text-xs font-bold text-tertiary">{review.rating}</span>
                        </div>
                      </div>
                      <p className="text-sm text-on-surface-variant italic leading-relaxed">
                        "{review.comment}"
                      </p>
                    </div>
                  ))}
                  {!performance?.reviews && (
                    <div className="text-center py-10">
                      <MessageSquare className="w-10 h-10 text-on-surface-variant mx-auto mb-2 opacity-20" />
                      <p className="text-sm text-on-surface-variant">No reviews found.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-[60vh] bg-surface-container-low border border-dashed border-outline rounded-3xl">
            <TrendingUp className="w-16 h-16 text-on-surface-variant mb-4 opacity-20" />
            <h2 className="text-xl font-bold text-on-surface">Select an employee</h2>
            <p className="text-on-surface-variant mt-2">Choose a team member from the list to view their performance metrics.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Performance;
