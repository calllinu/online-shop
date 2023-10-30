import { useEffect, useState } from 'react';
import styles from './header.module.scss';
import { AiFillShopping } from 'react-icons/ai';
import { MdMessage } from 'react-icons/md';
import { RiAccountCircleFill } from 'react-icons/ri';
import { AiFillHeart, AiOutlineMenu, AiOutlineHeart } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg'
import { FaShoppingCart } from 'react-icons/fa';
import { BiHome, BiBox, BiHelpCircle, BiSolidCity } from 'react-icons/bi';
import { TfiWorld } from 'react-icons/tfi'
import Select from 'react-select';
import {
  getDocs,
  collection,
} from 'firebase/firestore';
import { database } from '../../firebaseConfig';
import { useClickOutside } from '@mantine/hooks'

interface DataItem {
  id: string,
  image: string,
  name: string,
  value: string,
  currency: string,
}

interface CategoryData{
  id: string,
  name: string,
}

function Header() {
  const [data, setData] = useState<DataItem[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [userLocation, setUserLocation] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(database, "location-countries");
  const collectionCat = collection(database, "categories");
  const uniqueCurrencies = [...new Set(data.map((item) => item.currency))];
  const country = data.find((item) => item.value === userLocation)?.name;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const ref = useClickOutside(() => setIsSidebarOpen(false))
  const currencyLocation = data.find((item) => item.value === userLocation)?.currency;
  

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
      });
  }

  const getCategories = () => {
    getDocs(collectionCat)
    .then((response) => {
      setLoading(false);
      const categoryData = response.docs.map((item) => ({
        ...item.data(),
        id: item.id,
      })) as CategoryData[];
      setCategories(categoryData);
      setLoading(false);
    })
    .catch((error) =>{
      setLoading(false);
      console.log('Error fetching data:', error);
    })
  }

  useEffect(() => {
    getData();
    getUserLocation();
    getCategories();
  }, []);


  const sidebarItems = [
    { text: 'Home', icon: <BiHome size="1.7rem" color="#888686" /> },
    { text: 'Categories', icon: <AiOutlineMenu size="1.7rem" color="#888686" /> },
    { text: 'Favorites', icon: <AiOutlineHeart size="1.7rem" color="#888686" /> },
    { text: 'My orders', icon: <BiBox size="1.7rem" color="#888686" /> },
    { separator: true },
    { text: `${country} | ${currencyLocation}`, icon: <TfiWorld size="1.7rem" color="#888686" /> },
    { text: 'Contact us', icon: <BiHelpCircle size="1.7rem" color="#888686" /> },
    { text: 'About', icon: <BiSolidCity size="1.7rem" color="#888686" /> },
    { separator: true }, 
    { text: 'User Agreement', icon: null },
    { text: 'Partnership', icon: null },
    { text: 'Privacy policy', icon: null },
  ];
  

  return (
    <div className={styles.mainContainer}>
      {isSidebarOpen && (
        <div className={styles.mobileSidebar} ref={ref}>
          <div className={styles.mobileFirstContainer}>
            <div className={styles.profileIcon}><CgProfile size="4rem"/></div>
              <div className={styles.userActions}>
                <div>Sign In</div>|<div>Register</div>
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
    )}      
    <div className={styles.headerTop}>
      <div className={styles.headerTopLeft}>
        <div className={styles.iconMenu} onClick={() => setIsSidebarOpen(true)}>
            <AiOutlineMenu />
        </div>
        <div>
          <AiFillShopping color="#0D6EFD" size="2rem" />
        </div>
          <div className={styles.title}>Brand</div>
        </div>
        <div className={styles.headerTopCenter}>
          <div>
            <input
              type="text"
              placeholder="Search..."
              className={styles.searchInput}
            />
          </div>
          <div>
            <select className={styles.categoryDropdown}>
              {loading ? (
                <option value="loading">Loading...</option>
              ) : (
                <>
                  <option value="allCategory" defaultChecked>
                    All Category
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
          <div>
            <button className={styles.searchButton}>Search</button>
          </div>
        </div>
        <div className={styles.headerTopRight}>
          <div className={styles.profileIcon}>
            <RiAccountCircleFill size="1.4rem" color="#979797" cursor="pointer" />
            <div className={styles.profileText}>Profile</div>
          </div>
          <div className={styles.messageIcon}>
            <MdMessage size="1.4rem" color="#979797" cursor="pointer" />
            <div>Message</div>
          </div>
          <div className={styles.ordersIcon}>
            <AiFillHeart size="1.4rem" color="#979797" cursor="pointer" />
            <div>Orders</div>
          </div>
          <div className={styles.cartIcon}>
            <FaShoppingCart size="1.4rem" color="#979797" cursor="pointer" />
            <div className={styles.cartText}>My cart</div>
          </div>
        </div>
      </div>
      <div className={styles.headerBottom}>
        <div className={styles.mobileCategories}>
            <div className={styles.mobileItems}>
                  {loading ? (
                    <div>Loading...</div>
                  ) : (
                    <>
                      <div className={styles.item}>
                        All Category
                      </div>
                      {categories.map((category) => (
                        <div key={category.id} className={styles.item}>
                          {category.name}
                        </div>
                      ))}
                    </>
                  )}
            </div>
          </div>
        <div className={styles.headerBottomLeft}>
          <div className={styles.categories}>
            <AiOutlineMenu />
            <div>All Categories</div>
          </div>
          <div>Hot offers</div>
          <div>Gift boxes</div>
          <div>Projects</div>
          <div>Menu item</div>
          <div>Help</div>
        </div>
        <div className={styles.headerBottomRight}>
        <Select
            className={styles.dropDownShipTo}
            options={uniqueCurrencies.map((currency) => ({
              value: currency,
              label: (
                <div className={styles.values}>{currency}</div>
              ),
            }))}
            isSearchable={true}
            value={
              loading
                ? { value: 'loading', label: 'Searching...' }
                : userLocation
                ? {
                  value: selectedCurrency,
                  label: (
                    <div className={styles.values}>
                      <span>
                      <span>
                        {selectedCurrency || (userLocation && data.find((item) => item.value === userLocation)?.currency) || ''}
                      </span>

                      </span>
                    </div>
                  ),
                }
                : selectedCurrency && !userLocation
                ? {
                  value: selectedCurrency,
                  label: (
                    <div className={styles.values}>
                      <span>{selectedCurrency}</span>
                    </div>
                  ),
                }
                : null
            }
            onChange={(selectedOption) => {
              if (selectedOption && selectedOption.value !== userLocation) {
                setSelectedCurrency(selectedOption.value);
              }
            }}
            isDisabled={loading}
          />
          <Select
            className={styles.dropDownShipTo}
            options={data.sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => ({
              value: item.value,
              label: (
                <div className={styles.values}>
                  {item.name}
                  <img src={`./../../src/assets/flags/${item.name.toLocaleLowerCase()}.png`} className={styles.flagIcon} />
                </div>
              ),
            }))}
            isSearchable={true}
            value={
              loading
                ? { value: 'loading', label: 'Searching...' }
                : userLocation
                  ? {
                      value: userLocation,
                      label: (
                        <div className={styles.values}>
                          <span>{country}</span>
                          <img src={`./../../src/assets/flags/${country}.png`} className={styles.flagIcon} alt={userLocation} />
                        </div>
                      )
                    }
                  : null
            }
            onChange={(selectedOption) => {
              if (selectedOption !== null) {
                setUserLocation(selectedOption.value);
              }
            }}
            isDisabled={loading}
          /> 
        </div>
      </div>
    </div>
  );
}

export default Header;
