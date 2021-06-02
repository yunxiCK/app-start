import { atom } from 'recoil';

export const CHART_TYPES = ['TABLE', 'PIE'];

export const currentChartTypeAtom = atom<string>({
  key: 'currentChartType',
  default: '',
});
