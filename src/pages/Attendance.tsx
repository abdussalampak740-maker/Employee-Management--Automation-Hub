import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { useToast } from '../components/Toast';
import { 
  Clock, 
  Calendar, 
  CheckCircle2, 
  AlertCircle, 
  User, 
  ArrowRight, 
  Plus, 
  Filter,
  Download,
  MoreVertical,
  LogOut,
  LogIn
} from 'lucide-react';

interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: string;
  clockIn: string;
  clockOut: string;
  status: string;
}

interface LeaveRequest {
  id: string;
  employeeId: string;
  type: string;
  startDate: string;
  endDate: string;
  status: string;
  reason: string;
}

interface Employee {
  id: string;
  name: string;
  avatar: string;
}

const Attendance: React.FC = () => {
  const { showToast } = useToast();
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([]);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [employees, setEmployees] = useState<Record<string, Employee>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [attRes, empRes] = await Promise.all([
          fetch('/api/attendance'),
          fetch('/api/employees')
        ]);
        
        const attData = await attRes.json();
        const empData = await empRes.json();

        setAttendance(attData.attendance);
        setLeaveRequests(attData.leaveRequests);
        
        const empMap: Record<string, Employee> = {};
        empData.forEach((emp: any) => {
          empMap[emp.id] = emp;
        });
        setEmployees(empMap);
      } catch (error) {
        console.error('Error fetching attendance data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-on-surface tracking-tight">Time & Attendance</h1>
          <p className="text-on-surface-variant">Track work hours and manage leave requests.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => showToast('Exporting attendance logs...', 'info')}
            className="flex items-center gap-2 px-4 py-2 border border-outline rounded-xl hover:bg-surface-container transition-colors text-sm font-medium"
          >
            <Download className="w-4 h-4" />
            Export Logs
          </button>
          <button 
            onClick={() => showToast('Leave request form opened', 'info')}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary rounded-xl hover:opacity-90 transition-opacity shadow-sm text-sm font-medium"
          >
            <Plus className="w-4 h-4" />
            Request Leave
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Attendance Log */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface-container-low border border-outline rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-outline flex items-center justify-between">
              <h3 className="font-bold text-on-surface flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                Today's Attendance
              </h3>
              <div className="flex items-center gap-2 text-xs font-bold text-on-surface-variant">
                <span className="w-2 h-2 rounded-full bg-tertiary"></span>
                4 Present
                <span className="w-2 h-2 rounded-full bg-error ml-2"></span>
                1 On Leave
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-surface-container/50">
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Employee</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Clock In</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Clock Out</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Status</th>
                    <th className="px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline">
                  {attendance.map((record) => (
                    <tr key={record.id} className="hover:bg-surface-container/30 transition-colors group">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <img 
                            src={employees[record.employeeId]?.avatar} 
                            alt="" 
                            className="w-8 h-8 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="text-sm font-bold text-on-surface">{employees[record.employeeId]?.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                          <LogIn className="w-3 h-3 text-tertiary" />
                          {record.clockIn}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm text-on-surface-variant">
                          <LogOut className="w-3 h-3 text-error" />
                          {record.clockOut}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          record.status === 'Present' ? 'bg-tertiary/10 text-tertiary' : 'bg-primary/10 text-primary'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => showToast('Attendance record options', 'info')}
                          className="p-1 hover:bg-surface-container rounded-lg transition-colors text-on-surface-variant opacity-0 group-hover:opacity-100"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Leave Requests */}
        <div className="space-y-6">
          <div className="bg-surface-container-low border border-outline rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-outline">
              <h3 className="font-bold text-on-surface flex items-center gap-2">
                <Calendar className="w-5 h-5 text-secondary" />
                Pending Leave Requests
              </h3>
            </div>
            <div className="p-4 space-y-4">
              {leaveRequests.map((request) => (
                <div key={request.id} className="p-4 bg-surface-container rounded-xl border border-outline-variant/10">
                  <div className="flex items-center gap-3 mb-3">
                    <img 
                      src={employees[request.employeeId]?.avatar} 
                      alt="" 
                      className="w-10 h-10 rounded-xl object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <p className="text-sm font-bold text-on-surface">{employees[request.employeeId]?.name}</p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-wider">{request.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-xs text-on-surface-variant mb-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {request.startDate}
                    </div>
                    <ArrowRight className="w-3 h-3" />
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {request.endDate}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {request.status === 'Pending' ? (
                      <>
                        <button 
                          onClick={() => showToast(`Leave request for ${employees[request.employeeId]?.name} approved`, 'success')}
                          className="flex-1 py-2 bg-primary text-on-primary rounded-lg text-xs font-bold hover:opacity-90 transition-opacity"
                        >
                          Approve
                        </button>
                        <button 
                          onClick={() => showToast(`Leave request for ${employees[request.employeeId]?.name} declined`, 'error')}
                          className="flex-1 py-2 border border-outline rounded-lg text-xs font-bold hover:bg-surface-container transition-colors"
                        >
                          Decline
                        </button>
                      </>
                    ) : (
                      <div className={`w-full py-2 text-center rounded-lg text-xs font-bold ${
                        request.status === 'Approved' ? 'bg-tertiary/10 text-tertiary' : 'bg-error/10 text-error'
                      }`}>
                        {request.status}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-surface-container-low border border-outline rounded-2xl p-6">
            <h4 className="font-bold text-on-surface mb-4">Quick Stats</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">Avg. Punctuality</span>
                <span className="text-sm font-bold text-tertiary">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">Leave Utilization</span>
                <span className="text-sm font-bold text-primary">12%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-on-surface-variant">Overtime (This Month)</span>
                <span className="text-sm font-bold text-on-surface">24.5 hrs</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
