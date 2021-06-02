import { getDatasets } from '../../services/request';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState, } from 'recoil';
import { currentDataSetIdAtom, currentDsFieldIdAtom, dataSetsAtom, } from './atom';

export default function useDataSetModule() {
  const setDataSets = useSetRecoilState(dataSetsAtom);
  const setCurrentDataSetId = useSetRecoilState(currentDataSetIdAtom);
  const resetCurrentDsFieldId = useResetRecoilState(currentDsFieldIdAtom);

  return {
    initDataSets: async () => {
      const dataSets = await getDatasets();
      setDataSets(dataSets);
    },
    changeDataSetId: (dsId: string) => {
      setCurrentDataSetId(dsId);
      // 清空已选的数据源字段id
      resetCurrentDsFieldId();
    },
  };
}