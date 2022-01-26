import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

export const requestSchema = s.object({
  token: s.string(),
  device: s.optional(s.string()),
  country: s.optional(s.string()),
  notify_code: s.optional(s.string()),
});

export const errorResponseSchema = s.object({
  error: s.string(),
});

export const positiveResponseSchema = s.object({
  token: s.string(),
});

export const responseSchema = s.union([errorResponseSchema, positiveResponseSchema]);

export type Request = s.Infer<typeof requestSchema>;
export type Response = s.Infer<typeof responseSchema>;
export type PositiveResponse = s.Infer<typeof positiveResponseSchema>;

export const config: RequestConfig = {
  method: 'POST',
  url: '/g-passport/api/v2/auth/login',
  validationSchema: responseSchema,
};

export const post = ({ notify_code, token, country, device }: Request) =>
  api.request<Response>({
    ...config,
    body: JSON.stringify({
      options: {
        notify_code,
      },
      country,
      device,
      token,
    }),
  });
