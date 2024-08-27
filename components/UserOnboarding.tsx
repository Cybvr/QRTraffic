import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X } from 'lucide-react';
import { db } from '@/lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

interface OnboardingProps {
  onComplete: () => void;
  userId: string;
}

const UserOnboarding: React.FC<OnboardingProps> = ({ onComplete, userId }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [companySize, setCompanySize] = useState('');
  const [industry, setIndustry] = useState('');
  const [customIndustry, setCustomIndustry] = useState('');
  const [goal, setGoal] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const [contactMethod, setContactMethod] = useState('');
  const [subscribedToUpdates, setSubscribedToUpdates] = useState(false);

  const handleNext = () => setCurrentSlide(currentSlide + 1);
  const handleBack = () => setCurrentSlide(currentSlide - 1);
  const handleSubmit = async () => {
    const userData = {
      companySize,
      industry: industry === 'other' ? customIndustry : industry,
      goal: goal === 'other' ? customGoal : goal,
      contactMethod,
      subscribedToUpdates
    };
    console.log(userData); 
    // Save to Firestore
    await addDoc(collection(db, 'user_onboarding'), { ...userData, userId });
    onComplete();
  };

  const industryOptions = [
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'education', label: 'Education' },
    { value: 'finance', label: 'Finance' },
    { value: 'retail', label: 'Retail' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'hospitality', label: 'Hospitality' },
    { value: 'other', label: 'Other' }
  ];

  const goalOptions = [
    { value: 'Improve marketing campaigns', label: 'Improve marketing campaigns' },
    { value: 'Increase brand awareness', label: 'Increase brand awareness' },
    { value: 'Enhance customer engagement', label: 'Enhance customer engagement' },
    { value: 'Generate leads', label: 'Generate leads' },
    { value: 'Boost sales', label: 'Boost sales' },
    { value: 'other', label: 'Other' }
  ];

  const slides = [
    <div key="slide1">
      <label className="block text-sm font-medium text-gray-700 mb-1">Company Size</label>
      <Select value={companySize} onValueChange={setCompanySize}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select company size" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="1-10">1-10 employees</SelectItem>
          <SelectItem value="11-50">11-50 employees</SelectItem>
          <SelectItem value="51-200">51-200 employees</SelectItem>
          <SelectItem value="201+">201+ employees</SelectItem>
        </SelectContent>
      </Select>
    </div>,
    <div key="slide2">
      <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
      <Select value={industry} onValueChange={setIndustry}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select industry" />
        </SelectTrigger>
        <SelectContent>
          {industryOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {industry === 'other' && (
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Custom Industry</label>
          <Input
            id="custom-industry"
            placeholder="Please specify your industry"
            required
            value={customIndustry}
            onChange={(e) => setCustomIndustry(e.target.value)}
          />
        </div>
      )}
    </div>,
    <div key="slide3">
      <label className="block text-sm font-medium text-gray-700 mb-1">Primary Goal</label>
      <Select value={goal} onValueChange={setGoal}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select primary goal" />
        </SelectTrigger>
        <SelectContent>
          {goalOptions.map(option => (
            <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>
          ))}
        </SelectContent>
      </Select>
      {goal === 'other' && (
        <div className="mt-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Custom Goal</label>
          <Input
            id="custom-goal"
            placeholder="Please specify your goal"
            required
            value={customGoal}
            onChange={(e) => setCustomGoal(e.target.value)}
          />
        </div>
      )}
    </div>,
    <div key="slide4">
      <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Contact Method</label>
      <Select value={contactMethod} onValueChange={setContactMethod}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select contact method" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="email">Email</SelectItem>
          <SelectItem value="phone">Phone</SelectItem>
          <SelectItem value="chat">Chat</SelectItem>
        </SelectContent>
      </Select>
      <div className="flex items-center mt-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Subscribe to Updates</label>
        <Input
          id="subscribed-to-updates"
          type="checkbox"
          className="ml-2"
          checked={subscribedToUpdates}
          onChange={(e) => setSubscribedToUpdates(e.target.checked)}
        />
      </div>
    </div>
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Welcome to QRTraffic</h2>
          <button onClick={onComplete} className="text-gray-500 hover:text-gray-700">
            <X size={24} />
          </button>
        </div>
        {slides[currentSlide]}
        <div className="flex justify-between mt-4">
          {currentSlide > 0 && <Button variant="outline" onClick={handleBack}>Back</Button>}
          {currentSlide < slides.length - 1 ? (
            <Button onClick={handleNext}>Next</Button>
          ) : (
            <Button onClick={handleSubmit}>Finish</Button>
          )}
        </div>
        <div className="flex space-x-2 mt-4 justify-center">
          {slides.map((_, index) => (
            <span key={index} className={`h-2 w-2 rounded-full ${index === currentSlide ? 'bg-blue-500' : 'bg-gray-300'}`}></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserOnboarding;