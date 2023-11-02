import React from "react";
import Header from "@/components/admin/header";
import Sidebar from "@/components/admin/sidebar";
export default function layout({ children }: any) {
  return (
    <div>
      <div className="hidden md:grid grid-cols-[300px_auto] gap-5">
        <Sidebar />
        {children}
      </div>
      <div className="grid md:hidden">
        <Header />
        <div className="overflow-scroll">{children}</div>
      </div>
    </div>
  );
}
