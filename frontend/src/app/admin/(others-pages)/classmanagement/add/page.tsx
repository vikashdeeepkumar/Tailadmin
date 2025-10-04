import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AdminAddClassForm from "@/components/form/addclassform/AdminAddClassForm";

import React from "react";



export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="class management" />
      <div className="space-y-6">
        <ComponentCard title="Add Class">
          <AdminAddClassForm />
        </ComponentCard>
      </div>
    </div>
  );
}
