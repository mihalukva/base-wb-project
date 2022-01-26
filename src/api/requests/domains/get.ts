import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const domainSchema = s.partial(
  s.object({
    id: s.number(),
    name: s.string(),
  }),
);

const domainListSchema = s.array(domainSchema);

const getDomainResponseSchema = s.partial(
  s.object({
    data: domainListSchema,
    count: s.number(),
    numpages: s.number(),
    nextlink: s.string(),
    prevlink: s.string(),
  }),
);

export type Domain = s.Infer<typeof domainSchema>;
export type DomainList = s.Infer<typeof domainListSchema>;
export type GetDomainRequest = { page: number };
export type GetDomainResponse = s.Infer<typeof getDomainResponseSchema>;

const config: RequestConfig = {
  method: 'GET',
  url: '/api/domain/',
  validationSchema: getDomainResponseSchema,
};

export const getDomainResponse = (queryParams: GetDomainRequest) =>
  api.request<GetDomainResponse>({
    ...config,
    queryParams,
  });
