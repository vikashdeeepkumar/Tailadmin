
'use client'
import { useEffect, useState } from 'react';
import React from "react";
import { useRouter } from 'next/navigation';
import BasicTableOne from "@/components/tables/BasicTableOne";
import InputGroup from "@/components/form/form-elements/InputGroup";
import { getToken,removeToken,authHeader } from '@/helpers/auth.helper';

export default function Ecommerce() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  return (
    <div className="m-5 flex items-center  flex-col">
    <div className="flex w-xl flex-col items-center justify-center">
        <h2>Welcome to Home Page</h2>
        
    </div>
    
    

</div>
  );
}
