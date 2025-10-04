"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Alert from "@/components/ui/alert/Alert";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState } from "react";
import GoogleSignUpButton from "@/components/auth/GoogleSignUpButton"
import { useProfile } from '@/context/ProfileContext';
// Define the props interface for typesafety
interface SignInFormProps {
  formData: {
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  error: string;
  loading: boolean;
    success: boolean; 
  setError: (error: string) => void;
  setLoading: (loading: boolean) => void;
  setSuccess: (success: boolean) => void;
}

export default function SignInForm({ formData, onChange, onSubmit, error, loading, success,
  setError,
  setLoading,
  setSuccess }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [clientErrors, setClientErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const [googleLoading, setGoogleLoading] = useState(false);
const { refreshProfile } = useProfile();
  // Validation function for email
  const validateEmail = (email: string) => {
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    return isValid ? '' : 'Please enter a valid email address.';
  };

  // Validation function for password
  const validatePassword = (password: string) => {
    return password.length >= 6 ? '' : 'Password must be at least 6 characters long.';
  };

  // Validate all fields
  const validateAll = () => {
    const errors = {
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
    };
    
    setClientErrors(errors);
    setTouched({
      email: true,
      password: true,
    });
    
    return Object.values(errors).every(error => error === '');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateAll()) {
      onSubmit(e);
    }
  };

  const handleGoogleError = (errorMessage: string) => {
    // You can handle Google errors differently if needed
    // For now, we'll use the same error state
  };

  const handleLoginSuccess = () => {
    refreshProfile(); // Refresh the profile data
  };
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full">
      <div className="w-full max-w-md sm:pt-10 mx-auto mb-5">
        <Link
          href="/"
          className="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <ChevronLeftIcon />
          Back to dashboard
        </Link>
      </div>
      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Sign In
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign in!
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
            
              <GoogleSignUpButton 
                setSuccess={setSuccess}
                setError={setError}
                setLoading={setLoading}
                onLoginSuccess={handleLoginSuccess}
              />
              <button className="inline-flex items-center justify-center gap-3 py-3 text-sm font-normal text-gray-700 transition-colors bg-gray-100 rounded-lg px-7 hover:bg-gray-200 hover:text-gray-800 dark:bg-white/5 dark:text-white/90 dark:hover:bg-white/10">
                <svg
                  width="21"
                  className="fill-current"
                  height="20"
                  viewBox="0 0 21 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M15.6705 1.875H18.4272L12.4047 8.75833L19.4897 18.125H13.9422L9.59717 12.4442L4.62554 18.125H1.86721L8.30887 10.7625L1.51221 1.875H7.20054L11.128 7.0675L15.6705 1.875ZM14.703 16.475H16.2305L6.37054 3.43833H4.73137L14.703 16.475Z" />
                </svg>
                Sign in with X
              </button>
            </div>
            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Or
                </span>
              </div>
            </div>
            {error && (
              <Alert 
                variant='error'
                title='Error Message'
                message={error}
              />
            )}
            {(loading || googleLoading) && (
              <div className="p-3 mb-4 text-center text-blue-500 bg-blue-100 rounded-lg">
                Signing in...
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="space-y-6 mt-2">
                <div>
                  <Label>
                    Email <span className="text-error-500">*</span>
                  </Label>
                  <Input 
                    type="text"
                    id="email"
                    name="email"
                    error={!!(touched.email && clientErrors.email)}
                    hint={touched.email && clientErrors.email ? clientErrors.email : ""}
                    value={formData.email}
                    onChange={onChange}
                    onBlur={() => setTouched({...touched, email: true})}
                    placeholder="Enter your email" 
                  />
                </div>
                <div>
                  <Label>
                    Password <span className="text-error-500">*</span>{" "}
                  </Label>
                  <div className="relative">
                    <Input
                      placeholder="Enter your password"
                      name="password"
                      id="password"
                      error={!!(touched.password && clientErrors.password)}
                      hint={touched.password && clientErrors.password ? clientErrors.password : ""}
                      value={formData.password}
                      onChange={onChange}
                      onBlur={() => setTouched({...touched, password: true})}
                      type={showPassword ? "text" : "password"}
                    />
                    <span
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400" />
                      )}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Keep me logged in
                    </span>
                  </div>
                  <Link
                    href="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div>
                  <Button 
                    className="w-full" 
                    size="sm" 
                    disabled={loading || googleLoading} 
                    type="submit"
                  >
                    {loading ? 'Signing in...' : 'Sign in'}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Don&apos;t have an account? {""}
                <Link
                  href="/signup"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}