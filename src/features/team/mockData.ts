import type { TeamMember } from './types';
import { v4 as uuidv4 } from 'uuid';
import avatar01 from '../../assets/avatar-image-01.png';
import avatar02 from '../../assets/avatar-image-02.png';
import avatar03 from '../../assets/avatar-image-03.png';
import avatar04 from '../../assets/avatar-image-04.png';
import avatar05 from '../../assets/avatar-image-05.png';
import avatar06 from '../../assets/avatar-image-06.png';
import avatar07 from '../../assets/avatar-image-07.png';
import avatar08 from '../../assets/avatar-image-08.png';
import avatar09 from '../../assets/avatar-image-09.png';
import avatar10 from '../../assets/avatar-image-10.png';
import avatar11 from '../../assets/avatar-image-11.png';
import avatar12 from '../../assets/avatar-image-12.png';
import avatar13 from '../../assets/avatar-image-13.png';
import avatar14 from '../../assets/avatar-image-14.png';
import avatar15 from '../../assets/avatar-image-15.png';
import avatar16 from '../../assets/avatar-image-16.png';
import avatar17 from '../../assets/avatar-image-17.png';
import avatar18 from '../../assets/avatar-image-18.png';

export const imageUrls = [
    avatar01,
    avatar02,
    avatar03,
    avatar04,
    avatar05,
    avatar06,
    avatar07,
    avatar08,
    avatar09,
    avatar10,
    avatar11,
    avatar12,
    avatar13,
    avatar14,
    avatar15,
    avatar16,
    avatar17,
    avatar18,
];

export const roles = [
    'Developer',
    'Designer',
    'Product Manager',
    'QA Engineer',
    'DevOps Engineer',
    'Scrum Master',
    'Business Analyst',
    'Support Engineer',
    'HR Specialist',
    'Marketing Manager'
];

export const mockTeamMembers: TeamMember[] = Array.from({ length: 30 }, (_, i) => ({
    //   id: crypto.randomUUID(),
    id: uuidv4(),
    firstName: `John${i}`,
    lastName: `Doe${i}`,
    email: `john${i}@example.com`,
    phone: `+12345678${i}`,
    role: roles[i % roles.length],
    imgUrl: imageUrls[i % imageUrls.length],
    status: i % 2 === 0 ? 'Available' : 'Unavailable',
    gender: i % 2 === 0 ? 'Male' : 'Female',
    updatedAt: new Date().toISOString(),
}));
