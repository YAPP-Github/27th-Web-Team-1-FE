import HeaderClient from './_clientBoundary/HeaderClient/HeaderClient';
import GuideContainer from './_components/GuideContainer/GuideContainer';
import ReasonContainer from './_components/ReasonContainer/ReasonContainer';
import CommentContainer from './_components/CommentContainer/CommentContainer';
import CtaContainer from './_components/CtaContainer/CtaContainer';
import Divider from '@/components/common/divider/Divider';
import { PAGE_TITLE } from './constants';
import styles from './page.module.css';

export default function SignoutPage() {
  return (
    <main className={styles.wrapper}>
      <h1 className={styles.srOnly}>{PAGE_TITLE}</h1>
      <div className={styles.header}>
        <HeaderClient />
      </div>
      <div className={styles.guide}>
        <GuideContainer />
      </div>
      <div className={styles.divider}>
        <Divider />
      </div>
      <div className={styles.reason}>
        <ReasonContainer />
      </div>
      <div className={styles.comment}>
        <CommentContainer />
      </div>
      <div className={styles.cta}>
        <CtaContainer />
      </div>
    </main>
  );
}
