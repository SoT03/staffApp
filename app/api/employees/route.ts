import { auth } from '@/auth';
import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
	try {
		const body = await req.json();

		const session = await auth();

		const {
			pin,
			email,
			fullName,
			subdivision,
			position,
			status,
			peoplePartnerId,
			outOfOfficeBalance,
		} = body;

		if (!session?.user) {
			return new NextResponse('Unauthenticated', { status: 500 });
		}

		if (!pin) {
			return new NextResponse('Pin is required', { status: 400 });
		}
		if (!email) {
			return new NextResponse('Email is required', { status: 400 });
		}
		if (!fullName) {
			return new NextResponse('Full Name is required', { status: 400 });
		}
		if (!subdivision) {
			return new NextResponse('Subdivision is required', { status: 400 });
		}
		if (!position) {
			return new NextResponse('Position is required', { status: 400 });
		}
		if (!status) {
			return new NextResponse('Status is required', { status: 400 });
		}
		if (!peoplePartnerId) {
			return new NextResponse('People Partner is required', { status: 400 });
		}
		if (!outOfOfficeBalance) {
			return new NextResponse('Out of office is required', { status: 400 });
		}

		const employee = await prismadb.employee.create({
			data: {
				pin,
				email,
				fullName,
				subdivision,
				position,
				status,
				peoplePartnerId,
				outOfOfficeBalance,
			},
		});

		return NextResponse.json(employee);
	} catch (error) {
		console.log('[EMPLOYEES_POST]', error);
		return new NextResponse('Interal error', { status: 500 });
	}
}

export async function GET(req: Request) {
	try {
		const employees = await prismadb.employee.findMany();

		return NextResponse.json(employees);
	} catch (error) {
		console.log('[EMPLOYEES_GET]', error);
		return new NextResponse('Interal error', { status: 500 });
	}
}
