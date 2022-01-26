import { api } from 'api/config';
import { RequestConfig } from 'api/types';
import { dateSchema } from 'api/utils/date-schema';
import * as s from 'superstruct';

export const requestSchema = s.object({});

export const errorResponseSchema = s.object({
  error: s.string(),
});

export const UserSchema = s.object({
  id: s.number(),
  first_name: s.string(),
  last_name: s.string(),
  middle_name: s.string(),
  email: s.string(),
  phone: s.number(),
  birthday: dateSchema,
  gender: s.string(),
  avatar: s.string(),
});

export const positiveResponseSchema = s.object({
  user: UserSchema,
});

export const responseSchema = s.union([errorResponseSchema, positiveResponseSchema]);
export type User = s.Infer<typeof UserSchema>;
export type Request = s.Infer<typeof requestSchema>;
export type Response = s.Infer<typeof responseSchema>;
export type PositiveResponse = s.Infer<typeof positiveResponseSchema>;

export const config: RequestConfig = {
  method: 'GET',
  url: '/passport/api/v2/user/personal_data',
  validationSchema: responseSchema,
};

export const get = () => api.request<Response>({ ...config });
