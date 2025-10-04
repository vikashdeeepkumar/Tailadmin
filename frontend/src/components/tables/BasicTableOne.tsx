"use client";
import CountryFlag from 'react-country-flag';

import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import {authHeader } from '@/helpers/auth.helper';
import Button from "@/components/ui/button/Button";
import { UserIcon } from "@/icons";
import Link from "next/link";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar?: string;
  status: string;
  role: string;
  created_at: string;
}

interface ApiResponse {
  users: User[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export default function BasicTableOne() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  // Fetch users from API
  const fetchUsers = async (page: number, limit: number, search: string = "") => {
    try {
      setLoading(true);
       const api= process.env.NEXT_PUBLIC_API
      const response = await fetch(`${api}/user/all?page=${page}&limit=${limit}&search=${search}`, {
        headers: authHeader()
    });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data: ApiResponse = await response.json();
      console.log(data);
      setUsers(data.user);
      setTotalPages(data.meta.totalPages);
      setTotalItems(data.meta.totalUsers);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      console.error("Failed to fetch users:", err);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch and when page/limit/search changes
  useEffect(() => {
    fetchUsers(currentPage, itemsPerPage, searchTerm);
  }, [currentPage, itemsPerPage, searchTerm]);

  // Handle search with debounce
  useEffect(() => {
    const handler = setTimeout(() => {
      setCurrentPage(1); // Reset to first page when searching
      fetchUsers(1, itemsPerPage, searchTerm);
    }, 500); // 500ms debounce

    return () => clearTimeout(handler);
  }, [searchTerm, itemsPerPage]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  // Handle items per page change
  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1); // Reset to first page when changing items per page
  };

  // Generate page numbers for pagination
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = 5;
    
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  }, [currentPage, totalPages]);

  if (error) {
    return (
      <div className="p-4 text-center text-red-500 bg-red-50 rounded-lg">
        Error: {error}
      </div>
    );
  }

  const getBadgeColor = (role) => {
  switch (role) {
    case 'admin':
      return 'success';
    case 'user':
    default:
      return 'warning';
  }
};
 const getAvatarUrl = (user) => {
  const avatar = user?.avatar;

  if (avatar) {
    try {
      new URL(avatar);
      return avatar; // It's a full URL, return it directly
    } catch (e) {
      // It's not a valid URL, so it must be a local file path
      return `/images/user/${avatar}`;
    }
  }

  return "/images/user/owner.jpg"; 
};


  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-white/[0.03]">
      
      <div className="mb-4 flex flex-col gap-2 px-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="text-gray-500 dark:text-gray-400">
            <label htmlFor="itemsPerPage" className="text-gray-500 dark:text-gray-400 mr-2">
              Show:
            </label>
            <select
              id="itemsPerPage"
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-2 py-1 border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-700 dark:text-white"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
            <span className="text-gray-500 dark:text-gray-400" style={{marginLeft:'11px'}}>entries</span>
          </div>
        </div>
        <div className="flex gap-4">
          <div className="relative">
          <button className="absolute top-1/2 left-4 -translate-y-1/2 text-gray-500 dark:text-gray-400">
        <svg className="fill-current" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path  fillRule="evenodd"
                clipRule="evenodd"  d="M3.04199 9.37363C3.04199 5.87693 5.87735 3.04199 9.37533 3.04199C12.8733 3.04199 15.7087 5.87693 15.7087 9.37363C15.7087 12.8703 12.8733 15.7053 9.37533 15.7053C5.87735 15.7053 3.04199 12.8703 3.04199 9.37363ZM9.37533 1.54199C5.04926 1.54199 1.54199 5.04817 1.54199 9.37363C1.54199 13.6991 5.04926 17.2053 9.37533 17.2053C11.2676 17.2053 13.0032 16.5344 14.3572 15.4176L17.1773 18.238C17.4702 18.5309 17.945 18.5309 18.2379 18.238C18.5308 17.9451 18.5309 17.4703 18.238 17.1773L15.4182 14.3573C16.5367 13.0033 17.2087 11.2669 17.2087 9.37363C17.2087 5.04817 13.7014 1.54199 9.37533 1.54199Z" fill=""></path>
        </svg>
        </button>
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="dark:bg-dark-900 shadow-theme-xs focus:border-brand-300 focus:ring-brand-500/10 dark:focus:border-brand-800 h-11 w-full rounded-lg border border-gray-300 bg-transparent py-2.5 pr-4 pl-11 text-sm text-gray-800 placeholder:text-gray-400 focus:ring-3 focus:outline-hidden xl:w-[300px] dark:border-gray-700 dark:bg-gray-900 dark:text-white/90 dark:placeholder:text-white/30"
          />
 
        </div>
        <Link
              className="inline-flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400"
              href="/admin/adduser"
            >
               <Button size="sm" variant="outline"  startIcon={<UserIcon />}>
              Add 
            </Button>
              </Link>
       
        </div>

        
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-none border-t border-gray-200 border-x-0 border-b-0 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table className="w-full table-fixed">
            {/* Table Header with updated columns */}
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow className="divide-x divide-gray-200 dark:divide-white/[0.05]">
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 first:border-l-0 w-[20%] lg:w-[25%]"
                >
                  User
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-[20%] lg:w-[25%]"
                >
                  Email
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-[15%]"
                >
                  Country
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-[12%]"
                >
                  Phone
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-[12%]"
                >
                  Role
                </TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 last:border-r-0 w-[12%]"
                >
                  Action
                </TableCell>
              </TableRow>
            </TableHeader>

            {/* Table Body with updated columns */}
            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="px-5 py-8 text-center">
                    <p className="mt-2 text-gray-500">Loading users...</p>
                  </TableCell>
                </TableRow>
              ) : users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="px-5 py-8 text-center text-gray-500">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id} className="divide-x divide-gray-100 dark:divide-white/[0.05]">
                    <TableCell className="px-5 py-4 sm:px-6 text-start first:border-l-0">
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0 w-10 h-10 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                          <Image
                            width={40}
                            height={40}
                             src={getAvatarUrl(user)}
                            alt={`${user.first_name} ${user.last_name}`}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90 break-all">
                            {user.first_name} {user.last_name}
                          </span>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 break-all">
                      {user.email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <div className="flex items-center gap-2">
                        {user.country && (
                                <CountryFlag
                                  countryCode={user.country}
                                  svg
                                  className="w-full h-full object-cover rounded-full"
                                />
                              )}
                        <span className="text-gray-500 text-theme-sm dark:text-gray-400 break-all">
                          {user.country}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400 break-all">
                      {user.phone}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start text-theme-sm">
                    <Badge size="sm" color={getBadgeColor(user.role)}>
                      {user.role}
                    </Badge>
                      </TableCell>
                    <TableCell className="px-4 py-3 text-center last:border-r-0">
                      <div className="flex items-center justify-center gap-2">
                    <button  className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-600">
                            <svg 
                              className="fill-current" 
                              width="21" 
                              height="21" 
                              fill="none"
                              viewBox="0 0 21 21" 
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                              
                                d="M10.5 4.5C6.54167 4.5 3.375 8.16667 0.9375 10.5C3.375 12.8333 6.54167 16.5 10.5 16.5C14.4583 16.5 17.625 12.8333 20.0625 10.5C17.625 8.16667 14.4583 4.5 10.5 4.5ZM10.5 14.25C8.80775 14.25 7.4375 12.8798 7.4375 11.1875C7.4375 9.49525 8.80775 8.125 10.5 8.125C12.1923 8.125 13.5625 9.49525 13.5625 11.1875C13.5625 12.8798 12.1923 14.25 10.5 14.25ZM10.5 9.625C9.62125 9.625 8.875 10.3713 8.875 11.1875C8.875 12.0037 9.62125 12.75 10.5 12.75C11.3787 12.75 12.125 12.0037 12.125 11.1875C12.125 10.3713 11.3787 9.625 10.5 9.625Z"
                                fill=""
                              />
                            </svg>
                            {}
                          </button>

                      <button className="text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white/90">
                      <svg className="fill-current" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M17.0911 3.53206C16.2124 2.65338 14.7878 2.65338 13.9091 3.53206L5.6074 11.8337C5.29899 12.1421 5.08687 12.5335 4.99684 12.9603L4.26177 16.445C4.20943 16.6931 4.286 16.9508 4.46529 17.1301C4.64458 17.3094 4.90232 17.3859 5.15042 17.3336L8.63507 16.5985C9.06184 16.5085 9.45324 16.2964 9.76165 15.988L18.0633 7.68631C18.942 6.80763 18.942 5.38301 18.0633 4.50433L17.0911 3.53206ZM14.9697 4.59272C15.2626 4.29982 15.7375 4.29982 16.0304 4.59272L17.0027 5.56499C17.2956 5.85788 17.2956 6.33276 17.0027 6.62565L16.1043 7.52402L14.0714 5.49109L14.9697 4.59272ZM13.0107 6.55175L6.66806 12.8944C6.56526 12.9972 6.49455 13.1277 6.46454 13.2699L5.96704 15.6283L8.32547 15.1308C8.46772 15.1008 8.59819 15.0301 8.70099 14.9273L15.0436 8.58468L13.0107 6.55175Z"
                          fill=""
                        ></path>
                      </svg>
                    </button>
                    <button className="text-gray-500 hover:text-error-500 dark:text-gray-400 dark:hover:text-error-500">
                <svg className="fill-current" width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7.04142 4.29199C7.04142 3.04935 8.04878 2.04199 9.29142 2.04199H11.7081C12.9507 2.04199 13.9581 3.04935 13.9581 4.29199V4.54199H16.1252H17.166C17.5802 4.54199 17.916 4.87778 17.916 5.29199C17.916 5.70621 17.5802 6.04199 17.166 6.04199H16.8752V8.74687V13.7469V16.7087C16.8752 17.9513 15.8678 18.9587 14.6252 18.9587H6.37516C5.13252 18.9587 4.12516 17.9513 4.12516 16.7087V13.7469V8.74687V6.04199H3.8335C3.41928 6.04199 3.0835 5.70621 3.0835 5.29199C3.0835 4.87778 3.41928 4.54199 3.8335 4.54199H4.87516H7.04142V4.29199ZM15.3752 13.7469V8.74687V6.04199H13.9581H13.2081H7.79142H7.04142H5.62516V8.74687V13.7469V16.7087C5.62516 17.1229 5.96095 17.4587 6.37516 17.4587H14.6252C15.0394 17.4587 15.3752 17.1229 15.3752 16.7087V13.7469ZM8.54142 4.54199H12.4581V4.29199C12.4581 3.87778 12.1223 3.54199 11.7081 3.54199H9.29142C8.87721 3.54199 8.54142 3.87778 8.54142 4.29199V4.54199ZM8.8335 8.50033C9.24771 8.50033 9.5835 8.83611 9.5835 9.25033V14.2503C9.5835 14.6645 9.24771 15.0003 8.8335 15.0003C8.41928 15.0003 8.0835 14.6645 8.0835 14.2503V9.25033C8.0835 8.83611 8.41928 8.50033 8.8335 8.50033ZM12.9168 9.25033C12.9168 8.83611 12.581 8.50033 12.1668 8.50033C11.7526 8.50033 11.4168 8.83611 11.4168 9.25033V14.2503C11.4168 14.6645 11.7526 15.0003 12.1668 15.0003C12.581 15.0003 12.9168 14.6645 12.9168 14.2503V9.25033Z"
                    fill=""
                  ></path>
                </svg>
              </button>
                    

                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>

      {/* Pagination */}
      {!loading && users.length > 0 && (
        <div className="flex flex-col items-center justify-between px-4 py-3 border-t border-gray-200 sm:px-6 dark:border-gray-700 md:flex-row">
          <div className="hidden text-sm text-gray-700 md:block dark:text-gray-400">
            Showing <span className="">{(currentPage - 1) * itemsPerPage + 1}</span> to{" "}
            <span className="">
              {Math.min(Number(currentPage) * Number(itemsPerPage), Number(totalItems))}
            </span>{" "}
            of <span className="">{totalItems}</span> results
          </div>
          
          <div className="flex items-center">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="mr-2.5 flex items-center h-10 justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs hover:bg-gray-50 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] text-sm"
            >
              Previous
            </button>
            
            <div className="flex items-center gap-2">
              {pageNumbers.map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-4 py-2 rounded${
                    currentPage === page
                      ? "bg-blue-500/[0.08] bg-blue-500/[0.08] text-brand-500 hover:text-brand-500 dark:hover:text-brand-500"
                      : "text-gray-700 dark:text-gray-400 "
                  }flex w-10 items-center justify-center h-10 rounded-lg text-sm font-medium hover:bg-blue-500/[0.08] hover:text-brand-500 dark:hover:text-brand-500`}
                >
                  {page}
                </button>
              ))}
              
              {totalPages > pageNumbers[pageNumbers.length - 1] && (
                <span className="px-2">...</span>
              )}
            </div>
            
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="ml-2.5 flex items-center justify-center rounded-lg border border-gray-300 bg-white px-3.5 py-2.5 text-gray-700 shadow-theme-xs text-sm hover:bg-gray-50 h-10 disabled:opacity-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03]"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}