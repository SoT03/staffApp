import { auth } from '@/auth';
import Navbar from '@/components/navbar';
import prismadb from '@/lib/prismadb';

import React from 'react';

export default async function MainLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const session = await auth();

	const accessLevel = await prismadb.employee.findFirst({
		where: {
			email: session?.user?.email!,
		},
		select: {
			position: true,
		},
	});

	return (
		<>
			<Navbar accessLevel={accessLevel?.position} />
			{children}
		</>
	);
}
