"use client";
import React, { useState } from "react";
import ComponentCard from "../../common/ComponentCard";
import Label from "../Label";
import Select from "../Select";
import MultiSelect from "../MultiSelect";
import { ChevronDownIcon } from "@/icons";

interface SelectInputsProps {
  options: { value: string; label: string }[];
  placeholder?: string;
  value: string; // Add value prop
  onChange: (value: string) => void;
  className?: string; // Optional className prop
}


export default function SelectInputs({
  options,
  placeholder,
  value,
  onChange,
  className,
}: SelectInputsProps) {
  

  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  const handleSelectChange = (value: string) => {
    console.log("Selected value:", value);
  };

  return (
    <div className="relative">
      <Select
        options={options}
        placeholder={placeholder}
        value={value} 
        onChange={onChange}
        className={className}
      />
      <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
        <ChevronDownIcon />
      </span>
    </div>
  );
}
