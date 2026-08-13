'use client';

import { useState, useTransition } from 'react';
import { createActivity } from '@/actions/activityActions';

interface Activity {
  id: string;
  type: string;
  note: string;
  createdAt: Date;
}

interface ActivityDrawerProps {
  dealId: string;
  dealTitle: string;
  initialActivities?: Activity[];
}

export default function ActivityDrawer({ dealId, dealTitle, initialActivities = [] }: ActivityDrawerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      const res = await createActivity(formData);
      if (!res.success) {
        alert(res.error);
      }
    });
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="text-[11px] font-semibold text-slate-600 hover:text-blue-600 transition-colors flex items-center gap-1 bg-slate-100 px-2 py-1 rounded border border-slate-200"
      >
        📋 Timeline ({initialActivities.length})
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex justify-end z-50">
          <div className="bg-white w-full max-w-md h-full shadow-2xl p-6 flex flex-col overflow-y-auto text-slate-900">
            
            {/* Header con Alto Contraste */}
            <div className="flex justify-between items-start pb-4 border-b border-slate-200 mb-6">
              <div>
                <h3 className="font-bold text-slate-900 text-xl tracking-tight">Activity History</h3>
                <p className="text-xs font-semibold text-blue-600 mt-0.5">{dealTitle}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            {/* Formulario Estructurado y Legible */}
            <form action={handleSubmit} className="bg-slate-50 p-4 rounded-xl border border-slate-300 mb-6 flex flex-col gap-3 shadow-sm">
              <input type="hidden" name="dealId" value={dealId} />
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Activity Type
                </label>
                <select
                  name="type"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                >
                  <option value="Call">📞 Call / Phone Contact</option>
                  <option value="Meeting">🤝 Meeting / Demo</option>
                  <option value="Email">✉️ Email Sent</option>
                  <option value="Proposal">📄 Proposal / Quote</option>
                  <option value="Note">📝 General Note</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Details & Notes *
                </label>
                <textarea
                  name="note"
                  required
                  rows={3}
                  placeholder="Write clear notes about this interaction..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs font-medium bg-white text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg text-xs transition-colors shadow-sm disabled:opacity-50 mt-1"
              >
                {isPending ? 'Saving Activity...' : '+ Add Activity'}
              </button>
            </form>

            {/* Timeline Histórico */}
            <div className="flex-1">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 pb-1 border-b border-slate-100">
                Past Activities ({initialActivities.length})
              </h4>
              
              {initialActivities.length === 0 ? (
                <div className="text-xs text-slate-500 text-center py-10 border border-dashed border-slate-300 rounded-lg bg-slate-50">
                  No activities recorded yet for this deal.
                </div>
              ) : (
                <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-300">
                  {initialActivities.map((act) => (
                    <div key={act.id} className="relative pl-8">
                      {/* Indicador visual */}
                      <div className="absolute left-2 top-2 -translate-x-1/2 w-3.5 h-3.5 rounded-full bg-blue-600 border-2 border-white shadow-sm" />
                      
                      <div className="bg-white p-3.5 rounded-lg border border-slate-200 shadow-sm">
                        <div className="flex justify-between items-center mb-1.5">
                          <span className="font-bold text-xs text-slate-900 bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                            {act.type}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400">
                            {new Date(act.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </span>
                        </div>
                        <p className="text-xs text-slate-700 whitespace-pre-wrap leading-relaxed mt-2 font-normal">
                          {act.note}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}