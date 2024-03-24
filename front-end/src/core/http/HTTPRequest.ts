export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export class HTTPRequest {
  private http_url: string = 'http://127.0.0.1:8000/api/';
  private http_method: HttpMethod = HttpMethod.GET;
  private http_headers: Record<string, string> = { 'Content-Type': 'application/json' };
  private http_body: Object = {};
  private http_params: Record<string, string> = {};

  endpoint(url: string): HTTPRequest {
    this.http_url += url;
    return this;
  }

  method(method: HttpMethod): HTTPRequest {
    this.http_method = method;
    return this;
  }

  headers(headers: Record<string, string>): HTTPRequest {
    this.http_headers = headers;
    return this;
  }

  body(body: Object): HTTPRequest {
    this.http_body = body;
    return this;
  }

  param(key: string, value: string): HTTPRequest {
    if (value !== undefined && value !== null && value !== '') {
      this.http_params[key] = value;
    }
    return this;
  }

  async send(): Promise<any> {
    const queryString = Object.entries(this.http_params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    const fullUrl = this.http_url + (queryString ? `?${queryString}` : '');

    const headers = new Headers();
    for (const [key, value] of Object.entries(this.http_headers)) {
      headers.append(key, value);
    }

    const response: Response = await fetch(fullUrl, {
      method: this.http_method.toString(),
      headers: this.http_headers,
      body: this.http_body ? JSON.stringify(this.http_body) : undefined
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.error);
    }

    const responseJson = await response.json();

    return responseJson;
  }

  static createHttpReques(): HTTPRequest {
    return new HTTPRequest();
  }
}
