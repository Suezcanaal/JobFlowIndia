import React from 'react'

export default function ProjectCard({ title, subtitle, href, Icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group block bg-white border border-slate-200 rounded-lg p-5 hover:shadow-md transition-shadow"
    >
      <div className="flex items-start gap-4">
        <div className="p-3 rounded-md bg-indigo-50 text-indigo-600">
          {Icon && <Icon className="w-5 h-5" />}
        </div>

        <div>
          <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
          <p className="text-xs text-slate-500 mt-1">{subtitle}</p>
        </div>
      </div>
    </a>
  )
}
