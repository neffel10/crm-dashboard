'use server';

import { prisma } from '@/lib/db';
import { LeadStage } from '@prisma/client';
import { revalidatePath } from 'next/cache';



// Update deal stage (e.g. moving from NEW to QUALIFIED)
export async function updateDealStage(dealId: string, newStage: LeadStage) {
  try {
    const updatedDeal = await prisma.deal.update({
      where: { id: dealId },
      data: { stage: newStage },
    });

    revalidatePath('/deals');
    return { success: true, data: updatedDeal };
  } catch (error) {
    console.error('Error updating deal stage:', error);
    return { success: false, error: 'Failed to update deal stage' };
  }
}

// Agrega esta función al final de actions/dealActions.ts

export async function createDeal(formData: FormData) {
  const title = formData.get('title') as string;
  const valueStr = formData.get('value') as string;
  const clientId = formData.get('clientId') as string;
  const stage = (formData.get('stage') as LeadStage) || LeadStage.NEW;

  if (!title || !valueStr || !clientId) {
    return { success: false, error: 'Title, Value, and Client are required.' };
  }

  try {
    const newDeal = await prisma.deal.create({
      data: {
        title,
        value: parseFloat(valueStr),
        stage,
        clientId,
      },
    });

    revalidatePath('/deals');
    revalidatePath('/'); // Revalida también las métricas del Dashboard
    return { success: true, data: newDeal };
  } catch (error) {
    console.error('Error creating deal:', error);
    return { success: false, error: 'Failed to create deal.' };
  }
}

export async function getDeals() {
  try {
    const deals = await prisma.deal.findMany({
      include: {
        client: true,
        assignedTo: true,
        activities: {
          orderBy: { createdAt: 'desc' },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return { success: true, data: deals };
  } catch (error) {
    console.error('Error fetching deals:', error);
    return { success: false, error: 'Failed to fetch deals' };
  }
}