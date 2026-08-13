import Sidebar from '@/components/Sidebar';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body style={{ background: '#020617', color: '#f8fafc', margin: 0, minHeight: '100vh' }}>
        <div style={{ display: 'flex', minHeight: '100vh' }}>
          {/* Sidebar */}
          <Sidebar />

          {/* Contenido principal al 100% de ancho */}
          <main style={{ flex: 1, width: '100%', minWidth: 0, padding: '16px', background: '#020617', overflowX: 'hidden' }} className="md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}