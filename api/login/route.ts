import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
	try {
		const body = await req.json();
		const { emailAddress, pin } = body;

		if (!emailAddress) {
			return new NextResponse('Email address is required', { status: 400 });
		}
		if (!pin) {
			return new NextResponse('Pin is required', { status: 400 });
		}

		const loginData = prismadb.employee.findFirst({
			where: {
				email: emailAddress,
				pin,
			},
		});

		return NextResponse.json(loginData);
	} catch (error) {
		console.log('[LOGIN_GET]', error);
		return new NextResponse('Interal error', { status: 500 });
	}
}
