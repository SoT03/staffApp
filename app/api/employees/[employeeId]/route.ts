import prismadb from '@/lib/prismadb';
import { useSession } from 'next-auth/react';
import { NextResponse } from 'next/server';
import React from 'react';

export async function PATCH(
	req: Request,
	{ params }: { params: { employeeId: string } }
) {
	try {
		const { data: session, status: authStatus } = useSession();

		const body = await req.json();

		if (authStatus !== 'authenticated') {
			return new NextResponse('Unauthenticated', { status: 401 });
		}

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

		if (!params.employeeId) {
			return new NextResponse('Employee Id is required', { status: 400 });
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

		const employee = await prismadb.employee.updateMany({
			where: { id: params.employeeId },
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
		console.log('[EMPLOYEE_DELETE]', error);
		return new NextResponse('Iternal error', { status: 500 });
	}
}

export async function DELETE(
	req: Request,
	{ params }: { params: { employeeId: string } }
) {
	try {
		const { data: session, status: authStatus } = useSession();

		const body = await req.json();

		if (authStatus !== 'authenticated') {
			return new NextResponse('Unauthenticated', { status: 401 });
		}

		if (!params.employeeId) {
			return new NextResponse('Employee id is required', { status: 400 });
		}

		const employee = await prismadb.employee.deleteMany({
			where: { id: params.employeeId },
		});

		return NextResponse.json(employee);
	} catch (error) {
		console.log('[EMPLOYEE_DELETE]', error);
		return new NextResponse('Iternal error', { status: 500 });
	}
}
export async function GET(
	req: Request,
	{ params }: { params: { employeeId: string } }
) {
	try {
		if (!params.employeeId) {
			return new NextResponse('Employee id is required', { status: 400 });
		}

		const employee = await prismadb.employee.findUnique({
			where: { id: params.employeeId },
		});

		return NextResponse.json(employee);
	} catch (error) {
		console.log('[BILLBOARD_GET]', error);
		return new NextResponse('Iternal error', { status: 500 });
	}
}
