import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import * as s from 'superstruct';

export const requestSchema = s.object({
  is_terms_and_conditions_accepted: s.boolean(),
  phone: s.string(),
});

export const errorResponseSchema = s.object({
  error: s.string(),
});

export const positiveResponseSchema = s.object({
  till_next_request: s.number(),
  token: s.string(),
  code_length: s.number(),
});

export const responseSchema = s.union([errorResponseSchema, positiveResponseSchema]);

export type Request = s.Infer<typeof requestSchema>;
export type Response = s.Infer<typeof responseSchema>;
export type PositiveResponse = s.Infer<typeof positiveResponseSchema>;

export const config: RequestConfig = {
  method: 'POST',
  url: '/passport/api/v2/auth/login_by_phone',
  validationSchema: responseSchema,
};

export const get = (body: Request) =>
  api.request<Response>({
    ...config,
    body: JSON.stringify(body),
  });
