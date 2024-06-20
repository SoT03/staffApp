'use server';
import { auth, signIn, signOut } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';
import toast from 'react-hot-toast';

// ...

export async function authenticate(formData: any) {
	try {
		await signIn('credentials', {
			...formData,
			redirectTo: '/',
		});
	} catch (error) {
		if (error instanceof AuthError) {
			return 'Invalid credentials.';
		}

		throw error;
	}
}

export async function logout() {
	try {
		await signOut();
	} catch (error) {
		if (error instanceof AuthError) {
			return 'Something went wrong';
		}
	}
}

export async function checkAuth(data: string) {
	if (data === 'Employee') {
		console.log('working');
		redirect('/notallowed');
	}
}
