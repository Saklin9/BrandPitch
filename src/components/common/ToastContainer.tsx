import React from 'react';
import { useApp } from '../../context/AppContext';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-3.5 bg-neutral-900 text-white rounded-xl shadow-xl border border-neutral-800 animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
              {isInfo && <Info className="w-4 h-4 text-sky-400" />}
              {toast.type === 'warning' && <AlertTriangle className="w-4 h-4 text-amber-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold tracking-tight">{toast.title}</p>
              {toast.message && (
                <p className="text-[11px] text-neutral-300 mt-0.5 leading-snug">{toast.message}</p>
              )}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 p-1 text-neutral-400 hover:text-white transition-colors rounded"
              aria-label="Close notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
