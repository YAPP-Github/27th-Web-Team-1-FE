export const dynamic = 'force-dynamic';

import HeaderClient from './_clientBoundary/HeaderClient/HeaderClient';
import DisconnectFormClient from './_clientBoundary/DisconnectFormClient/DisconnectFormClient';
import GuideContainer from './_components/GuideContainer/GuideContainer';
import CoupleInfoContainer from './_components/CoupleInfoContainer/CoupleInfoContainer';
import CtaContainer from './_components/CtaContainer/CtaContainer';
import { PAGE_TITLE } from './constants';
import styles from './page.module.css';

export default function DisconnectPage() {
  return (
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
  );
}
