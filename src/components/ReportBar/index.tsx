import React, { useEffect, } from 'react';
import _ from 'lodash';
import { useRecoilValue, useRecoilState, } from 'recoil';
import { reportIdsAtom, currentReportIdAtom, } from '../../modules/report/atom';
import useReportModule from '../../modules/report/actions';
import cx from 'classnames';
import styles from './index.module.css';
import { reportStore } from '../../store';
import { IReport } from '../../types';

export default function ReportBar() {
  const reportIds = useRecoilValue(reportIdsAtom);
  const reports = useRecoilValue(reportStore.getDataSelector(reportIds)) as IReport[];
  const currReportId = useRecoilValue(currentReportIdAtom);
  const { initReports, changeReportId, } = useReportModule();

  useEffect(() => {
    initReports();
  }, []);

  const reportItems = _.map(reports, (reportItem, i) => {
    return (
      <div
        className={cx(styles.reportItem, {
          [styles.active]: reportItem.id === currReportId,
        })}
        key={i}
        onClick={() => {
          changeReportId(reportItem.id);
        }}
      >{reportItem.name}</div>
    );
  });

  return (
    <div className={styles.reportBar}>
      {reportItems}
    </div>
  );
}