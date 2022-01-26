import * as s from 'superstruct';

export const dateSchema = s.pattern(s.string(), /\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\dZ/);
