import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddClassForm from "@/components/form/addclassform/AddClassForm";

import React from "react";



export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="class management" />
      <div className="space-y-6">
        <ComponentCard title="Add Class">
          <AddClassForm />
        </ComponentCard>
      </div>
    </div>
  );
}
