import initModel from '../normalize-orm/src';
import { IChart, IReport } from '../types';

const ReportConfig = {
  name: 'Report',
  idAttr: 'id',
  fields: {
    charts: 'Chart',
  },
};

const ChartConfig = {
  name: 'Chart',
  idAttr: 'id',
};

const { createModel, } = initModel();
export const reportStore = createModel<IReport>(ReportConfig);
export const chartStore = createModel<IChart>(ChartConfig);

