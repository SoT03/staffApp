'use server';
import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import { redirect } from 'next/navigation';

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
