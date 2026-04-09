import { Search, Bell, HelpCircle, Menu, LogOut, User, Settings as SettingsIcon } from 'lucide-react';
import { useToast } from '../components/Toast';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

interface TopBarProps {
  onMenuClick: () => void;
}

export default function TopBar({ onMenuClick }: TopBarProps) {
  const { showToast } = useToast();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const handleLogout = () => {
    setIsProfileOpen(false);
    logout();
    showToast('Logged out successfully', 'info');
    navigate('/login');
  };

  return (
    <header className="fixed top-0 right-0 w-full lg:w-[calc(100%-16rem)] z-40 h-16 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800/50 flex justify-between items-center px-4 lg:px-8">
      <div className="flex items-center flex-1 gap-4">
        <button 
          onClick={onMenuClick}
          className="lg:hidden p-2 text-slate-500 hover:text-primary transition-colors"
        >
          <Menu size={24} />
        </button>
        <div className="relative w-full max-w-md hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Search processes, tasks or logs..."
            className="w-full bg-surface-container-highest border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 lg:gap-6">
        <div className="relative">
          <button 
            onClick={() => {
              setIsNotificationsOpen(!isNotificationsOpen);
              if (!isNotificationsOpen) showToast('Opening notifications', 'info');
            }}
            className="relative text-slate-500 hover:text-primary transition-colors p-2"
          >
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-white"></span>
          </button>

          <AnimatePresence>
            {isNotificationsOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsNotificationsOpen(false)}></div>
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/10 z-20 overflow-hidden"
                >
                  <div className="p-4 border-b border-outline-variant/10 flex justify-between items-center">
                    <h3 className="font-bold text-sm">Notifications</h3>
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">3 NEW</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {[
                      { title: 'System Update', desc: 'Version 2.4.0 is now live with new AI features.', time: '2m ago' },
                      { title: 'Task Assigned', desc: 'You have been assigned to "Invoice Audit #882".', time: '1h ago' },
                      { title: 'Security Alert', desc: 'New login detected from a new device in London.', time: '3h ago' },
                    ].map((n, i) => (
                      <div key={i} className="p-4 hover:bg-surface-container-low transition-colors cursor-pointer border-b border-outline-variant/5 last:border-0">
                        <p className="text-sm font-bold text-on-surface">{n.title}</p>
                        <p className="text-xs text-on-surface-variant mt-1">{n.desc}</p>
                        <p className="text-[10px] text-on-surface-variant mt-2 opacity-50">{n.time}</p>
                      </div>
                    ))}
                  </div>
                  <button className="w-full py-3 text-xs font-bold text-primary hover:bg-primary/5 transition-colors border-t border-outline-variant/10">
                    View All Notifications
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        <button 
          onClick={() => showToast('Help Center is being loaded...', 'info')}
          className="text-slate-500 hover:text-primary transition-colors hidden md:block p-2"
        >
          <HelpCircle size={20} />
        </button>

        <div className="relative">
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="flex items-center gap-3 hover:bg-surface-container-low p-1 rounded-xl transition-all"
          >
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-on-surface">{user?.name || 'User'}</p>
              <p className="text-[10px] text-on-surface-variant capitalize">{user?.role || 'Member'}</p>
            </div>
            <div className="h-9 w-9 rounded-full overflow-hidden border border-slate-200">
              <img 
                src={`https://picsum.photos/seed/${user?.id || 'user'}/40/40`} 
                alt="Profile"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </button>

          <AnimatePresence>
            {isProfileOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsProfileOpen(false)}></div>
                <motion.div 
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-surface-container-lowest rounded-2xl shadow-2xl border border-outline-variant/10 z-20 overflow-hidden"
                >
                  <div className="p-4 border-b border-outline-variant/10 bg-surface-container-low/30">
                    <p className="text-sm font-bold text-on-surface">{user?.name}</p>
                    <p className="text-xs text-on-surface-variant">{user?.email}</p>
                  </div>
                  <div className="p-2">
                    <Link 
                      to="/settings" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all"
                    >
                      <User size={18} />
                      My Profile
                    </Link>
                    <Link 
                      to="/settings" 
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-on-surface-variant hover:bg-surface-container-low hover:text-primary transition-all"
                    >
                      <SettingsIcon size={18} />
                      Account Settings
                    </Link>
                    <div className="h-px bg-outline-variant/5 my-2"></div>
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-error hover:bg-error/5 transition-all"
                    >
                      <LogOut size={18} />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
}
