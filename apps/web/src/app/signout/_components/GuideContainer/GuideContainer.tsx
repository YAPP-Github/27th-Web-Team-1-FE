import Intro from './_components/Intro/Intro';
import AccountInfo from './_components/AccountInfo/AccountInfo';
import styles from './GuideContainer.module.css';

export default function GuideContainer() {
  return (
    <section className={styles.wrapper}>
      <Intro />
      <AccountInfo />
    </section>
  );
}
