import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale/zh_CN';
import styles from './index.less';

const BasicLayout: React.FC = (props) => {
  console.log(222);
  return (
    <ConfigProvider locale={zhCN}>
      <div className={styles.normal}>
        this is layout
        {props.children}
      </div>
    </ConfigProvider>

  );
};

export default BasicLayout;
