import Link from "next/link";

interface DappCardProps {
    title: string;
    link: string;
    objectives: string[];
}

export function DappCard({ title, link, objectives }: DappCardProps) {
    return (
        <Link href={link} className="block rounded-lg border border-gray-200 shadow-md 
        transition-all duration-300 
        hover:shadow-xl hover:scale-[1.02] 
        hover:border-indigo-300 
        overflow-hidden">
            <div>
                {/* IDEA is to have a photo  for top half */}
                {/* <svg className="w-full h-48" viewBox="0 0 200 100" xmlns="http://www.w3.org/2000/svg">
                    <rect width="200" height="100" fill="#4338ca" />
                    <circle cx="150" cy="25" r="15" fill="#818cf8" />
                    <path d="M20,80 Q100,20 180,80" stroke="#a5b4fc" strokeWidth="5" fill="none" />
                    <path d="M50,30 L80,60 L110,30" stroke="#ffffff" strokeWidth="4" fill="none" />
                    <rect x="120" y="40" width="30" height="30" fill="#c7d2fe" />
                </svg> */}

                {/* Content for bottom half */}
                <div className="p-6">
                    <h2 className="text-xl font-bold mb-3 text-gray-800 dark:text-gray-100">{title}</h2>
                    <div>
                        <h3 className="font-semibold text-gray-700 dark:text-gray-300">Obj:</h3>
                        <ul className="list-disc list-inside mt-2">
                            {objectives.map((objective, index) => (
                                <li key={index} className="text-sm text-gray-600 dark:text-gray-400 py-1">{objective}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </Link>
    );
}
