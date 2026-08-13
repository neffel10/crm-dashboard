'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navItems = [
    { label: '📊 Dashboard', href: '/' },
    { label: '👥 Clients', href: '/clients' },
    { label: '💼 Deals (Kanban)', href: '/deals' },
  ];

  return (
    <>
      {/* 📱 Botón Hamburguesa Flotante en Móvil (Pequeño, limpio y sin fondo pesado) */}
      <button
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          top: '16px',
          left: '16px',
          zIndex: 50,
          background: '#0f172a',
          color: '#f8fafc',
          border: '1px solid #334155',
          borderRadius: '50%',
          width: '40px',
          height: '40px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.5)',
        }}
        className="md:hidden"
        aria-label="Open Menu"
      >
        <span style={{ fontSize: '18px' }}>☰</span>
      </button>

      {/* Overlay oscuro de fondo al abrir en móvil */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 6, 23, 0.8)',
            zIndex: 40,
          }}
          className="md:hidden"
        />
      )}

      {/* Sidebar Principal (Fijo en desktop, drawer oculto por defecto en móvil) */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          left: 0,
          zIndex: 50,
          width: '260px',
          background: '#0f172a',
          color: '#f8fafc',
          borderRight: '1px solid #1e293b',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'transform 0.3s ease-in-out',
          transform: isOpen ? 'translateX(0)' : 'translateX(-100%)',
        }}
        className="md:translate-x-0 md:static md:h-screen"
      >
        <div>
          {/* Encabezado del Sidebar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'between', marginBottom: '32px', paddingBottom: '16px', borderBottom: '1px solid #1e293b' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '24px' }}>🚀</span>
              <div>
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0, color: '#f8fafc' }}>Agency CRM</h2>
                <p style={{ fontSize: '11px', color: '#94a3b8', margin: 0 }}>Pro Pipeline Management</p>
              </div>
            </div>
            {/* Botón de cierre para móvil */}
            <button
              onClick={() => setIsOpen(false)}
              style={{ background: 'transparent', border: 'none', color: '#94a3b8', fontSize: '18px', cursor: 'pointer' }}
              className="md:hidden"
            >
              ✕
            </button>
          </div>

          {/* Enlaces de Navegación */}
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  style={{
                    padding: '10px 14px',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: 600,
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: isActive ? '#2563eb' : 'transparent',
                    color: isActive ? '#ffffff' : '#94a3b8',
                  }}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Footer con tu enlace al Portafolio */}
        <div style={{ paddingTop: '24px', borderTop: '1px solid #1e293b', marginTop: 'auto' }}>
          <div style={{ background: '#020617', padding: '12px', borderRadius: '8px', border: '1px solid #1e293b', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ background: 'rgba(37, 99, 235, 0.2)', color: '#60a5fa', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 'bold', border: '1px solid rgba(37, 99, 235, 0.4)' }}>
              ⚡
            </div>
            <div style={{ overflow: 'hidden' }}>
              <p style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: '#64748b', margin: 0 }}>Developed by</p>
              <a
                href="https://alessandrotorres.freedev.app/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: '12px', fontWeight: 'bold', color: '#60a5fa', textDecoration: 'none', display: 'block', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                Alessandro Torres 🚀
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}