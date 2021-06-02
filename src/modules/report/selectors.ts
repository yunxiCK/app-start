import _ from "lodash";
import { selector } from "recoil";
import { reportStore } from "../../store";
import { IReport } from "../../types";
import { currentReportIdAtom, reportIdsAtom } from "./atom";

export const currentReportInfoSelector = selector<IReport | null>({
  key: 'currentReportInfoSelector',
  get: ({ get }) => {
    const currentReportId = get(currentReportIdAtom);
    const reportIds = get(reportIdsAtom);
    const reports = get(reportStore.getDataSelector(reportIds)) as IReport[];
    return _.find(reports, (report) => report.id === currentReportId) || null;
  },
});