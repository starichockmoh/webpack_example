import styles from './Count.module.scss';

export function Count({ count }: { count: number }) {
  return <h3 className={styles.header}>{count}</h3>;
}
