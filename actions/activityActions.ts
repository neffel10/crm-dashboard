'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Obtener todas las actividades pertenecientes a un Deal específico
export async function getActivitiesByDeal(dealId: string) {
  try {
    const activities = await prisma.activity.findMany({
      where: { dealId },
      orderBy: { createdAt: 'desc' },
      include: {
        user: true, // Incluye el usuario que registró la actividad si aplica
      },
    });
    return { success: true, data: activities };
  } catch (error) {
    console.error('Error fetching activities:', error);
    return { success: false, error: 'Failed to fetch activities' };
  }
}

// Crear una nueva actividad asociada a un Deal
export async function createActivity(formData: FormData) {
  const type = formData.get('type') as string;
  const note = formData.get('note') as string;
  const dealId = formData.get('dealId') as string;

  if (!type || !note || !dealId) {
    return { success: false, error: 'Type, Note, and Deal ID are required.' };
  }

  try {
    const newActivity = await prisma.activity.create({
      data: {
        type,
        note,
        dealId,
      },
    });

    revalidatePath('/deals');
    return { success: true, data: newActivity };
  } catch (error) {
    console.error('Error creating activity:', error);
    return { success: false, error: 'Failed to create activity.' };
  }
}