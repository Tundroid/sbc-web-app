export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  gender: 'Male' | 'Female';
  updatedAt: string;
}
