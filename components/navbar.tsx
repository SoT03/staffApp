'use client';
import React from 'react';
import MainNav from './mainNav';
import { Button } from './ui/button';

import { logout } from '@/actions/authenticate';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export interface NavbarProps {
	accessLevel: string | undefined;
}

export default function Navbar({ accessLevel }: NavbarProps) {
	const router = useRouter();

	const handleLogout = async () => {
		const errorMessage = await logout();
		if (errorMessage) {
			toast.error(errorMessage);
			return null;
		}

		toast.success('You have been logged out successfully');
		router.push('/');
	};

	return (
		<div className='border-b bg-sky-500'>
			<div className='flex h-16 items-center px-20'>
				<MainNav accessLevel={accessLevel} />
				<Button
					variant='destructive'
					className='ml-auto flex items-center '
					onClick={handleLogout}>
					Logout
				</Button>
			</div>
		</div>
	);
}
