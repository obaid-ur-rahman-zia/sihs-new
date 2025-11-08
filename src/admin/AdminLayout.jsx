import React from "react";
import { Outlet } from "react-router-dom";
import SideNav from "./SideNav";
import "./AdminLayout.css";

function AdminLayout() {
  return (
    <div className="admin-shell">
      <SideNav />
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;
