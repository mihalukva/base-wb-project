import { LoadersDict } from '../loaders-dict';

export type LoadingProviderState = {
  loadingAreas: Partial<Record<LoadersDict, boolean>>;
};

export type LoadingProviderStatePart = {
  LoadingProviderState: LoadingProviderState;
};
