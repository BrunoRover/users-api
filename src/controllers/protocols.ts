export interface HttpResponse<T> {
  statusCode: number;
  body: T | string | T[];
}
export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}
