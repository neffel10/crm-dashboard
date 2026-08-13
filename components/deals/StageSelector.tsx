'use client';

import { useTransition } from 'react';
import { LeadStage } from '@prisma/client';
import { updateDealStage } from '@/actions/dealActions';

interface StageSelectorProps {
  dealId: string;
  currentStage: LeadStage;
}

const STAGES: { label: string; value: LeadStage }[] = [
  { label: 'New', value: LeadStage.NEW },
  { label: 'Contacted', value: LeadStage.CONTACTED },
  { label: 'Qualified', value: LeadStage.QUALIFIED },
  { label: 'Proposal Sent', value: LeadStage.PROPOSAL_SENT },
  { label: 'Won', value: LeadStage.WON },
  { label: 'Lost', value: LeadStage.LOST },
];

export default function StageSelector({ dealId, currentStage }: StageSelectorProps) {
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStage = e.target.value as LeadStage;
    startTransition(async () => {
      await updateDealStage(dealId, newStage);
    });
  };

  return (
    <select
      value={currentStage}
      onChange={handleChange}
      disabled={isPending}
      className={`text-xs font-semibold px-2 py-1 rounded border border-slate-300 bg-white text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer ${
        isPending ? 'opacity-50' : ''
      }`}
    >
      {STAGES.map((s) => (
        <option key={s.value} value={s.value} className="bg-white text-slate-900">
          {s.label}
        </option>
      ))}
    </select>
  );
}