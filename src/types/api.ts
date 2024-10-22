import { type Activity } from "./activity";
import { type ActivityStatus } from "./common";
import { type ActivityEntity } from "./entity/Activity.entity";
import { type SubActivityEntity } from "./entity/SubActivity.entity";

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

export interface RegisterInfoResponse {
  type: "sign" | "wait" | "none";
  subs: number[];
  remainings: Array<{
    subID: number;
    remaining: number;
  }>;
}

export interface SignListResponseActivity extends Activity {
  status: ActivityStatus;
}

export interface SignListResponse {
  actID: number;
  activity: SignListResponseActivity;
  id: number;
  signDate: Date;
  subActivities: SubActivityEntity[];
  useID: number;
}
