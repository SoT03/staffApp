import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import LoginForm from './components/loginForm';

export default function LoginPage() {
	return (
		<main className='flex items-center justify-center md:h-screen'>
			<div className='relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4 md:-mt-32'>
				<Card >
					<CardHeader>
						<CardTitle>Login</CardTitle>
						<CardDescription>into your account</CardDescription>
					</CardHeader>
					<CardContent>
						<LoginForm />
					</CardContent>
				</Card>
			</div>
		</main>
	);
}
