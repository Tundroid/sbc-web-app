import React, { useState } from 'react';
import { mockTeamMembers } from './mockData';
import type { TeamMember } from './types';
import { NewMemberModal } from './NewMemberModal';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../components/Button';

const TeamTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  
  const handleNewMemberSubmit = (data: any) => {
    const newMember: TeamMember = {
      id: uuidv4(),
      ...data,
      status: data.status as TeamMember['status'],
      updatedAt: new Date().toISOString(),
    };
    setTeamMembers(prev => [...prev, newMember]);
    closeModal();
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Team Members</h2>
        <button
          onClick={openModal}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          New Member
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="py-2 px-4 border-b">Member</th>
              <th className="py-2 px-4 border-b">Role</th>
              <th className="py-2 px-4 border-b">Status</th>
              <th className="py-2 px-4 border-b">Last Updated</th>
              <th className="py-2 px-4 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {teamMembers.map((member: TeamMember) => (
              <tr key={member.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {member.firstName} {member.lastName}
                </td>
                <td className="py-2 px-4 border-b">-</td>
                <td className="py-2 px-4 border-b">
                  <span
                    className={`px-2 py-1 rounded text-sm font-medium ${
                      member.status === 'Active'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td className="py-2 px-4 border-b">
                  {new Date(member.updatedAt).toLocaleDateString()}
                </td>
                <td className="py-2 px-4 border-b">
                    <Button variant='outline'>View Details</Button>
                  {/* <button className="text-blue-600 hover:underline"></button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <NewMemberModal onClose={closeModal} onSubmit={handleNewMemberSubmit} />
      )}
    </div>
  );
};

export { TeamTable };
