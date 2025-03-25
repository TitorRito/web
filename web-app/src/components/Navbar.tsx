'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
    { name: 'Metana', path: '/metana' },
    { name: 'Education', path: '/education' },
    { name: 'Hobbies', path: '/hobbies' },
];

export default function Navbar() {
    const pathname = usePathname();
    const isHomePage = pathname === '/';

    return (
        <nav className="sticky top-0 p-4 flex justify-between shadow-md backdrop-blur-sm">
            <div>
                {!isHomePage && (
                    <Link href="/" className="hover:underline">
                        🏠
                    </Link>
                )}
            </div>
            <ul className="flex space-x-6">
                {routes.map((route) => (
                    <li key={route.name}>
                        <Link href={route.path} className="hover:underline">
                            {route.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
