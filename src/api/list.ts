import axios from "axios";
import qs from "query-string";
import type { DescData } from "@arco-design/web-vue/es/descriptions/interface";
import type { Pagination, PageInfo, PageDateRange } from "@/types/global";
export interface PolicyRecord {
  id: string;
  number: string;
  name: string;
  contentType: "img" | "horizontalVideo" | "verticalVideo";
  filterType: "artificial" | "rules";
  count: number;
  status: 0 | 1;
  createdTime: string;
}
// 可选/查询参数
export type PolicyParams = Partial<PolicyRecord> & PageDateRange & Pagination;

export type PolicyListRes = PageInfo<PolicyRecord[]>;

export function queryPolicyList(params: PolicyParams) {
  return axios.get<PolicyListRes>("/api/list/policy", {
    params,
    paramsSerializer: (obj) => {
      return qs.stringify(obj);
    },
  });
}

export interface ServiceRecord {
  id: number;
  title: string;
  description: string;
  name?: string;
  actionType?: string;
  icon?: string;
  data?: DescData[];
  enable?: boolean;
  expires?: boolean;
}
export function queryInspectionList() {
  return axios.get("/api/list/quality-inspection");
}

export function queryTheServiceList() {
  return axios.get("/api/list/the-service");
}

export function queryRulesPresetList() {
  return axios.get("/api/list/rules-preset");
}
