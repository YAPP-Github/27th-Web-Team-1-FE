export const dynamic = 'force-dynamic';

import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import {
  getGetMyPageQueryKey,
  getMyPageServer,
  getMyStatusServer,
} from '@repo/api-client';
import HeaderClient from './_clientBoundary/HeaderClient/HeaderClient';
import CoupleInfoContainer from './_components/CoupleInfoContainer/CoupleInfoContainer';
import BannerContainer from './_components/BannerContainer/BannerContainer';
import Divider from '@/components/common/divider/Divider';
import MenuContainer from './_components/MenuContainer/MenuContainer';
import Footer from './_components/Footer/Footer';
import { PAGE_TITLE } from './constants';
import styles from './page.module.css';

export default async function MyPage() {
  const queryClient = new QueryClient();

  await queryClient
    .prefetchQuery({
      queryKey: getGetMyPageQueryKey(),
      queryFn: () => getMyPageServer(),
    })
    .catch((error) => {
      console.error('[MyPage] prefetch failed:', error);
    });

  const coupleStatus = await getMyStatusServer().catch((error) => {
    console.error('[MyPage] getMyStatus failed:', error);
    return null;
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className={styles.wrapper}>
        <h1 className={styles.srOnly}>{PAGE_TITLE}</h1>
        <HeaderClient />
        <div className={styles.coupleInfo}>
          <CoupleInfoContainer isCoupled={coupleStatus?.isCoupled ?? false} />
        </div>
        <div className={styles.banner}>
          <BannerContainer />
        </div>
        <div className={styles.divider}>
          <Divider />
        </div>
        <MenuContainer isCoupled={coupleStatus?.isCoupled ?? false} />
        <div className={styles.footer}>
          <Footer />
        </div>
      </main>
    </HydrationBoundary>
  );
}
