'use client';
import React from 'react';
import { NavbarProps } from './navbar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function MainNav({ accessLevel }: NavbarProps) {
	const pathname = usePathname();

	const routes = [
		{
			href: '/lists/employees',
			label: 'Employees',
			active: pathname === '/lists/employees',
			accessLevel:
				accessLevel === 'HR Manager' || accessLevel === 'Project Manager'
					? 1
					: 0,
		},
		{
			href: '/lists/projects',
			label: 'Projects',
			active: pathname === '/lists/projects',
			accessLevel: 1,
		},
		{
			href: '/lists/leaverequests',
			label: 'Leave Requests',
			active: pathname === '/lists/leaverequests',
			accessLevel:
				accessLevel === 'HR Manager' || accessLevel === 'Project Manager'
					? 1
					: 0,
		},
		{
			href: '/lists/approvalrequests',
			label: 'Approval Requests',
			active: pathname === '/lists/approvalrequests',
			accessLevel:
				accessLevel === 'HR Manager' || accessLevel === 'Project Manager'
					? 1
					: 0,
		},
	];

	return (
		<nav>
			{routes.map((route) => {
				if (route.accessLevel) {
					return <Link href={route.href}>{route.label}</Link>;
				}
			})}
		</nav>
	);
}
