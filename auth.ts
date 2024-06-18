import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import Credentials from 'next-auth/providers/credentials';
import * as z from 'zod';
import prismadb from './lib/prismadb';
import { User } from './types';
import bcrypt from 'bcrypt';

async function getUser(emailAddress: string): Promise<User | undefined> {
	try {
		const user = await prismadb.employee.findFirst({
			where: {
				email: emailAddress,
			},
		});
		return user as User | undefined;
	} catch (error) {
		console.error('Failed to fetch user:', error);
		throw new Error('Failed to fetch user.');
	}
}

export const { auth, signIn, signOut } = NextAuth({
	...authConfig,
	providers: [
		Credentials({
			async authorize(credentials) {
				const parsedCredentials = z
					.object({
						emailAddress: z.string().email(),
						pin: z
							.string()
							.max(4, { message: 'Pin must contain 4 numbers.' })
							.min(4, { message: 'Pin must contain 4 numbers.' })
							.refine((val) => !Number.isNaN(parseInt(val)), {
								message: 'Expected number, received a string.',
							}),
					})
					.safeParse(credentials);

				if (parsedCredentials.success) {
					const { emailAddress, pin } = parsedCredentials.data;
					const user = await getUser(emailAddress);
					if (!user) return null;
					const pinsMatches = await bcrypt.compare(pin, user.pin.toString());
					if (pinsMatches) return user;
				}
				console.log('Invalid credentials');
				return null;
			},
		}),
	],
});
