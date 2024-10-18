'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

const NavBar = () => {
  const pathname = usePathname();
  const t = useTranslations('RootLayout');

  const isActivePath = (path: string) => path.includes(pathname);

  const navItems = [
    { href: '/', label: t('home_link') },
    { href: '/age/', label: t('age_link') },
    { href: '/simple-sip/', label: t('simple_sip_link') },
    { href: '/lumpsum/', label: t('lumpsum_link') },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white p-4 shadow-md">
      <ul className="flex items-center justify-center space-x-8">
        {navItems.map(({ href, label }) => (
          <li key={href}>
            <Link
              href={href}
              className={`rounded-full px-4 py-2 text-lg font-medium transition-all duration-300 ${
                isActivePath(href)
                  ? 'bg-secondary text-primary'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-primary'
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
