// File: src/layouts/DashboardLayout.jsx
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/layout/Sidebar';
import Navbar from '../components/layout/Navbar';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
      {/* 1. Sidebar (Fixed) */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      {/* 2. Main Content Area */}
      {/* lg:ml-64 creates the space for the sidebar on desktop */}
      <div className="flex-1 flex flex-col w-full lg:ml-64 transition-all duration-300">
        
        {/* Navbar (Top) */}
        <Navbar onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Scrollable Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 dark:bg-black p-4 md:p-6">
          <Outlet /> 
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;