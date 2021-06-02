import _ from "lodash";
import { selector } from "recoil";
import { IDataSetField } from "../../types";
import { currentDataSetIdAtom, dataSetsAtom } from "./atom";


export const dataSetFieldsSelector = selector<IDataSetField[]>({
  key: 'dataSetFields',
  get: ({ get }) => {
    const currentDsId = get(currentDataSetIdAtom);
    const dsList = get(dataSetsAtom);
    const currDs = _.find(dsList, (ds) => ds.id === currentDsId) || null;
    if (!currDs) {
      return [];
    }
    return _.get(currDs, 'fields', []);
  },
});
