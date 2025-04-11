
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const SignUp: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('account');
  
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [activityLevel, setActivityLevel] = useState('');
  const [goal, setGoal] = useState('');
  
  const handleNext = () => {
    if (activeTab === 'account') {
      if (!name.trim() || !email.trim()) {
        toast.error('Please fill in all fields');
        return;
      }
      if (!email.includes('@')) {
        toast.error('Please enter a valid email address');
        return;
      }
      setActiveTab('health');
    } else if (activeTab === 'health') {
      if (!age || !gender || !weight || !height) {
        toast.error('Please fill in all fields');
        return;
      }
      setActiveTab('goals');
    }
  };
  
  const handleBack = () => {
    if (activeTab === 'health') {
      setActiveTab('account');
    } else if (activeTab === 'goals') {
      setActiveTab('health');
    }
  };
  
  const handleSubmit = () => {
    if (!activityLevel || !goal) {
      toast.error('Please fill in all fields');
      return;
    }
    
    // In a real app, this would send the data to a backend
    toast.success('Account created successfully!');
    navigate('/');
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-app-background to-app-primary/5 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold gradient-heading">PlateToPixelPal</h1>
          <p className="text-gray-500">Your AI-powered nutrition tracker</p>
        </div>
        
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle>Create Your Account</CardTitle>
            <CardDescription>
              Set up your profile to get personalized nutrition tracking
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid grid-cols-3 mb-6">
                <TabsTrigger value="account">Account</TabsTrigger>
                <TabsTrigger value="health">Health</TabsTrigger>
                <TabsTrigger value="goals">Goals</TabsTrigger>
              </TabsList>
              
              <TabsContent value="account">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Name</label>
                    <Input 
                      placeholder="Enter your name" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Email</label>
                    <Input 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="health">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Age</label>
                      <Input 
                        type="number" 
                        placeholder="Age in years" 
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Gender</label>
                      <Select value={gender} onValueChange={setGender}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select gender" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="male">Male</SelectItem>
                          <SelectItem value="female">Female</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Weight (kg)</label>
                      <Input 
                        type="number" 
                        placeholder="Weight in kg" 
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">Height (cm)</label>
                      <Input 
                        type="number" 
                        placeholder="Height in cm" 
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="goals">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Activity Level</label>
                    <Select value={activityLevel} onValueChange={setActivityLevel}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (little to no exercise)</SelectItem>
                        <SelectItem value="light">Light (1-3 days/week)</SelectItem>
                        <SelectItem value="moderate">Moderate (3-5 days/week)</SelectItem>
                        <SelectItem value="active">Active (6-7 days/week)</SelectItem>
                        <SelectItem value="very active">Very Active (2x per day)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Fitness Goal</label>
                    <Select value={goal} onValueChange={setGoal}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your goal" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="lose">Lose Weight</SelectItem>
                        <SelectItem value="maintain">Maintain Weight</SelectItem>
                        <SelectItem value="gain">Gain Weight</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            {activeTab !== 'account' ? (
              <Button variant="outline" onClick={handleBack}>
                <ArrowLeft size={16} className="mr-1" />
                Back
              </Button>
            ) : (
              <div></div>
            )}
            
            {activeTab !== 'goals' ? (
              <Button onClick={handleNext}>
                Next
                <ArrowRight size={16} className="ml-1" />
              </Button>
            ) : (
              <Button onClick={handleSubmit}>
                Create Account
              </Button>
            )}
          </CardFooter>
        </Card>
        
        <div className="text-center mt-6">
          <p className="text-sm text-gray-500">
            Already have an account?{' '}
            <Button variant="link" className="p-0 h-auto" onClick={() => navigate('/')}>
              Sign in
            </Button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
