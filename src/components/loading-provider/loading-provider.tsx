import { memo, ReactElement, ReactNode } from 'react';
import { LoadersDict } from './loaders-dict';
import { useLoadingProvider } from './_hooks';

type PropsType = {
  area: LoadersDict;
  children: (isLoading: boolean) => ReactNode;
};

// eslint-disable-next-line react/prop-types
export const LoadingProvider = memo(({ children, area }: PropsType) => {
  const isCurrentAreaLoading = useLoadingProvider(area);

  return children(isCurrentAreaLoading) as ReactElement;
});
