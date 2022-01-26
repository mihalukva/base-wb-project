import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const virtualServiceSchema = s.object({
  id: s.number(),
  name: s.string(),
  ip_address: s.string(),
  port: s.number(),
  protocol: s.number(),
});

const virtualServiceListSchema = s.array(virtualServiceSchema);

const getVSResponseSchema = s.partial(
  s.object({
    data: virtualServiceListSchema,
    count: s.number(),
    numpages: s.number(),
    nextlink: s.string(),
    prevlink: s.string(),
  }),
);

export type VirtualService = s.Infer<typeof virtualServiceSchema>;
export type VirtualServiceList = s.Infer<typeof virtualServiceListSchema>;
export type GetVSRequest = { page: number };
export type GetVSResponse = s.Infer<typeof getVSResponseSchema>;

const config: RequestConfig = {
  method: 'GET',
  url: '/api/vs/',
  validationSchema: getVSResponseSchema,
};

export const getVSResponse = (queryParams: GetVSRequest) =>
  api.request<GetVSResponse>({
    ...config,
    queryParams,
  });
