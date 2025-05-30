import React, { useState } from 'react';
import { mockTeamMembers } from './mockData';
import type { TeamMember } from './types';
import { NewMemberModal } from './NewMemberModal';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '../../components/Button';
import TeamTableView from './TeamTableView';
import Member from './Member';
import { Tag } from 'antd';

const TeamTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(mockTeamMembers);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const columns = [
    // { header: "Date", accessorKey: "date", cell: (info: any) => Util.formatDate(info.getValue(), "medium") },
    {
      header: "Member", accessorKey: "member",
      cell: ({ row }: any) => (
        <>
          <Member
            name={`${row.original.firstName} ${row.original.lastName}`}
            email={row.original.email}
            phone={row.original.phone}
            imageUrl={row.original.imgUrl}
          />
        </>
      ),
    },
    { header: "Role", accessorKey: "role" },
    { header: "Status", accessorKey: "status",
      cell: ({ row }: any) => (
        <Tag color={row.original.status === 'Available' ? 'green' : 'red'}>
          {row.original.status}
        </Tag>
      )
     },
    {
      header: "Last Updated",
      accessorKey: "updatedAt",
      cell: ({ row }: any) => (
        <span>
          {new Date(row.original.updatedAt).toLocaleString(undefined, {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: any) => (
        <>
          <Button variant='outline'>View Details</Button>
        </>
      ),
    },
  ];


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
        <Button
          variant="primary"
          //   size="md"
          isLoading={false}
          disabled={false}
          onClick={openModal}
        >
          New Member
        </Button>
      </div>

      <TeamTableView
        columns={columns}
        data={teamMembers}
        globalFilter={''}
        setGlobalFilter={() => { }}
        totals={[]}
      >
      </TeamTableView>
      <div className="overflow-x-auto">

       
      </div>

      {/* Modal */}
      {isModalOpen && (
        <NewMemberModal onClose={closeModal} onSubmit={handleNewMemberSubmit} />
      )}
    </div>
  );
};

export { TeamTable };
