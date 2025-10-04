'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

import SignInForm from '@/components/auth/SignInForm';
import { setToken } from '@/helpers/auth.helper';

import { useProfile } from '@/context/ProfileContext';

export default function SignIn() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
   const [success,setSuccess] =useState(false);
  const { email, password } = formData;
const { refreshProfile } = useProfile(); 
  // Type definition for the change event on an input element
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  // Type definition for the form submit event
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const api= process.env.NEXT_PUBLIC_API
      const res = await fetch(`${api}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ email, password })
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setSuccess(true);
        setToken(data.token);
        await refreshProfile();
        router.push('/profile');
        
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('Server error.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <SignInForm
      formData={formData}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      success={success}
      loading={loading}
      setError={setError}
       setLoading={setLoading}
      setSuccess={setSuccess}
    />
  );
}
