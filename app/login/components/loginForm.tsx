'use client';
import React from 'react';
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
import axios from 'axios';

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
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			emailAddress: '',
			pin: '',
		},
	});

	const handleSubmit = async (values: z.infer<typeof formSchema>) => {
		
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
				<Button type='submit' className='mt-6 max-w-md w-full md:my-8'>
					Login
				</Button>
			</form>
		</Form>
	);
}
