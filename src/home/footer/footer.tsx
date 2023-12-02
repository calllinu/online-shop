import { useEffect, useState } from 'react';
import styles from './footer.module.scss'
import { Link } from 'react-router-dom'
import { 
    FacebookOutlined,
    ShoppingOutlined,
    TwitterOutlined,
    LinkedinOutlined,
    InstagramOutlined,
    YoutubeOutlined,
 } from '@ant-design/icons'
import downloadapp1 from './../../assets/svgs/Group.svg';
import downloadapp2 from './../../assets/svgs/market-button.svg'
import {
    getDocs,
    collection,
} from 'firebase/firestore';
import { Col, Row } from 'antd';
import { database } from '../../firebaseConfig/firebaseConfig';

  interface DataItem {
    id: string,
    image: string,
    name: string,
    value: string,
    currency: string,
}
  
export default function Footer() {
    const [data, setData] = useState<DataItem[]>([]);
    const [userLocation, setUserLocation] = useState<string>('');
    const [loading, setLoading] = useState(true);
    const collectionRef = collection(database, "location-countries");
    const country = data.find((item) => item.value === userLocation)?.name;

    const getUserLocation = async () => {
        try {
          const response = await fetch('https://ipinfo.io?token=b0956c6143c3e8');
          const data = await response.json();
          setUserLocation(data.country);
        } catch (error) {
          console.error('Error fetching user location:', error);
        }
      };
    
      const getData = () => {
        getDocs(collectionRef)
          .then((response) => {
            setLoading(false);
            const dataArray = response.docs.map((item) => ({
              ...item.data(),
              id: item.id,
            })) as DataItem[]; 
            setData(dataArray);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            console.error('Error fetching data:', error);
            console.log(data);
          });
      }

      useEffect(() => {
        getData();
        getUserLocation();
      }, []);
    
  return (
    <div className={styles.footer}>
        <Row justify="space-between" gutter={[0, 10]} className={styles.footerTop}>
                <Col xl={{span: 4}} md={{span: 8}} sm={{span: 12}} xs={{span: 12}} className={styles.footerTopColumn1st}>
                <div>
                    <Link to="/" className={styles.navLink}>
                        <ShoppingOutlined className={styles.mainIcon} />
                        <div className={styles.title}>Brand</div>
                    </Link>
                </div>
                Best information about the company gies here but now lorem ipsum is
                <div className={styles.icons}>
                    <FacebookOutlined className={styles.socialIcons} />
                    <TwitterOutlined className={styles.socialIcons} />
                    <LinkedinOutlined className={styles.socialIcons} />
                    <InstagramOutlined className={styles.socialIcons} />
                    <YoutubeOutlined className={styles.socialIcons} />
                </div>
                </Col>
                <Col xl={{span: 4}} md={{span: 8}} sm={{span: 12}} xs={{span: 12}} className={styles.footerTopOthers}>
                <div className={styles.utils}>
                    About
                </div>
                <div>
                    About Us
                </div>
                <div>
                    Find Store
                </div>
                <div>
                    Categories
                </div>
                <div>
                    Blogs
                </div>
                </Col>
                <Col xl={{span: 4}} md={{span: 8}} sm={{span: 12}} xs={{span: 12}} className={styles.footerTopOthers}>
                <div className={styles.utils}>
                    Partnership
                </div>
                <div>
                    About Us
                </div>
                <div>
                    Find Store
                </div>
                <div>
                    Categories
                </div>
                <div>
                    Blogs
                </div>
                </Col>
                <Col xl={{span: 4}} md={{span: 8}} sm={{span: 12}} xs={{span: 12}} className={styles.footerTopOthers}>
                <div className={styles.utils}>
                    Information
                </div>
                <div>
                    Help Center
                </div>
                <div>
                    Money Refund
                </div>
                <div>
                    Shipping
                </div>
                <div>
                    Contact Us
                </div>
                </Col>
                <Col xl={{span: 4}} md={{span: 8}} sm={{span: 12}} xs={{span: 12}} className={styles.footerTopOthers}>
                <div className={styles.utils}>
                    For Users
                </div>
                <div>
                    Login 
                </div>
                <div>
                    Register
                </div>
                <div>
                    Settings
                </div>
                <div>
                    My Orders
                </div>
                </Col>
                <Col xl={{span: 4}} md={{span: 8}} sm={{span: 12}} xs={{span: 12}} className={styles.footerTopOthers}>
                    <div className={styles.utils}>
                        Get app
                    </div>
                    <div className={styles.getApp}>
                        <img src={downloadapp2} className={styles.download}/>
                    </div>
                    <div className={styles.getApp}>
                        <img src={downloadapp1} className={styles.download}/>
                    </div>
                </Col>
        </Row>
            <Row className={styles.footerBottom}>
                <Col sm={{span: 12}} xs={{span: 24}} className={styles.BottomColumn1st}>
                © 2023 Ecommerce.
                </Col>
                <Col sm={{span: 12}} xs={{span: 24}}className={styles.BottomColumn2nd}>
                {loading ? (
                    <div className={styles.location}>Loading...</div>
                        ) : (
                            <div className={styles.location}>
                                {country ?? "Unknown"}
                                {country && (
                                    <img src={`./../../src/assets/flags/${country.toLowerCase()}.png`} className={styles.flagIcon} />
                                )}
                            </div>
                        )
                }
                </Col>
            </Row>
    </div>
  )
}
