'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Card from '@/components/ui/Card';
import Alert from '@/components/ui/Alert';

export default function AdminLoginPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user types
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
    if (loginError) {
      setLoginError(null);
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = 'Username is required';
    }

    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setLoginError(null);

    try {
      // TODO: Replace with actual API call
      // const response = await fetch('/api/admin/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(formData),
      // });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Demo: Accept any username/password for now
      // In production, this will validate against the backend
      if (formData.username && formData.password) {
        // Store token (in production, this will come from API)
        localStorage.setItem('adminToken', 'demo-token-' + Date.now());
        localStorage.setItem('adminUsername', formData.username);

        // Redirect to dashboard
        router.push('/admin/dashboard');
      } else {
        setLoginError('Invalid username or password');
      }
    } catch (error) {
      setLoginError('Login failed. Please try again or contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Login</h1>
            <p className="text-gray-600">
              Sign in to access the Civil Defence admin dashboard
            </p>
          </div>

          <Card>
            {loginError && (
              <Alert
                type="error"
                message={loginError}
                onClose={() => setLoginError(null)}
              />
            )}

            <form onSubmit={handleSubmit}>
              <Input
                label="Username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                error={errors.username}
                required
                placeholder="Enter your username"
                disabled={isLoading}
              />

              <Input
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                required
                placeholder="Enter your password"
                disabled={isLoading}
              />

              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#01411C] focus:ring-[#01411C] border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="text-[#01411C] hover:text-[#025a28]">
                    Forgot password?
                  </a>
                </div>
              </div>

              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                className="mb-4"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                Not an admin?{' '}
                <Link href="/register" className="text-[#01411C] hover:text-[#025a28] font-medium">
                  Register as a volunteer
                </Link>
              </p>
            </div>
          </Card>

          {/* Demo Credentials Info */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-sm text-blue-800 font-medium mb-2">Demo Mode:</p>
            <p className="text-xs text-blue-700">
              This is a demo version. Any username and password will work to access the admin dashboard.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
