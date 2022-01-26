import { api } from 'api/config';
import { RequestConfig } from 'api/types';

export type DeleteVsRequest = { id: number };
export type DeleteVsResponse = null;

const config: RequestConfig = {
  method: 'DELETE',
  url: '/api/vs/',
};

export const deleteVsResponse = (body: DeleteVsRequest) =>
  api.request<DeleteVsResponse>({
    ...config,
    url: config.url + body.id,
  });
