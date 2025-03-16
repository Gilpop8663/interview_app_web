import Layout from '@/components/Layout';
import Skeleton from '@/components/suspense/Skeleton';
import EditUserSubscriptionTypeFetcher from '@/fetchers/admin/users/EditUserSubscriptionTypeFetcher';
import React, { Suspense } from 'react';

const EditUserSubscriptionTypePage: React.FC = () => {
  return (
    <Layout>
      <Suspense fallback={<Skeleton className="h-48" />}>
        <EditUserSubscriptionTypeFetcher />
      </Suspense>
    </Layout>
  );
};

export default EditUserSubscriptionTypePage;
