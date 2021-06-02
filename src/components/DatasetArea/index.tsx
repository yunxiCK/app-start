import { useRecoilValue, useRecoilState, } from 'recoil';
import cx from 'classnames';
import _ from 'lodash';
import React, { useEffect, } from 'react';
import styles from './index.module.css';
import { dataSetsAtom, currentDataSetIdAtom, } from '../../modules/dataset/atom';
import useDataSetModule from '../../modules/dataset/actions';

export default function DataSetArea() {
  const dataSets = useRecoilValue(dataSetsAtom);
  const [currentDataSetId] = useRecoilState(currentDataSetIdAtom);
  const { initDataSets, changeDataSetId, } = useDataSetModule();

  useEffect(() => {
    initDataSets();
  }, []);

  const dataSetList = _.map(dataSets, (dataSet, i) => {
    return (
      <div
        className={cx(styles.dataSetItem, {
          [styles.active]: dataSet.id === currentDataSetId,
        })}
        key={i}
        onClick={() => {
          changeDataSetId(dataSet.id);
        }}
      >
        {dataSet.name}
      </div>
    );
  });

  return (
    <div className={styles.datasetArea}>
      {dataSetList}
    </div>
  );
}