import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';

interface AdminLoginProps {
  onClose: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { loginAdmin, loginTrainer, error, loading } = useAuth();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent, role: 'admin' | 'trainer') => {
    e.preventDefault();
    try {
      if (role === 'admin') {
        await loginAdmin({ email, password });
        onClose();
      } else {
        await loginTrainer({ email, password });
        onClose();
      }
    } catch (err: any) {
      toast({
        title: 'Error',
        description: `Failed to login: ${err.message}`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-cvup-purple">Login</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <Tabs defaultValue="admin" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="admin">Admin</TabsTrigger>
            <TabsTrigger value="trainer">Trainer</TabsTrigger>
          </TabsList>

          <TabsContent value="admin">
            <form onSubmit={(e) => handleSubmit(e, 'admin')} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cvup-purple"
                  placeholder="admin@cvup.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cvup-purple"
                  placeholder="Enter admin password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cvup-purple text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login as Admin'}
              </button>
            </form>
          </TabsContent>

          <TabsContent value="trainer">
            <form onSubmit={(e) => handleSubmit(e, 'trainer')} className="space-y-4">
              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cvup-purple"
                  placeholder="trainer@cvup.com"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cvup-purple"
                  placeholder="Enter trainer password"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-cvup-purple text-white font-bold py-2 px-4 rounded-lg hover:bg-opacity-90 transition-colors disabled:opacity-50"
              >
                {loading ? 'Logging in...' : 'Login as Trainer'}
              </button>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};