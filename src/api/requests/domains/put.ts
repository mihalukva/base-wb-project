import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const requestSchema = s.object({
  id: s.number(),
  name: s.string(),
});

const responseSchema = s.object({
  id: s.number(),
  name: s.string(),
});

export type PutDomainRequest = s.Infer<typeof requestSchema>;
export type PutDomainResponse = s.Infer<typeof responseSchema>;

const config: RequestConfig = {
  method: 'PUT',
  url: '/api/domain/',
  validationSchema: responseSchema,
};

export const putDomainResponse = (body: PutDomainRequest) =>
  api.request<PutDomainResponse>({
    ...config,
    url: config.url + body.id,
    body: JSON.stringify(body),
  });
