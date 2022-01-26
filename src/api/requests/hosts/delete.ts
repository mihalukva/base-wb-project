import { api } from 'api/config';
import { RequestConfig } from 'api/types';

export type DeleteHostRequest = { id: number };
export type DeleteHostResponse = null;

const config: RequestConfig = {
  method: 'DELETE',
  url: '/api/real/',
};

export const deleteHostResponse = (body: DeleteHostRequest) =>
  api.request<DeleteHostResponse>({
    ...config,
    url: config.url + body.id,
  });
