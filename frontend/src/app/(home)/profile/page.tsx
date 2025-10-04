"use client";

import UserAddressCard from "@/components/user-profile/UserAddressCard";
import UserInfoCard from "@/components/user-profile/UserInfoCard";
import UserMetaCard from "@/components/user-profile/UserMetaCard";
import { Metadata } from "next";
import React from "react";
import Link from "next/link";
import { useProfile } from "@/context/ProfileContext";


///for later chnages

// export const metadata: Metadata = {
//   title: "Next.js Profile | TailAdmin - Next.js Dashboard Template",
//   description:
//     "This is Next.js Profile page for TailAdmin - Next.js Tailwind CSS Admin Dashboard Template",
// };

export default function Profile() {
  const { profile, loading, refreshProfile } = useProfile();
  console.log(profile);
  if (loading) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex justify-center items-center h-40">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }
   if (!profile) {
    return (
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
          <h3 className="mb-4 text-lg font-semibold text-gray-800 dark:text-white/90">
            You are not logged in.
          </h3>
          <p className="mb-6 text-gray-500 dark:text-gray-400">
            Please log in or sign up to view your profile.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/signin" className="inline-flex items-center justify-center rounded-md border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800">
              Sign In
            </Link>
            <Link href="/signup" className="inline-flex items-center justify-center rounded-md bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-brand-600">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Profile
        </h3>
        <div className="space-y-6">
          <UserMetaCard profile={profile} onProfileUpdate={refreshProfile}/>
          <UserInfoCard profile={profile} />
          <UserAddressCard profile={profile} />
        </div>
      </div>
    </div>
  );
}
