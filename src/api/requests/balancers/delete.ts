import { api } from 'api/config';
import { RequestConfig } from 'api/types';

export type DeleteBalancerRequest = { id: number };
export type DeleteBalancerResponse = null;

const config: RequestConfig = {
  method: 'DELETE',
  url: '/api/lb/',
};

export const deleteLBResponse = (body: DeleteBalancerRequest) =>
  api.request<DeleteBalancerResponse>({
    ...config,
    url: config.url + body.id,
  });
