import * as s from 'superstruct';

export const errorsSchema = {
  errorCode: s.string(),
  errorMsg: s.string(),
  additionalErrors: s.record(s.pattern(s.string(), /^/), s.string()),
};
