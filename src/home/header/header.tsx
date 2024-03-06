import { useState, useEffect } from 'react';
import styles from './header.module.scss';
import { 
  UserOutlined, 
  MessageOutlined, 
  HeartOutlined, 
  ShoppingCartOutlined, 
  ShoppingOutlined, 
  MenuOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { Input, Button, Select } from 'antd';
import { Link } from 'react-router-dom'
import { Col, Row } from 'antd';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux-fetching/store';

interface HeaderProps {
  toggleSidebar: () => void;
}


const Header = ({ toggleSidebar } : HeaderProps) => {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const loading = useSelector((state: RootState) => state.categories.loading);
  const data = useSelector((state: RootState) => state.locationCountries.locationCountries);
  const { Option } = Select;
  const [userLocation, setUserLocation] = useState<string>('');
  const [selectedCurrency, setSelectedCurrency] = useState<string | null>(null);
  const uniqueCurrencies = [...new Set(data.map((item) => item.currency))]
                          .filter((currency) => currency);
  const items = [
    { text: 'Hot offers', order: 2 },
    { text: 'Gift boxes', order: 3 },
    { text: 'Projects', order: 4 },
    { text: 'Menu item', order: 5 },
    { text: 'Help', order: 6 },
  ];

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

  return (
    <div className={styles.mainContainer}>  
      <div className={styles.headerTop}>
        <Row justify="space-between" gutter={[0, 15]} className={styles.row}>
            <Col span={1} xl={{ order: 1 }} className={styles.headerTopLeft}>
              <div className={styles.iconMenu}>
                <MenuOutlined onClick={toggleSidebar}/>
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
                <Link to="/profile" className={styles.navLink}>
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
            {items.map((item, index) => (
              <Col key={index} xl={{ span: 3.3, order: item.order }}>
                <div className={styles.categoriesItems}>{item.text}</div>
              </Col>
            ))} 
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
