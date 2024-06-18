'use client';
import React, { useState } from 'react';

import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

import { authenticate } from '@/actions/authenticate';
import toast from 'react-hot-toast';

const formSchema = z.object({
	emailAddress: z.string().email(),
	pin: z
		.string()
		.max(4, { message: 'Pin must contain 4 numbers.' })
		.min(4, { message: 'Pin must contain 4 numbers.' })
		.refine((val) => !Number.isNaN(parseInt(val)), {
			message: 'Expected number, received a string.',
		}),
});

export default function LoginForm() {
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			emailAddress: '',
			pin: '',
		},
	});

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		setIsLoading(true);
		const err = await authenticate({ ...values });
		if (err) {
			toast.error(err);
			return setIsLoading(false);
		}
		toast.success('You have been logged in successfully');
		setIsLoading(false);
	};

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(handleSubmit)}>
				<div className='flex flex-col gap-6'>
					<FormField
						name='emailAddress'
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											placeholder='example@gmail.com'
											type='email'
											{...field}
										/>
									</FormControl>

									<FormMessage />
								</FormItem>
							);
						}}
					/>
					<FormField
						name='pin'
						control={form.control}
						render={({ field }) => {
							return (
								<FormItem>
									<FormLabel>Pin</FormLabel>
									<FormControl>
										<Input placeholder='1234' type='number' {...field} />
									</FormControl>

									<FormMessage />
								</FormItem>
							);
						}}
					/>
				</div>
				<Button
					type='submit'
					disabled={isLoading}
					className='mt-6 max-w-md w-full md:my-8'>
					{isLoading ? 'Logging...' : 'Login'}
				</Button>
			</form>
		</Form>
	);
}
