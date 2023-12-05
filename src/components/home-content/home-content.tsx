import LatestContainer from '../../home/latest-container/LatestContainer'
import styles from './home-content.module.scss'

function HomeContent() {
  return (
    <div className={styles.container}>
      <LatestContainer />
    </div>
  )
}

export default HomeContent