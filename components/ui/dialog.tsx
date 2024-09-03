// File: components/ui/dialog.tsx

import * as React from 'react';
import { Dialog as HeadlessDialog } from '@headlessui/react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  return (
    <HeadlessDialog open={isOpen} onClose={onClose}>
      <div className="fixed inset-0 bg-black bg-opacity-50" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <HeadlessDialog.Panel className="max-w-md w-full bg-white rounded shadow-lg">
          {children}
        </HeadlessDialog.Panel>
      </div>
    </HeadlessDialog>
  );
};

export const DialogTrigger: React.FC<{ asChild?: boolean, onClick: () => void }> = ({ asChild, onClick, children }) => {
  return (
    <div className={asChild ? undefined : "dialog-trigger"} onClick={onClick}>
      {children}
    </div>
  );
};

export const DialogContent: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="p-4">{children}</div>
);

export const DialogHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="bg-gray-100 p-4 rounded-t">{children}</div>
);

export const DialogTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-lg font-semibold">{children}</h2>
);