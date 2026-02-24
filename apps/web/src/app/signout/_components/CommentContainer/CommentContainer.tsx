import TextareaClient from './_clientBoundary/TextareaClient/TextareaClient';
import styles from './CommentContainer.module.css';

export default function CommentContainer() {
  return (
    <section className={styles.wrapper}>
      <h2 className={styles.heading}>로킷 팀에게 하고 싶은 말을 적어주세요.</h2>
      <TextareaClient />
    </section>
  );
}
