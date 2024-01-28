import http from 'http';

class RequestBuilder {
  // url / query params / headers / body
  private _url!: URL;
  private _method: 'POST' | 'GET' = 'GET';
  private _headers: Record<string, string> = {};
  private _data!: string;
  url(url: string) {
    this._url = new URL(url);
    return this;
  }
  method(method: 'POST' | 'GET') {
    this._method = method;
    return this;
  }
  body(data: string) {
    this._data = data;
    return this;
  }
  headers(headers: Record<string, string>) {
    this._headers = headers;
  }
  params(params: Array<[string, string]>) {
    params.forEach(([key, value]) => this._url.searchParams.append(key, value));
    console.log(this._url);
    return this;
  }
  invoke() {
    return new Promise((resolve, reject) => {
      const req = http.request(
        {
          headers: this._headers,
          method: this._method,
          hostname: this._url.hostname,
          searchParams: this._url.searchParams,
        },
        (res) => {
          console.log(`STATUS: ${res.statusCode}`);
          console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
          res.setEncoding('utf8');
          res.on('data', (chunk) => {
            console.log(`BODY: ${chunk}`);
          });
          res.on('data', () => console.log(res.read()));
        }
      );
      req.on('error', (e) => {
        console.error(`problem with request: ${e.message}`);
      });
    });
  }
}

new RequestBuilder().url('http://google.com').method('GET').invoke();
