import { useState, useEffect, createContext, useContext, ReactNode } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, AlertCircle, X, Info } from 'lucide-react';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
}

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              className="pointer-events-auto"
            >
              <div className={`
                min-w-[300px] p-4 rounded-xl shadow-2xl border flex items-center gap-3
                ${toast.type === 'success' ? 'bg-surface-container-lowest border-tertiary/20 text-on-surface' : 
                  toast.type === 'error' ? 'bg-error-container border-error/20 text-on-error-container' : 
                  'bg-surface-container-lowest border-primary/20 text-on-surface'}
              `}>
                <div className={`
                  p-2 rounded-lg
                  ${toast.type === 'success' ? 'bg-tertiary/10 text-tertiary' : 
                    toast.type === 'error' ? 'bg-error/10 text-error' : 
                    'bg-primary/10 text-primary'}
                `}>
                  {toast.type === 'success' && <CheckCircle2 size={18} />}
                  {toast.type === 'error' && <AlertCircle size={18} />}
                  {toast.type === 'info' && <Info size={18} />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold leading-tight">{toast.message}</p>
                </div>
                <button 
                  onClick={() => removeToast(toast.id)}
                  className="p-1 hover:bg-surface-container-high rounded-lg transition-colors text-on-surface-variant"
                >
                  <X size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
