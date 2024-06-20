import prismadb from '@/lib/prismadb';
import React from 'react';
import EmployeeForm from './components/employee-form';

export default async function EmployeePage({
	params,
}: {
	params: { employeeId: string };
}) {
	const employee = await prismadb.employee.findUnique({
		where: { id: params.employeeId },
	});

	const HRmanagersList = await prismadb.employee.findMany({
		where: {
			position: 'HR Manager',
		},
	});

	

	const subdivisionsList = ['Reception', 'Quality Control', 'Storage'];
	const positionList = ['HR Manager', 'Project Manager', 'Employee'];

	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<EmployeeForm
					HRmanagers={HRmanagersList}
					initialData={employee}
					subdivisionList={subdivisionsList}
					positionList={positionList}
				/>
			</div>
		</div>
	);
}
