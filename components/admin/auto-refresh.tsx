'use client';

import { usePathname } from 'next/navigation';
import { StatusAutoRefresh } from '@/components/shared/status-auto-refresh';

export function AdminAutoRefresh() {
  const pathname = usePathname();
  const editing = pathname === '/admin/parametres'
    || pathname === '/admin/configuration-bancaire'
    || pathname.startsWith('/admin/appartements/');

  return editing ? null : <StatusAutoRefresh />;
}
