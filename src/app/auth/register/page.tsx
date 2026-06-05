// app/auth/register/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Colors } from '../../../styles/colors';
import { register } from '../../../services/auth/auth.api';

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    shopName: '',
    shopAddress: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError('');
  };

  const validateForm = () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword || !formData.shopName) {
      setError('Please fill in all fields');
      return false;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading) return;

    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    // Simulate API call - Replace with your actual registration API
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Demo registration - check if email already exists
      if (formData.email === 'admin@patsycoffee.com') {
        setError('This email is already registered. Please use a different email.');
      } else {
        const response = await register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          shopName: formData.shopName,
          shopAddress: formData.shopAddress,
        });
        console.log('API Response: ', response);
        // router.push('/auth/login?registered=true');
      }
    } catch (error) {
      setError('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500 via-gray-800 to-gray-900" />

      {/* Pattern Overlay for Texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 50%, white 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      {/* Content Container */}
      <div className="relative z-10 w-full flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

          {/* Left Side - Branding Section */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-6 flex justify-center lg:justify-start">
              <Image
                src="/images/patsy-icon.png"
                alt="Patsy's Coffee"
                width={80}
                height={80}
                className="rounded-full shadow-lg"
              />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold mb-4 text-white drop-shadow-lg">
              Patsy&apos;s Coffee
            </h1>
            <p className="text-lg lg:text-xl mb-6 text-gray-200 drop-shadow-md">
              Complete Management System for Coffee Shops
            </p>
            <div className="flex gap-3 justify-center lg:justify-start mb-8">
              <div className="w-12 h-1 rounded-full" style={{ backgroundColor: Colors.secondary }} />
              <div className="w-6 h-1 rounded-full bg-white/50" />
              <div className="w-6 h-1 rounded-full bg-white/50" />
            </div>

            {/* Benefits List */}
            <div className="hidden lg:block bg-black/20 backdrop-blur-sm rounded-xl p-6">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2 text-white">
                  <span className="text-green-400">✓</span> Multi-Store Management
                </div>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-green-400">✓</span> Real-time Analytics
                </div>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-green-400">✓</span> Centralized Control
                </div>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-green-400">✓</span> Inventory Tracking
                </div>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-green-400">✓</span> Employee Management
                </div>
                <div className="flex items-center gap-2 text-white">
                  <span className="text-green-400">✓</span> Sales Reporting
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Register Card */}
          <div className="flex-1 w-full max-w-md">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Card Content */}
              <div className="p-6 sm:p-8 md:p-10">
                {/* Mobile Logo */}
                <div className="lg:hidden flex justify-center mb-6">
                  <Image
                    src="/images/patsy-icon.png"
                    alt="Patsy's Coffee"
                    width={60}
                    height={60}
                    className="rounded-full shadow-md"
                  />
                </div>

                <h2 className="text-2xl font-bold text-center mb-2" style={{ color: Colors.primary }}>
                  Register Your Store
                </h2>
                <p className="text-center text-gray-500 mb-8">
                  Create an account to manage your coffee shop
                </p>

                {/* Error Message */}
                {error && (
                  <div className="mb-6 p-3 rounded-lg text-sm animate-fade-in" style={{ backgroundColor: `${Colors.error}15`, color: Colors.error, border: `1px solid ${Colors.error}30` }}>
                    <div className="flex items-center gap-2">
                      <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <span>{error}</span>
                    </div>
                  </div>
                )}

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      style={{
                        borderColor: error ? Colors.error : '#d1d5db',
                      }}
                      onFocus={(e) => e.target.style.borderColor = Colors.primary}
                      onBlur={(e) => e.target.style.borderColor = error ? Colors.error : '#d1d5db'}
                      placeholder="John Doe"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      style={{
                        borderColor: error ? Colors.error : '#d1d5db',
                      }}
                      onFocus={(e) => e.target.style.borderColor = Colors.primary}
                      onBlur={(e) => e.target.style.borderColor = error ? Colors.error : '#d1d5db'}
                      placeholder="manager@patsycoffee.com"
                      required
                    />
                  </div>


                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed pr-12"
                        style={{ borderColor: '#d1d5db' }}
                        onFocus={(e) => e.target.style.borderColor = Colors.primary}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        disabled={isLoading}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed pr-12"
                        style={{ borderColor: '#d1d5db' }}
                        onFocus={(e) => e.target.style.borderColor = Colors.primary}
                        onBlur={(e) => e.target.style.borderColor = '#d1d5db'}
                        placeholder="••••••••"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 focus:outline-none"
                      >
                        {showConfirmPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shop/Branch Name
                    </label>
                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      style={{
                        borderColor: error ? Colors.error : '#d1d5db',
                      }}
                      onFocus={(e) => e.target.style.borderColor = Colors.primary}
                      onBlur={(e) => e.target.style.borderColor = error ? Colors.error : '#d1d5db'}
                      placeholder="e.g., Patsy's Coffee - Downtown"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Shop/Branch Address
                    </label>
                    <input
                      type="text"
                      name="shopAddress"
                      value={formData.shopAddress}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 transition-all disabled:bg-gray-100 disabled:cursor-not-allowed"
                      style={{
                        borderColor: error ? Colors.error : '#d1d5db',
                      }}
                      onFocus={(e) => e.target.style.borderColor = Colors.primary}
                      onBlur={(e) => e.target.style.borderColor = error ? Colors.error : '#d1d5db'}
                      placeholder="e.g., 123 Main St, Pandi, Bulacan"
                      required
                    />
                  </div>


                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-white font-semibold py-3 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 mt-6"
                    style={{ backgroundColor: Colors.primary }}
                  >
                    {isLoading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Creating account...
                      </span>
                    ) : (
                      'Register Store'
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-3 bg-white text-gray-500">Already have an account?</span>
                  </div>
                </div>

                {/* Login Link */}
                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="font-semibold hover:underline inline-flex items-center gap-2"
                    style={{ color: Colors.primary }}
                  >
                    Sign in to your account
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>

                {/* Terms and Conditions */}
                <p className="text-center text-xs text-gray-500 mt-6">
                  By creating an account, you agree to our{' '}
                  <Link href="/terms" className="hover:underline" style={{ color: Colors.primary }}>
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="hover:underline" style={{ color: Colors.primary }}>
                    Privacy Policy
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}