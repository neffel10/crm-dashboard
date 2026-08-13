import { getClients, createClient } from '@/actions/clientActions';
import ClientSearch from '@/components/clients/ClientSearch';
import ClientActionsMenu from '@/components/clients/ClientActionsMenu';

interface PageProps {
  searchParams: Promise<{ search?: string }>;
}

export default async function ClientsPage({ searchParams }: PageProps) {
  const resolvedParams = await searchParams;
  const searchQuery = resolvedParams?.search || '';

  const response = await getClients(searchQuery);
  const clients = response.data || [];

  return (
    <div className="max-w-6xl mx-auto p-8 font-sans text-slate-900">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-bold text-white">Client Management</h1>
          <p className="text-slate-500 text-sm">Overview of active agency relationships and leads.</p>
        </div>
      </header>

      <ClientSearch />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulario para Agregar Nuevo Cliente */}
        <section className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
          <h2 className="text-lg font-bold mb-4 text-slate-900">Add New Client</h2>
          <form action={createClient} className="flex flex-col gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="e.g. Jane Doe"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Company</label>
              <input
                type="text"
                name="company"
                placeholder="e.g. Stark Industries"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                required
                placeholder="jane@stark.com"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number</label>
              <input
                type="text"
                name="phone"
                placeholder="+1 (555) 000-0000"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
            </div>

            <button
              type="submit"
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-sm transition-colors shadow-sm"
            >
              Save Client
            </button>
          </form>
        </section>

        {/* Tabla de Lista de Clientes */}
        <section className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-xs text-slate-600 font-bold uppercase tracking-wider">
                <th className="p-4">Name & Company</th>
                <th className="p-4">Contact Information</th>
                <th className="p-4 text-center">Deals</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm">
              {clients.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 font-medium">
                    {searchQuery ? `No clients match "${searchQuery}"` : 'No clients found in PostgreSQL database.'}
                  </td>
                </tr>
              ) : (
                clients.map((client) => (
                  <tr key={client.id} className="hover:bg-slate-50/70 transition-colors">
                    <td className="p-4">
                      <div className="font-bold text-slate-900">{client.name}</div>
                      <div className="text-xs font-medium text-slate-500">{client.company || 'N/A'}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-slate-800 font-medium">{client.email}</div>
                      <div className="text-xs text-slate-500">{client.phone || 'No phone'}</div>
                    </td>
                    <td className="p-4 text-center">
                      <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-100">
                        {client.deals.length} deals
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <ClientActionsMenu client={client} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}