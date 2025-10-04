'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignUpForm from '@/components/auth/SignUpForm'
import { setToken } from '@/helpers/auth.helper';
import { useProfile } from '@/context/ProfileContext';

export default function SignUp() {
    const router = useRouter();
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success,setSuccess] =useState(false);
  const { refreshProfile } = useProfile(); 
  const { firstname,lastname,email,password } = formData;
   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

   const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const api= process.env.NEXT_PUBLIC_API
      const res = await fetch(`${api}/api/auth/singup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true',
        },
        body: JSON.stringify({ firstname,lastname,email, password })
      });
      
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setSuccess(true);
        await refreshProfile();
      } else {
        setError(data.message || 'signup faild failed.');
      }
    } catch (err) {
      setError('Server error.');
    } finally {
      setLoading(false);
    }
  };


  return (
  <SignUpForm  formData={formData}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
      loading={loading}
      success={success}
       setError={setError}
      setLoading={setLoading}
      setSuccess={setSuccess}
       />
    ); 
}
