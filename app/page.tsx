import { getDeals } from '@/actions/dealActions';
import { getClients } from '@/actions/clientActions';

export default async function DashboardPage() {
  const [dealsRes, clientsRes] = await Promise.all([getDeals(), getClients()]);

  const deals = dealsRes.data || [];
  const clients = clientsRes.data || [];

  const totalPipelineValue = deals.reduce((sum, deal) => sum + deal.value, 0);
  const wonDeals = deals.filter((deal) => deal.stage === 'WON');
  const wonValue = wonDeals.reduce((sum, deal) => sum + deal.value, 0);

  return (
    <div className="p-8 max-w-7xl mx-auto font-sans">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-slate-500 text-sm">Key performance indicators and business metrics.</p>
      </header>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Pipeline</span>
          <div className="text-2xl font-bold text-slate-900 mt-2">
            ${totalPipelineValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">{deals.length} deals in pipeline</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Revenue Won</span>
          <div className="text-2xl font-bold text-emerald-600 mt-2">
            ${wonValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <span className="text-xs text-slate-400 mt-1 block">{wonDeals.length} deals closed</span>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Clients</span>
          <div className="text-2xl font-bold text-blue-600 mt-2">{clients.length}</div>
          <span className="text-xs text-slate-400 mt-1 block">Active accounts</span>
        </div>
      </div>
    </div>
  );
}