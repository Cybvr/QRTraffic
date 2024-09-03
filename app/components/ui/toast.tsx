// components/ui/use-toast.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Toast = {
  id: string;
  message: string;
  duration?: number;
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
    <div className="fixed top-4 right-4 z-50">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="mb-4 p-4 bg-gray-800 text-white rounded-md shadow-lg"
        >
          {toast.message}
        </div>
      ))}
    </div>
  );
};