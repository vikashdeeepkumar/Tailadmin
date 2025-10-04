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
import { GridIcon } from "@/icons";
import Link from "next/link";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";

interface ClassItem {
  id: number;
  class_name: string;
  noofstudents: string;
  class_description: string;
  created_at: string;
  files_count: number;
  updated_by_email: string;
}

// Define the interface for the meta data
interface Meta {
  currentPage: number;
  perPage: number;
  totalClasses: number;
  totalPages: number;
}

// Define the interface for the entire API response
interface ApiResponse {
  message: string;
  meta: Meta;
  classes: ClassItem[];
}

export default function BasicTableOne() {
const [classes, setClasses] = useState<ClassItem[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [searchTerm, setSearchTerm] = useState("");
const [currentPage, setCurrentPage] = useState(1);
const [itemsPerPage, setItemsPerPage] = useState(10);
const [totalPages, setTotalPages] = useState(0);
const [totalItems, setTotalItems] = useState(0);
const { isOpen, openModal, closeModal } = useModal();
  const [selectedUser, setSelectedUser] = useState(null);
//date formater
const formatter = new Intl.DateTimeFormat('en-US', {
  month: 'short', 
  day: '2-digit', 
  hour: '2-digit', 
  minute: '2-digit', 
  hour12: true, 
});

const handleViewClick = (user) => {
  setSelectedUser(user);
  openModal();
};

  // Fetch users from API
const fetchUsers = async (page: number, limit: number, search: string = "") => {
  try {
    setLoading(true);
    const api = process.env.NEXT_PUBLIC_API;
    const response = await fetch(`${api}/classmanagement/all?page=${page}&limit=${limit}&search=${search}`, {
      headers: authHeader()
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data: ApiResponse = await response.json();
    console.log(data);
    
    // Correctly access nested data and set state
    setClasses(data.classes);
    setTotalPages(data.meta.totalPages);
    setTotalItems(data.meta.totalClasses); // Note: API returns "totalClasses"
    setError(null);
  } catch (err) {
    setError(err instanceof Error ? err.message : "An error occurred");
    console.error("Failed to fetch classes:", err);
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


  // Handle page change
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




  return (
    <>
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
              href="/admin/classmanagement/add"
            >
               <Button size="sm" variant="outline"  startIcon={<GridIcon />}>
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
                <TableCell isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 first:border-l-0 w-[5%]"
                            >
                            Sno.
                            </TableCell>
                            <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-[25%]"
                            >
                            ClassName
                            </TableCell>
                            <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-[15%]"
                            >
                            No of students
                            </TableCell>
                            <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-[15%]"
                            >
                            No of Uploads
                            </TableCell>
                            <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-[15%]"
                            >
                            Updated By
                            </TableCell>
                            <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400 w-[15%]"
                            >
                            Updated At
                            </TableCell>
                            <TableCell
                            isHeader
                            className="px-5 py-3 font-medium text-gray-500 text-center text-theme-xs dark:text-gray-400 last:border-r-0 w-[10%]"
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
              ) : classes.length === 0 ? (
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell colSpan={5} className="px-5 py-8 text-center text-gray-500">
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                classes.map((user,index) => (
                  <TableRow key={user.id} className="divide-x divide-gray-100 dark:divide-white/[0.05]">
                    <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400 break-all">{(currentPage - 1) * itemsPerPage + index + 1} </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400 break-all">
                      {user.class_name}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400 break-all">
                      {user.noofstudents}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400 break-all">
                      {user.files_count}
                    </TableCell>
                     <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400 break-all">
                      {user.updated_by_email}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-700 text-start text-theme-sm dark:text-gray-400 break-all">
                      {formatter.format(new Date(user.created_at))}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-center last:border-r-0">
                      <div className="flex items-center justify-center gap-2">
                    <button  onClick={() => handleViewClick(user)}  className="text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-600">
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
      {!loading && classes.length > 0 && (
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

      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        {selectedUser ? (
          <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
            <div className="px-2 pr-14">
              <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
                Class Details
              </h4>
             
            </div>

            <div className="custom-scrollbar h-[450px] overflow-y-auto px-2 pb-3">
              <div className="mt-7">
                <h5 className="mb-5 text-lg font-medium text-gray-800 dark:text-white/90 lg:mb-6">
                  Class Information
                </h5>
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                  <div className="col-span-2 lg:col-span-1">
                    <p className="font-semibold text-gray-800 dark:text-white/90">Class Name</p>
                    <p className="text-gray-500 dark:text-gray-400">{selectedUser.class_name}</p>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <p className="font-semibold text-gray-800 dark:text-white/90">Number of Students</p>
                    <p className="text-gray-500 dark:text-gray-400">{selectedUser.noofstudents}</p>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <p className="font-semibold text-gray-800 dark:text-white/90">Files Count</p>
                    <p className="text-gray-500 dark:text-gray-400">{selectedUser.files_count}</p>
                  </div>
                  <div className="col-span-2 lg:col-span-1">
                    <p className="font-semibold text-gray-800 dark:text-white/90">Last Updated By</p>
                    <p className="text-gray-500 dark:text-gray-400">{selectedUser.updated_by_email}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold text-gray-800 dark:text-white/90">Updated At</p>
                    <p className="text-gray-500 dark:text-gray-400">{formatter.format(new Date(selectedUser.created_at))}</p>
                  </div>
                  <div className="col-span-2">
                    <p className="font-semibold text-gray-800 dark:text-white/90">Description</p>
                    <p className="text-gray-500 dark:text-gray-400">{selectedUser.class_description || "null"}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
            </div>
          </div>
        ) : (
          <p>No user selected.</p>
        )}
      </Modal>
    </div>
    </>
  );
}