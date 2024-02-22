import styles from './MobileSidebar.module.scss'
import { useState, useEffect, useRef  } from 'react';
import { 
  HeartOutlined, 
  MenuOutlined,
  HomeOutlined,
  InboxOutlined,
  GlobalOutlined,
  QuestionCircleOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import { CgProfile } from 'react-icons/cg'
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-fetching/store'
import { useClickAway } from 'react-use';

interface SidebarProps {
    isOpen: boolean;
    closeSidebar : () => void;
  }

function MobileSidebar({isOpen, closeSidebar} : SidebarProps) {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    useClickAway(wrapperRef, () => {
        closeSidebar();
      });
  const data = useSelector((state: RootState) => state.locationCountries.locationCountries);
  const [userLocation, setUserLocation] = useState<string>('');
  const currencyLocation = data.find((item) => item.value === userLocation)?.currency;
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

  useEffect(() => {
    getUserLocation();
  }, []);


  const sidebarItems = [
    { text: 'Home', icon: <HomeOutlined className={styles.menuIcon} /> },
    { text: 'Categories', icon: <MenuOutlined className={styles.menuIcon}/> },
    { text: 'Favorites', icon: <HeartOutlined className={styles.menuIcon}/> },
    { text: 'My orders', icon: <InboxOutlined className={styles.menuIcon} /> },
    { separator: true },
    { text: `${country} | ${currencyLocation}`, icon: <GlobalOutlined className={styles.menuIcon}/> },
    { text: 'Contact us', icon: <QuestionCircleOutlined className={styles.menuIcon} /> },
    { text: 'About', icon: <ApartmentOutlined className={styles.menuIcon} /> },
    { separator: true }, 
    { text: 'User Agreement', icon: null },
    { text: 'Partnership', icon: null },
    { text: 'Privacy policy', icon: null },
  ];

  return (
    <div className={`${styles.mobileSidebar} ${isOpen ? styles.active : styles.inactive}`} ref={wrapperRef}>
          <div className={styles.mobileFirstContainer}>
            <div className={styles.profileIcon}><CgProfile size="4rem"/></div>
              <div className={styles.userActions}>
                <div>Log In</div>|<div>Register</div>
              </div>
          </div>
        {sidebarItems.map((item, index) => (
          <div className={styles.mobileSecondContainer} key={index}>
            {item.separator ? (
              <hr className={styles.separatorLine} /> 
            ) : item.icon ? (
              <div className={styles.home}>
                <div>{item.icon}</div>
                <div className={styles.textHome}>{item.text}</div>
              </div>
            ) : (
              <div className={styles.separator}>{item.text}</div>
            )}
          </div>
        ))}
      </div>
  )
}

export default MobileSidebar