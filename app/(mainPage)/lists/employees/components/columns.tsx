'use client';

import { Button } from '@/components/ui/button';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export type EmployeeColumn = {
	id: string;
	fullName: string;
	email: string;
	subdivision: string;
	position: string;
	status: string;
	outOfOfficeBalance: number;
	peoplePartnerId: string | undefined;
};

export const columns: ColumnDef<EmployeeColumn>[] = [
	{
		accessorKey: 'fullName',
		header: 'Full Name',
	},
	{
		accessorKey: 'email',
		header: 'Email',
	},
	{
		accessorKey: 'position',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Position
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'subdivision',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Subdivison
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'status',
		header: ({ column }) => {
			return (
				<Button
					variant='ghost'
					onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
					Status
					<ArrowUpDown className='ml-2 h-4 w-4' />
				</Button>
			);
		},
	},
	{
		accessorKey: 'outOfOfficeBalance',
		header: 'Out of Office Balance',
	},
	{
		accessorKey: 'peoplePartnerId',
		header: 'People Partner',
	},
];
