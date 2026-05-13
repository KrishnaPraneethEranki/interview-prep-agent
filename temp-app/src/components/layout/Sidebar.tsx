import Link from 'next/link';

export function Sidebar() {
  const links = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'Tracks', href: '/tracks/full-stack' }, // Using a placeholder track ID
    { name: 'History', href: '/history' },
    { name: 'Analytics', href: '/analytics' },
  ];

  return (
    <aside className="w-64 border-r border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 hidden md:flex flex-col">
      <div className="p-6">
        <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Prep Coach</h2>
      </div>
      <nav className="flex-1 px-4 space-y-2">
        {links.map((link) => (
          <Link 
            key={link.name} 
            href={link.href}
            className="block px-4 py-2 rounded-md text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-50 transition-colors"
          >
            {link.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
