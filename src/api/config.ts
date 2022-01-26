import * as s from 'superstruct';
import { RequestConfig, Query, Data, ValidationSchema, Validation, Mock } from './types';
import { queryParamsObjToStr } from './utils/queryParamsObjToString';

type ValidateResponseData = {
  isError: boolean;
  errorText: string;
  errorRawData: any | null;
};

type MockData = {
  data: any;
  code: number;
  isError: boolean;
};

type Fetch = {
  response: Response | null;
  data: any;
  code: number;
  isError: boolean;
  errorText: string;
};
class API {
  public host: string | undefined;

  public middleware: Array<<T>(query: Query<T>) => void> = [];

  public validate: (data: any, schema: any) => void = () => {
    // eslint-disable-next-line no-console
    console.warn('Схема валидации данных не задана');
  };

  private createEmptyQuery = <T>(): Query<T> => ({
    request: null,
    response: null,
    data: null,
    code: 0,
    isError: false,
    errorText: '',
    errorRawData: null,
  });

  private fetch = async (config: RequestConfig): Promise<Fetch> => {
    const { method, url, queryParams, headers = {}, body } = config;
    const params = queryParamsObjToStr(queryParams);
    if (body) {
      headers['Content-Type'] = 'application/json;charset=utf-8';
    }

    const newUrl = this.host ? new URL(url, this.host) : url;
    const response = await fetch(newUrl + params, {
      method,
      headers,
      body,
    });
    const data = response.status === 204 ? null : await response.json();
    const code = response.status;
    const isError = !response.ok;
    const errorText = isError ? data.errorMsg : '';

    return {
      response,
      data,
      code,
      isError,
      errorText,
    };
  };

  private mockData = async (mock: Mock): Promise<MockData> => {
    return {
      data: await mock(),
      code: 200,
      isError: false,
    };
  };

  private validateResponseData = async (
    data: Data,
    schema: ValidationSchema,
    validateFn?: Validation,
  ): Promise<ValidateResponseData | {}> => {
    try {
      if (validateFn) {
        await validateFn(data);
      } else if (schema) {
        await this.validate(data, schema);
      }
    } catch (error) {
      return {
        isError: true,
        errorText: `${error}`,
        errorRawData: error,
      };
    }

    return {};
  };

  async request<T>(config: RequestConfig): Promise<Query<T>> {
    let query: Query<T> = this.createEmptyQuery<T>();
    query.request = config;
    try {
      const { validationSchema, validate, mock } = config;

      if (mock) {
        const mockData = await this.mockData(mock);
        query = {
          ...query,
          ...mockData,
        };
      } else {
        const fetch = await this.fetch(config);
        query = {
          ...query,
          ...fetch,
        };
      }

      const validateResponseData = await this.validateResponseData(query.data, validationSchema, validate);
      query = {
        ...query,
        ...validateResponseData,
      };

      return query;
    } catch (err) {
      query.errorRawData = err;
      query.isError = true;
      query.errorText = `${err}`;

      return query;
    } finally {
      this.middleware.forEach(mdl => mdl(query));
    }
  }
}

const api = new API();
// api.host = process.env.REACT_APP_API_TARGET as string;
api.validate = (data, schema) => s.assert(data, schema);

api.middleware.push(query => {
  // eslint-disable-next-line no-console
  console.log(query);
});

export { api };
