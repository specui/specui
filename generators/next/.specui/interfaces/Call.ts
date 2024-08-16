export interface Call {
  request: Record<string, CallRequest>;
  response: Record<string, CallResponse>;
}

export interface CallRequest {
  required?: boolean;
  type: 'boolean' | 'number' | 'string';
}

export interface CallResponse {
  required?: boolean;
  type: 'boolean' | 'number' | 'string';
}
