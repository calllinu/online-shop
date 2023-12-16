import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Flex, Spin } from 'antd';
import Avatar from './../../assets/svgs/Avatar.svg';
import LoadingScreen from './../../loadingScreen/loading-screen';
import { RootState } from '../../redux-fetching/store';
import styles from './latest-container.module.scss';
import { auth } from './../../firebaseConfig/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';

function LatestContainer() {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const loadingCat = useSelector((state: RootState) => state.categories.loading);
  const photos = useSelector((state: RootState) => state.photos.photos);
  const loadingPhoto = useSelector((state: RootState) => state.photos.loading);

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (authUser: User | null) => {
      setLoading(false);
      setUser(authUser);
    });

    return () => unsubscribe();
  }, [auth]);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.containerCategories}>
        {loadingCat ? (
          <div className={styles.category}>
            <div className={styles.loading}>
              <LoadingScreen />
            </div>
          </div>
        ) : (
          categories.map((category) => (
            <div key={category.id} className={styles.category}>
              {category.name}
            </div>
          ))
        )}
      </div>
      {loadingPhoto ? (
        <div className={styles.adContainer}>
          <div className={styles.loading}>
            <LoadingScreen />
          </div>
        </div>
      ) : (
        photos.length > 0 && (
          <div
            key={photos[Math.floor(Math.random() * photos.length)].id}
            className={styles.adContainer}
          >
            <img
              src={photos[Math.floor(Math.random() * photos.length)].url}
              className={styles.pannel}
              alt="Random Ad"
            />
            <div className={styles.adText}>
              Latest Trending
              <div className={styles.btn}>
                <Button type="primary" ghost>Learn More</Button>
              </div>
            </div>
          </div>
        )
      )}
      <div className={styles.userContainer}>
        {loading ? (
          <Flex className={styles.loading}>
            <Spin/>
          </Flex>
        ) : (
          <div className={styles.topContainer}>
            <div className={styles.info}>
              <img src={Avatar} className={styles.avatar} alt="User Avatar" />
              <div className={styles.welcome}>
                {user ? (
                  <>
                    <div>Hi, {user.displayName}</div>
                    <div>See what's new</div>
                  </>
                ) : (
                  <>
                    <div>Hi, user</div>
                    <div>Let's get started</div>
                  </>
                )}
              </div>
            </div>
            <Flex vertical className={styles.buttons}>
              {user ? (
                <>
                  <Button type="primary">My Profile</Button>
                  <Button type="primary" ghost>
                    Orders
                  </Button>
                </>
              ) : (
                <>
                  <Button type="primary">Join now</Button>
                  <Button type="primary" ghost>
                    Log in
                  </Button>
                </>
              )}
            </Flex>
          </div>
        )}
        <div className={styles.centerContainer}>
          Get US $10 off with a new supplier
        </div>
        <div className={styles.bottomContainer}>
          Send quotes with supplier preferences
        </div>
      </div>
    </div>
  );
}

export default LatestContainer;
