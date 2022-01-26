export type Validation = (data: any) => void;
export type ValidationSchema = any;
export type Mock = () => any;
export type Data = any;

export type RequestConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  queryParams?: Record<string, string | number>;
  headers?: Record<string, string>;
  body?: string;
  validate?: Validation;
  validationSchema?: ValidationSchema;
  mock?: Mock;
};

export type Query<T> = {
  request: RequestConfig | null;
  response: Response | null;
  data: T | null;
  code: number;
  isError: boolean;
  errorText: string;
  errorRawData: any | null;
};
