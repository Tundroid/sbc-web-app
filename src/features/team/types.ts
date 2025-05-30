export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  role: string;
  status: 'Available' | 'Unavailable';
  gender: 'Male' | 'Female';
  updatedAt: string;
  imgUrl: string;
}
