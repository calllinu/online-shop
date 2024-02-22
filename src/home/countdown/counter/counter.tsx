import styles from './counter.module.scss';

interface CounterProps {
  name: string | undefined;
  number: number | undefined;
}

function Counter({ name, number }: CounterProps) {
  return (
    <div className={styles.counter}>
        <div className={styles.counterNumber}>
            {number}
            <div className={styles.counterText}>{name}</div>
        </div>
    </div>
  );
}

export default Counter;
