"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getToken, authHeader, removeToken } from '@/helpers/auth.helper';
import { useRouter } from 'next/navigation';

interface UserProfile {
  first_name: string;
  last_name: string;
  email: string;
  bio: string;
  facebook_profile: string;
  linkedin_profile: string;
  x_com_profile: string;
  instagram_profile: string;
  country: string;
  city_state: string;
  postal_code: string;
  tax_id: string;
  avatar: File | null;
  created_at: string;
  id: number;
  role: 'user' | 'admin';
}

interface ProfileContextType {
  profile: UserProfile | null;
  loading: boolean;
  refreshProfile: () => void;
  updateProfile: (updatedData: Partial<UserProfile>) => Promise<boolean>;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const ProfileProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const api= process.env.NEXT_PUBLIC_API;
      const headers = authHeader();
      const res = await fetch(`${api}/user/profile`, {
        
        headers: headers
      });
      
      if (res.ok) {
        const userData = await res.json();
        console.log("profile data",userData);
        setProfile(userData);
      } else {
        console.log('Failed to fetch profile');
        // Remove invalid token from cookies
        removeToken();
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Remove invalid token from cookies
      removeToken();
    } finally {
      setLoading(false);
    }
  };


  const updateProfile = async (updatedData: any): Promise<boolean> => {
    try {
      const formData = new FormData();
      // loop through keys of updatedData
      Object.keys(updatedData).forEach((key) => {
        if (updatedData[key] !== undefined && updatedData[key] !== null) {
          formData.append(key, updatedData[key]);
        }
      });
      const api= process.env.NEXT_PUBLIC_API
      const res = await fetch(`${api}/user/profile`, {
        method: 'PUT',
        headers: {
          ...authHeader()  
        },
        body: formData
      });

      if (res.ok) {
        await fetchProfile();
        return true;
      } else {
        console.error('Failed to update profile');
        return false;
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    }
  };
   

  useEffect(() => {
    // Check if token exists in cookies before trying to fetch profile
    const token = getToken();
    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
    }
  }, []);

  
  return (
    <ProfileContext.Provider value={{ profile, loading, updateProfile, refreshProfile: fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
    throw new Error('useProfile must be used within a ProfileProvider');
  }
  return context;
};