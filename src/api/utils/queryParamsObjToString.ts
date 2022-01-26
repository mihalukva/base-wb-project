export const queryParamsObjToStr = (queryParams?: Record<string, string | number>) => {
  return queryParams
    ? `?${Object.entries(queryParams)
        .map(param => param.join('='))
        .join('&')}`
    : '';
};
