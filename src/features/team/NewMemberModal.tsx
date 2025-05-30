import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';

const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Invalid email'),
    phone: z.string().min(10, 'Phone number is required'),
    status: z.enum(['Available', 'Unavailable']),
    gender: z.enum(['Male', 'Female']),
    profileImage: z
        .any()
        .refine(file => file?.[0]?.size <= 2 * 1024 * 1024, 'Max file size is 2MB')
        .refine(file => ['image/jpeg', 'image/png'].includes(file?.[0]?.type), 'Only PNG or JPEG')
        .optional(),
});

type NewMemberFormData = z.infer<typeof schema>;

interface NewMemberModalProps {
    onClose: () => void;
}

export const NewMemberModal: React.FC<NewMemberModalProps> = ({ onClose }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<NewMemberFormData>({
        resolver: zodResolver(schema),
    });

    const onSubmit = (data: NewMemberFormData) => {
        console.log(data);
        onClose();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                >
                    <X size={20} />
                </button>

                <h2 className="text-2xl text-left mb-6">New Member</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div className="flex gap-4">
                        <div className="w-1/2">
                            <label htmlFor='firstName' className="block text-left text-gray-700">First Name <span className="text-red-500">*</span></label>
                            <input
                                id='firstName'
                                type="text"
                                {...register('firstName')}
                                className="w-full border rounded p-2"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                            )}
                        </div>
                        <div className="w-1/2">
                            <label htmlFor='lastName' className="block text-left text-gray-700">Last Name <span className="text-red-500">*</span></label>
                            <input
                                id='lastName'
                                type="text"
                                {...register('lastName')}
                                className="w-full border rounded p-2"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-left text-gray-700">Email <span className="text-red-500">*</span></label>
                        <input
                            id="email"
                            type="email"
                            {...register('email')}
                            className="w-full border rounded p-2"
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                    </div>

                    <div>
                        <label htmlFor='phone' className="block text-left text-gray-700">Phone <span className="text-red-500">*</span></label>
                        <input
                            id="phone"
                            type="text"
                            {...register('phone')}
                            className="w-full border rounded p-2"
                            placeholder="080 123 456"
                        />
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone.message}</p>}
                    </div>

                    <div>
                        <label htmlFor='status' className="block text-left text-gray-700">Status</label>
                        <select id='status' {...register('status')} className="w-full border rounded p-2">
                            <option value="Available">Available</option>
                            <option value="Unavailable">Unavailable</option>
                        </select>
                        {errors.status && <p className="text-red-500 text-sm">{errors.status.message}</p>}
                    </div>

                    <div>
                        <label className="block text-left text-gray-700">Gender</label>
                        <div className="flex items-center gap-4 mt-1">
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Male"
                                    {...register('gender')}
                                    className="mr-2"
                                />
                                Male
                            </label>
                            <label className="flex items-center">
                                <input
                                    type="radio"
                                    value="Female"
                                    {...register('gender')}
                                    className="mr-2"
                                />
                                Female
                            </label>
                        </div>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender.message}</p>}
                    </div>

                    <div>
                        <label className="block mb-2">Upload Profile Image</label>
                        <input
                            type="file"
                            accept="image/png, image/jpeg"
                            {...register('profileImage')}
                            className="block"
                        />
                        {errors.profileImage && (
                            <p className="text-red-500 text-sm">{errors.profileImage.message as string}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">PNG or JPEG (Max. File Size: 2MB)</p>
                    </div>

                    <div className="flex justify-end gap-4 mt-6">
                        <button
                            type="button"
                            onClick={onClose}
                            className="bg-gray-100 px-4 py-2 rounded hover:bg-gray-200"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                        >
                            Add Member
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};
