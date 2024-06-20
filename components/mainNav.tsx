'use client';
import React from 'react';
import { NavbarProps } from './navbar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';

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
			accessLevel: 1,
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
		<nav className='flex items-center space-x-4 lg:space-x-8 '>
			{routes.map((route) => {
				if (route.accessLevel) {
					return (
						<Link
							key={route.label}
							href={route.href}
							className={cn(
								'relative text-sm font-medium transition-all lg:text-base before:left-0 before:bottom-0 text-white before:bg-white before:w-0 before:h-px before:transition-[width] before:duration-500  before:absolute   before:content-[""] hover:before:w-full',
								route.active ? 'before:w-full  ' : ''
							)}>
							{route.label}
						</Link>
					);
				}
			})}
		</nav>
	);
}
