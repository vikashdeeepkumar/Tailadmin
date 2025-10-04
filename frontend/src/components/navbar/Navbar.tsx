"use client";
import { useEffect, useState } from 'react';
import React from 'react';
import Link from 'next/link';
import Image from "next/image";
import Button from "@/components/ui/button/Button";
import { useRouter } from 'next/navigation';
import { getToken,removeToken,authHeader } from '@/helpers/auth.helper';
import UserDropdown from "@/components/header/UserDropdown";
import { useProfile } from '@/context/ProfileContext'; 
const HamburgerIcon = () => (
  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
  </svg>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { profile, loading, setProfile } = useProfile();
  const router = useRouter();
  const isLoggedIn = !!profile;

  const handleLogout = () => {
    removeToken();
    
    router.push('/signin');
  };
  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="">
            <Image
              width={154}
              height={32}
              className="dark:hidden"
              src="./images/logo/logo.svg"
              alt="Logo"
            />
            <Image
              width={154}
              height={32}
              className="hidden dark:block"
              src="./images/logo/logo-dark.svg"
              alt="Logo"
            />
          </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Home
              </Link>
              <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                About
              </Link>
              <Link href="/admin" className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                Dashboard
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2 2xsm:gap-3">
            <div className="flex items-center gap-2 2xsm:gap-3">
              {!isLoggedIn ?(
                  <div>
                        <Link href="/signup">
                    <Button variant="primary" size="sm">
                      Signup
                    </Button>
                  </Link>
                  <Link href="/signin">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                  </Link>
                </div>
              ):(
                <>
                <UserDropdown userData={profile} handleLogout={handleLogout} />
                </>
              )
              }
              
            </div>
            <div>
              
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              type="button" 
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 px-4 py-3 text-sm hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset  "
            >
              <span className="sr-only">Open main menu</span>
              <HamburgerIcon />
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              About
            </Link>
            <Link href="/dashboard" className="text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 block px-3 py-2 rounded-md text-base font-medium">
              Dashboard
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
