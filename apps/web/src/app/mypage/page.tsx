export const dynamic = 'force-dynamic';

import Divider from '@/components/common/divider/Divider';
import { COUPLE_STATUS_COOKIE } from '@/constants/cookie';
import { COUPLE_STATUS } from '@/constants/coupleStatus';
import { getGetMyPageQueryKey, getMyPageServer } from '@repo/api-client';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';
import CoupleStatusSyncClient from './_clientBoundary/CoupleStatusSyncClient/CoupleStatusSyncClient';
import HeaderClient from './_clientBoundary/HeaderClient/HeaderClient';
import BannerContainer from './_components/BannerContainer/BannerContainer';
import CoupleInfoContainer from './_components/CoupleInfoContainer/CoupleInfoContainer';
import Footer from './_components/Footer/Footer';
import MenuContainer from './_components/MenuContainer/MenuContainer';
import { PAGE_TITLE } from './constants';
import styles from './page.module.css';

export default async function MyPage() {
  const cookieStore = await cookies();
  const isCoupled =
    cookieStore.get(COUPLE_STATUS_COOKIE)?.value === COUPLE_STATUS.COUPLED;

  const queryClient = new QueryClient();
  await queryClient
    .prefetchQuery({
      queryKey: getGetMyPageQueryKey(),
      queryFn: () => getMyPageServer(),
      staleTime: 0,
    })
    .catch((error) => {
      console.error('[MyPage] prefetch failed:', error);
    });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={styles.wrapper}>
        <h1 className={styles.srOnly}>{PAGE_TITLE}</h1>
        <CoupleStatusSyncClient />
        <HeaderClient />
        <div className={styles.coupleInfo}>
          <CoupleInfoContainer isCoupled={isCoupled} />
        </div>
        <div className={styles.banner}>
          <BannerContainer />
        </div>
        <div className={styles.divider}>
          <Divider />
        </div>
        <MenuContainer />
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </HydrationBoundary>
  );
}
