import React from 'react';
import EmployeesClient from './components/client';
import prismadb from '@/lib/prismadb';

export default async function EmployeesPage() {
	const employees = await prismadb.employee.findMany();

	const formattedEmployess = employees.map((employee) => ({
		pin: employee.pin,
		id: employee.id,
		fullName: employee.fullName,
		email: employee.email,
		subdivision: employee.subdivision,
		position: employee.position,
		status: employee.status,
		outOfOfficeBalance: employee.outOfOfficeBalance,
		peoplePartnerId: employees.find(
			(emp) => emp.id === employee.peoplePartnerId
		)!.fullName,
	}));

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<EmployeesClient data={formattedEmployess} />
			</div>
		</div>
	);
}
