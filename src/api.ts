import * as qs from 'query-string';

interface Params {
  [key: string]: any;
}

interface ReqOpts {
  method?: 'GET' | 'POST';
  params?: Params;
  token?: string;
}

interface ApiRes<T> {
  error?: {
    message: string,
  };
  data?: T;
}

const apiUrl = 'https://api-iddog.idwall.co';

export async function request<T>(url: string, opts: ReqOpts): Promise<ApiRes<T>> {
  const headers: HeadersInit = {
    "Content-Type": "application/json; charset=utf-8",
  };

  if (opts.token) {
    headers.Authorization = opts.token;
  }

  const res = await fetch(`${apiUrl}${url}`, {
    body: opts.params ? JSON.stringify(opts.params) : undefined,
    headers,
    method: opts.method,
  });

  let body;

  try {
    body = await res.json();
  } catch (e) {
    return {
      error: { message: 'An unknown error has occurred' },
    };
  }

  if (res.ok) {
    return {
      data: body,
    };
  } else {
    return {
      error: body.error,
    };
  }
}

export async function post<T>(url: string, opts: ReqOpts): Promise<ApiRes<T>> {
  return await request<T>(url, {
    ...opts,
    method: 'POST',
  });
}

export async function get<T>(url: string, opts: ReqOpts): Promise<ApiRes<T>> {
  let query = '';
  if (opts.params) {
    query = qs.stringify(opts.params);
  }

  return await request<T>(`${url}?${query}`, {
    ...opts,
    method: 'GET',
    params: undefined,
  });
}
