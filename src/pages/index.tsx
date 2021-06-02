import { dynamic } from 'umi';
import React, { useEffect, useState } from 'react';
import { RecoilRoot } from 'recoil';
import axios from '@/utils/axios';
import ReportBar from '../components/ReportBar';
import DataSetArea from '../components/DatasetArea';
import DsFieldsArea from '../components/DataSetFields';
import Header from '../components/Header';
import ChartTypes from '../components/ChartPicker';
import ReportEditor from '../components/ReportEditor';
import styles from '../styles/Home.module.css';

export default function Home() {
  const [root, setRoot] = useState<HTMLDivElement | null>(null);
  const RecoilizeDebugger = dynamic(() => import('../recoilize'), { ssr: false });

  const fetchUserList = async () => {
    const res = await axios.get('/users');
    return res;
  };

  useEffect(() => {
    const rootDom = document.getElementById('__next') as HTMLDivElement;

    if (typeof window.document !== 'undefined') {
      setRoot(rootDom);
    }
  }, [root]);

  useEffect(() => {
    fetchUserList();
  }, []);

  return (
    <RecoilRoot>
      <RecoilizeDebugger root={root} />
      <div>
        <div className={styles.container}>
          <div className={styles.headerBar}>
            <Header />
          </div>
          <div className={styles.main}>
            <div className={styles.dataSet}>
              <div className={styles.dsPicker}>
                <DataSetArea />
              </div>
              <div className={styles.dsFields}>
                <DsFieldsArea />
              </div>
            </div>
            <div className={styles.chartArea}>
              <div className={styles.chartPicker}>
                <ChartTypes />
              </div>
              <div className={styles.chartFields} />
            </div>
            <div className={styles.reportEditor}>
              <ReportEditor />
            </div>
          </div>
          <div className={styles.reportBar}>
            <ReportBar />
          </div>
        </div>
      </div>
    </RecoilRoot>
  );
}
