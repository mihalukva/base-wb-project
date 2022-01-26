import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const requestSchema = s.partial(
  s.object({
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

export type PostVsRequest = s.Infer<typeof requestSchema>;
export type PostVsResponse = s.Infer<typeof responseSchema>;

const config: RequestConfig = {
  method: 'POST',
  url: '/api/vs/',
  validationSchema: responseSchema,
};

export const postVsResponse = (body: PostVsRequest) =>
  api.request<PostVsResponse>({
    ...config,
    body: JSON.stringify(body),
  });
