import type { TeamMember } from './types';
import { v4 as uuidv4 } from 'uuid';

export const mockTeamMembers: TeamMember[] = Array.from({ length: 30 }, (_, i) => ({
    //   id: crypto.randomUUID(),
    id: uuidv4(),
    firstName: `John${i}`,
    lastName: `Doe${i}`,
    email: `john${i}@example.com`,
    phone: `+12345678${i}`,
    status: i % 2 === 0 ? 'Active' : 'Inactive',
    gender: i % 2 === 0 ? 'Male' : 'Female',
    updatedAt: new Date().toISOString(),
}));
