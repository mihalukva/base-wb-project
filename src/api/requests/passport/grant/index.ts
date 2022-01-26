import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

export const requestSchema = s.object({});

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
  url: '/passport/api/v2/auth/grant',
  validationSchema: responseSchema,
};

export const post = (body: Request = {}) =>
  api.request<Response>({
    ...config,
    body: JSON.stringify(body),
  });
