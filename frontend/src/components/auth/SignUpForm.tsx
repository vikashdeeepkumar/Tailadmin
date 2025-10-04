"use client";
import Checkbox from "@/components/form/input/Checkbox";
import Input from "@/components/form/input/InputField";
import Alert from "@/components/ui/alert/Alert";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import { ChevronLeftIcon, EyeCloseIcon, EyeIcon } from "@/icons";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import GoogleSignUpButton from "@/components/auth/GoogleSignUpButton"
import { useProfile } from '@/context/ProfileContext';
// Define the props interface for type safety
interface SignInFormProps {
  formData: {
    firstname: string;
    lastname: string;
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

export default function SignUpForm({ 
  formData, 
  onChange, 
  onSubmit, 
  error, 
  loading, 
  success,
  setError,
  setLoading,
  setSuccess
}: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [clientErrors, setClientErrors] = useState<{ [key: string]: string }>({});
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});
  const { refreshProfile } = useProfile();
  // Validation function for first name
  const validateFirstname = (firstname: string) => {
    return firstname.trim() ? '' : 'Please enter your first name.';
  };

  // Validation function for last name
  const validateLastname = (lastname: string) => {
    return lastname.trim() ? '' : 'Please enter your last name.';
  };

  // Validation function for email
  const validateEmail = (email: string) => {
    const isValid = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
    return isValid ? '' : 'Please enter a valid email address.';
  };

  // Validation function for password
  const validatePassword = (password: string) => {
    return password.length >= 6 ? '' : 'Password must be at least 6 characters long.';
  };

  // Validation function for terms checkbox
  const validateTerms = (isChecked: boolean) => {
    return isChecked ? '' : 'You must accept the terms and conditions.';
  };

  // Validate all fields
  const validateAll = () => {
    const errors = {
      firstname: validateFirstname(formData.firstname),
      lastname: validateLastname(formData.lastname),
      email: validateEmail(formData.email),
      password: validatePassword(formData.password),
      terms: validateTerms(isChecked)
    };
    
    setClientErrors(errors);
    setTouched({
      firstname: true,
      lastname: true,
      email: true,
      password: true,
      terms: true
    });
    
    return Object.values(errors).every(error => error === '');
  };
  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (validateAll()) {
      onSubmit(e);
    }
  };

  // Clear errors when form data changes
  useEffect(() => {
    if (success) {
      setClientErrors({});
      setTouched({});
    }
  }, [formData, success]);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched({ ...touched, [name]: true });
  };

   const handleLoginSuccess = () => {
    refreshProfile(); // Refresh the profile data
  };
  return (
    <div className="flex flex-col flex-1 lg:w-1/2 w-full overflow-y-auto no-scrollbar">
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
              Sign Up
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Enter your email and password to sign up!
            </p>
          </div>
          <div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5">
              {/* google components */}
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
                Sign up with X
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
            
            {/* Server error message */}
            {error && (

              <Alert 
                variant='error'
                title='Error Message'
                message={error}
               />
            )}
            
            {/* Success message */}
            {success && (
              
              <Alert 
                variant='success'
                title='Success Message'
                message='Account created successfully! Please sigin Now.'
                showLink={true}
                linkHref="/signin"
              linkText="Sign in Now"

               />
            )}
            
            <form  onSubmit={handleSubmit}>
              <div className="space-y-5 mt-2">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                 
                  <div className="sm:col-span-1">
                    <Label>
                      First Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="firstname"
                      name="firstname"
                      error={!!(touched.firstname && clientErrors.firstname)}
                      hint={touched.firstname && clientErrors.firstname ? clientErrors.firstname : ""}
                      value={formData.firstname}
                      onChange={onChange}
                      onBlur={handleBlur}
                      placeholder="Enter your first name"
                      
                    />
                  </div>
                  
                  <div className="sm:col-span-1">
                    <Label>
                      Last Name<span className="text-error-500">*</span>
                    </Label>
                    <Input
                      type="text"
                      id="lastname"
                      name="lastname"
                      error={!!(touched.lastname && clientErrors.lastname)}
                      hint={touched.lastname && clientErrors.lastname ? clientErrors.lastname : ""}
                      value={formData.lastname}
                      onChange={onChange}
                      onBlur={handleBlur}
                      placeholder="Enter your last name"
                     
                    />
                  </div>
                </div>
                
                <div>
                  <Label>
                    Email<span className="text-error-500">*</span>
                  </Label>
                  <Input
                    type="text"
                    id="email"
                    name="email"
                    error={!!(touched.email && clientErrors.email)}
                    hint={touched.email && clientErrors.email ? clientErrors.email : ""}
                    value={formData.email}
                    onChange={onChange}
                    onBlur={handleBlur}
                    placeholder="Enter your email"
                    
                  />
                </div>
                
                <div>
                  <Label>
                    Password<span className="text-error-500">*</span>
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
                      onBlur={handleBlur}
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
                
                <div className="flex items-center gap-3">
                  <Checkbox
                    className="w-5 h-5"
                    checked={isChecked}
                    onChange={setIsChecked}
                    onBlur={() => setTouched({ ...touched, terms: true })}
                  />
                  <p className="inline-block font-normal text-gray-500 dark:text-gray-400">
                    By creating an account means you agree to the{" "}
                    <span className="text-gray-800 dark:text-white/90">
                      Terms and Conditions,
                    </span>{" "}
                    and our{" "}
                    <span className="text-gray-800 dark:text-white">
                      Privacy Policy
                    </span>
                  </p>
                </div>
                {touched.terms && clientErrors.terms && (
                  <p className="text-sm text-error-500">{clientErrors.terms}</p>
                )}
                
                
                <div>
                  <Button 
                    className="w-full flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-brand-500 shadow-theme-xs hover:bg-brand-600" 
                    size="sm" 
                    disabled={loading} 
                    type="submit"
                  >
                    {loading ? 'Sign Up...' : 'Sign Up'}
                  </Button>
                </div>
              </div>
            </form>

            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Already have an account?
                <Link
                  href="/signin"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400 ml-1"
                >
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}