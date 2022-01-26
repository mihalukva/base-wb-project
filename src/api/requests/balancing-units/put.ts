import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const requestSchema = s.object({
  id: s.number(),
  name: s.string(),
  vs: s.nullable(s.number()),
});

const responseSchema = s.object({
  id: s.number(),
  name: s.string(),
  vs: s.nullable(s.number()),
});

export type PutLbuRequest = s.Infer<typeof requestSchema>;
export type PutLbuResponse = s.Infer<typeof responseSchema>;

const config: RequestConfig = {
  method: 'PUT',
  url: '/api/lbu/',
  validationSchema: responseSchema,
};

export const putLbuResponse = (body: PutLbuRequest) =>
  api.request<PutLbuResponse>({
    ...config,
    url: config.url + body.id,
    body: JSON.stringify(body),
  });
