import { useSelector } from 'react-redux';
import { RootState } from '../../redux-fetching/store';
import styles from './latest-container.module.scss';

function LatestContainer() {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const loadingCat = useSelector((state: RootState) => state.categories.loading);
  const photos = useSelector((state: RootState) => state.photos.photos);
  const loadingPhoto = useSelector((state: RootState) => state.photos.loading)

  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerCategories}>
        {loadingCat ? 
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
      {loadingPhoto ? 
        <div className={styles.adContainer}>
          Loading...
        </div> 
        : 
        photos.length > 0 && (
          <div key={photos[Math.floor(Math.random() * photos.length)].id}>
            <img src={photos[Math.floor(Math.random() * photos.length)].url} className={styles.pannel}/>
          </div>
        )
      }
      <div className={styles.userContainer}>container3</div>
    </div>
  );
}

export default LatestContainer;
