import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

const hostSchema = s.partial(
  s.object({
    id: s.number(),
    name: s.string(),
    ip_address: s.string(),
  }),
);

const hostListSchema = s.array(hostSchema);

const getHostsSchema = s.partial(
  s.object({
    data: hostListSchema,
    count: s.number(),
    numpages: s.number(),
    nextlink: s.string(),
    prevlink: s.string(),
  }),
);

export type Host = s.Infer<typeof hostSchema>;
export type HostList = s.Infer<typeof hostListSchema>;
export type GetHostsRequest = { page: number };
export type GetHostsResponse = s.Infer<typeof getHostsSchema>;

const config: RequestConfig = {
  method: 'GET',
  url: '/api/real/',
  validationSchema: getHostsSchema,
};

export const getHostResponse = (queryParams: GetHostsRequest) =>
  api.request<GetHostsResponse>({
    ...config,
    queryParams,
  });
