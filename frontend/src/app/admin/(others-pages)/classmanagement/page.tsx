import ComponentCard from "@/components/common/ComponentCard";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import AddClassForm from "@/components/form/addclassform/AddClassForm";
import AdminAllClassesTable from "@/components/tables/AdminAllClassesTable";
import React from "react";



export default function BasicTables() {
  return (
    <div>
      <PageBreadcrumb pageTitle="class management" />
      <div className="space-y-6">
        <ComponentCard title="All classes">
          <AdminAllClassesTable/>
        </ComponentCard>
      </div>
    </div>
  );
}
