import DiscountsContainer from '../../home/discount-container/DiscountsContainer'
import LatestContainer from '../../home/latest-container/LatestContainer'
import styles from './home-content.module.scss'

function HomeContent() {
  return (
    <div className={styles.container}>
      <LatestContainer/>
      <DiscountsContainer/>
    </div>
  )
}

export default HomeContent