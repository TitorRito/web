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

    // Function to check if the route is active
    const isRouteActive = (routePath: string) => {
        // Check if pathname exactly matches or starts with the route path followed by a slash
        return pathname === routePath ||
            (pathname.startsWith(routePath + '/') && routePath !== '/');
    };

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
                            <Link
                                href={route.path}
                                className={`:underline ${isRouteActive(route.path) ? 'border-b-2 border-blue-500 pb-1' : ''}`}
                            >
                                {route.name}
                            </Link>
                        </li>
                    ))}
                </ul>
        </nav>
    );
}
