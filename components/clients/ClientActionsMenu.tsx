'use client';

import { useState, useTransition } from 'react';
import { deleteClient, updateClient } from '@/actions/clientActions';

interface ClientProps {
  id: string;
  name: string;
  company: string | null;
  email: string;
  phone: string | null;
}

export default function ClientActionsMenu({ client }: { client: ClientProps }) {
  const [isPending, startTransition] = useTransition();
  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = () => {
    if (confirm(`Are you sure you want to delete ${client.name}? This will also delete associated deals.`)) {
      startTransition(async () => {
        const res = await deleteClient(client.id);
        if (!res.success) {
          alert(res.error);
        }
      });
    }
  };

  const handleUpdate = async (formData: FormData) => {
    const res = await updateClient(client.id, formData);
    if (res.success) {
      setIsEditing(false);
    } else {
      alert(res.error);
    }
  };

  return (
    <>
      <div className="flex justify-center gap-2">
        <button
          onClick={() => setIsEditing(true)}
          disabled={isPending}
          className="text-slate-600 hover:text-blue-600 px-2 py-1 bg-slate-100 hover:bg-slate-200 rounded border border-slate-200 transition-colors text-xs font-semibold"
        >
          ✏️ Edit
        </button>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className="text-slate-600 hover:text-rose-600 px-2 py-1 bg-slate-100 hover:bg-rose-50 rounded border border-slate-200 transition-colors text-xs font-semibold disabled:opacity-50"
        >
          🗑️ Delete
        </button>
      </div>

      {/* Modal de Edición */}
      {isEditing && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 text-left text-slate-900">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-5 pb-3 border-b border-slate-200">
              <h3 className="text-xl font-bold text-slate-900">Edit Client</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors"
              >
                ✕
              </button>
            </div>

            <form action={handleUpdate} className="flex flex-col gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={client.name}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  defaultValue={client.company || ''}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  defaultValue={client.email}
                  required
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phone"
                  defaultValue={client.phone || ''}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-sm font-medium bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}