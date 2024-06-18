
import Link from 'next/link';

export default function Home() {
	return (
		<main className='flex items-center justify-center md:h-screen'>
			<Link href='/login'>Login</Link>
		</main>
	);
}
