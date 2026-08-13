'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAVIGATION_ITEMS = [
  { name: 'Dashboard', href: '/' },
  { name: 'Deals Pipeline', href: '/deals' },
  { name: 'Clients', href: '/clients' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 shrink-0 bg-slate-900 text-slate-100 flex flex-col h-screen sticky top-0 p-4 border-r border-slate-800">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-3 py-4 mb-6 border-b border-slate-800">
        <div className="bg-blue-600 text-white font-bold h-8 w-8 rounded-lg flex items-center justify-center text-sm shadow-md">
          CRM
        </div>
        <span className="font-bold text-lg tracking-wide text-white">DevCore</span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col gap-1 flex-1">
        {NAVIGATION_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600 text-white shadow-sm'
                  : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'
              }`}
            >
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Footer Info */}
      <div className="p-3 bg-slate-800/50 rounded-lg text-xs text-slate-400 border border-slate-800">
        <p className="font-semibold text-slate-300">Docker & Postgres</p>
        <p className="text-[11px] text-slate-500 mt-0.5">Connected locally</p>
      </div>
    </aside>
  );
}