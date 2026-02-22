import HeaderClient from './_clientBoundary/HeaderClient/HeaderClient';
import CoupleInfoContainer from './_components/CoupleInfoContainer/CoupleInfoContainer';
import BannerContainer from './_components/BannerContainer/BannerContainer';
import Divider from '@/components/common/divider/Divider';
import MenuContainer from './_components/MenuContainer/MenuContainer';
import Footer from './_components/Footer/Footer';
import { PAGE_TITLE } from './constants';
import styles from './page.module.css';

export default function MyPage() {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.srOnly}>{PAGE_TITLE}</h1>
      <HeaderClient />
      <div className={styles.coupleInfo}>
        <CoupleInfoContainer />
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
  );
}
