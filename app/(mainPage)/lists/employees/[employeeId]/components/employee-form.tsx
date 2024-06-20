'use client';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import Heading from '@/components/ui/heading';
import { Separator } from '@/components/ui/separator';
import { Employee } from '@prisma/client';
import { Trash } from 'lucide-react';
import React, { useState } from 'react';
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
import toast from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import AlertModal from '@/components/modals/alert-modal';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

interface EmployeeFormProps {
	initialData: Employee | null;
	subdivisionList: string[];
	positionList: string[];
	HRmanagers: Employee[];
}

const formSchema = z.object({
	fullName: z.string().min(1),
	email: z.string().email(),
	pin: z
		.string()
		.max(4, { message: 'Pin must contain 4 numbers.' })
		.min(4, { message: 'Pin must contain 4 numbers.' })
		.refine((val) => !Number.isNaN(parseInt(val)), {
			message: 'Expected number, received a string.',
		}),
	subdivision: z.string().min(1),
	position: z.string().min(1).default('employee'),
	status: z.string().min(1).default('active'),
	peoplePartnerId: z.string().min(1),
	outOfOfficeBalance: z.number().default(21),
});

type EmployeeFormValues = z.infer<typeof formSchema>;

export default function EmployeeForm({
	initialData,
	subdivisionList,
	positionList,
	HRmanagers,
}: EmployeeFormProps) {
	const [open, setOpen] = useState(false);
	const [loading, setLoading] = useState(false);

	const params = useParams();
	const router = useRouter();

	const title = initialData ? 'Edit Employee profile' : 'Create a new Employee';
	const description = initialData
		? 'Edit a Employee profile'
		: 'Add a new Employee profile';
	const toastMessage = initialData
		? 'Employee profile updated'
		: 'Employee profile created.';
	const action = initialData ? 'Save changes' : 'Add';

	const form = useForm<EmployeeFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			pin: '',
			email: '',
			fullName: '',
			subdivision: '',
			position: '',
			status: '',
			peoplePartnerId: '',
			outOfOfficeBalance: 0,
		},
	});

	const onSubmit = async (data: EmployeeFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(`/api/employees/${params.employeeId}`, data);
			} else {
				await axios.post(`/api/employees`, data);
			}
			router.push(`/employees`);
			router.refresh();
			toast.success(toastMessage);
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
		}
	};

	const onDelete = async () => {
		try {
			setLoading(true);

			await axios.delete(
				`/api/employees/${params.employeeId}`
			);
			router.refresh();
			router.push(`/${params.storeId}/billboards`);
			toast.success('Billboard deleted.');
		} catch (error) {
			toast.error('Something went wrong');
		} finally {
			setLoading(false);
			setOpen(false);
		}
	};

	return (
		<>
			<AlertModal
				isOpen={open}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
				loading={loading}
			/>
			<div className='flex items-center justify-between'>
				<Heading title={title} description={description} />
				{initialData && (
					<Button
						variant='destructive'
						size='icon'
						onClick={() => {
							setOpen(true);
						}}
						disabled={loading}>
						<Trash className='h-4 w-4' />
					</Button>
				)}
			</div>
			<Separator />
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='space-y-8 w-full'>
					<div className='grid grid-cols-3 gap-8'>
						<FormField
							control={form.control}
							name='fullName'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Full Name</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='John Doe'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='email'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email </FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder='example@company.com'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='position'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Position</FormLabel>
									<FormControl>
										<Select
											disabled={loading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={field.value}
														aria-placeholder='Select a position'
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{positionList.map((position) => (
													<SelectItem key={position} value={position}>
														{position}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='subdivision'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Subdivision</FormLabel>
									<FormControl>
										<Select
											disabled={loading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={field.value}
														aria-placeholder='Select a subidivison'
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{subdivisionList.map((subdivision) => (
													<SelectItem key={subdivision} value={subdivision}>
														{subdivision}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='peoplePartnerId'
							render={({ field }) => (
								<FormItem>
									<FormLabel>People Partner</FormLabel>
									<FormControl>
										<Select
											disabled={loading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={field.value}
														aria-placeholder='Select a subidivison'
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{HRmanagers.map((manager) => (
													<SelectItem key={manager.id} value={manager.id}>
														{manager.fullName}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='status'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Status</FormLabel>
									<FormControl>
										<Select
											disabled={loading}
											onValueChange={field.onChange}
											value={field.value}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger>
													<SelectValue
														defaultValue={field.value}
														aria-placeholder='Select a Status'
													/>
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value='Active'>Active</SelectItem>
												<SelectItem value='Inactive'>Inactive</SelectItem>
											</SelectContent>
										</Select>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='outOfOfficeBalance'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Out of office days avaible</FormLabel>
									<FormControl>
										<Input
											disabled={loading}
											placeholder=''
											{...field}
											type='number'
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name='pin'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Account login pin</FormLabel>
									<FormControl>
										<Input disabled={loading} placeholder='1234' {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} className='ml-auto' type='submit'>
						{action}
					</Button>
				</form>
			</Form>
			<Separator />
		</>
	);
}
