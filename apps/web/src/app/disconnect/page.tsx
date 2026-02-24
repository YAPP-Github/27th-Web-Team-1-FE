export const dynamic = 'force-dynamic';

import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { getGetMyPageQueryKey, getMyPageServer } from '@repo/api-client';
import HeaderClient from './_clientBoundary/HeaderClient/HeaderClient';
import DisconnectFormClient from './_clientBoundary/DisconnectFormClient/DisconnectFormClient';
import GuideContainer from './_components/GuideContainer/GuideContainer';
import CoupleInfoContainer from './_components/CoupleInfoContainer/CoupleInfoContainer';
import CtaContainer from './_components/CtaContainer/CtaContainer';
import { PAGE_TITLE } from './constants';
import styles from './page.module.css';

export default async function DisconnectPage() {
  const queryClient = new QueryClient();

  await queryClient
    .prefetchQuery({
      queryKey: getGetMyPageQueryKey(),
      queryFn: () => getMyPageServer(),
    })
    .catch(() => {});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={styles.wrapper}>
        <h1 className={styles.srOnly}>{PAGE_TITLE}</h1>
        <div className={styles.header}>
          <HeaderClient />
        </div>
        <DisconnectFormClient>
          <div className={styles.guide}>
            <GuideContainer />
          </div>
          <div className={styles.coupleInfo}>
            <CoupleInfoContainer />
          </div>
          <div className={styles.cta}>
            <CtaContainer />
          </div>
        </DisconnectFormClient>
      </main>
    </HydrationBoundary>
  );
}
