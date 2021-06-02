import _ from 'lodash';
import React from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentChartIdAtom, } from '../../modules/reportEditor/atom';
import styles from './index.module.css';
import cx from 'classnames';
import useReportEditorModule from '../../modules/reportEditor/actions';
import { chartListSelector } from '../../modules/reportEditor/selectors';

export default function ReportEditor() {
  const chartList = useRecoilValue(chartListSelector);
  const { selectChart } = useReportEditorModule();
  const [currentChartId] = useRecoilState(currentChartIdAtom);

  const chartNodes = _.map(chartList, (chart, i) => {
    return (
      <div
        className={cx(styles.chart, {
          [styles.active]: chart.id === currentChartId,
        })}
        key={i}
        onClick={() => {
          selectChart(chart.id);
        }}
      >
        <div className={styles.chartName}>
          {chart.name}
        </div>
        <div className={styles.chartType}>
          {chart.type}
        </div>
      </div>
    );
  });

  return (
    <div className={styles.reportEditor}>
      {chartNodes}
    </div>
  );
}