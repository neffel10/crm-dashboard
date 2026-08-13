import Sidebar from '@/components/Sidebar';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-50 text-slate-900 antialiased min-h-screen">
        <div className="flex flex-col md:flex-row min-h-screen">
          {/* Sidebar adaptable */}
          <Sidebar />

          {/* Contenido principal con scroll horizontal preventivo */}
          <main className="flex-1 w-full overflow-x-hidden p-4 md:p-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}