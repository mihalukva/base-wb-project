import { api } from 'api/config';
import { RequestConfig } from 'api/types';

export type DeleteDomainRequest = { id: number };
export type DeleteDomainResponse = null;

const config: RequestConfig = {
  method: 'DELETE',
  url: '/api/domain/',
};

export const deleteDomainResponse = (body: DeleteDomainRequest) =>
  api.request<DeleteDomainResponse>({
    ...config,
    url: config.url + body.id,
  });
