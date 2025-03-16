import { Suspense } from 'react';
import Skeleton from '@/components/suspense/Skeleton';
import AdminFetcher from '@/fetchers/admin/AdminFetcher';
import Layout from '@/components/Layout';

export default function AdminPage() {
  return (
    <Layout>
      <Suspense fallback={<Skeleton className="h-48" />}>
        <AdminFetcher />
      </Suspense>
    </Layout>
  );
}
