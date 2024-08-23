// File: components/ui/emptyState.tsx

import { FC } from 'react';
import { Button } from './button';
import { PlusCircle } from 'lucide-react';

interface EmptyStateProps {
  title: string;
  description: string;
  buttonText: string;
  buttonAction: () => void;
}

const EmptyState: FC<EmptyStateProps> = ({ title, description, buttonText, buttonAction }) => {
  return (
    <div className="flex flex-col items-center justify-center text-center py-12">
      <PlusCircle className="w-12 h-12 text-gray-600 mb-4" />
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      <Button onClick={buttonAction}>{buttonText}</Button>
    </div>
  );
};

export default EmptyState;