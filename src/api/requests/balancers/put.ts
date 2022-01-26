import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const requestSchema = s.object({
  id: s.number(),
  name: s.string(),
  ip_address: s.string(),
  port: s.number(),
});

const responseSchema = s.object({
  id: s.number(),
  name: s.string(),
  ip_address: s.string(),
  port: s.number(),
});

export type PutBalancerRequest = s.Infer<typeof requestSchema>;
export type PutBalancerResponse = s.Infer<typeof responseSchema>;

const config: RequestConfig = {
  method: 'PUT',
  url: '/api/lb/',
  validationSchema: responseSchema,
};

export const putLBResponse = (body: PutBalancerRequest) =>
  api.request<PutBalancerResponse>({
    ...config,
    url: config.url + body.id,
    body: JSON.stringify(body),
  });
