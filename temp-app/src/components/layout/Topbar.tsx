import { ThemeToggle } from './ThemeToggle';

export function Topbar() {
  return (
    <header className="h-16 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 flex items-center justify-between px-6">
      <div className="flex items-center md:hidden">
        {/* Mobile menu button placeholder */}
        <span className="font-bold">Prep Coach</span>
      </div>
      <div className="flex-1" /> {/* Spacer */}
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-sm font-medium">
          U
        </div>
      </div>
    </header>
  );
}
