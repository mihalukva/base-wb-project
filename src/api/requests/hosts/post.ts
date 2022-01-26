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
});

export type PostHostRequest = s.Infer<typeof requestSchema>;
export type PostHostResponse = s.Infer<typeof responseSchema>;

const config: RequestConfig = {
  method: 'POST',
  url: '/api/real/',
  validationSchema: responseSchema,
};

export const postHostResponse = (body: PostHostRequest) =>
  api.request<PostHostResponse>({
    ...config,
    body: JSON.stringify(body),
  });
