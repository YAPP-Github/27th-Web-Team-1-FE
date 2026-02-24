import Intro from './_components/Intro/Intro';
import InfoBanner from './_components/InfoBanner/InfoBanner';
import Caution from './_components/Caution/Caution';
import styles from './GuideContainer.module.css';

export default function GuideContainer() {
  return (
    <section className={styles.wrapper}>
      <Intro />
      <InfoBanner />
      <Caution />
    </section>
  );
}
