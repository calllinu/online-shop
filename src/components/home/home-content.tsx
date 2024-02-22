import { Row, Col } from 'antd';
import DiscountsContainer from '../../home/discount-container/DiscountsContainer';
import LatestContainer from '../../home/latest-container/LatestContainer';
import styles from './home-content.module.scss';

function HomeContent() {
  return (
    <Row gutter={[15, 15]} className={styles.container}>
      <Col span={24}>
        <LatestContainer />
      </Col>
      <Col span={24}>
        <DiscountsContainer />
      </Col>
    </Row>
  );
}

export default HomeContent;
