import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const requestSchema = s.object({
  name: s.string(),
  ip_address: s.string(),
});

const responseSchema = s.object({
  id: s.number(),
  name: s.string(),
  ip_address: s.string(),
  port: s.number(),
});

export type PostBalancerRequest = s.Infer<typeof requestSchema>;
export type PostBalancerResponse = s.Infer<typeof responseSchema>;

const config: RequestConfig = {
  method: 'POST',
  url: '/api/lb/',
  validationSchema: responseSchema,
};

export const postLBResponse = (body: PostBalancerRequest) =>
  api.request<PostBalancerResponse>({
    ...config,
    body: JSON.stringify(body),
  });
