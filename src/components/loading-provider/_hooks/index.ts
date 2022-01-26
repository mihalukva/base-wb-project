import { useSelector } from 'react-redux';
import { LoadersDict } from '../loaders-dict';
import { getCurrentAreaLoading, LoadingProviderStatePart } from '../_redux';

export const useLoadingProvider = (area?: LoadersDict): boolean => {
  return useSelector((state: LoadingProviderStatePart) => getCurrentAreaLoading(state, area));
};
