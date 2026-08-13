'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/hooks/useDebounce';

export default function ClientSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Guardamos el término inicial de la URL
  const initialSearch = searchParams.get('search')?.toString() || '';
  const [searchTerm, setSearchText] = useState(initialSearch);
  const debouncedSearch = useDebounce(searchTerm, 350);

  // Usamos una referencia para rastrear la última búsqueda enviada a la URL
  const lastSearchRef = useRef(initialSearch);

  useEffect(() => {
    // Si la búsqueda no ha cambiado realmente respecto a la URL actual, no hacemos nada
    if (debouncedSearch === lastSearchRef.current) return;

    lastSearchRef.current = debouncedSearch;

    const params = new URLSearchParams(window.location.search);
    if (debouncedSearch) {
      params.set('search', debouncedSearch);
    } else {
      params.delete('search');
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [debouncedSearch, pathname]); // 💡 Solo depende de debouncedSearch y pathname

  return (
    <div className="relative mb-6">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search clients by name, company, or email..."
        className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
      />
      <span className="absolute left-3 top-2.5 text-slate-400 text-sm">🔍</span>
    </div>
  );
}