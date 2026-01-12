import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import {
  LayoutDashboard,
  Briefcase,
  PlusCircle,
  User,
  Settings,
  ArrowUpRight,
  LogOut,
} from 'lucide-react'

const NavItem = ({ to, Icon, children, onClick }) => {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 mx-3 rounded-md text-sm font-medium transition-all duration-200 ${
          isActive ? 'bg-indigo-50 text-indigo-700 font-semibold' : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span>{children}</span>
    </NavLink>
  )
}

export default function Sidebar({ onClose } = {}) {
  const { user, logout } = useAuth()

  const initials = (name = '') => {
    const parts = name.split(' ').filter(Boolean)
    if (parts.length === 0) return 'U'
    if (parts.length === 1) return parts[0][0].toUpperCase()
    return (parts[0][0] + parts[1][0]).toUpperCase()
  }

  return (
    <aside className="w-64 h-full fixed left-0 top-0 bg-white border-r border-slate-200 z-40 font-sans">
      <div className="h-16 flex items-center px-6">
        <div className="flex items-center gap-3">
          <div className="text-xl font-bold tracking-tight text-slate-900">JobFlow</div>
          <div className="bg-indigo-100 text-indigo-700 text-xs px-2 py-0.5 rounded-full">Beta</div>
        </div>
      </div>

      <nav className="mt-4">
        <NavItem to="/dashboard" Icon={LayoutDashboard} onClick={onClose}>Dashboard</NavItem>
        <NavItem to="/jobs" Icon={Briefcase} onClick={onClose}>All Jobs</NavItem>
        <NavItem to="/jobs/new" Icon={PlusCircle} onClick={onClose}>Add New</NavItem>
        <NavItem to="/profile" Icon={User} onClick={onClose}>Profile</NavItem>
        <NavItem to="/settings" Icon={Settings} onClick={onClose}>Settings</NavItem>
      </nav>

      <div className="mt-auto px-6 py-4">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">MY APPS</div>

        <div className="flex flex-col gap-2">
          <a
            href="https://treack-progress.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <Briefcase className="w-4 h-4 text-slate-500" />
              <span className="text-sm">DSA Tracker</span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>

          <a
            href="https://marlingeshwar.vercel.app/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between gap-3 px-3 py-2 rounded-md text-sm text-slate-700 hover:bg-slate-50"
          >
            <div className="flex items-center gap-3">
              <User className="w-4 h-4 text-slate-500" />
              <span className="text-sm">Portfolio</span>
            </div>
            <ArrowUpRight className="w-3 h-3 text-slate-400" />
          </a>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200 bg-slate-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-semibold">{initials(user?.name || user?.email || 'U')}</div>

          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold truncate">{user?.name || 'Unknown User'}</div>
            <div className="text-xs text-slate-500 truncate">{user?.email || '—'}</div>
          </div>

          <button
            onClick={() => logout && logout()}
            className="ml-2 text-slate-600 hover:text-slate-900 p-2 rounded-md"
            aria-label="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  )
}
