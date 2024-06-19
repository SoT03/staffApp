import React from 'react';
import EmployeesClient from './components/client';

export default function EmployeesPage() {
	return (
		<div className='flex-col'>
			<div className='flex-1 space-y-4 p-8 pt-6'>
				<EmployeesClient />
			</div>
		</div>
	);
}
