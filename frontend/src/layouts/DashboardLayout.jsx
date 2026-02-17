import React from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/Sidebar';

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-[#090a0c] flex">
      {/* Persistent Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <main className="flex-1 ml-64 p-8 min-h-screen overflow-y-auto">
        <div className="max-w-7xl mx-auto">
          {/* This is where Overview.jsx will be rendered */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};