import CoupleInfoContainer from './_components/CoupleInfoContainer/CoupleInfoContainer';
import BannerContainer from './_components/BannerContainer/BannerContainer';
import MenuContainer from './_components/MenuContainer/MenuContainer';
import Footer from './_components/Footer/Footer';
import styles from './page.module.css';

export default function MyPage() {
  return (
    <div className={styles.wrapper}>
      <CoupleInfoContainer />
      <BannerContainer />
      <MenuContainer />
      <Footer />
    </div>
  );
}
