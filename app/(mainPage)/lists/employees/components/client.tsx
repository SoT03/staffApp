'use client';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import React from 'react';
import { Plus } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EmployeesClient() {
	const router = useRouter();

	return (
		<div className='flex items-center justify-between'>
			<Heading title='Employees List' description='Manage employees' />
			<Button
				onClick={() => router.push(`/lists/employees/new`)}
				className='bg-sky-500 hover:bg-sky-400'>
				<Plus className='mr-2 h-4 w-4' /> Add new employee
			</Button>
		</div>
	);
}
