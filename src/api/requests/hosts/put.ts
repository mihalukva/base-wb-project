import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const requestSchema = s.object({
  id: s.number(),
  name: s.string(),
  ip_address: s.string(),
});

const responseSchema = s.object({
  id: s.number(),
  name: s.string(),
  ip_address: s.string(),
});

export type PutHostRequest = s.Infer<typeof requestSchema>;
export type PutHostResponse = s.Infer<typeof responseSchema>;

const config: RequestConfig = {
  method: 'PUT',
  url: '/api/real/',
  validationSchema: responseSchema,
};

export const putHostResponse = (body: PutHostRequest) =>
  api.request<PutHostResponse>({
    ...config,
    url: config.url + body.id,
    body: JSON.stringify(body),
  });
