export enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}
export const PAGE_SIZE = '10';

export class HTTPRequest<T> {
  private authStore = useAuthStore();

  private http_url: string = `${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}/api/`;
  private http_method: HttpMethod = HttpMethod.GET;
  private http_headers: Record<string, string> = { 'Content-Type': 'application/json' };
  private http_body: Object = {};
  private http_params: Record<string, string> = {};
  private requires_authentication: boolean = true;

  endpoint(url: string): HTTPRequest<T> {
    this.http_url += url;
    return this;
  }

  method(method: HttpMethod): HTTPRequest<T> {
    this.http_method = method;
    return this;
  }

  headers(headers: Record<string, string>): HTTPRequest<T> {
    this.http_headers = headers;
    return this;
  }

  body(body: Object): HTTPRequest<T> {
    this.http_body = body;
    return this;
  }

  param(key: string, value: string): HTTPRequest<T> {
    if (value !== undefined && value !== null && value !== '') {
      this.http_params[key] = value;
    }
    return this;
  }

  pageable(page: number): HTTPRequest<T> {
    const value = page.toString();
    return this.param('pageSize', PAGE_SIZE).param('page', value);
  }

  skipAuthentication(): HTTPRequest<T> {
    this.requires_authentication = false;
    return this;
  }

  async send(): Promise<T | any> {
    try {
      await this.handleAuthentication();
    } catch (error: any) {
      throw new Error("Erro: " + error.message);
    }

    const queryString = Object.entries(this.http_params)
      .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
      .join('&');

    const fullUrl = this.http_url + (queryString ? `?${queryString}` : '');

    const headers = new Headers();
    for (const [key, value] of Object.entries(this.http_headers)) {
      headers.append(key, value);
    }

    let response!: Response;
    try {
      response = await fetch(fullUrl, {
        method: this.http_method.toString(),
        headers: this.http_headers ? this.http_headers : undefined,
        body: this.http_method != HttpMethod.GET ? JSON.stringify(this.http_body) : undefined
      });
    } catch (error: any) {
      throw new Error("Erro: " + error.message);
      // throw new Error(
      //   'Parece que estamos com um problema de conexão com o servidor, tente novamente mais tarde!'
      // );
    }

    const responseJson = await response.json();
    if (response.ok) {
      return responseJson as T;
    } else {
      this.handleException(responseJson);
    }
  }

  private async handleAuthentication(): Promise<void> {
    if (this.requires_authentication) {
      const accessToken = this.authStore.getAccessToken();
      if (this.authStore.isTokenExpired(accessToken)) {
        await this.authStore.refreshToken();
      }

      this.http_headers['Authorization'] = `Bearer ${accessToken}`;
    }
  }

  async sendMock(mock: T): Promise<T> {
    return Promise.resolve(mock);
  }

  private handleException(response: any) {
    // if (response.status === 404) throw new Error('404, Not found');
    throw new Error(response.message);
  }

  static createHttpRequest<T>(): HTTPRequest<T> {
    return new HTTPRequest() as any as HTTPRequest<T>;
  }
}
