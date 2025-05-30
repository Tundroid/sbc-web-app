import React from 'react';

interface Props {
  name: string;
  email: string;
  phone: string;
  imageUrl: string;
}

const Member: React.FC<Props> = ({ name, email, phone, imageUrl }) => {
  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md w-fit">
      <img
        src={imageUrl}
        alt={name}
        className="w-16 h-16 rounded-md object-cover"
      />
      <div>
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-600">{email}</p>
        <p className="text-gray-600">{phone}</p>
      </div>
    </div>
  );
};

export default Member;
