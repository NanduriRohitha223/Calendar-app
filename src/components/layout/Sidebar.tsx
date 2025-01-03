import { Link, useLocation } from 'react-router-dom';
import { Calendar, Users, BarChart2, Settings } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Calendar },
  { name: 'Companies', href: '/companies', icon: Users },
  { name: 'Reports', href: '/reports', icon: BarChart2 },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col bg-gray-900">
      <div className="flex h-16 items-center px-4">
        <h1 className="text-xl font-bold text-white">CommTracker</h1>
      </div>
      <nav className="flex-1 space-y-1 px-2 py-4">
        {navigation.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={twMerge(
                'group flex items-center rounded-md px-2 py-2 text-sm font-medium',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              )}
            >
              <item.icon
                className={twMerge(
                  'mr-3 h-6 w-6',
                  isActive
                    ? 'text-white'
                    : 'text-gray-400 group-hover:text-white'
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}