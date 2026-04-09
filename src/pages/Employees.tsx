import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../components/Toast';
import { 
  Users, 
  Search, 
  Filter, 
  Plus, 
  Mail, 
  Phone, 
  MapPin, 
  MoreVertical,
  ChevronRight,
  UserPlus,
  Download,
  Briefcase,
  Calendar,
  Edit,
  Trash2,
  UserCheck
} from 'lucide-react';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  department: string;
  status: string;
  joinedDate: string;
  avatar: string;
}

const Employees: React.FC = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDept, setSelectedDept] = useState('All Departments');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = () => setActiveMenu(null);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         emp.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = selectedDept === 'All Departments' || emp.department === selectedDept;
    return matchesSearch && matchesDept;
  });

  const departments = ['All Departments', ...new Set(employees.map(emp => emp.department))];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Employee Directory</h1>
          <p className="text-on-surface-variant">Manage your team members and their roles.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => showToast('Exporting employee directory...', 'info')}
            className="flex items-center gap-2 px-4 py-2 border border-outline rounded-xl hover:bg-surface-container transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Export
          </button>
          <button 
            onClick={() => showToast('Add Employee feature coming soon!', 'info')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl hover:opacity-90 transition-opacity shadow-sm text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <input
            type="text"
            placeholder="Search employees by name, email or role..."
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-on-surface-variant" />
          <select
            className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low border border-outline rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none"
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
          >
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((employee, index) => (
            <motion.div
              key={employee.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-surface-container-low border border-outline rounded-2xl p-6 hover:shadow-md transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-4">
                <div className="relative">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveMenu(activeMenu === employee.id ? null : employee.id);
                    }}
                    className="p-1.5 hover:bg-surface-container rounded-lg transition-colors text-on-surface-variant"
                  >
                    <MoreVertical className="w-5 h-5" />
                  </button>
                  
                  <AnimatePresence>
                    {activeMenu === employee.id && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: -10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -10 }}
                        className="absolute right-0 mt-2 w-48 bg-surface-container-highest border border-outline rounded-xl shadow-xl z-10 py-2"
                      >
                        <button 
                          onClick={() => showToast(`Editing ${employee.name}...`, 'info')}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors"
                        >
                          <Edit className="w-4 h-4" />
                          Edit Details
                        </button>
                        <button 
                          onClick={() => showToast(`${employee.name} status updated`, 'success')}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-on-surface hover:bg-surface-container transition-colors"
                        >
                          <UserCheck className="w-4 h-4" />
                          Change Status
                        </button>
                        <div className="my-1 border-t border-outline" />
                        <button 
                          onClick={() => showToast(`${employee.name} removed from directory`, 'error')}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-error hover:bg-error/10 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              <div className="flex items-start gap-4 mb-6">
                <img
                  src={employee.avatar}
                  alt={employee.name}
                  className="w-16 h-16 rounded-2xl object-cover border-2 border-surface-container-high"
                  referrerPolicy="no-referrer"
                />
                <div className="pt-1">
                  <h3 className="font-bold text-lg text-on-surface group-hover:text-primary transition-colors">
                    {employee.name}
                  </h3>
                  <p className="text-sm text-on-surface-variant font-medium">{employee.role}</p>
                  <div className="mt-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {employee.department}
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-4 border-t border-outline">
                <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                  <Mail className="w-4 h-4" />
                  <span className="truncate">{employee.email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-on-surface-variant">
                  <Calendar className="w-4 h-4" />
                  <span>Joined {employee.joinedDate}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider ${
                    employee.status === 'Active' 
                      ? 'bg-tertiary/10 text-tertiary' 
                      : 'bg-error/10 text-error'
                  }`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      employee.status === 'Active' ? 'bg-tertiary' : 'bg-error'
                    }`} />
                    {employee.status}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2">
                <button 
                  onClick={() => navigate('/performance')}
                  className="flex-1 py-2 text-sm font-bold text-primary hover:bg-primary/5 rounded-xl transition-colors border border-primary/20"
                >
                  View Profile
                </button>
                <button 
                  onClick={() => window.location.href = `mailto:${employee.email}`}
                  className="px-3 py-2 text-on-surface-variant hover:bg-surface-container rounded-xl transition-colors border border-outline"
                >
                  <Mail className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {!loading && filteredEmployees.length === 0 && (
        <div className="text-center py-20 bg-surface-container-low border border-dashed border-outline rounded-3xl">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-surface-container mb-4">
            <UserPlus className="w-8 h-8 text-on-surface-variant" />
          </div>
          <h3 className="text-lg font-bold text-on-surface">No employees found</h3>
          <p className="text-on-surface-variant max-w-xs mx-auto mt-2">
            Try adjusting your search or filter to find what you're looking for.
          </p>
          <button 
            onClick={() => { setSearchTerm(''); setSelectedDept('All Departments'); }}
            className="mt-6 text-primary font-bold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
};

export default Employees;
