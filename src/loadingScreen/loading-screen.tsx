import { Spin } from 'antd';
import styles from './loading-screen.module.scss'; 

const LoadingScreen = () => {
  return (
    <div className={styles.loadingScreen}>
      <Spin size="large" />
      <div className={styles.text}>Loading...</div>
    </div>
  );
};

export default LoadingScreen;
