import { auth } from '@/auth';
import prismadb from '@/lib/prismadb';
import React from 'react';

export default async function MainLayout() {
	const session = await auth();

	const accessLevel = await prismadb.employee.findFirst({
		where: {
			email: session?.user?.email!,
		},
		select: {
			position: true,
		},
	});

	return <div>layout</div>;
}
