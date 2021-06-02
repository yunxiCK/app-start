import { getReports } from '../../services/request';
import { useResetRecoilState, useSetRecoilState, } from 'recoil';
import { currentReportIdAtom, reportIdsAtom, } from './atom';
import { currentChartIdAtom } from '../reportEditor/atom';
import { currentChartTypeAtom } from '../chartEditor/atom';
import { reportStore } from '../../store';

export default function useReportModule() {
  const setReports = useSetRecoilState(reportIdsAtom);
  const setReportId = useSetRecoilState(currentReportIdAtom);
  const resetCurrentChartId = useResetRecoilState(currentChartIdAtom);
  const resetChartType = useResetRecoilState(currentChartTypeAtom);
  const { set } = reportStore.useChangeData();

  return {
    initReports: async () => {
      const data = await getReports();
      const ids = set(data);
      setReports(ids as string[]);
    },
    changeReportId: (reportId: string) => {
      setReportId(reportId);
      // 清空相关的数据
      resetCurrentChartId();
      resetChartType();
    },
  };
}
