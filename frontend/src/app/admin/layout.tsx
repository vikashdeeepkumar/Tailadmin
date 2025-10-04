"use client";

import { useSidebar } from "@/context/SidebarContext";
import AppHeader from "@/layout/AppHeader";
import AppSidebar from "@/layout/AppSidebar";
import Backdrop from "@/layout/Backdrop";
import React, { useEffect, useState,ReactNode } from "react";
import { ProfileProvider, useProfile } from '@/context/ProfileContext';
import { useRouter } from 'next/navigation';
import { getToken } from '@/helpers/auth.helper';
import 'react-toastify/dist/ReactToastify.css';



interface AdminLayoutProps {
  children: ReactNode;
}

const UnauthorizedScreen = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-xl text-red-500">Access Denied: You must be an admin to view this page.</div>
  </div>
);


// Create a separate component for the loading screen
const LoadingScreen = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="text-xl text-gray-500">Loading...</div>
  </div>
);


function LayoutContent({ children }: { children: React.ReactNode }) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();
  const { profile } = useProfile(); 
  const isAdmin = profile?.user?.role === 'admin';
  console.log("profile",profile);
   
   console.log("role",profile?.role);
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
    ? "lg:ml-[290px]"
    : "lg:ml-[90px]";

  return (
    <div className="min-h-screen xl:flex">
      {/* Sidebar and Backdrop */}
       <AppSidebar />
       <Backdrop />
      {/* Main Content Area */}
      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${mainContentMargin}`}
      >
        {/* Header */}
        <AppHeader />
        {/* Page Content */}
        <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{isAdmin ? (
            children
          ) : (
            
            <UnauthorizedScreen />
          )}</div>
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  return (
    <ProfileProvider>
      <AuthConditionalLayout>{children}</AuthConditionalLayout>
       
    </ProfileProvider>
  );
}

function AuthConditionalLayout({ children }: { children: React.ReactNode }) {
  const { loading, profile } = useProfile();
  const router = useRouter();
   
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  // Check for token on initial load
  useEffect(() => {
    if (!loading) {
      const token = getToken();

      // If there's no token, redirect to sign-in page
      if (!token) {
        router.push('/signin');
        return; // Exit early
      }

      // Check if user is an admin. If not, redirect to the home page.
      if (profile && profile.user.role !== 'admin') {
        router.push('/');
        return; // Exit early
      }
      setIsChecking(false);
    }
  }, [loading, profile, router]);

  // Handle redirect in a separate useEffect
  useEffect(() => {
    if (shouldRedirect) {
      router.push('/signin');
    }
  }, [shouldRedirect, router]);

  // If profile is null after loading, set redirect flag
  useEffect(() => {
    if (!loading && !profile) {
      // Give it a small delay to ensure token is properly set
      const token = getToken();
      if (!token) {
        setShouldRedirect(true);
      }
    }
  }, [loading, profile]);

  // Show loading while checking authentication or fetching profile
  if (isChecking || loading) {
    return <LoadingScreen />;
  }


  // Show loading while redirecting
  if (shouldRedirect || !profile || profile.user.role !== 'admin') {
    return <LoadingScreen />;
  }

  

  return <LayoutContent>{children}</LayoutContent>;
}