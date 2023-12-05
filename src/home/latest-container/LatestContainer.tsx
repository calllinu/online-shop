import { useSelector } from 'react-redux';
import { RootState } from '../../redux-fetching/store';
import styles from './latest-container.module.scss';

function LatestContainer() {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const loading = useSelector((state: RootState) => state.categories.loading);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerCategories}>
        {loading ? 
          <div className={styles.category}>
            Loading...
          </div> 
          : 
          categories.map((category) => (
          <div key={category.id} className={styles.category}>
            {category.name}
          </div>
        ))}
      </div>
      <div className={styles.adContainer}>container2</div>
      <div className={styles.userContainer}>container3</div>
    </div>
  );
}

export default LatestContainer;
