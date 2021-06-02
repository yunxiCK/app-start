import { useRecoilValue, useSetRecoilState } from "recoil";
import { chartStore } from "../../store";
import { currentChartSelector } from "../reportEditor/selectors";
import { currentChartTypeAtom } from "./atom";

export function useChartEditorActions() {
  const setCurrentChartType = useSetRecoilState(currentChartTypeAtom);
  const currentChart = useRecoilValue(currentChartSelector);
  const { set } = chartStore.useChangeData();

  return {
    selectChartType: (chartType: string) => {
      setCurrentChartType(chartType);
      const chartId = currentChart?.id;
      if (!chartId) {
        return;
      }
      // 修改当前chart的type
      set(chartId, {
        type: chartType,
      });
    },
  };
}