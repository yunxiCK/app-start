import { useEffect } from 'react';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { currentChartTypeAtom } from '../chartEditor/atom';
import { currentChartIdAtom } from './atom';
import { currentChartSelector } from './selectors';

export default function useReportEditorModule() {
  const [currentChartId, setCurrentChartId] = useRecoilState(currentChartIdAtom);
  const setChartType = useSetRecoilState(currentChartTypeAtom);
  const currentChart = useRecoilValue(currentChartSelector);

  useEffect(() => {
    setChartType(currentChart?.type || '');
  }, [currentChartId]);

  return {
    selectChart: (chartId: string) => {
      setCurrentChartId(chartId);
    },
  };
}