import { useEffect, useState } from 'react';
import styles from './header.module.scss';
import { 
  UserOutlined, 
  MessageOutlined, 
  HeartOutlined, 
  ShoppingCartOutlined, 
  ShoppingOutlined, 
  MenuOutlined,
  HomeOutlined,
  InboxOutlined,
  GlobalOutlined,
  QuestionCircleOutlined,
  ApartmentOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Input, Button, Select } from 'antd';
import { CgProfile } from 'react-icons/cg'
import {
  getDocs,
  collection,
} from 'firebase/firestore';
import { database } from '../../firebaseConfig/firebaseConfig';
import { useClickOutside } from '@mantine/hooks'
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd';

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
  const { Option } = Select;
  const [data, setData] = useState<DataItem[]>([]);
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [userLocation, setUserLocation] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const collectionRef = collection(database, "location-countries");
  const collectionCat = collection(database, "categories");
  const uniqueCurrencies = [...new Set(data.map((item) => item.currency))]
      .filter((currency) => currency);
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
    <Row justify="space-between" gutter={[0, 15]} className={styles.row}>
        <Col span={1} xl={{ order: 1 }} className={styles.headerTopLeft}>
          <div className={styles.iconMenu} onClick={() => setIsSidebarOpen(true)}>
              <MenuOutlined/>
          </div>
          <div>
          <Link to="/" className={styles.navLink}>
            <ShoppingOutlined className={styles.mainIcon}/>  
            </Link>
          </div>
          <Link to="/" className={styles.navLink}>
            <div className={styles.title}>Brand</div>
          </Link>
        </Col>
          <Col xl={{ order: 2, span: 12, push: 1 }} md={{ order: 3, span: 22, push: 1 }} sm={{order: 3, span: 22, push: 1}} xs={{order: 3, span:24, push: 0}} className={styles.headerTopCenter}>
          <div>
          <Input placeholder="Search..." className={styles.searchInput} />
          </div>
          <div>
          <Select
              placeholder="Select a category"
              loading={loading}
              defaultValue="allCategory"
              className={styles.categoryDropdown}
              showSearch
              bordered={false}
              filterOption={(input, option) =>
                option && option.props && option.props.children
                  ? option.props.children[0].toLowerCase().indexOf(input.toLowerCase()) >= 0
                  : false
              }
            >
              <Option value="allCategory">All Category</Option>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
          </Select>
          </div>
          <div>
          <Button type="primary" icon={<SearchOutlined />} className={styles.searchButton}>
            Search
          </Button>
          </div>
          </Col>
        <Col xl={{ order: 3, span: 7 }} lg={{span: 10}} className={styles.headerTopRight}>
          <div className={styles.profileIcon}>
            <Link to="/login" className={styles.navLink}>
              <UserOutlined className={styles.iconStyle}/>
              <div className={styles.profileText}>Profile</div>
            </Link>
          </div>
          <div className={styles.messageIcon}>
            <Link to="/messages" className={styles.navLink}>
              <MessageOutlined className={styles.iconStyle}/>
              <div>Message</div>
            </Link>
          </div>
          <div className={styles.ordersIcon}>
            <Link to="/orders" className={styles.navLink}>
              <HeartOutlined className={styles.iconStyle}/>
              <div>Orders</div>
            </Link>
          </div>
          <div className={styles.cartIcon}>
          <Link to="/my-cart" className={styles.navLink}>
            <ShoppingCartOutlined className={styles.iconStyle}/>
            <div className={styles.cartText}>My cart</div>
          </Link>
          </div>
          </Col>
        </Row>
      </div>
      <div className={styles.headerBottom}>
      <Row justify="center" gutter={[0, 15]} className={styles.row} wrap>
        <Col>
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
          </Col>
        <div className={styles.headerBottomLeft}>
          <Col xl={{span: 3.3, order: 1}}>
          <div className={styles.categories}>
            <MenuOutlined />
            <div className={styles.categoriesItems}>All Categories</div>
          </div>
          </Col>
          <Col xl={{span: 3.3, order: 2}}><div className={styles.categoriesItems}>Hot offers</div></Col>
          <Col xl={{span: 3.3, order: 3}}><div className={styles.categoriesItems}>Gift boxes</div></Col>
          <Col xl={{span: 3.3, order: 4}}><div className={styles.categoriesItems}>Projects</div></Col>
          <Col xl={{span: 3.3, order: 5}}><div className={styles.categoriesItems}>Menu item</div></Col>
          <Col xl={{span: 3.3, order: 6}}><div className={styles.categoriesItems}>Help</div></Col>    
        </div>
        <div className={styles.headerBottomRight}>
        <Row justify="center">
            <Col lg={{ span: 12 }}>
        <Select
            loading={loading}
            className={styles.dropDownShipTo}
            showSearch
            options={uniqueCurrencies.map((currency) => ({
              value: currency,
              label: <div className={styles.values}>{currency}</div>,
            }))}
            value={
              loading ? 
                "Loading..."
                : selectedCurrency || (userLocation && data.find((item) => item.value === userLocation)?.currency) || ''
            }
            onChange={(selectedOption) => {
              if (selectedOption) {
                setSelectedCurrency(selectedOption);
              }
            }}
          />
          </Col>
          <Col lg={{ span: 12 }}>
          <Select
            loading={loading}
            className={styles.dropDownShipTo}
            showSearch
            options={data
              .filter((item) => item.name)
              .sort((a, b) => a.name.localeCompare(b.name))
              .map((item) => ({
                value: item.value,
                label: (
                  <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: ".5rem", cursor: "pointer" }}>
                    {item.name}
                    <img src={`./../../src/assets/flags/${item.name?.toLowerCase()}.png`} style={{ width: 20, height: 13 }} alt={item.name} />
                  </div>
                ),
              }))}
            value={loading ? 
              "Loading..."
              : userLocation}
            onChange={(selectedOption) => {
              if (selectedOption) {
                setUserLocation(selectedOption);
              }
            }}
          />
          </Col>
          </Row>
        </div>
        </Row>
      </div>
    </div>
  );
}

export default Header;
