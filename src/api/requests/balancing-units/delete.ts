import { api } from 'api/config';
import { RequestConfig } from 'api/types';

export type DeleteLbuRequest = { id: number };
export type DeleteLbuResponse = null;

const config: RequestConfig = {
  method: 'DELETE',
  url: '/api/lbu/',
};

export const deleteLbuResponse = (body: DeleteLbuRequest) =>
  api.request<DeleteLbuResponse>({
    ...config,
    url: config.url + body.id,
  });
