import { useState, useEffect } from 'react';
import { Spin, Row, Col } from 'antd';
import styles from './DiscountsContainer.module.scss';
import { storage } from './../../firebaseConfig/firebaseConfig';
import Countdown from '../countdown/countdown';
import { getDocs, collection, query, where, limit } from 'firebase/firestore';
import { database } from './../../firebaseConfig/firebaseConfig'; 
import { DiscountWatches } from '../../redux-fetching/interfaces';
import { getDownloadURL, ref } from 'firebase/storage';

export default function DiscountsContainer() {
  const [discountedWatchesLoading, setDiscountedWatchesLoading] = useState(true);
  const [discountedWatches, setDiscountedWatches] = useState<DiscountWatches[]>([]);

  const fetchDiscountedWatches = async () => {
    try {
      const productsRef = collection(database, 'products');
      const q = query(
        productsRef,
        where('categoryID', '==', 'YmZFoJ3rtvzxtFct6z3U'),
        where('discount', '>', 0),
        limit(6)
      );

      const querySnapshot = await getDocs(q);
      const watchesDataPromises: DiscountWatches[] = await Promise.all(
        querySnapshot.docs.map(async (doc) => {
          const photoRef = doc.data().photo.path;
          const photoURL = await getDownloadURL(ref(storage, photoRef));
          
          return {
            id: doc.id,
            name: doc.data().name,
            discount: doc.data().discount,
            series: doc.data().series,
            photo: photoURL,
          };
        })
      );
      
      const watchesData = await Promise.all(watchesDataPromises);
      setDiscountedWatches(watchesData);
    } catch (error) {
      console.error('Error fetching discounted watches:', error);
    } finally {
      setDiscountedWatchesLoading(false); 
    }
  };

  useEffect(() => {
    fetchDiscountedWatches();
  }, []);
  return (
    <Row gutter={[0, 20]} className={styles.discounts}>
        <Col xl={{span: 5}} className={styles.text}>
          Deals and offers
          <Col className={styles.shadowText}>Electronics</Col>
          <Col>
            <Countdown />
          </Col>
        </Col>
        {discountedWatchesLoading ? (
          <Col span={19} className={styles.loading}>
            <Spin />
          </Col>
        ) : (
          discountedWatches.map((watch) => (
            <Col xl={{span: 3}} key={watch.id} className={styles.item}>
              <img src={watch.photo} alt="Product" className={styles.productImg} />
              <Col className={styles.itemName}>
                {watch.name} {watch.series}
              </Col>
              <Col className={styles.itemDiscount}>-{watch.discount}%</Col>
            </Col>
          ))
        )}
      </Row>
  )
}
