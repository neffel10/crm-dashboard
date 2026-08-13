'use client';

import { useState } from 'react';
import { createDeal } from '@/actions/dealActions';

interface ClientOption {
  id: string;
  name: string;
  company: string | null;
}

export default function CreateDealModal({ clients }: { clients: ClientOption[] }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (formData: FormData) => {
    const res = await createDeal(formData);
    if (res.success) {
      setIsOpen(false);
    } else {
      alert(res.error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg text-sm transition-colors shadow-sm"
      >
        + New Deal
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 text-slate-900">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">Create Opportunity</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            <form action={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Deal Title *
                </label>
                <input
                  type="text"
                  name="title"
                  required
                  placeholder="e.g. Cloud Migration Consulting"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Estimated Value ($ USD) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  name="value"
                  required
                  placeholder="5000.00"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Associated Client *
                </label>
                <select
                  name="clientId"
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
                >
                  <option value="" className="text-slate-500">
                    Select a Client...
                  </option>
                  {clients.map((c) => (
                    <option key={c.id} value={c.id} className="text-slate-900">
                      {c.name} {c.company ? `(${c.company})` : ''}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Save Deal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}