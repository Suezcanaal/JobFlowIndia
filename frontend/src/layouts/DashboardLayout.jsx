import React, { useState } from 'react'
import Sidebar from '../components/layout/Sidebar'

export default function DashboardLayout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Desktop fixed sidebar */}
      {/* <div className="hidden md:block md:fixed md:inset-y-0 md:w-64 md:z-50">
        <Sidebar />
      </div> */}

      {/* Mobile: hamburger and slide-over */}
      <div className="md:hidden">
        <div className="p-2">
          <button
            onClick={() => setMobileOpen(true)}
            className="inline-flex items-center justify-center p-2 rounded-md text-slate-600 bg-white border border-slate-200"
            aria-label="Open sidebar"
          >
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {mobileOpen && (
          <div className="fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-black/30" onClick={() => setMobileOpen(false)} />
            <div className="relative w-64 bg-white border-r border-slate-200">
              <div className="p-4">
                <button onClick={() => setMobileOpen(false)} className="text-slate-600">Close</button>
              </div>
              <Sidebar onClose={() => setMobileOpen(false)} />
            </div>
          </div>
        )}
      </div>

      {/* Main content (push right on md) */}
      <div className="md:pl-64">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">{children}</main>
      </div>
    </div>
  )
}
