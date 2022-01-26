import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const requestSchema = s.partial(
  s.object({
    id: s.number(),
    name: s.string(),
    ip_address: s.string(),
  }),
);

const responseSchema = s.object({
  id: s.number(),
  name: s.string(),
  ip_address: s.string(),
  port: s.number(),
  protocol: s.number(),
});

export type PutVsRequest = s.Infer<typeof requestSchema>;
export type PutVsResponse = s.Infer<typeof responseSchema>;

const config: RequestConfig = {
  method: 'PUT',
  url: '/api/vs/',
  validationSchema: responseSchema,
};

export const putVsResponse = (body: PutVsRequest) =>
  api.request<PutVsResponse>({
    ...config,
    url: config.url + body.id,
    body: JSON.stringify(body),
  });
