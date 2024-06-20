'use client';

import { ColumnDef } from '@tanstack/react-table';

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
		header: 'Position',
	},
	{
		accessorKey: 'subdivision',
		header: 'Subdivision',
	},
	{
		accessorKey: 'status',
		header: 'Status',
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
