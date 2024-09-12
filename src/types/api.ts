import { type ActivityEntity } from "./entity/Activity.entity";

export interface BaseResponse {
  statusCode?: number;
  timestamp?: string;
  path?: string;
  message?: string;
}

export interface BasePaginationResponse {
  total: number;
}

export interface ApprovedPaginationResponse extends BasePaginationResponse {
  data: ActivityEntity[];
}
