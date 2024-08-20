// components/ui/use-toast.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Toast = {
  id: string;
  message: string;
  duration?: number; // Optional, default duration for the toast
};

type ToastContextType = {
  addToast: (message: string, duration?: number) => void;
  removeToast: (id: string) => void;
  toasts: Toast[];
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, duration = 3000) => {
    const id = new Date().getTime().toString();
    setToasts([...toasts, { id, message, duration }]);
    setTimeout(() => removeToast(id), duration);
  };

  const removeToast = (id: string) => {
    setToasts((currentToasts) => currentToasts.filter((toast) => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ addToast, removeToast, toasts }}>
      {children}
      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

const ToastContainer = ({ toasts }: { toasts: Toast[] }) => {
  return (
    <div style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 9999 }}>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          style={{
            marginBottom: '1rem',
            padding: '1rem',
            backgroundColor: '#333',
            color: '#fff',
            borderRadius: '4px',
          }}
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};