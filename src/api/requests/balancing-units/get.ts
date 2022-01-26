import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const balancingUnitSchema = s.partial(
  s.object({
    id: s.number(),
    name: s.string(),
    vs: s.nullable(s.number()),
    reals: s.array(s.number()),
  }),
);

const balancingUnitListSchema = s.array(balancingUnitSchema);

const getLBUResponseSchema = s.partial(
  s.object({
    data: balancingUnitListSchema,
    count: s.number(),
    numpages: s.number(),
    nextlink: s.string(),
    prevlink: s.string(),
  }),
);

export type BalancingUnit = s.Infer<typeof balancingUnitSchema>;
export type BalancingUnitList = s.Infer<typeof balancingUnitListSchema>;
export type GetLBURequest = { page: number };
export type GetLBUResponse = s.Infer<typeof getLBUResponseSchema>;

const config: RequestConfig = {
  method: 'GET',
  url: '/api/lbu/',
  validationSchema: getLBUResponseSchema,
};

export const getLBUResponse = (queryParams: GetLBURequest) =>
  api.request<GetLBUResponse>({
    ...config,
    queryParams,
  });
