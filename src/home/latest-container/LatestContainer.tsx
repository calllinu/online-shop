import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Button, Flex, Spin, Row, Col } from 'antd';
import Avatar from './../../assets/svgs/Avatar.svg';
import { RootState } from '../../redux-fetching/store';
import styles from './latest-container.module.scss';
import { auth } from './../../firebaseConfig/firebaseConfig';
import { onAuthStateChanged, User } from 'firebase/auth';
import { Link } from 'react-router-dom'

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
    <Row gutter={[0, 10]} className={styles.mainContainer}>
      <Col xl={{order: 1, span: 5}} 
           lg={{order: 1, span: 4}} 
           md={{order: 1, span: 5}} 
           sm={{order: 1, span: 10 }} 
           xs={{order: 2, span: 24 }} 
           className={styles.containerCategories}
      >
        {loadingCat ? (
          <Flex className={styles.loading}>
            <Spin/>
          </Flex>
        ) : (
          categories.map((category) => (
            <div key={category.id} className={styles.category}>
              {category.name}
            </div>
          ))
        )}
      </Col>
      {loadingPhoto ? (
        <Col xl={{order: 2, span: 12}} 
             lg={{order: 2, span: 14}} 
             md={{order: 2, span: 12 }} 
             sm={{order: 3, span: 24 }} 
             xs={{order: 3, span: 24 }} 
             className={styles.adContainer}
        >
          <div className={styles.loading}>
            <Spin />
          </div>
        </Col>
      ) : (
        photos.length > 0 && (
          <Col xl={{order: 2, span: 12}} 
               lg={{order: 2, span: 14}} 
               md={{order: 2, span: 12 }} 
               sm={{order: 3, span: 24 }} 
               xs={{order: 3, span: 24 }}
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
              <Flex className={styles.btn}>
                <Button type="primary" ghost>Learn More</Button>
              </Flex>
            </div>
          </Col>
        )
      )}
    <Col xl={{order: 3, span: 7}} 
         lg={{order: 3, span: 6}}  
         md={{order: 3, span: 7 }} 
         sm={{order: 2, span: 14 }} 
         xs={{order: 1, span: 24 }} 
         className={styles.userContainer}
    >
        {loading ? (
          <Flex className={styles.loading}>
            <Spin/>
          </Flex>
        ) : (
          <Col className={styles.topContainer}>
            <Col  className={styles.info}>
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
            </Col>
            <Flex vertical className={styles.buttons}>
              {user ? (
                <>
                  <Button type="primary">
                    <Link to="/profile">
                      My Profile
                    </Link>
                  </Button>
    
                  <Button type="primary" ghost>
                    <Link to="/orders">
                      Orders
                    </Link>
                  </Button>
                  
                </>
              ) : (
                <>
                  <Button type="primary">
                    <Link to="/sign-up">
                      Join now
                    </Link>
                  </Button>

                  <Button type="primary" ghost>
                    <Link to="/login">
                      Log in
                    </Link>
                  </Button>
                </>
              )}
            </Flex>
          </Col>
        )}
        <Col className={styles.centerContainer}>
          Get US $10 off with a new supplier
        </Col>
        <Col className={styles.bottomContainer}>
          Send quotes with supplier preferences
        </Col>
      </Col>
    </Row>
  );
}

export default LatestContainer;
