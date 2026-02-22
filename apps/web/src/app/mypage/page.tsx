import HeaderClient from './_clientBoundary/HeaderClient/HeaderClient';
import CoupleInfoContainer from './_components/CoupleInfoContainer/CoupleInfoContainer';
import BannerContainer from './_components/BannerContainer/BannerContainer';
import Divider from '@/components/common/divider/Divider';
import MenuContainer from './_components/MenuContainer/MenuContainer';
import Footer from './_components/Footer/Footer';
import styles from './page.module.css';

export default function MyPage() {
  return (
    <div className={styles.wrapper}>
      <HeaderClient />
      <CoupleInfoContainer />
      <BannerContainer />
      <Divider />
      <MenuContainer />
      <Footer />
    </div>
  );
}
