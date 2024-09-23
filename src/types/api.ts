export interface BaseResponse {
  statusCode?: number;
  timestamp?: string;
  path?: string;
  message?: string;
}

export interface TacResponse {
  error?: string;
  state?: string;
  error_description?: string;
  error_uri?: string;
  access_token?: string;
  token_type?: string;
  expires_in?: number;
  refresh_token?: string;
}
