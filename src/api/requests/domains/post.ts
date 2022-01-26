import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const requestSchema = s.object({
  name: s.string(),
});

const responseSchema = s.object({
  id: s.number(),
  name: s.string(),
});

export type PostDomainRequest = s.Infer<typeof requestSchema>;
export type PostDomainResponse = s.Infer<typeof responseSchema>;

const config: RequestConfig = {
  method: 'POST',
  url: '/api/domain/',
  validationSchema: responseSchema,
};

export const postDomainResponse = (body: PostDomainRequest) =>
  api.request<PostDomainResponse>({
    ...config,
    body: JSON.stringify(body),
  });
