import styles from './countdown.module.scss'
import Calculate  from './time-calculating';
import Counter from './counter/counter';

export default function Countdown() {
    const [day, hour, minute, second] = Calculate("Mar 8, 2024 00:00:00");

  return (
    <div className={styles.container}>
        <div className={styles.countdown}>
            <Counter name="Days" number={day}/>
            <Counter name="Hour" number={hour}/>
            <Counter name="Min" number={minute}/>
            <Counter name="Sec" number={second}/>
        </div>
    </div>
  )
}
