'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';

// Fetch all clients with their associated deals count
export async function getClients(searchQuery?: string) {
  try {
    const clients = await prisma.client.findMany({
      where: searchQuery
        ? {
            OR: [
              { name: { contains: searchQuery, mode: 'insensitive' } },
              { company: { contains: searchQuery, mode: 'insensitive' } },
              { email: { contains: searchQuery, mode: 'insensitive' } },
            ],
          }
        : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        deals: true,
      },
    });
    return { success: true, data: clients };
  } catch (error) {
    console.error('Error fetching clients:', error);
    return { success: false, error: 'Failed to fetch clients' };
  }
}

// Create a new client from form data
export async function createClient(formData: FormData) {
  const name = formData.get('name') as string;
  const company = formData.get('company') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;

  if (!name || !email) {
    return { success: false, error: 'Name and Email are required fields.' };
  }

  try {
    const newClient = await prisma.client.create({
      data: {
        name,
        company: company || null,
        email,
        phone: phone || null,
      },
    });

    // Refresh cache for the clients page automatically
    revalidatePath('/clients');
    return { success: true, data: newClient };
  } catch (error) {
    console.error('Error creating client:', error);
    return { success: false, error: 'Failed to create client. Email might already exist.' };
  }
}

// Agrega estas funciones al final de actions/clientActions.ts

export async function deleteClient(clientId: string) {
  try {
    // 1. Eliminar actividades y tratos asociados primero (cascade delete manual si no está en el schema)
    await prisma.activity.deleteMany({ where: { deal: { clientId } } });
    await prisma.deal.deleteMany({ where: { clientId } });
    
    // 2. Eliminar el cliente
    await prisma.client.delete({
      where: { id: clientId },
    });

    revalidatePath('/clients');
    revalidatePath('/deals');
    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting client:', error);
    return { success: false, error: 'Failed to delete client.' };
  }
}

export async function updateClient(clientId: string, formData: FormData) {
  const name = formData.get('name') as string;
  const company = formData.get('company') as string;
  const email = formData.get('email') as string;
  const phone = formData.get('phone') as string;

  if (!name || !email) {
    return { success: false, error: 'Name and Email are required.' };
  }

  try {
    const updated = await prisma.client.update({
      where: { id: clientId },
      data: {
        name,
        company: company || null,
        email,
        phone: phone || null,
      },
    });

    revalidatePath('/clients');
    return { success: true, data: updated };
  } catch (error) {
    console.error('Error updating client:', error);
    return { success: false, error: 'Failed to update client.' };
  }
}