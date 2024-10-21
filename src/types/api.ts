import { type ActivityEntity } from "./entity/Activity.entity";

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

export interface BasePaginationResponse {
  total: number;
}

export interface PaginationResponse extends BasePaginationResponse {
  data: ActivityEntity[];
}

export interface JWTResponse {
  isSuccess: boolean;
  jwt: string;
  type: "admin" | "stu" | "Ultradamin";
}
