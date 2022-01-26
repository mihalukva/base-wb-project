import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const requestSchema = s.object({
  name: s.string(),
  vs: s.nullable(s.number()),
});

const responseSchema = s.object({
  id: s.number(),
  name: s.string(),
  vs: s.nullable(s.number()),
});

export type PostLbuRequest = s.Infer<typeof requestSchema>;
export type PostLbuResponse = s.Infer<typeof responseSchema>;

const config: RequestConfig = {
  method: 'POST',
  url: '/api/lbu/',
  validationSchema: responseSchema,
};

export const postLbuResponse = (body: PostLbuRequest) =>
  api.request<PostLbuResponse>({
    ...config,
    body: JSON.stringify(body),
  });
