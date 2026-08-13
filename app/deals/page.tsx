import { getDeals } from '@/actions/dealActions';
import { getClients } from '@/actions/clientActions';
import StageSelector from '@/components/deals/StageSelector';
import CreateDealModal from '@/components/deals/CreateDealModal';
import ActivityDrawer from '@/components/deals/ActivityDrawer';
import { LeadStage } from '@prisma/client';

const KANBAN_COLUMNS: { title: string; stage: LeadStage; color: string }[] = [
  { title: 'New Leads', stage: LeadStage.NEW, color: 'border-slate-300' },
  { title: 'Contacted', stage: LeadStage.CONTACTED, color: 'border-blue-400' },
  { title: 'Qualified', stage: LeadStage.QUALIFIED, color: 'border-indigo-400' },
  { title: 'Proposal Sent', stage: LeadStage.PROPOSAL_SENT, color: 'border-amber-400' },
  { title: 'Won', stage: LeadStage.WON, color: 'border-emerald-500' },
  { title: 'Lost', stage: LeadStage.LOST, color: 'border-rose-400' },
];

export default async function DealsPage() {
  const [dealsRes, clientsRes] = await Promise.all([getDeals(), getClients()]);
  const deals = dealsRes.data || [];
  const clients = clientsRes.data || [];

  return (
    <div className="p-8 font-sans">
      <header className="flex justify-between items-center mb-8 pb-4 border-b border-slate-200">
        <div>
          <h1 className="text-3xl font-bold text-white">Deals Pipeline</h1>
          <p className="text-slate-500 text-sm">
            Track sales opportunities and deal flow across active client accounts.
          </p>
        </div>

        <CreateDealModal clients={clients} />
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start overflow-x-auto pb-6">
        {KANBAN_COLUMNS.map((col) => {
          const stageDeals = deals.filter((deal) => deal.stage === col.stage);
          const totalValue = stageDeals.reduce((sum, d) => sum + d.value, 0);

          return (
            <div
              key={col.stage}
              className={`bg-slate-50 p-4 rounded-xl border-t-4 ${col.color} border-x border-b border-slate-200 flex flex-col min-w-[220px]`}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="font-semibold text-xs text-slate-700 uppercase tracking-wide">
                  {col.title}
                </h2>
                <span className="text-xs bg-slate-200 text-slate-600 px-2 py-0.5 rounded-full font-bold">
                  {stageDeals.length}
                </span>
              </div>

              <div className="text-xs font-semibold text-slate-500 mb-4">
                Total: ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </div>

              <div className="flex flex-col gap-3">
                {stageDeals.length === 0 ? (
                  <div className="text-xs text-slate-400 text-center py-6 border border-dashed border-slate-200 rounded-lg">
                    No deals
                  </div>
                ) : (
                  stageDeals.map((deal) => (
                    <div
                      key={deal.id}
                      className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-2"
                    >
                      <div className="font-semibold text-slate-800 text-sm">{deal.title}</div>

                      <div className="text-xs text-slate-500">
                        Client: <span className="font-medium text-slate-700">{deal.client?.name || 'Unknown'}</span>
                      </div>

                      <div className="text-base font-bold text-slate-900 mt-1">
                        ${deal.value.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-100 flex justify-between items-center gap-1">
                        <StageSelector dealId={deal.id} currentStage={deal.stage} />
                        
                        {/* Botón de Timeline / Actividades */}
                        <ActivityDrawer
                          dealId={deal.id}
                          dealTitle={deal.title}
                          initialActivities={deal.activities || []}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}