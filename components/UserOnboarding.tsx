import React, { useState } from 'react';
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'

interface OnboardingProps {
  onComplete: () => void;
}

const UserOnboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');

  const handleSubmit = () => {
    // Here you would typically save this information to your backend
    console.log({ companySize, industry });
    onComplete();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">QRTraffic</h2>
          <button onClick={onComplete} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        <h3 className="text-lg font-semibold mb-2">Tell us a little about yourself.</h3>
        <p className="text-sm text-gray-600 mb-4">
          Help us recommend the best layouts and industry trends for you.
        </p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
            <Select
              value={companySize}
              onValueChange={setCompanySize}
              placeholder="Select your company size"
            >
              <Select.Option value="1-10">1-10 employees</Select.Option>
              <Select.Option value="11-50">11-50 employees</Select.Option>
              <Select.Option value="51-200">51-200 employees</Select.Option>
              <Select.Option value="201+">201+ employees</Select.Option>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
            <Select
              value={industry}
              onValueChange={setIndustry}
              placeholder="Select an industry"
            >
              <Select.Option value="technology">Technology</Select.Option>
              <Select.Option value="healthcare">Healthcare</Select.Option>
              <Select.Option value="education">Education</Select.Option>
              <Select.Option value="finance">Finance</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </div>
        </div>
        <Button onClick={handleSubmit} className="w-full mt-6">
          Start Creating
        </Button>
      </div>
    </div>
  );
};

export default UserOnboarding;