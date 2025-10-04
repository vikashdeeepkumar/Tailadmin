import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddUserForm from "@/components/form/adduserform/AddUserForm";

import React from "react";


export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="Add user" />
      <div className="space-y-6">
        <ComponentCard title="Add a new record">
          <AddUserForm />
        </ComponentCard>
      </div>
    </div>
  );
}
