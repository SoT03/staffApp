import prismadb from '@/lib/prismadb';
import React from 'react';

export default async function EmployeePage({
	params,
}: {
	params: { employeeId: string };
}) {
	const employee = await prismadb.employee.findUnique({
		where: { id: params.employeeId },
	});

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'></div>
		</div>
	);
}
