import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const balancerSchema = s.partial(
  s.object({
    id: s.number(),
    name: s.string(),
    ip_address: s.string(),
    port: s.number(),
    description: s.string(),
  }),
);

const balancerListSchema = s.array(balancerSchema);

const getLBResponseSchema = s.partial(
  s.object({
    data: balancerListSchema,
    count: s.number(),
    numpages: s.number(),
    nextlink: s.string(),
    prevlink: s.string(),
  }),
);

export type Balancer = s.Infer<typeof balancerSchema>;
export type BalancerList = s.Infer<typeof balancerListSchema>;
export type GetLbRequest = { page: number };
export type GetLBResponse = s.Infer<typeof getLBResponseSchema>;

const config: RequestConfig = {
  method: 'GET',
  url: '/api/lb/',
  validationSchema: getLBResponseSchema,
};

export const getLBResponse = (queryParams: GetLbRequest) =>
  api.request<GetLBResponse>({
    ...config,
    queryParams,
  });
