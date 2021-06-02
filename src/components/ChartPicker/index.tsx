import _ from 'lodash';
import React from 'react';
import styles from './index.module.css';
import cx from 'classnames';
import { CHART_TYPES, currentChartTypeAtom, } from '../../modules/chartEditor/atom';
import { useRecoilValue, } from 'recoil';
import { useChartEditorActions } from '../../modules/chartEditor/actions';

export default function ChartPicker() {
  const currentChartType = useRecoilValue(currentChartTypeAtom);
  const { selectChartType } = useChartEditorActions();

  const a = 123 ;

  const chartTypeNodes = _.map(CHART_TYPES, (chartType, i) => {
    return (
      <div
        className={cx(styles.chartImg, {
          [styles.active]: chartType === currentChartType,
        })}
        key={i}
        onClick={() => {
          selectChartType(chartType);
        }}
      >
        {chartType}
      </div>
    );
  });

  return (
    <div className={styles.chartPicker}>
      {chartTypeNodes}
    </div>
  );
}