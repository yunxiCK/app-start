import React from 'react';
import styles from './index.module.css';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentDsFieldIdAtom } from '../../modules/dataset/atom';
import cx from 'classnames';
import _ from 'lodash';
import { dataSetFieldsSelector } from '../../modules/dataset/selectors';

export default function DataSetFields() {
  const dsFields = useRecoilValue(dataSetFieldsSelector);
  const [currentDsFieldId, setCurrentDsFieldId] = useRecoilState(currentDsFieldIdAtom);
  

  const fieldNodes = _.map(dsFields, (field, i) => {
    return (
      <div
        className={cx(styles.dsField, {
          [styles.active]: field.id === currentDsFieldId,
        })}
        key={i}
        onClick={() => {
          setCurrentDsFieldId(field.id);
        }}
      >
        {field.name}
      </div>
    );
  });

  return (
    <div className={styles.dataSetFields}>
      {fieldNodes}
    </div>
  );
}