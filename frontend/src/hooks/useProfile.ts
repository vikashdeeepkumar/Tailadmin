'use client';
import { useState, useEffect } from 'react';
import { getToken, removeToken, authHeader } from '@/helpers/auth.helper';
import { useRouter } from 'next/navigation';

export function useProfile() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = getToken();
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const api = process.env.NEXT_PUBLIC_API;
        const res = await fetch(`${api}/user/profile`, {
          headers: authHeader()
        });

        if (res.ok) {
          const userData = await res.json();
          setProfile(userData);
        } else {
          console.log('Failed to fetch profile. Removing invalid token.');
          removeToken();
          setProfile(null);
          router.push('/signin');
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
        removeToken();
        setProfile(null);
        setError('Error fetching profile');
        router.push('/signin');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [router]);

  return { profile, loading, error, setProfile };
}
